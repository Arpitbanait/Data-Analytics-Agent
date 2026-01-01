export default function ProcessSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-12 py-10">
        <div className="mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            {slide.title || "How It Works"}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
        </div>
        
        <div className="flex items-start gap-4 mb-6 flex-shrink-0">
          {[
            { num: "1", content: slide.step1 },
            { num: "2", content: slide.step2 },
            { num: "3", content: slide.step3 }
          ].map((step) => (
            <div key={step.num} className="flex-1 flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white font-black text-sm">
                  {step.num}
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 shadow-lg border border-green-200 overflow-hidden">
                <p className="text-gray-700 text-xs leading-relaxed line-clamp-4 font-medium">
                  {step.content || "Step content"}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-5 shadow-lg border border-green-500 flex-1 overflow-hidden">
          <p className="text-sm text-white leading-relaxed line-clamp-5 font-medium">
            {slide.explanation || "Explanation"}
          </p>
        </div>
      </div>
    </section>
  );
}
