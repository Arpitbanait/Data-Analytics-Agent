import HeroSlide from "./HeroSlide";
import CardGridSlide from "./CardGridSlide";
import SplitSlide from "./SplitSlide";
import IntroSlide from "./IntroSlide";
import InfoBlockSlide from "./InfoBlockSlide";
import ComparisonSlide from "./ComparisonSlide";
import BenefitsSlide from "./BenefitsSlide";
import ThankYouSlide from "./ThankYouSlide";
import TitleSlide from "./TitleSlide";
import OverviewSlide from "./OverviewSlide";
import ProblemSlide from "./ProblemSlide";
import BackgroundSlide from "./BackgroundSlide";
import ConceptsSlide from "./ConceptsSlide";
import ProcessSlide from "./ProcessSlide";
import ApplicationsSlide from "./ApplicationsSlide";
import BenefitsHighSlide from "./BenefitsHighSlide";
import ChallengesSlide from "./ChallengesSlide";
import ConclusionSlide from "./ConclusionSlide";

export default function SlideRenderer({ slide }: any) {
  switch (slide.layout) {
    case "title_slide":
      return <TitleSlide slide={slide} />;
    case "overview":
      return <OverviewSlide slide={slide} />;
    case "problem":
      return <ProblemSlide slide={slide} />;
    case "background":
      return <BackgroundSlide slide={slide} />;
    case "concepts":
      return <ConceptsSlide slide={slide} />;
    case "process":
      return <ProcessSlide slide={slide} />;
    case "applications":
      return <ApplicationsSlide slide={slide} />;
    case "benefits":
      return <BenefitsHighSlide slide={slide} />;
    case "challenges":
      return <ChallengesSlide slide={slide} />;
    case "conclusion":
      return <ConclusionSlide slide={slide} />;
    case "hero":
      return <HeroSlide slide={slide} />;
    case "card_grid":
      return <CardGridSlide slide={slide} />;
    case "split":
      return <SplitSlide slide={slide} />;
    case "intro":
      return <IntroSlide slide={slide} />;
    case "info_block":
      return <InfoBlockSlide slide={slide} />;
    case "comparison":
      return <ComparisonSlide slide={slide} />;
    case "thank_you":
      return <ThankYouSlide slide={slide} />;
    case "title":
      return (
        <section className="slide bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="h-full flex flex-col justify-center items-center text-center">
            <h2 className="text-5xl font-bold text-white mb-5">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-xl text-white/80 leading-relaxed">{slide.subtitle}</p>
            )}
          </div>
        </section>
      );
    default:
      return <HeroSlide slide={slide} />;
  }
}

