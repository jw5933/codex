import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import config from '../config.js';
import cors from 'cors';

import {Codex, Word} from '../models/codex.mjs'

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

app.get('/directory', (req, res) => {
    console.log('showing directories');
    return res.status(200);
    // res.json(directory);
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

console.log("listening on port " + (config.PORT || 3000))
app.listen(config.PORT || 3000);
