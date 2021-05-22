import React from 'react'

const Notification = ({message}) => {
    console.log("message", message)
    if (message === null || message.type === null) {
        return null
    }
    if (message.type === "caution") {
        return (
            <div className="caution">
                {message.messageText}
            </div>
        )
    } else {
        return (
            <div className="success">
                {message.messageText}
            </div>
        )
    }
}

export default Notification