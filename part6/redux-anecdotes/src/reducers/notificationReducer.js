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

export const setNotificationS = (message, time) => {
    return async dispatch => {
        await dispatch({
            type: 'SET',
            data: { message }
        })
        await setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export const clearNotification = () => {
    return {
        type: "REMOVE"
    }
}

export default notificationReducer