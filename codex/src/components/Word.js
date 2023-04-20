import {useState} from "react";
import {EditWordForm} from "@/components/EditWordForm";
import codexService from "../services/codex";
export const Word = ({slug, wordObject, setCodex}) => {
    const [editWord, setEditWord] = useState(false);
    const [wordObj, setWordObj] = useState(wordObject);

    const handleDeleteWord = async () => {
        try {
            const updatedCodex = await codexService.deleteWord(slug, wordObject._id);
            setCodex(updatedCodex);
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {(editWord ?
                (<div>
                    <EditWordForm slug={slug} wordObj={wordObj} setWordObj={setWordObj} setEditWord={setEditWord}/>
                    <button onClick={() => setEditWord(false)}>Cancel</button>
                </div>)

                : (<div className={'word-container'}>
                    <div className={'word-row'}>
                        {wordObj.word}
                        <div className={`flexbox`}>
                        <button onClick={() => setEditWord(true)}>Edit</button>
                        <button onClick={() => handleDeleteWord()}>Delete</button>
                        </div>
                    </div>
                    <div className={'definitions-container'}>
                    {wordObj.definitions?.map( (definitionObj, index) =>
                        <div key={index} className={'indent definition-row'}>{definitionObj.definition}</div>
                    )}
                    </div>
                </div>)
            )}
        </>
    )
}