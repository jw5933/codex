// 1ST DRAFT DATA MODEL
//to be adjust after passport implementation
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    ownedCodices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Codex'
        }
    ],
    savedCodices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Codex'
        }
    ],
})