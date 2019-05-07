const initialState = {
    user_id: null,
    username: '',
    first_name: '',
    authenticated: false
}

const UPDATE_USER_ID = 'UPDATE_USER_ID'
const UPDATE_USERNAME = 'UPDATE_USERNAME'


export function updateUserId(id) {
    return {
        type:UPDATE_USER_ID,
        payload: id
    }
}
export function updateUsername(username) {
    return {
        type:UPDATE_USERNAME,
        payload: username
    }
}

export default function reducer(state = initialState,action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_USERNAME:
        return {...state, username:payload}
        case UPDATE_USER_ID:
        return {...state,user_id:payload}
        default:
        return state
    }
}