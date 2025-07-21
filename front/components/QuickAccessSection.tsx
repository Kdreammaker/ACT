'use client';

import Link from 'next/link';

const quickServices = [
  {
    icon: 'ri-notification-3-fill',
    title: '공지사항',
    href: '/notices',
    color: 'bg-blue-600 text-white'
  },
  {
    icon: 'ri-calendar-schedule-fill',
    title: 'IR일정',
    href: '/ir-schedule',
    color: 'bg-green-600 text-white'
  },
  {
    icon: 'ri-file-text-fill',
    title: '공시자료',
    href: '/disclosure',
    color: 'bg-purple-600 text-white'
  },
  {
    icon: 'ri-presentation-fill',
    title: '홍보자료',
    href: '/materials',
    color: 'bg-orange-600 text-white'
  },
  {
    icon: 'ri-question-answer-fill',
    title: 'Q&A',
    href: '/qna',
    color: 'bg-red-600 text-white'
  },
  {
    icon: 'ri-megaphone-fill',
    title: '전자공고',
    href: '/announcements',
    color: 'bg-yellow-600 text-white'
  },
  {
    icon: 'ri-line-chart-fill',
    title: '재무정보',
    href: '/financial',
    color: 'bg-indigo-600 text-white'
  }
];

export default function QuickAccessSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickServices.map((service, index) => (
            <Link 
              key={index}
              href={service.href}
              className="group"
            >
              <div className={`${service.color} rounded-lg p-4 text-center hover:scale-105 transition-transform shadow-sm`}>
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h3 className="text-sm font-medium whitespace-nowrap">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
