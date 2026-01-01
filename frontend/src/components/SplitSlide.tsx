export default function SplitSlide({ slide }: any) {
  return (
    <section className="slide bg-slate-800">
      <div className="h-full flex flex-col">
        <h2 className="text-4xl font-bold text-white mb-8 pb-4 border-b-2 border-purple-500">
          {slide.title}
        </h2>

        <div className="grid grid-cols-2 gap-8 flex-1">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {slide.left && (
              <>
                <h3 className="text-2xl font-bold text-purple-300 mb-6">
                  {slide.left.heading}
                </h3>
                <ul className="space-y-4">
                  {slide.left.points?.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-purple-400 text-xl font-bold mt-1">✓</span>
                      <span className="text-slate-300 text-lg leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right Visual */}
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-xl p-8 border-2 border-purple-500/30">
            {slide.right && (
              <>
                <div className="text-6xl font-bold text-purple-400 mb-4">📊</div>
                {slide.right.caption && (
                  <p className="text-slate-300 text-center text-lg">
                    {slide.right.caption}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
