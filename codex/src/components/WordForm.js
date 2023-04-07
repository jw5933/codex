import { useState } from 'react';
import codexService from '../services/codex'
import {useRouter} from "next/router";
import codex from "../services/codex";

const WordForm = ({slug, codex, setCodex}) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [newWord, setNewWord] = useState('');
    const [newDefinitions, setNewDefinitions] = useState([]);
    const [newDefinition, setNewDefinition] = useState('');
    const [message, setMessage] = useState(null);

    const handleVisibility = (event) => {
        event.preventDefault();
        setVisible(!visible);
        resetStates();
    };

    const resetStates = () => {
        setNewWord('');
        setNewDefinition('');
        setNewDefinitions([]);
        setMessage(null);
    };

    const addNewDefinition = () => {
        if (newDefinition !== '') setNewDefinitions(newDefinitions.concat(newDefinition));
        setNewDefinition('');
    };

    const handleChange = (event) => {
        if (event.target.name === 'word') setNewWord(event.target.value);
        //TODO: definitions should be objects, with definition and groups
        if (event.target.name === 'definition') setNewDefinition(event.target.value);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (newWord === '') return;
        try {
            //TODO: check if word is already in codex, if so, ask user to add the definition (or do it automatically)
            if (codex.words.filter(wordObj => wordObj.word === newWord).length > 0) {
                console.log("word already exists.")
                setMessage(`word ${newWord} already exists. Can't delete or edit right now sorry!`);
                return;
            }

            const updatedCodex = await codexService.createNewWord(
                slug,
                {word: newWord, definitions: newDefinitions});
            await router.push(router.asPath);
            resetStates();
            console.log(updatedCodex);
            setCodex(updatedCodex);
        }catch (e){
            console.log(e);
        }
    };


    return (
        <>
            {!visible ? (<button onClick={handleVisibility}>Create Word</button>)
                :
                (<>
                    {message}
                <form onSubmit = {handleOnSubmit}>
                    <label>
                        Word: <input type={"text"} value={newWord} name={"word"} onChange={handleChange}/>
                    </label>
                    <br/>
                    Definitions:
                    <ul>
                        {newDefinitions?.map((def, i) => (
                            <li key={i}>{def}</li>
                        ))}
                    </ul>
                    <input type={"text"} value={newDefinition} name = {"definition"} onChange={handleChange}/>
                    <button type={"button"} onClick={addNewDefinition}>Add definition</button>
                    <br/>
                    <button type={"button"} onClick={handleVisibility}>Cancel</button>
                    <button type="submit">Add word</button>
                </form>
                </>)
            }
        </>
    );
};

export default WordForm;