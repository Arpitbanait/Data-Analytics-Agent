export default function TitleSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative w-full h-full grid place-items-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-black text-white mb-5 leading-tight break-words">
          {slide.title || "Presentation Title"}
          </h1>
          <p className="text-xl text-emerald-200 mb-8 font-light leading-relaxed">
          {slide.tagline || "Strategic Insights"}
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-amber-400 mb-8 mx-auto"></div>
          <p className="text-lg text-gray-300">
          {slide.presenter || "Presented by Your Team"}
          </p>
        </div>
      </div>
    </section>
  );
}
