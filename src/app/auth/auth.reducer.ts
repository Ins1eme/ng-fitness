import { AuthActions, SET_AUTHENTIFICATED, SET_UNAUTHENTIFICATED } from "./auth.action";

export interface State {
    isAuthentificated: boolean
}

const initialState: State = {
    isAuthentificated: false
}

export function authReducer(state = initialState, action: AuthActions) {
    switch(action.type) {
        case SET_AUTHENTIFICATED:
            return {
                isAuthentificated: true
            }
        case SET_UNAUTHENTIFICATED:
            return {
                isAuthentificated: false
            }
        default: {
            return state
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthentificated