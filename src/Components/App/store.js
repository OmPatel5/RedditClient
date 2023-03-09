import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from "../SubReddits/SubRedditSlice";
import postsReducer from '../Posts/PostsSlice';
// import commentsReducer from '../Comments/CommentsSlice';

export const store = configureStore({
    reducer: {
        subreddits: subredditReducer,
        posts: postsReducer
    }
})