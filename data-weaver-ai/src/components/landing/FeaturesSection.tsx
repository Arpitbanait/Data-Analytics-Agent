import { 
  BarChart3, 
  Brain, 
  Database, 
  FileUp, 
  LayoutDashboard, 
  Code,
  Zap,
  Shield
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: FileUp,
    title: 'Easy Data Upload',
    description: 'Drag & drop CSV, Excel files or connect directly to your databases.',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Brain,
    title: 'AI-Powered EDA',
    description: 'Automatic exploratory data analysis with intelligent pattern detection.',
    gradient: 'from-secondary to-accent',
  },
  {
    icon: BarChart3,
    title: 'Smart Visualizations',
    description: 'Auto-generated charts and graphs tailored to your data characteristics.',
    gradient: 'from-accent to-warning',
  },
  {
    icon: LayoutDashboard,
    title: 'Interactive Dashboards',
    description: 'Beautiful, responsive dashboards that update in real-time.',
    gradient: 'from-warning to-success',
  },
  {
    icon: Database,
    title: 'Database Integration',
    description: 'Connect to MySQL, PostgreSQL, and other databases seamlessly.',
    gradient: 'from-success to-primary',
  },
  {
    icon: Code,
    title: 'Code Export',
    description: 'Download analysis code in Python, SQL, and other formats.',
    gradient: 'from-primary to-accent',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Powered by multiple AI agents working in parallel for speed.',
    gradient: 'from-accent to-secondary',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data never leaves your control. Enterprise-grade security.',
    gradient: 'from-secondary to-primary',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need for{' '}
            <span className="gradient-text">Data Analysis</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From raw data to beautiful insights in minutes. Our AI agents handle the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-primary-foreground shadow-lg`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
