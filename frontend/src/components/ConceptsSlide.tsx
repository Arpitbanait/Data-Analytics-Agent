export default function ConceptsSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-12 py-10">
        <div className="mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {slide.title || "Core Concepts"}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
          {[
            { icon: "🔧", content: slide.concept1 },
            { icon: "📊", content: slide.concept2 },
            { icon: "🔗", content: slide.concept3 },
            { icon: "📈", content: slide.concept4 }
          ].map((concept, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 shadow-lg border border-purple-200 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-3">{concept.icon}</div>
              <p className="text-gray-800 text-sm leading-relaxed line-clamp-5 overflow-hidden font-medium">
                {concept.content || "Concept"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
