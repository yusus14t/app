const initialState = {}

export const SET_SESSION = (state = {}, action) => {
    console.log('============>>>>', action, state)
    return { ...state, action}
}

export const LOG_OUT = (state = {}, action) => {
    return initialState;
}