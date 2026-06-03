import { useState, useEffect } from 'react'
import NewsCard from '../components/NewsCard.jsx'
import { newsItems as dummyNews } from '../data/kathmanduData'
import { fetchNews } from '../services/api'

export default function News() {
  const [news, setNews] = useState(dummyNews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getNews = async () => {
      try {
        const liveNews = await fetchNews()
        if (liveNews && liveNews.length > 0) {
          // newsdata.io fields: title, description, source_name, category[]
          const mappedNews = liveNews
            .filter(article => article.title && article.title !== '[Removed]')
            .slice(0, 9)
            .map(article => ({
              title: article.title,
              summary: article.description || article.content || 'No summary available.',
              source: article.source_name || article.source_id || 'News',
              tag: (article.category && article.category[0]) || 'Environment'
            }))
          if (mappedNews.length > 0) setNews(mappedNews)
        }
      } catch (err) {
        console.error("Failed to load news API, using offline fallback", err)
      } finally {
        setLoading(false)
      }
    }
    
    getNews()
  }, [])

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="metric-label">Environmental News Feed</p>
        <h1 className="text-4xl font-black">
          Kathmandu Climate Updates {loading && <span className="text-sm font-normal text-slate-400 ml-4 animate-pulse">Checking live sources...</span>}
        </h1>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {news.map((item, idx) => <NewsCard key={idx} item={item} />)}
      </div>
    </div>
  )
}
