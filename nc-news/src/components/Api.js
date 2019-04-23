import axios from 'axios'

export const getArticles = async (topic) => {
    console.log(topic, '<< topics')
    const {data} = await axios.get("https://nc-news-mdog.herokuapp.com/api/articles")
    return topic ? data.articles.filter(article => article.topic === topic) : data.articles

}