import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from 'knex';

import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import { handleImage, handleImageUrl } from "./controllers/image.js";

const db = knex({
    client: 'pg',
    connection: {
      host: 'postgresql-corrugated-36178',
      port: 5432,
      user: 'caraimanmario',
      password: '',
      database: 'smart-brain',
    },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send('server is working');
});

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { handleImage(req, res, db) });
app.post('/imageurl', async (req, res) => { handleImageUrl(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is working on port ${process.env.PORT}`);
});
