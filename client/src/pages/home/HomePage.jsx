import React, { useEffect } from "react";
import LandingSection from "../../components/Home/LandingSection/LandingSection";
import ProfitSection from "../../components/Home/LandingSection/ProfitSection";
import Miners from "../../components/Home/MinersSection/Miners";
import MiningFacilitiesSection from "../../components/Home/MiningFacilities/MiningFacilitiesSection";
import HardwareReviewSection from "../../components/Home/HardwareReviews/HardwareReviewSection";
import MiningRepairSection from "../../components/Home/miningRepair/MiningRepairSection";
import PerformanceMetrics from "../../components/Home/performanceMetrics/PerformanceMetrics";
import ConsultationSection from "../../components/Home/consultation/ConsultationSection";
import BlogSection from "../../components/Home/blog/BlogSection";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import CryptoCurrencySection from "../../components/Home/Cryptocurrency/CryptoCurrencySection";
import ContactForm from "../../components/Home/contactform/ContactForm";
import { Helmet } from "react-helmet";
import SecondSection from "../../components/Home/secondsection/SecondSection";
import ThirdSection from "../../components/Home/thirdsection/ThirdSection";
import Calculator from "../../components/Home/calculator/Calculator";
import MapSection from "../../components/Home/mapsection/MapSection";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <Helmet>
        <title>
          Crypto Mining in UAE-Bitcoin Machines Abu Dhabi-Dahab Miners
        </title>
        <meta
          name="description"
          content="Dahab Miners Retail is one of the leading bitcoin mining companies in Dubai. We offer
cost-effective crypto mining and hosting solutions for your miners in UAE."
        />
        <meta
          name="keywords"
          content="Bitcoin Mining in Dubai, Bitcoin Mining Machines in Dubai, Bitcoin mining agency in uae, crypto mining company in uae"
        />
      </Helmet>
      <LandingSection />
      {/* <ProfitSection /> */}
      <SecondSection />
      <ThirdSection />
      <Calculator />
      <MapSection />
      <Miners />
      <MiningFacilitiesSection />
      <HardwareReviewSection />
      <MiningRepairSection />
      <CryptoCurrencySection />
      <PerformanceMetrics />
      <ConsultationSection />
      <BlogSection />
      <Testimonials />
      <ContactForm />
    </div>
  );
}
