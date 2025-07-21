'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import QnAForm from './QnAForm';

export default function NewQnAPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">질문 등록</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                궁금한 사항을 질문해 주시면 전문가가 답변드리겠습니다
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <QnAForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}