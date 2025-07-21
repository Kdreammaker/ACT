
'use client';

import Link from 'next/link';

const notices = [
  {
    id: 1,
    title: '[공지] 2024년 1분기 실적발표 일정 안내',
    date: '2024.01.15',
    category: '실적발표',
    isImportant: true
  },
  {
    id: 2,
    title: '정기주주총회 개최 안내',
    date: '2024.01.12',
    category: '주주총회',
    isImportant: true
  }
];

export default function NoticesPreview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <i className="ri-notification-3-fill text-blue-600"></i>
            </div>
            공지사항
          </h2>
          <Link href="/notices" className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
            전체보기
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {notices.map((notice) => (
          <Link 
            key={notice.id}
            href={`/notices/${notice.id}`}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  {notice.isImportant && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded mr-2 whitespace-nowrap">
                      중요
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mr-2 whitespace-nowrap">
                    {notice.category}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 truncate">
                  {notice.title}
                </h3>
              </div>
              <div className="ml-4 text-sm text-gray-500 whitespace-nowrap">
                {notice.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
