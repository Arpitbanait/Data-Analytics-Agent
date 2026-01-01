export default function ConclusionSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-center px-10 py-8 max-w-5xl w-full overflow-hidden gap-6">
        <h2 className="text-4xl font-extrabold text-white mb-2 leading-snug">
          {slide.title || "Conclusion"}
        </h2>
        
        <div className="space-y-5 flex-1 min-h-0 overflow-y-auto w-full">
          <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-white/20 text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-100 leading-relaxed line-clamp-5">
              {slide.summary || "Summary"}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur rounded-lg p-5 border border-emerald-300/30 text-center max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-emerald-100 mb-2">🔮 Future Outlook</h3>
            <p className="text-sm text-gray-100 leading-relaxed line-clamp-5">
              {slide.future || "Future possibilities"}
            </p>
          </div>
          
          <div className="text-2xl font-bold text-white text-center max-w-4xl mx-auto">
            {slide.closing || "Thank you"}
          </div>
        </div>
      </div>
    </section>
  );
}
