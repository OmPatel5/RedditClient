import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import moment from 'moment';


export const loadPosts = createAsyncThunk(
    "posts/getAllPosts",
    async () => {
        let posts = [];

        let commentsUrl = [];

        await Axios.get("https://www.reddit.com/r/popular.json").then((response) => {
            
            const allPosts = Object.keys(response.data.data.children).map((post) => {
                const time = response.data.data.children[post].data.created_utc;
                const date =moment.unix(time).fromNow();

                const url = "https://www.reddit.com" + response.data.data.children[post].data.permalink + '.json'


                posts.push({
                    title: response.data.data.children[post].data.title,
                    upvotes: response.data.data.children[post].data.score,
                    postedBy: response.data.data.children[post].data.author,
                    numComments: response.data.data.children[post].data.num_comments,
                    date: date,
                    commentsUrl: url,
                    media: response.data.data.children[post].data.url && response.data.data.children[post].data.url,
                })
            })
        })
        
        return posts;
    }
)

export const loadPostBySubreddit = createAsyncThunk(
    "posts/getPostBySubreddit",
    async (subreddit) => {
        const posts = [];
        await Axios.get(`https://www.reddit.com/${subreddit}.json`).then((response) => {
            Object.keys(response.data.data.children).map((post) => {
                const time = response.data.data.children[post].data.created_utc;
                const date =moment.unix(time).fromNow();

                const url = "https://www.reddit.com" + response.data.data.children[post].data.permalink + '.json'


                posts.push({
                    title: response.data.data.children[post].data.title,
                    upvotes: response.data.data.children[post].data.score,
                    postedBy: response.data.data.children[post].data.author,
                    numComments: response.data.data.children[post].data.num_comments,
                    date: date,
                    commentsUrl: url,
                    media: response.data.data.children[post].data.url && response.data.data.children[post].data.url,
                })
            })
        })
        return posts;        
    }
) 



export const loadCommentsForPost = async (commentUrl) => {
    let comments = [];

    await Axios.get(commentUrl).then((response) => {
        Object.keys(response.data[1].data.children).map((comment) => {

            const commentObj = {
                comment: response.data[1].data.children[comment].data.body,
                posted: response.data[1].data.children[comment].data.created_utc,
                username: response.data[1].data.children[comment].data.author
            }

            comments.push(commentObj);
        })
    })
    // console.log(comments)
    return comments;
}

export const loadProfilePics = async (comment) => {
    const profilePic = await getProfilePicForUser(comment);
        return profilePic;
}
    

const getProfilePicForUser = async (comment) => {
    let pfp = ''
    try {
    await Axios.get(`https://www.reddit.com/user/${comment.username}/about.json`).then((response) => {
        pfp = response.data.data.snoovatar_img;
    }) } catch(err) {
        console.log(err)
    }
    
    return pfp;
}




export const getPostBySearch = createAsyncThunk(
    "posts/getPostBySearch", 
    async (searchTerm) => {
        let searchTermPosts = [];
        await Axios.get(`https://www.reddit.com/search.json?q=${searchTerm}`).then((response) => {
            Object.keys(response.data.data.children).map((post) => {
                const time = response.data.data.children[post].data.created_utc;
                const date =moment.unix(time).fromNow();

                const url = "https://www.reddit.com" + response.data.data.children[post].data.permalink + '.json'


                searchTermPosts.push({
                    title: response.data.data.children[post].data.title,
                    upvotes: response.data.data.children[post].data.score,
                    postedBy: response.data.data.children[post].data.author,
                    numComments: response.data.data.children[post].data.num_comments,
                    date: date,
                    commentsUrl: url,
                    media: response.data.data.children[post].data.url && response.data.data.children[post].data.url,
                })
            })
        })
        return searchTermPosts;
    }
)








export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false
    },
    reducers: {
        
    },
    extraReducers: {
        [loadPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
        }, 
        [loadPostBySubreddit.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        }, 
        [loadPostBySubreddit.pending]: (state, action) => {
            state.isLoading = true;
        }, 

        [getPostBySearch.fulfilled]: (state, action) => {
            state.posts = action.payload;
        }, 
    }
})

export const selectPosts = (state) => state.posts.posts;

export const selectIsLoading = (state) => state.posts.isLoading;

export default postsSlice.reducer;