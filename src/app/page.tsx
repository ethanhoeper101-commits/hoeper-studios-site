import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import UrgencyBar from "@/components/UrgencyBar";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import DemoForm from "@/components/DemoForm";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <UrgencyBar />
      <HowItWorks />
      <Results />
      <Pricing />
      <Testimonials />
      <FAQ />
      <DemoForm />
      <Footer />
      <MobileCTA />
    </main>
  );
}
