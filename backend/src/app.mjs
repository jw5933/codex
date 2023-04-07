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

    try {
        const codex = await Codex.findOne({slug: slug}).populate('words');
        console.log(`found codex ${codex}, with slug ${slug}`);
        res.json(codex);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: `an error occurred while fetching codex, ${slug}` });
    }
})

app.post('/codices/:slug', async (req, res) => {
    const slug = req.params.slug;

    const wordData = req.body.word;
    const definitions = wordData.definitions.map(def => ({definition: def}));

    const newWord = new Word( //TODO: add owner
        {
            word: wordData.word,
            definitions: definitions,
        }
    )

    try {
        const word = await newWord.save();

        const update = {
            $push: {words: word}
        };
        const updatedCodex = await Codex.findOneAndUpdate(
            {slug: slug},
            update,
            {new: true}).populate('words');
        res.status(201).json(updatedCodex);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: `an error occurred while adding word, ${newWord.word}` });
    }
})


console.log("listening on port " + (config.PORT || 3001))
app.listen(config.PORT || 3001);
