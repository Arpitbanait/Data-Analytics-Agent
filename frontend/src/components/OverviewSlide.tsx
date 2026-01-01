export default function OverviewSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-12 py-10">
        <div className="mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            {slide.title || "Overview"}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl p-6 mb-6 shadow-lg flex-shrink-0">
          <p className="text-base text-white leading-relaxed line-clamp-3 font-medium">
            {slide.definition || "Definition"}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          {[
            { title: "Point 1", content: slide.point1 },
            { title: "Point 2", content: slide.point2 },
            { title: "Point 3", content: slide.point3 }
          ].map((point, idx) => (
            <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 shadow-lg border border-indigo-200 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              <h3 className="text-base font-black text-indigo-700 mb-3">
                {point.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed overflow-hidden line-clamp-4 font-medium">
                {point.content || "Content"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
