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

                : (<table>
                    <thead>
                        <tr>
                            <td className={'word_row'}>
                                {wordObj.word}
                                <div className={`flexbox`}>
                                <button onClick={() => setEditWord(true)}>Edit</button>
                                <button onClick={() => handleDeleteWord()}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {wordObj.definitions?.map( (definitionObj, index) =>
                        <tr key={index}><td className={'indent'}>{definitionObj.definition}</td></tr>
                    )}
                    </tbody>
                </table>)
            )}
        </>
    )
}