export default function BenefitsSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center p-16">
      <h2 className="text-5xl font-bold text-white mb-12">
        {slide.title || "Key Benefits"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Benefit 1 */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/40 rounded-xl p-10 hover:shadow-lg hover:shadow-green-500/20 transition">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-green-300 mb-4">
            {slide.benefit1?.title || "Benefit 1"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg">
            {slide.benefit1?.description || "Description of benefit 1"}
          </p>
        </div>
        
        {/* Benefit 2 */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border border-yellow-500/40 rounded-xl p-10 hover:shadow-lg hover:shadow-yellow-500/20 transition">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            {slide.benefit2?.title || "Benefit 2"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg">
            {slide.benefit2?.description || "Description of benefit 2"}
          </p>
        </div>
        
        {/* Benefit 3 */}
        <div className="bg-gradient-to-br from-rose-500/20 to-pink-600/20 border border-rose-500/40 rounded-xl p-10 hover:shadow-lg hover:shadow-rose-500/20 transition">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-rose-300 mb-4">
            {slide.benefit3?.title || "Benefit 3"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg">
            {slide.benefit3?.description || "Description of benefit 3"}
          </p>
        </div>
      </div>
    </section>
  );
}
