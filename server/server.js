import express from "express"
import mysql from "mysql"
import cors from "cors"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import multer from "multer"
import path from "path"

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aukcije"
})

app.listen(3001, () => {
    console.log("I hear you. :)")
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM korisnici"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    });
})

app.post("/register", (req, res) => {
    const sql = "INSERT INTO korisnici(ime, prezime, email, sifra, adresa, drzava, grad, postanski_broj, mobitel) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password." });
        const values = [
            req.body.name,
            req.body.surname,
            req.body.email,
            hash,
            req.body.adress,
            req.body.country,
            req.body.town,
            req.body.zipCode,
            req.body.mobile
        ]
        db.query(sql, [values], (err, data) => {
            if (err) return res.json({ Error: "Inserting data Error in server." })
            return res.json({ Status: "Success." })
        });
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM korisnici WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server." })
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].sifra, (err, response) => {
                if (err) return res.json({ Error: "Password compare error." })
                if (response) {
                    const name = data[0].ime;
                    const email = data[0].email;
                    const token = jwt.sign({ name, email }, process.env.MY_TOKEN, { expiresIn: 1800 });
                    //res.cookie('TOKEN', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000*3000 });
                    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure=false; SameSite=Strict; maxAge: 1800`);
                    return res.json(true)
                }
                else {
                    return res.json({ Error: "Password not matched." })
                }
            })
        }
        else {
            return res.json({ Error: "No email exists." })
        }
    })
})

const verifyUser = (req, res, next) => {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
        return res.json({ Error: 'No cookies found. You are not authorized' });
    }

    const cookies = cookieHeader.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const token = cookies['token'];

    if (!token) {
        return res.json({ Error: 'You are not authorized' })
    }
    else {
        jwt.verify(token, process.env.MY_TOKEN, (err, decoded) => {
            if (err) {
                return res.json({ Error: 'Token is not okay' });
            }
            else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/auth', verifyUser, (req, res) => {
    return res.json({ Status: 'Success', name: req.name })
})

app.get('/logout', (req, res) => {
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict;');
    res.json({ Success: 'Logged out.' })
})

app.get('/userData', (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    const sql = 'SELECT * FROM korisnici WHERE email = ?';
    db.query(sql, [decoded_token.email], (err, data) => {
        if (err) return res.json({ Error: "Error for searching user's data." });
        return res.send(data)
    })
})

const formatTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based; add 1 to match calendar months
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return timestamp;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.post("/setItem", upload.single('image'), (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    db.query("SELECT * FROM korisnici WHERE email = ?", [decoded_token.email], (err, data) => {
        const imagePath = path.join('uploads', req.file.filename)
        const values = [
            req.body.name,
            req.body.description,
            req.body.starting_price,
            imagePath,
            formatTime(),
            `${req.body.duration_time}:00:00`,
            req.body.category,
            data[0].korisnik_id
        ]
        console.log(values)
        db.query("INSERT INTO predmeti(naziv, opis, pocetna_cijena, slika, postavljeno_vrijeme, istjece_vrijeme, kategorija_id, korisnik_id) VALUES (?)", [values], (err, data) => {
            if (err) return res.json({ Error: "Inserting data Error in server." })
            return res.send(data)
        });
    })
})


const timer = (started, ending) => {
    console.log("-----------------------------------------------------")
    const starting_hour = started.getHours();
    const starting_minutes = started.getMinutes();
    const starting_seconds = started.getSeconds();

    const ending_hour = ending.getHours();
    const ending_minutes = ending.getMinutes();
    const ending_seconds = ending.getSeconds();

    const hours = starting_hour - ending;
    console.log(ending)
    // var newtime = new Date();
    // var endTime = (Date.parse(newtime)) / 1000;
    // var now = new Date(starttime);
    // var now = (Date.parse(now) / 1000);
    // var timeLeft = endTime - now;
    // var days = Math.floor(timeLeft / 86400);
    // var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    // var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    // var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    // if (hours < "10") {
    //     hours = "0" + hours;
    // }
    // if (minutes < "10") {
    //     minutes = "0" + minutes;
    // }
    // if (seconds < "10") {
    //     seconds = "0" + seconds;
    // }
    // return {
    //     hours,
    //     minutes,
    //     seconds
    // };
}

app.get("/listItems", (req, res) => {
    db.query("SELECT * FROM predmeti WHERE kategorija_id = ?", [req.query.categoryID], (err, data) => {
        if (err) return res.json({ Error: "Error for searching user's data." });
        console.log(timer(data[0].postavljeno_vrijeme, data[0].istjece_vrijeme))
        return res.send(data)
    })
})

app.use('/uploads', express.static('uploads'))
