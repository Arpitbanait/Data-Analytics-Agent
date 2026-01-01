export default function HeroSlide({ slide }: any) {
  return (
    <section className="slide hero bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 shadow-2xl">
      <div className="h-full flex flex-col justify-center">
        <h1 className="text-6xl font-black text-white leading-tight mb-5 drop-shadow-lg">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-2xl text-white/90 leading-relaxed max-w-3xl drop-shadow-lg">
            {slide.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

