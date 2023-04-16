import { useState } from 'react';
import codexService from '../services/codex'
import {useRouter} from 'next/router';
import {isRequired, isAlphaNumeric, combineValidators, composeValidators} from 'revalidate';
import {ErrorMessage} from "@/components/ErrorMessage";

const CodexForm = () => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [codexSettings, setCodexSettings] = useState({
        name: '',
        privacy: 'private'
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleVisibility = (event) => {
        event.preventDefault();
        setVisible(!visible);
        setCodexSettings({
            name: '',
            privacy: 'private'
        });
        setErrorMessage(null);
    };
    const handleChange = (event) => {
        setCodexSettings({
            ...codexSettings,
            [event.target.name]: event.target.value
        });
    };

    const formValidator = composeValidators(
        isRequired,
        isAlphaNumeric
    )('Codex name');

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const validation = formValidator(codexSettings.name);
            if (validation){
                setErrorMessage(validation);
                return;
            }
            await codexService.createNewCodex(codexSettings);
            router.reload();
        }catch (e){
            console.log(e);
        }
    }

    const togglePrivacy = (newPrivacy) => {
        setCodexSettings({
            ...codexSettings,
            privacy: newPrivacy
        });
    }

    return (
        <>
            {!visible ? (<button onClick={handleVisibility}>Create Codex</button>)
                :
                (<form onSubmit = {handleOnSubmit}>
                    <label>
                        Codex Name: <input type={"text"} value={codexSettings.name} name={"name"} onChange={handleChange}/>
                    </label>
                    <br/>

                    <div className={'flexbox'}>
                        <div
                            className={(codexSettings.privacy === 'private' ? 'blackSelect' : 'whiteSelect')}
                            onClick={() => togglePrivacy('private')}
                        >
                            Private
                        </div>
                        <div
                            className={(codexSettings.privacy === 'public' ? 'blackSelect' : 'whiteSelect')}
                            onClick={() => togglePrivacy('public')}
                        >
                            Public
                        </div>
                    </div>
                    {errorMessage && <ErrorMessage message={errorMessage}/>}
                    <button onClick={handleVisibility}>Cancel</button>
                    <button type="submit">Create</button>
                </form>)
            }
        </>
    );
};

export default CodexForm;