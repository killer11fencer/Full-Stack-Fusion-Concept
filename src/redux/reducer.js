const initialState = {
    user_id: null,
    username: '',
    first_name: '',
    authenticated: false,
    admin: false
}

const UPDATE_USER_ID = 'UPDATE_USER_ID'
const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_ADMIN = 'UPDATE_ADMIN'


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
export function updateAdmin(admin) {
    return {
        type:UPDATE_ADMIN,
        payload: admin
    }
}

export default function reducer(state = initialState,action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_USERNAME:
        return {...state, username:payload}
        case UPDATE_USER_ID:
        return {...state,user_id:payload}
        case UPDATE_ADMIN:
        return {...state,admin:payload}
        default:
        return state
        
    }
}