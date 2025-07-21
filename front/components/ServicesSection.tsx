
'use client';

import Link from 'next/link';

const services = [
  {
    icon: 'ri-notification-3-line',
    title: '공지사항',
    description: '중요한 기업 소식과 공지사항을 실시간으로 확인하세요',
    href: '/notices',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: 'ri-calendar-schedule-line',
    title: 'IR/탐방 일정',
    description: 'IR 미팅과 기업 탐방 일정을 예약하고 관리하세요',
    href: '/ir-schedule',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: 'ri-file-text-line',
    title: '공시자료',
    description: '공식 공시자료와 보고서를 한 곳에서 확인하세요',
    href: '/disclosure',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: 'ri-presentation-line',
    title: '회사 홍보자료',
    description: '기업의 비전과 성과를 담은 홍보자료를 살펴보세요',
    href: '/materials',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: 'ri-question-answer-line',
    title: 'Q&A',
    description: '궁금한 점을 직접 질문하고 공식 답변을 받아보세요',
    href: '/qna',
    color: 'bg-red-50 text-red-600'
  },
  {
    icon: 'ri-megaphone-line',
    title: '전자공고',
    description: '법적 공고사항과 중요 알림을 확인하세요',
    href: '/announcements',
    color: 'bg-yellow-50 text-yellow-600'
  },
  {
    icon: 'ri-line-chart-line',
    title: '재무정보',
    description: '상세한 재무제표와 실적 분석 자료를 제공합니다',
    href: '/financial',
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    icon: 'ri-folder-line',
    title: '자료실',
    description: '각종 참고자료와 문서를 체계적으로 관리합니다',
    href: '/resources',
    color: 'bg-teal-50 text-teal-600'
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            완전한 IR 솔루션
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            투자자와 기업이 필요로 하는 모든 기능을 하나의 플랫폼에서 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index}
              href={service.href}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className={`w-14 h-14 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${service.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
