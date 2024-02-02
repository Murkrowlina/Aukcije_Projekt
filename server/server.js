import express from "express"
import mysql from "mysql"
import cors from "cors"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import 'dotenv/config'

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
    const q = "SELECT * FROM users"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    });
})

app.post("/register", (req, res) => {
    const sql = "INSERT INTO users(name, surname, email, password, adress, country, town, zip_code, mobile) VALUES (?)"
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
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server." })
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error." })
                if (response) {
                    const name = data[0].name;
                    const email = data[0].email;
                    const token = jwt.sign({ name, email }, process.env.MY_TOKEN, { expiresIn: new Date(Date.now() + 3600000) });
                    //res.cookie('TOKEN', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000*3000 });
                    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure=false; SameSite=Strict; maxAge: new Date(Date.now() + 3600000)`);
                    return res.json(true)
                } else {
                    return res.json({ Error: "Password not matched." })
                }
            })
        } else {
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
    
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [decoded_token.email], (err, data) => {
        if (err) return res.json({ Error: "Error for searching user's data." });
        return res.send(data)
    })
})