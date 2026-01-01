export default function InfoBlockSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center p-16">
      <h2 className="text-5xl font-bold text-white mb-12">
        {slide.title || "Information"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Block 1 */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-8 hover:border-indigo-500/60 transition">
          <h3 className="text-2xl font-bold text-indigo-300 mb-4">
            {slide.heading1 || "Section 1"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg">
            {slide.content1 || "Content for section 1"}
          </p>
        </div>
        
        {/* Block 2 */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8 hover:border-purple-500/60 transition">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">
            {slide.heading2 || "Section 2"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg">
            {slide.content2 || "Content for section 2"}
          </p>
        </div>
        
        {/* Block 3 */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition">
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">
            {slide.heading3 || "Section 3"}
          </h3>
          <p className="text-slate-200 leading-relaxed text-lg">
            {slide.content3 || "Content for section 3"}
          </p>
        </div>
      </div>
    </section>
  );
}
