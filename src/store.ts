import { configureStore } from "@reduxjs/toolkit"
import { lifeSlice } from "./lifeSlice"

export const store = configureStore({
    reducer: {
        life: lifeSlice.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
