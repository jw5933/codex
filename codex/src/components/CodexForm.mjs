import { useState } from 'react';
import codexService from '../services/codex.mjs'
import {useRouter} from "next/router";

const CodexForm = () => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [codexSettings, setCodexSettings] = useState({
        name: '',
        privacy: 'private'
    });

    const handleVisibility = (event) => {
        event.preventDefault();
        setVisible(!visible);
        setCodexSettings({
            name: '',
            privacy: 'private'
        });
    };
    const handleChange = (event) => {
        setCodexSettings({
            ...codexSettings,
            [event.target.name]: event.target.value
        });
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
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

                    <div style={{ display: 'flex' }}>
                        <div
                            style={{ backgroundColor: codexSettings.privacy === 'private' ? 'black' : 'white', color: codexSettings.privacy === 'private' ? 'white' : 'black', textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => togglePrivacy('private')}
                        >
                            Private
                        </div>
                        <div
                            style={{ backgroundColor: codexSettings.privacy === 'public' ? 'black' : 'white', color: codexSettings.privacy === 'public' ? 'white' : 'black', textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => togglePrivacy('public')}
                        >
                            Public
                        </div>
                    </div>

                    <br/>
                    <button onClick={handleVisibility}>Cancel</button>
                    <button type="submit">Create</button>
                </form>)
            }
        </>
    );
};

export default CodexForm;