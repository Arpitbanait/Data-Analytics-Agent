export default function ThankYouSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 flex flex-col justify-center items-center text-center">
      <div className="mb-12">
        <div className="inline-block p-4 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full mb-8 animate-pulse">
          <div className="w-20 h-20 flex items-center justify-center">
            <span className="text-5xl">🙏</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-6xl font-black text-white mb-6">
        {slide.title}
      </h1>
      
      {slide.message && (
        <p className="text-2xl text-emerald-200 mb-10 max-w-3xl font-light leading-relaxed">
          {slide.message}
        </p>
      )}
      
      {slide.contact && (
        <div className="pt-6 border-t border-emerald-400/30">
          <p className="text-lg text-emerald-200">
            {slide.contact}
          </p>
        </div>
      )}
      
      <div className="mt-16 flex gap-4 justify-center">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </section>
  );
}
