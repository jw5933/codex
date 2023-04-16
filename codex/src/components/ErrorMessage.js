export const ErrorMessage = ({message}) => {
    return (
        <div className={'error-message'}>
            {message}
        </div>
    )
}

export const ErrorMessages = ({messages}) => {
    console.log('messsages', messages)
    return (
        <>
            {messages.map((m, i)=> (
                <div className={'error-message'} key ={i}>
                {m}
                </div>
            ))}
        </>
    )
}