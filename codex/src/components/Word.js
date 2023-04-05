
export const Word = ({wordObj}) => {
    return (
        <>
            <table>
                <thead>
                <tr><th>{wordObj.word}</th></tr>
                </thead>
                <tbody>
                {wordObj.definitions?.map( definitionObj =>
                    <tr key={definitionObj.definition}><th>{definitionObj.definition}</th></tr> //TODO: fix key..
                )}
                </tbody>
            </table>
        </>
    )
}