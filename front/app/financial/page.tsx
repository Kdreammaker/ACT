'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FinancialDashboard from './FinancialDashboard';

export default function FinancialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">재무정보</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                회사의 재무 현황과 성과를 상세히 확인하세요
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FinancialDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}