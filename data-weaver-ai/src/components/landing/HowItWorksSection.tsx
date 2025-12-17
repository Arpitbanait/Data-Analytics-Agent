import { Upload, Cpu, BarChart2, Download } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your Data',
    description: 'Drop your CSV/Excel files or connect to your database. We support all major data formats.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our multi-agent system analyzes your data, finding patterns, correlations, and insights.',
  },
  {
    step: '03',
    icon: BarChart2,
    title: 'View Dashboard',
    description: 'Get an auto-generated dashboard with KPIs, charts, and AI-written narrative insights.',
  },
  {
    step: '04',
    icon: Download,
    title: 'Export & Share',
    description: 'Download charts, export Python code, or share your dashboard with your team.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From raw data to actionable insights in four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent hidden lg:block" style={{ transform: 'translateY(-50%)' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.step} 
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full gradient-primary text-xs font-bold text-primary-foreground shadow-glow">
                    {step.step}
                  </span>
                </div>

                {/* Card */}
                <div className="relative pt-8 pb-6 px-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
