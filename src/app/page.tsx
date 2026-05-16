import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import UrgencyBar from "@/components/UrgencyBar";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import DemoForm from "@/components/DemoForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <UrgencyBar />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <DemoForm />
      <Footer />
    </main>
  );
}
