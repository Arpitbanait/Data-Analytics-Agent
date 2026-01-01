export default function ComparisonSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center p-16">
      <h2 className="text-5xl font-bold text-white mb-12 text-center">
        {slide.title || "Comparison"}
      </h2>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Left */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/40 rounded-2xl p-10">
          <h3 className="text-3xl font-bold text-blue-300 mb-6">
            {slide.label_left || "Option A"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg whitespace-pre-wrap">
            {slide.content_left || "Content for option A"}
          </p>
        </div>
        
        {/* Right */}
        <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/40 rounded-2xl p-10">
          <h3 className="text-3xl font-bold text-orange-300 mb-6">
            {slide.label_right || "Option B"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg whitespace-pre-wrap">
            {slide.content_right || "Content for option B"}
          </p>
        </div>
      </div>
      
      {slide.insight && (
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/40 rounded-xl p-8 text-center">
          <p className="text-xl text-purple-200 font-semibold">
            💡 {slide.insight}
          </p>
        </div>
      )}
    </section>
  );
}
