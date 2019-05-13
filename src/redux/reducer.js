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
const UPDATE_AUTHENTICATED = 'UPDATE_AUTHENTICATED'
const LOGOUT = 'LOGOUT'


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
export function updateAuthenticated(authenticated) {
    return {
        type: UPDATE_AUTHENTICATED,
        payload: authenticated
    }
}

export function logout() {
    return {type:LOGOUT}
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
        case UPDATE_AUTHENTICATED:
        return {...state,authenticated: payload}
        case LOGOUT:
        return {user_id: null,
            username: '',
            first_name: '',
            authenticated: false,
            admin: false}
        default:
        return state
        
    }
}