import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface GitHubState {
    favorites: string[]
}

const LS_FAV_KEY = 'rfk'

const initialState: GitHubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavorites: (state,action: PayloadAction<string>) => {
            state.favorites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
        },
        removeFavorites: (state,action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(f => f !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
        } 
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer