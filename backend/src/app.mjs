import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import config from '../config.js';
import cors from 'cors';

import {Codex, Word} from './models/codex.mjs'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) => console.log('error connecting to mongoDB'));

app.use(cors());

app.get('/directory', async (req, res) => {
    console.log('showing directories');
    const directory = await Codex.find({}, {user: 1, name: 1, likes: 1, slug: 1}); //TODO: change 'user' when theres authentication
    res.json(directory);
})

app.post('/codices', async (req, res) => {
    const settings = req.body.settings;
    console.log('codex', settings);

    const newCodex = new Codex({ //TODO: create full settings w user
            public: settings.privacy === 'public',
            name: settings.name,
            likes: 0,
            user: {username: 'dices'}
        }
    )
    await newCodex.save();
    return res.status(201).json({ message: "created codex" });
})

app.get('/codices/:slug', async (req, res) => {
    const slug = req.params.slug;
    console.log(`requested get on slug: ${slug}`);
    res.send(`would get`);
})

app.post('/codices/:slug', async (req, res) => {
    const slug = req.params.slug;
    console.log(`requested post on slug: ${slug}`);
    res.send('would post');
})


console.log("listening on port " + (config.PORT || 3001))
app.listen(config.PORT || 3001);
