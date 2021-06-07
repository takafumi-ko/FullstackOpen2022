const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET':
            return action.data.message
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: 'SET',
        data: { message }
    }
}

export const removeNotification = () => {
    return {
        type: "REMOVE"
    }
}

export default notificationReducer