export default function ApplicationsSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-12 py-10">
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-700 to-blue-600 bg-clip-text text-transparent mb-2 leading-tight">
            {slide.title || "Applications & Use Cases"}
          </h2>
          <div className="h-1 w-28 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {[
            { icon: "🏥", content: slide.use_case1 },
            { icon: "💰", content: slide.use_case2 },
            { icon: "🛍️", content: slide.use_case3 },
            { icon: "🏭", content: slide.use_case4 }
          ].map((useCase, idx) => (
            <div key={idx} className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-5 shadow-lg border border-cyan-200 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-2">{useCase.icon}</div>
              <p className="text-gray-800 text-sm leading-relaxed line-clamp-6 overflow-hidden font-medium">
                {useCase.content || "Use case"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
