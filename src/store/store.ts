import { configureStore } from '@reduxjs/toolkit'
import { githubApi } from '../api/api'
import { searchSlice } from './searchSlice'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    searchText: searchSlice.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()