import {useState} from "react";
import {ErrorMessages} from "@/components/ErrorMessage";
export const EditWordForm = ({wordObj}) => {
    console.log(wordObj)
    const [newWord, setNewWord] = useState(wordObj.word??'');
    const [newDefinitions, setNewDefinitions] = useState(wordObj.definitions??[]);
    const [newDefinition, setNewDefinition] = useState('');
    const [errorMessages, setErrorMessages] = useState(null);

    console.log(newWord, newDefinitions)
    const handleChange = (event) => {
        event.preventDefault();
        if (event.target.name === 'word') setNewWord(event.target.value);
        //TODO: definitions should be objects, with definition and groups
        if (event.target.name === 'definition') setNewDefinition(event.target.value);
    };

    const resetStates = () => {
        setNewWord('');
        setNewDefinition('');
        setNewDefinitions(wordObj.definitions??[]);
        setErrorMessages(null);
    };

    const addNewDefinition = () => {
        if (newDefinition !== '') {
            setNewDefinitions(newDefinitions.concat({definition: newDefinition}));
        }
        setNewDefinition('');
    };

    const deleteDefinition = (index) => {
        console.log("deleting definition", index)
        setNewDefinitions(newDefinitions.filter((d, i) => i != index));
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

    }

    return(
        <form onSubmit = {handleOnSubmit}>
            <label>
                Word: <input type={"text"} value={newWord} name={"word"} onChange={handleChange}/>
            </label>
            <br/>
            Definitions:
            {newDefinitions.length === 0 ? <p>None yet. Add below: </p> : (<ul>
                {newDefinitions?.map((def, i) => (
                    <li key={i}>
                        {def.definition}
                        <button type={'button'} onClick={() => deleteDefinition(i)}>Delete</button>
                    </li>
                ))}
            </ul>)}
            <input type={"text"} value={newDefinition} name = {"definition"} onChange={handleChange}/>
            <button type={"button"} onClick={addNewDefinition}>Add definition</button>
            {errorMessages && <ErrorMessages messages={Object.values(errorMessages)}/>}
            <br/>
            <button type="submit">Save word</button>
        </form>
    )
}