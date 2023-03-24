// 1ST DRAFT DATA MODEL
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/hw05');

/*
a definition for a word
    - has the same groups as the codex, which are filled with '-' to start
 */
const DefinitionSchema = new mongoose.Schema ({
        definition: { type: String, required: true},
        groups: {}
    });

/*
a word in a codex
    - contains 0+ definitions
    - can be starred, which puts them to the top of the list
 */
const WordSchema = new mongoose.Schema ({
    owner: { //reference to creator of word
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    word: {type: String, required: true},
    definitions: [DefinitionSchema],
    starred: Boolean,
    }
);

/*
a collection of words
    - can be collaborated on with the public or specified users
    - has a set of custom groups that can be used for filtering (for example, part of speech like noun, adj, verb)
 */
const CodexSchema = new mongoose.Schema({
    owner: { //reference to creator of dictionary
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    public: Boolean, //if this codex has read/write permissions for public (users only)
    collaborators: [{ //array of users that have r/w permissions
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    publicPermissions: {type: String, enum: ['n', 'r', 'rw'], default: 'n'},
    collaboratorPermissions: {type: String, enum: ['n', 'r', 'rw'], default: 'n'},
    name: {type: String, required: true},
    words: [{ //array of references to words
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
    }],
    groups: {}, //possible groupings for words
});

export const Codex = mongoose.model('Codex', CodexSchema);
export const Word = mongoose.model('Word', WordSchema);