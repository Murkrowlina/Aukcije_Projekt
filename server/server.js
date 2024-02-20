import express from "express"
import mysql from "mysql"
import cors from "cors"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import multer from "multer"
import path from "path"
import cron from "node-cron";

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

app.use('/uploads', express.static('uploads'))

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

const formatTime = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const randomID = (table) => {
    let enterWhileLoop = 1;
    let randomNum = 0;

    if (table == "predmet") {
        while (enterWhileLoop > 0) {
            randomNum = Math.round(Math.random() * 1000000);
            const data = db.query("SELECT predmetID FROM predmeti WHERE predmetID LIKE ?", [randomNum], (err, data) => {
                return data;
            });

            enterWhileLoop = data.length;
        }
    }
    else {
        while (enterWhileLoop > 0) {
            randomNum = Math.round(Math.random() * 1000000);
            const data = db.query("SELECT ponudaID FROM predmeti WHERE ponudaID LIKE ?", [randomNum], (err, data) => {
                return data;
            });

            enterWhileLoop = data.length;
        }
    }

    return `${randomNum}`;
}

const setUpBidTable = (bid, itemID, userID, bidID) => {
    const values = [
        bidID,
        `${bid}`,
        userID,
        `${itemID}`
    ]
    db.query("INSERT INTO ponude(ponudaID, najvisaPonuda, korisnikID, predmetID) VALUES (?)", [values]);
    db.query(`UPDATE predmeti SET ponudaID = ${bidID} WHERE predmetID LIKE ?`, [itemID])
}

app.post("/setItem", upload.single("image"), (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    db.query("SELECT * FROM korisnici WHERE email = ?", [decoded_token.email], (err, data) => {
        const imagePath = path.join("uploads", req.file.filename);
        const userID = data[0].korisnikID
        const itemID = randomID("predmet");
        const bidID = randomID("ponuda");
        const date = new Date();
        const expirationDate = new Date(date.getTime() + (req.body.duration * 60 * 60 * 1000))

        const values = [
            itemID,
            req.body.name,
            req.body.description,
            req.body.bid,
            imagePath,
            formatTime(date),
            formatTime(expirationDate),
            `${req.body.duration}:00:00`,
            req.body.duration,
            req.body.category,
            userID
        ]

        db.query("INSERT INTO predmeti(predmetID, naziv, opis, pocetnaCijena, slika, stavljeno, zavrsetak, stoperica, sati, kategorijaID, korisnikID) VALUES (?)", [values], (err, data) => {
            if (err) return res.json({ Error: "Inserting data Error in server." })
            setUpBidTable(req.body.starting_price, itemID, userID, bidID);
            return res.send(data);
        });
    })
})

app.get("/listItems", (req, res) => {
    db.query(`SELECT *, YEAR(zavrsetak), MONTH(zavrsetak), DAY(zavrsetak), TIME(zavrsetak) FROM predmeti WHERE stoperica != '00:00:00' AND kategorijaID = ?`, [req.query.categoryID], (err, data) => {
        if (err) return res.json({ Error: "Error for searching user's data." });
        updateExpiredAuctions(data);
        return res.send(data);
    })
})

app.get("/getItem", (req, res) => {
    let user = "";
    db.query(`SELECT korisnici.ime, korisnici.prezime
    FROM ponude
    INNER JOIN korisnici ON ponude.ponudacID = korisnici.korisnikID 
    WHERE ponude.ponudacID IS NOT NULL AND ponude.predmetID = ?`, [req.query.predmetID], (err, data) => {
        if (err) return res.json({ ERROR: "Error for searching item's data" });
        if (data.length > 0) {
            user = `${data[0].ime} ${data[0].prezime}`;
        }
    })

    db.query(`SELECT *, 
    YEAR(zavrsetak), MONTH(zavrsetak), DAY(zavrsetak), TIME(zavrsetak), 
    HOUR(stoperica), MINUTE(stoperica), SECOND(stoperica)
    FROM predmeti
    INNER JOIN kategorije ON predmeti.kategorijaID = kategorije.kategorijaID
    INNER JOIN korisnici ON predmeti.korisnikID = korisnici.korisnikID
    INNER JOIN ponude ON predmeti.ponudaID = ponude.ponudaID
    WHERE predmeti.predmetID = ?`, [req.query.predmetID], (err, data) => {
        if (err) return res.json({ ERROR: "Error for searching item's data" });
        setUpExpiration(data, true)
        data[0].ponudac = user
        return res.send(data);
    })
})

const setUpExpiration = (data, cronning) => {
    let schedule = cron.schedule(`*/1 * * * * *`, async () => {
        await updateExpiredAuctions(data);
    });
    if (!cronning) return schedule.stop();
    schedule.start();
}

app.post("/updateBid", (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    db.query("SELECT * FROM korisnici WHERE email = ?", [decoded_token.email], (err, data) => {
        const userID = data[0].korisnikID
        db.query(`UPDATE ponude SET ponudacID = ${userID}, najvisaPonuda = ${req.body.bid.bidding} WHERE ${req.body.bid.bidding} > najvisaPonuda AND korisnikID != ${userID} AND predmetID = ?`, (req.body.bid.itemID), (err, data) => {
            if (err) return res.json(err);
            console.log("hel");
            setUpExpiration(data, true);
            return res.send(data);
        })
    })
})

const updateExpiredAuctions = (data) => {
    for (let i = 0; i < data.length; i++) {
        const stavljeno = new Date(data[i].stavljeno);
        const date = new Date();
        let leftovers = 0;

        let secondsDifference = date.getSeconds() + (60 - stavljeno.getSeconds());
        let minutesDifference = date.getMinutes() + (60 - stavljeno.getMinutes());

        if (stavljeno.getDate() == date.getDate() && stavljeno.getMonth() == date.getMonth() && stavljeno.getFullYear() == date.getFullYear()) {
            let hoursDifference = (date.getHours() > stavljeno.getHours()) ? date.getHours() - stavljeno.getHours() : 1;

            console.log(data[i].naziv);
            if (secondsDifference != 0 && minutesDifference != 0) {
                if (secondsDifference % 60 != 0 && secondsDifference > 60) {
                    leftovers = secondsDifference % 60;
                    minutesDifference += Math.floor(secondsDifference / 60);;
                    secondsDifference = leftovers;
                }

                if (minutesDifference % 60 != 0 && minutesDifference > 60) {
                    leftovers = minutesDifference % 60;
                    minutesDifference = leftovers;
                }
            }

            hoursDifference = data[i].sati - hoursDifference - 1;
            console.log(hoursDifference);

            leftovers = 0 - secondsDifference * (-1);
            secondsDifference = 60 - leftovers;
            leftovers = 0 - minutesDifference * (-1);
            minutesDifference = 60 - leftovers;

            if (hoursDifference < 0) {
                db.query(`UPDATE predmeti SET stoperica = '00:00:00'
                WHERE predmetID = ${data[i].predmetID}`);
                return;
            }

            db.query(`UPDATE predmeti SET stoperica = '${hoursDifference}:${minutesDifference}:${secondsDifference}'
                    WHERE predmetID = ${data[i].predmetID}`);
        }
        else {
            let hoursDifference = date.getHours() + (24 - stavljeno.getHours());

            if (secondsDifference != 0 && minutesDifference != 0) {
                if (secondsDifference % 60 != 0 && secondsDifference > 60) {
                    leftovers = secondsDifference % 60;
                    minutesDifference += Math.floor(secondsDifference / 60);;
                    secondsDifference = leftovers;
                }

                if (minutesDifference % 60 != 0 && minutesDifference > 60) {
                    leftovers = minutesDifference % 60;
                    minutesDifference = leftovers;
                }
            }

            hoursDifference = data[i].sati - hoursDifference;
            leftovers = 0 - secondsDifference * (-1);
            secondsDifference = 60 - leftovers;
            leftovers = 0 - minutesDifference * (-1);
            minutesDifference = 60 - leftovers;

            if (hoursDifference < 0) {
                db.query(`UPDATE predmeti SET stoperica = '00:00:00'
                WHERE predmetID = ${data[i].predmetID}`);
                return;
            }

            db.query(`UPDATE predmeti SET stoperica = '${hoursDifference}:${minutesDifference}:${secondsDifference}'
                    WHERE predmetID = ${data[i].predmetID}`);
        }
    }
}

app.get("/activeItems", (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    db.query(`SELECT * FROM predmeti 
    RIGHT OUTER JOIN korisnici ON predmeti.korisnikID = korisnici.korisnikID
    RIGHT OUTER JOIN ponude ON predmeti.predmetID = ponude.predmetID
    WHERE stoperica != '00:00:00' AND korisnici.email = '${decoded_token.email}'`, (err, data) => {
        if (err) return res.json(err);
        updateExpiredAuctions(data)
        return res.send(data);
    })
})

app.get("/expiredItems", (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    db.query(`SELECT * FROM predmeti 
    RIGHT OUTER JOIN korisnici ON predmeti.korisnikID = korisnici.korisnikID
    RIGHT OUTER JOIN ponude ON predmeti.predmetID = ponude.predmetID
    WHERE stoperica = '00:00:00' AND korisnici.email = '${decoded_token.email}'`, (err, data) => {
        if (err) return res.json(err);
        return res.send(data);
    })
})

app.get("/soldItems", (req, res) => {
    const cookie = req.headers.cookie.split('; ').reduce((acc, current) => {
        const [name, ...value] = current.split('=');
        acc[name] = value.join('=');
        return acc;
    }, {});
    const decoded_token = jwt.verify(cookie['token'], process.env.MY_TOKEN);

    db.query(`SELECT * FROM predmeti 
    RIGHT OUTER JOIN korisnici ON predmeti.korisnikID = korisnici.korisnikID
    RIGHT OUTER JOIN ponude ON predmeti.predmetID = ponude.predmetID
    WHERE stoperica = '00:00:00' AND korisnici.email = '${decoded_token.email}' AND (ponude.najvisaPonuda > predmeti.pocetnaCijena OR ponude.najvisaPonuda = predmeti.pocetnaCijena)`, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
        return res.send(data);
    })
})

app.get("/newItems", (req, res) => {
    db.query(`SELECT * FROM predmeti 
    RIGHT OUTER JOIN korisnici ON predmeti.korisnikID = korisnici.korisnikID
    RIGHT OUTER JOIN ponude ON predmeti.predmetID = ponude.predmetID
    WHERE stoperica != '00:00:00'
    ORDER BY stoperica DESC`, (err, data) => {
        if (err) return res.json(err);
        updateExpiredAuctions(data)
        return res.send(data);
    })
})

app.get("/endingItems", (req, res) => {
    db.query(`SELECT * FROM predmeti 
    RIGHT OUTER JOIN korisnici ON predmeti.korisnikID = korisnici.korisnikID
    RIGHT OUTER JOIN ponude ON predmeti.predmetID = ponude.predmetID
    WHERE stoperica != '00:00:00'
    ORDER BY stoperica`, (err, data) => {
        if (err) return res.json(err);
        updateExpiredAuctions(data)
        return res.send(data);
    })
})