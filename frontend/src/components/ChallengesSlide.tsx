export default function ChallengesSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-10 py-8 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2 leading-snug">
            {slide.title || "Challenges & Limitations"}
          </h2>
          <div className="h-1 w-28 bg-gradient-to-r from-amber-600 to-rose-600 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {[
            { icon: "📋", content: slide.limitation1 },
            { icon: "🔧", content: slide.limitation2 }
          ].map((challenge, idx) => (
            <div key={idx} className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-5 shadow-lg border border-amber-200 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-2">{challenge.icon}</div>
              <p className="text-gray-800 text-sm leading-relaxed line-clamp-5 font-medium">
                {challenge.content || "Challenge"}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 flex-shrink-0">
          <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-5 shadow-lg">
            <h4 className="font-black text-white mb-2 text-sm flex items-center gap-2">
              <span className="text-lg">⚠️</span> Key Risks
            </h4>
            <p className="text-amber-50 text-sm leading-relaxed line-clamp-4 font-medium">
              {slide.risk || "Risk description"}
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-5 shadow-lg">
            <h4 className="font-black text-white mb-2 text-sm flex items-center gap-2">
              <span className="text-lg">🔄</span> Future
            </h4>
            <p className="text-emerald-50 text-sm leading-relaxed line-clamp-4 font-medium">
              {slide.improvement || "Improvement direction"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
