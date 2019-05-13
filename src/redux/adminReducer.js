const initialState = {
    adminOrder_id: null,
    cart: [],
    authenticated: false,
    admin: false
}
const UPDATE_CART = 'UPDATE_CART'
const ADMINORDER_ID = 'ADMINORDER_ID'
const UPDATE_ADMIN = 'UPDATE_ADMIN'

export function adminOrder_id(user_id) {
    return {type: ADMINORDER_ID,
            payload:user_id}
}
export function updateAdmin(admin) {
    return {
        type:UPDATE_ADMIN,
        payload: admin
    }
}
export function updateCart(cart) {
    return {
        type: UPDATE_CART,
        payload: cart
    }
}
export default function reducer(state = initialState,action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_CART:
        return {...state,updateCart:payload}
        case ADMINORDER_ID:
        return {...state, adminOrder_id:payload}
        default:
        return state
        
    }
}