export default function IntroSlide({ slide }: any) {
  return (
    <section className="slide bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-white mb-4 leading-snug max-w-4xl">
        {slide.title || "Presentation Title"}
      </h1>
      
      <p className="text-xl text-emerald-100 mb-4 max-w-3xl leading-relaxed">
        {slide.subtitle || "Subtitle"}
      </p>
      
      {slide.tagline && (
        <p className="text-base text-emerald-100/80 italic leading-relaxed">
          {slide.tagline}
        </p>
      )}
    </section>
  );
}
