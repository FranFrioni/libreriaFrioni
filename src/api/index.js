import axios from 'axios';

const getBooksCategoriesRequest = (categoryName) => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?category=${categoryName}`);
}
const getBooksTitleRequest = (title) => {
    let newTitle = title.split(" ");
    if (newTitle.length > 1){
        title = '"' + title + '"'; 
    }
    return axios.get(`https://www.etnassoft.com/api/v1/get/?book_title=${title}`);
}
const getBooksAuthorRequest = (author) => {
    let newAuthor = author.split(" ");
    if (newAuthor.length > 1){
        author = '"' + author + '"'; 
    }
    return axios.get(`https://www.etnassoft.com/api/v1/get/?book_author=${author}`);
}
const getBooksPublisherRequest = (publisher) => {
    let newPublisher = publisher.split(" ");
    if (newPublisher.length > 1){
        publisher = '"' + publisher + '"'; 
    }
    return axios.get(`https://www.etnassoft.com/api/v1/get/?publisher=${publisher}`);
}
const getBooksDateRequest = (date) => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?publisher_date=${date}`);
}
const getBooksTagsRequest = (tag) => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?any_tags=[${tag}]`);
}
const getBooksKeyWordRequest = (word) => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?keyword=${word}`);
}
const getBookRequest = (id) => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?id=${id}`);
}
const getBooksLastWeekRequest = () => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?last_week`);
}
const getCategoriesRequest = () => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?get_categories=all`);
}
const getBooksCategoriesIdRequest = (id) => {
    return axios.get(`https://www.etnassoft.com/api/v1/get/?category_id=${id}`);
}
export default {
    getBooksCategories: getBooksCategoriesRequest,
    getBooksTitle: getBooksTitleRequest,
    getBooksAuthor: getBooksAuthorRequest,
    getBooksPublisher: getBooksPublisherRequest,
    getBooksDate: getBooksDateRequest,
    getBooksTags: getBooksTagsRequest,
    getBooksKeyWord: getBooksKeyWordRequest,
    getBook: getBookRequest,
    getBooksLastWeek: getBooksLastWeekRequest,
    getCategories: getCategoriesRequest,
    getBooksCategoriesId: getBooksCategoriesIdRequest
}