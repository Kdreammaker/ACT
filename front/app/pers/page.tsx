
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PersonalProfile from './PersonalProfile';
import PersonalSettings from './PersonalSettings';
import PersonalActivity from './PersonalActivity';

export default function PersonalMyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">개인 마이페이지</h1>
          <p className="text-gray-600">개인 정보와 활동 내역을 관리하세요</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <PersonalProfile />
            <PersonalActivity />
          </div>
          <div className="lg:col-span-4">
            <PersonalSettings />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
