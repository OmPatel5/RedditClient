import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';


export const loadSubreddits = createAsyncThunk(
    "subreddits/getAllSubreddits",
    async () => {

        let subreddits = [];

        await Axios.get("https://www.reddit.com/subreddits.json").then((response) => {
            // response.data.data.children
            Object.keys(response.data.data.children).forEach((subreddit) => {
                // console.log(response.data.data.children[subreddit].data)
                subreddits.push({
                    title: response.data.data.children[subreddit].data.title,
                    icon: response.data.data.children[subreddit].data.icon_img ? response.data.data.children[subreddit].data.icon_img : "https://upload.wikimedia.org/wikipedia/en/7/70/AlienBlue_Icon.png",
                    display_name_prefix: response.data.data.children[subreddit].data.display_name_prefixed
                })
            })
        })

        return subreddits;
    }
    
)

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoading: false
    },
    reducers: {
        
    },
    extraReducers: {
        [loadSubreddits.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.subreddits = action.payload;
        }
    }
})

export const selectSubreddits = (state) => state.subreddits.subreddits;

export default subredditsSlice.reducer;