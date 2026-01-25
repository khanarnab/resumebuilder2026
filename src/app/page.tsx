import { Container } from "@/components/layout";
import { Hero, FeatureList, CTASection } from "@/components/landing";

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <FeatureList />
      <CTASection />
    </Container>
  );
}
