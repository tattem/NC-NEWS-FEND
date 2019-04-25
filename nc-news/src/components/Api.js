import axios from 'axios'

export const getArticles = async (topic) => {
    const {data} = await axios.get("https://nc-news-mdog.herokuapp.com/api/articles")
    return topic ? data.articles.filter(article => article.topic === topic) : data.articles
    // topic as a query rather than a filter
}
export const getTopics = async () => {
    const {data} = await axios.get("https://nc-news-mdog.herokuapp.com/api/topics")
    return data.topics
}
export const getArticle = async (article_id) => {
    const {data} = await axios.get(`https://nc-news-mdog.herokuapp.com/api/articles/${article_id}`)
    return data.article
}
export const getArticleComments = async (article_id) => {
    const {data} = await axios.get(`https://nc-news-mdog.herokuapp.com/api/articles/${article_id}/comments`)
    return data.comments
}

export const getUser = async (username) => {
    const {data} = await axios.get(`https://nc-news-mdog.herokuapp.com/api/users/${username}`)
    return data.user
}

export const updateVotes = async (inc, id, comp) => {
    const {data} = await axios.patch(`https://nc-news-mdog.herokuapp.com/api/${comp}s/${id}`, {inc_votes: inc})
    return data[comp]
}
export const postComment = async (user, input, id) => {
    await axios.post(`https://nc-news-mdog.herokuapp.com/api/articles/${id}/comments`, {username: user, body: input})
}