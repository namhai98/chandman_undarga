import { GiftModalProvider } from "./context/giftModal.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Intro } from "./components/Intro.jsx";
import { Services } from "./components/Services.jsx";
import { Experience } from "./components/Experience.jsx";
import { GiftCard } from "./components/GiftCard.jsx";
import { Audience } from "./components/Audience.jsx";
import { Gallery } from "./components/Gallery.jsx";
import { Location } from "./components/Location.jsx";
import { Faq } from "./components/Faq.jsx";
import { FinalCta } from "./components/FinalCta.jsx";
import { Footer } from "./components/Footer.jsx";
import { GiftOrderModal } from "./components/GiftOrderModal.jsx";

export default function App() {
  return (
    <GiftModalProvider>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2 focus:text-sm focus:text-white"
      >
        Үндсэн агуулга руу очих
      </a>

      <Header />

      <main>
        <Hero />
        <Intro />
        <Services />
        <Experience />
        <GiftCard />
        <Audience />
        <Gallery />
        <Location />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <GiftOrderModal />
    </GiftModalProvider>
  );
}
