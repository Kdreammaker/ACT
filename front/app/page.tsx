'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import QuickAccessSection from '../components/QuickAccessSection';
import NoticesPreview from '../components/NoticesPreview';
import QnAPreview from '../components/QnAPreview';
import IRSchedulePreview from '../components/IRSchedulePreview';
import FinancialPreview from '../components/FinancialPreview';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <QuickAccessSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <NoticesPreview />
              <QnAPreview />
            </div>
            <div className="lg:col-span-4">
              <IRSchedulePreview />
              <FinancialPreview />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}