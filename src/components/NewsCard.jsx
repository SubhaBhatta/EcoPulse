export default function NewsCard({ item }) {
  return (
    <article className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-500">{item.tag}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{item.source}</span>
      </div>
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.summary}</p>
    </article>
  )
}
