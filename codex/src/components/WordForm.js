import { useState } from 'react';
import codexService from '../services/codex'
import {useRouter} from "next/router";

const WordForm = ({slug}) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [newWord, setNewWord] = useState('');
    const [newDefinitions, setNewDefinitions] = useState([]);
    const [newDefinition, setNewDefinition] = useState('');

    const handleVisibility = (event) => {
        event.preventDefault();
        setVisible(!visible);
        resetStates();
    };

    const resetStates = () => {
        setNewWord('');
        setNewDefinition('');
        setNewDefinitions([]);
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
            await codexService.createNewWord(
                slug,
                {word: newWord, definitions: newDefinitions});
            await router.push(router.asPath);
            resetStates();
        }catch (e){
            console.log(e);
        }
    };


    return (
        <>
            {!visible ? (<button onClick={handleVisibility}>Create Word</button>)
                :
                (<form onSubmit = {handleOnSubmit}>
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
                </form>)
            }
        </>
    );
};

export default WordForm;