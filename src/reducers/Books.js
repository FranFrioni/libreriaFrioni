import api from '../api';

const GET_SEARCHTEXT = "GET_SEARCHTEXT";
const GET_FILTER = "GET_FILTER";
const GET_SEARCHBOOKS = "GET_SEARCHBOOKS";
const GET_BOOK = "GET_BOOK";
const GET_BOOKSWEEK = "GET_BOOKSWEEK";
const GET_FAVORITES = "GET_FAVORITES";
const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORY = "GET_CATEGORY";
const GET_BOOKSCATEGORIES = "GET_BOOKSCATEGORIES";
const CLEAN_BOOK = "CLEAN_BOOK";
const CLEAN_BOOKSCATEGORIES = "CLEAN_BOOKSCATEGORIES";
const GET_DARKMODE = "GET_DARKMODE";
const GET_SELECTEDCATEGORY = "GET_SELECTEDCATEGORY";

export const getSearchText = (text) => (dispatch) => {
    dispatch({
        type: GET_SEARCHTEXT,
        payload: text
    })
}
export const getFilter = (filter) => (dispatch) => {
    dispatch({
        type: GET_FILTER,
        payload: filter
    })
}
export const getSearchBooks = (filter, text) => (dispatch) => {
    if (filter === "title"){
        api.getBooksTitle(text).then((response) => {
            if(text === ""){
                dispatch({
                    type: GET_SEARCHBOOKS,
                    payload: []
                })
            } else
            if (response !== undefined){
                dispatch({
                    type:  GET_SEARCHBOOKS,
                    payload: response.data
                })
            }
        })
    } else if (filter === "author"){
        api.getBooksAuthor(text).then((response) => {
            if(text === ""){
                dispatch({
                    type: GET_SEARCHBOOKS,
                    payload: []
                })
            } else
            if (response !== undefined){
                dispatch({
                    type:  GET_SEARCHBOOKS,
                    payload: response.data
                })
            }
        })
    } else if (filter === "publisher"){
        api.getBooksPublisher(text).then((response) => {
            if(text === ""){
                dispatch({
                    type: GET_SEARCHBOOKS,
                    payload: []
                })
            } else
            if (response !== undefined){
                dispatch({
                    type:  GET_SEARCHBOOKS,
                    payload: response.data
                })
            }
        })
    } else if (filter === "date"){
        api.getBooksDate(text).then((response) => {
            if(text === ""){
                dispatch({
                    type: GET_SEARCHBOOKS,
                    payload: []
                })
            } else
            if (response !== undefined){
                dispatch({
                    type:  GET_SEARCHBOOKS,
                    payload: response.data
                })
            }
        })
    } else if (filter === "tag"){
        api.getBooksTags(text).then((response) => {
            if(text === ""){
                dispatch({
                    type: GET_SEARCHBOOKS,
                    payload: []
                })
            } else
            if (response !== undefined){
                dispatch({
                    type:  GET_SEARCHBOOKS,
                    payload: response.data
                })
            }
        })
    } else if (filter === "keyword"){
        api.getBooksKeyWord(text).then((response) => {
            if(text === ""){
                dispatch({
                    type: GET_SEARCHBOOKS,
                    payload: []
                })
            } else
            if (response !== undefined){
                dispatch({
                    type:  GET_SEARCHBOOKS,
                    payload: response.data
                })
            }
        })
    }
}
export const getBook = (id) => (dispatch) => {
    api.getBook(id).then((response => {
        dispatch({
            type: GET_BOOK,
            payload: response.data
        })
    }))
}
export const getBooksLastWeek = () => (dispatch) => {
    api.getBooksLastWeek().then((response => {
        dispatch({
            type: GET_BOOKSWEEK,
            payload: response.data
        })
    }))
}
export const getFavoritesBooks = (book) => (dispatch) => {
    let favorites = initialState.favoriteBooks;
    let flag = false;
    for (let i = 0; i < favorites.length; i++){
        if (favorites[i].ID === book.ID){
            favorites.splice(i,1);
            localStorage.setItem("favorites", JSON.stringify(favorites))
            flag = true;
        }
    }
    if (!flag){
        favorites.push(book);
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    dispatch({
        type: GET_FAVORITES,
        payload: favorites
    })
}
export const getCategories = () => (dispatch) => {
    api.getCategories().then((response => {
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data
        })
    }))
}
export const getCategory = (text) => (dispatch) => {
    dispatch({
        type: GET_CATEGORY,
        payload: text
    })
}
export const getBooksCategories = (id) => (dispatch) => {
    api.getBooksCategoriesId(id).then((response => {
        dispatch({
            type: GET_BOOKSCATEGORIES,
            payload: response.data
        })
    }))
}
export const cleanBook = () => (dispatch) => {
    dispatch({
        type: CLEAN_BOOK,
        payload: []
    })
}
export const cleanBooksList = () => (dispatch) => {
    dispatch({
        type: CLEAN_BOOKSCATEGORIES,
        payload: []
    })
}
export const getDarkMode = (b) => (dispatch) => {
    localStorage.setItem("darkMode", b)
    dispatch({
        type: GET_DARKMODE,
        payload: b
    })
}
export const getSelectedCategory = (id) => (dispatch) => {
    dispatch({
        type: GET_SELECTEDCATEGORY,
        payload: id
    })
}

const initialState = {
    searchText: "",
    filter: "title",
    searchBooks: [],
    book: [],
    booksLastWeek: [],
    favoriteBooks: JSON.parse(localStorage.getItem("favorites")),
    categories: [],
    category: "",
    booksCategories: [],
    darkMode: localStorage.getItem("darkMode"),
    selectedCategory: ""
};

export default function booksReducer(state = initialState, action){
    switch (action.type){
        case GET_SEARCHTEXT:
            return ({...state, searchText: action.payload})
        case GET_FILTER:
            return ({...state, filter: action.payload})
        case GET_SEARCHBOOKS:
            return ({...state, searchBooks: action.payload})
        case GET_BOOK:
            return ({...state, book: action.payload})
        case GET_BOOKSWEEK:
            return ({...state, booksLastWeek: action.payload})
        case GET_FAVORITES:
            return ({...state, favoriteBooks: action.payload})
        case GET_CATEGORIES:
            return ({...state, categories: action.payload})
        case GET_CATEGORY:
            return ({...state, category: action.payload})
        case GET_BOOKSCATEGORIES:
            return ({...state, booksCategories: action.payload})
        case CLEAN_BOOK:
            return ({...state, book: action.payload})
        case CLEAN_BOOKSCATEGORIES:
            return ({...state, booksCategories: action.payload})
        case GET_DARKMODE:
            return ({...state, darkMode: action.payload})
        case GET_SELECTEDCATEGORY:
            return ({...state, selectedCategory: action.payload})
        default:
            return state;
    }
}