import express from 'express'
import next from 'next'
import mongoose from "mongoose";
import config from './config.js';
// import cors from 'cors';

import CodexModels from './models/codex.mjs'
const Codex = CodexModels.Codex;
const Word = CodexModels.Word;

// import path from 'path'
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()


//body parser
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) => console.log('error connecting to mongoDB'));

// app.use(cors());

server.get('/api/directory', async (req, res) => {
    console.log('showing directories');
    const directory = await Codex.find({}, {user: 1, name: 1, likes: 1, slug: 1}); //TODO: fill with wanted values
    res.json(directory);
})

server.post('/api/codices', async (req, res) => {
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

server.all('*', (req, res) => {
    return handle(req, res)
})

const PORT = process.env.PORT || 3000
app.prepare().then(() => {
    server.listen(PORT, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})
