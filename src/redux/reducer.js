const initialState = {
    user_id: null,
    username: '',
    first_name: '',
    last_name:'',
    email: '',
    phone: '',
    authenticated: false
}

const UPDATE_USER_ID = 'UPDATE_USER_ID'
const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'
const UPDATE_DETAILS = 'UPDATE_DETAILS'

export function updateUserId(id) {
    return {
        type:UPDATE_USER_ID,
        payload: id
    }
}