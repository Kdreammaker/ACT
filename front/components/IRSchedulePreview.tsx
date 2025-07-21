'use client';

import Link from 'next/link';

const schedules = [
  {
    id: 1,
    title: '1분기 실적발표',
    date: '2024.01.25',
    time: '14:00',
    type: '실적발표',
    status: '예정'
  },
  {
    id: 2,
    title: '기업탐방',
    date: '2024.01.20',
    time: '10:00',
    type: '기업탐방',
    status: '예약중'
  },
  {
    id: 3,
    title: 'IR 컨퍼런스',
    date: '2024.01.18',
    time: '15:30',
    type: 'IR행사',
    status: '완료'
  }
];

export default function IRSchedulePreview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-calendar-schedule-fill text-purple-600"></i>
            </div>
            IR 일정
          </h2>
          <Link href="/ir-schedule" className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
            전체보기
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded whitespace-nowrap">
                  {schedule.type}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${
                  schedule.status === '예정' ? 'bg-blue-100 text-blue-600' :
                  schedule.status === '예약중' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {schedule.status}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">
                {schedule.title}
              </h3>
              <div className="text-xs text-gray-500">
                {schedule.date} {schedule.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}