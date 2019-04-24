import axios from 'axios'

export const getArticles = async (topic) => {
    const {data} = await axios.get("https://nc-news-mdog.herokuapp.com/api/articles")
    return topic ? data.articles.filter(article => article.topic === topic) : data.articles

}
export const getTopics = async () => {
    const {data} = await axios.get("https://nc-news-mdog.herokuapp.com/api/topics")
    return data.topics

}