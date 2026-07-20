const StatsCard = ({ title, value, icon: Icon, valueClassName = '' }) => {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 shadow-lg border border-white/10 flex flex-col">
      <div className="flex items-center gap-2">
        <Icon className="text-xl text-amber-300" />
        <h3 className="text-sm text-sky-100">{title}:</h3>
      </div>

      <p className={`mt-2 font-bold text-white ${valueClassName}`}>{value}</p>
    </div>
  )
}

export default StatsCard
