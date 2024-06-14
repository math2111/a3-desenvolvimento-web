import axios from "axios"
import { useEffect, useState } from "react"

export function Home() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await axios.get('http://localhost:3001/news')
      console.log({ data });
      setNews(data)
    }
    fetchNews()
  }, [])

  return (
    <div className="news-container">
      {news.map((news) => (  
        <div key={news.id} className='news'>
          <span>Novo abrigo cadastrado</span>
          <p>
            Um novo abrigo foi cadastrado: {news.shelterName} <br />
            endereço: {news.shelterAddress}
          </p>
          <span>contato: {news.shelterContact}</span>
          <span>data: {new Date(news.date).toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}