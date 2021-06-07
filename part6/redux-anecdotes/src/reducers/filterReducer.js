const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_Filter':
            return action.data.filter
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SET_Filter',
        data: { filter }
    }
}

export default filterReducer