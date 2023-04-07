
export const Word = ({wordObj}) => {
    return (
        <>
            <table>
                <thead>
                <tr><th>{wordObj.word}</th></tr>
                </thead>
                <tbody>
                {wordObj.definitions?.map( (definitionObj, index) =>
                    <tr key={index}><th>{definitionObj.definition}</th></tr>
                )}
                </tbody>
            </table>
        </>
    )
}