import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface LifeState {
    value: number[][]
}

const initialState: LifeState = {
    value: Array.from({ length: 10 }, () => {
        return Array.from({ length: 10 }, () => 0)
    })
}

interface Coord {
    x: number
    y: number
}

export interface CellDiff {
    x: number
    y: number
    state: number
}

export const lifeSlice = createSlice({
    name: "life",
    initialState,
    reducers: {
        reset: (state, action: PayloadAction<number>) => {
            state.value = Array.from({ length: action.payload }, () => {
                return Array.from({ length: action.payload }, () => 0)
            })
        },
        alive: (state, action: PayloadAction<Coord>) => {
            state.value[action.payload.y][action.payload.x] = 1
        },
        dead: (state, action: PayloadAction<Coord>) => {
            state.value[action.payload.y][action.payload.x] = 0
        },
        step: (state, action: PayloadAction<CellDiff[]>) => {
            action.payload.forEach((change) => {
                state.value[change.y][change.x] = change.state
            })
        }
    }
})

export const { reset, alive, dead, step } = lifeSlice.actions

export default lifeSlice.reducer
