import { Action } from '@ngrx/store' 

export const SET_AUTHENTIFICATED = '[Auth] Set Authentificated'
export const SET_UNAUTHENTIFICATED = '[Auth] Set Unauthentificated'

export class SetAuthentificated implements Action {
    readonly type = SET_AUTHENTIFICATED
}

export class SetUnauthentificated implements Action {
    readonly type = SET_UNAUTHENTIFICATED
}

export type AuthActions = SetAuthentificated | SetUnauthentificated