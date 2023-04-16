export const ErrorMessage = ({message}) => {
    return (
        <div className={'error_message'}>
            {message}
        </div>
    )
}

export const ErrorMessages = ({messages}) => {
    console.log('messsages', messages)
    return (
        <>
            {messages.map((m, i)=> (
                <div className={'error_message'} key ={i}>
                {m}
                </div>
            ))}
        </>
    )
}