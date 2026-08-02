import { termsOfService } from '../../../data/legal/termsOfService'

const TermsViewer = () => {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 pb-24 text-white">
      <h1 className="mb-5 text-2xl font-bold">{termsOfService.title}</h1>

      {termsOfService.sections.map((section, index) => (
        <div key={index} className="mb-5">
          <h2 className="font-semibold">{section.title}</h2>

          <p className="mt-2 text-sm text-white/70">{section.text}</p>
        </div>
      ))}
    </div>
  )
}

export default TermsViewer
