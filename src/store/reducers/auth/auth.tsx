import { IUser } from "../../../types/models"
import { AuthAction, AuthActionEnum, AuthState } from "./types"


const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: ''
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return { ...state, isAuth: action.payload }
        case AuthActionEnum.SET_USER:
            return { ...state, user: action.payload }
        case AuthActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        case AuthActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}