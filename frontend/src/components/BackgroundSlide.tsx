export default function BackgroundSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-10 py-8 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2 leading-snug">
            {slide.title || "Background & Context"}
          </h2>
          <div className="h-1 w-28 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full"></div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-xl p-5 shadow-lg flex-shrink-0">
          <p className="text-base text-white leading-relaxed line-clamp-3 font-medium">
            {slide.description || "Description"}
          </p>
        </div>
        
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {[
            { label: "2010s: Foundation", content: slide.milestone1 },
            { label: "2018-2020: Growth", content: slide.milestone2 },
            { label: "Present Day", content: slide.current_state }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-black text-sm">
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 shadow-lg border border-blue-200 overflow-hidden">
                <h4 className="font-black text-blue-700 text-sm mb-2">{item.label}</h4>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 font-medium">
                  {item.content || "Content"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
