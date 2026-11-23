import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickAccessBar from "@/components/QuickAccessBar";
import LocationMap from "@/components/LocationMap";
import AboutPreview from "@/components/AboutPreview";
import NewsPreview from "@/components/NewsPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <QuickAccessBar />
      <LocationMap />
      <AboutPreview />
      <NewsPreview />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
