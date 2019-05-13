const initialState = {
    adminOrder_id: null,
    user: false,
    cart: [],
   
}
const UPDATE_CART = 'UPDATE_CART'
const ADMINORDER_ID = 'ADMINORDER_ID'
const UPDATE_USER = 'UPDATE_USER'
const CANCEL_ORDER = 'CANCEL_ORDER'


export function adminOrder_id(user_id) {
    return {type: ADMINORDER_ID,
            payload:user_id}
}

export function updateCart(cart) {
    return {
        type: UPDATE_CART,
        payload: cart
    }
}
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function cancelOrder() {
    return {type:CANCEL_ORDER}
}

export default function reducer(state = initialState,action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_CART:
        return {...state,updateCart:payload}
        case ADMINORDER_ID:
        return {...state, adminOrder_id:payload}
        case UPDATE_USER:
        return {...state,user:payload}
        case CANCEL_ORDER:
        return {adminOrder_id: null,
            user: false,
            cart: [],}
        default:
        return state
        
    }
}