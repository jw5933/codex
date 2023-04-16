import {useState} from "react";
import {EditWordForm} from "@/components/EditWordForm";
export const Word = ({wordObj}) => {
    const [editWord, setEditWord] = useState(false);

    return (
        <>
            {(editWord ?
                (<div>
                    <EditWordForm wordObj={wordObj}/>
                    <button onClick={() => setEditWord(false)}>Cancel</button>
                </div>)

                : (<table>
                    <thead>
                        <tr>
                            <td className={'word_row'}>
                                {wordObj.word}
                                <button onClick={() => setEditWord(true)}>Edit</button>
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