export default function ProblemSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-10 py-8 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2 leading-snug">
            {slide.title || "Problem Statement"}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
        </div>
        
        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-6 shadow-lg flex-shrink-0">
          <h3 className="text-lg font-black text-white mb-2">The Challenge</h3>
          <p className="text-sm text-red-50 leading-relaxed font-medium">
            {slide.problem || "Problem description"}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
          {[ 
            { icon: "⚠️", content: slide.challenge1 },
            { icon: "⚠️", content: slide.challenge2 }
          ].map((challenge, idx) => (
            <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 shadow-lg border border-red-200 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              <div className="text-2xl mb-2">{challenge.icon}</div>
              <div className="text-gray-800 text-sm leading-relaxed font-medium overflow-y-auto pr-1" style={{maxHeight: '6rem'}}>
                {challenge.content || "Challenge"}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-6 shadow-lg flex-shrink-0">
          <h4 className="font-black text-amber-950 text-sm mb-2">Why It Matters</h4>
          <p className="text-amber-900 text-base leading-relaxed font-medium">
            {slide.why_matters || "Why this matters"}
          </p>
        </div>
      </div>
    </section>
  );
}
