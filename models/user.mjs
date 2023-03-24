// 1ST DRAFT DATA MODEL

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    codices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Codex'
        }
    ],
})