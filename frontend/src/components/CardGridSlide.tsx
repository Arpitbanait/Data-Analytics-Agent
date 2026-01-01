export default function CardGridSlide({ slide }: any) {
  return (
    <section className="slide bg-slate-800">
      <div className="h-full flex flex-col">
        <h2 className="text-4xl font-bold text-white mb-10 pb-4 border-b-2 border-indigo-500">
          {slide.title}
        </h2>
        
        <div className="grid grid-cols-3 gap-6 flex-1">
          {slide.cards && slide.cards.map((card: any, idx: number) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 border-2 border-indigo-500/30 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-300 mb-3">
                {card.heading}
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
