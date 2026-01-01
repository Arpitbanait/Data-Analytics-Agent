export default function BenefitsHighSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-50 via-yellow-50 to-amber-100 flex flex-col overflow-hidden">
      <div className="flex flex-col h-full px-12 py-10">
        <div className="mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
            {slide.title || "Benefits & Strategic Advantages"}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
          {[
            { icon: "💰", title: "Benefit 1", content: slide.benefit1 },
            { icon: "⭐", title: "Benefit 2", content: slide.benefit2 },
            { icon: "🚀", title: "Benefit 3", content: slide.benefit3 }
          ].map((benefit, idx) => (
            <div key={idx} className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 shadow-lg border border-yellow-200 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-3">{benefit.icon}</div>
              <p className="text-gray-800 text-xs leading-relaxed line-clamp-5 overflow-hidden font-medium">
                {benefit.content || "Benefit content"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
