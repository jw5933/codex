import { useState } from 'react';
import codexService from '../services/codex'
import {useRouter} from "next/router";
import codex from "../services/codex";
import {createValidator, isRequired, combineValidators, composeValidators} from 'revalidate';
import {ErrorMessages} from "@/components/ErrorMessage";

//form validation documentation: http://revalidate.jeremyfairbank.com
const alreadyExists = (arrName, customMessage) => createValidator(
    message => ({arr, value}) => {
        if (arr.filter(v => v === value).length > 0){
            return message;
        }
    },
    field => {
        return `${field} already exists in ${arrName}.${customMessage??''}`
    }
)

const WordForm = ({slug, codex, setCodex}) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [newWord, setNewWord] = useState('');
    const [newDefinitions, setNewDefinitions] = useState([]);
    const [newDefinition, setNewDefinition] = useState(null);
    const [errorMessages, setErrorMessages] = useState(null);

    const formValidator = combineValidators ({
        word: isRequired('word'),
        arr: alreadyExists(`Codex, ${codex.name}`, ' Please edit the definition instead.')('word'),
        definition: isRequired('definition')
    })

    const handleVisibility = (event) => {
        event.preventDefault();
        setVisible(!visible);
        resetStates();
    };

    const resetStates = () => {
        setNewWord('');
        setNewDefinition('');
        setNewDefinitions(null);
        setErrorMessages(null);
    };

    const addNewDefinition = () => {
        if (newDefinition !== '') setNewDefinitions(newDefinitions??[].concat(newDefinition));
        setNewDefinition('');
    };

    const handleChange = (event) => {
        if (event.target.name === 'word') setNewWord(event.target.value);
        //TODO: definitions should be objects, with definition and groups
        if (event.target.name === 'definition') setNewDefinition(event.target.value);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const invalid = formValidator({
                word: newWord,
                arr: {
                    arr: codex.words.map(obj => obj.word),
                    value: newWord
                },
                definition: newDefinitions
            });
            console.log('invalid', invalid)
            console.log('word', newWord);

            if (Object.keys(invalid).length) {
                setErrorMessages(invalid);
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
                (<form onSubmit = {handleOnSubmit}>
                    <label>
                        Word: <input type={"text"} value={newWord} name={"word"} onChange={handleChange}/>
                    </label>
                    <br/>
                    Definitions:
                    {newDefinition==[] ? <p>None yet. Add below: </p> : (<ul>
                        {newDefinitions?.map((def, i) => (
                            <li key={i}>{def}</li>
                        ))}
                    </ul>)}
                    <input type={"text"} value={newDefinition} name = {"definition"} onChange={handleChange}/>
                    <button type={"button"} onClick={addNewDefinition}>Add definition</button>
                    {errorMessages && <ErrorMessages messages={Object.values(errorMessages)}/>}
                    <br/>
                    <button type={"button"} onClick={handleVisibility}>Cancel</button>
                    <button type="submit">Add word</button>
                </form>)
            }
        </>
    );
};

export default WordForm;