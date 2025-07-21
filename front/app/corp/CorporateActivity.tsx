
'use client';

import { useState } from 'react';

export default function CorporateActivity() {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const activities = [
    {
      id: 1,
      type: 'answer',
      title: '보고서에 문의에 대한 답변이 등록되었습니다',
      company: '5G베이스',
      code: '000660',
      date: '2024-01-15 14:30',
      isRead: false
    },
    {
      id: 2,
      type: 'schedule',
      title: 'IR 설명회 예약이 취소되었습니다',
      company: '삼성전자',
      code: '005930',
      date: '2024-01-14 10:20',
      isRead: true
    },
    {
      id: 3,
      type: 'schedule',
      title: 'IR 설명회 3일 전 알림',
      company: 'LG에너지',
      code: '051910',
      date: '2024-01-13 16:45',
      isRead: false
    },
    {
      id: 4,
      type: 'comment',
      title: '작성한 게시글에 댓글이 달렸습니다',
      company: 'NAVER',
      code: '035420',
      date: '2024-01-12 09:15',
      isRead: true
    },
    {
      id: 5,
      type: 'disclosure',
      title: '모집공고서 자료가 등록되었습니다',
      company: '카카오',
      code: '035720',
      date: '2024-01-11 13:25',
      isRead: false
    },
    {
      id: 6,
      type: 'schedule',
      title: 'IR 예약이 취소되었습니다',
      company: '삼성바이오',
      code: '207940',
      date: '2024-01-10 11:40',
      isRead: true
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'answer': return 'ri-question-answer-line';
      case 'schedule': return 'ri-calendar-line';
      case 'comment': return 'ri-chat-3-line';
      case 'disclosure': return 'ri-file-text-line';
      default: return 'ri-notification-line';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'answer': return 'bg-green-100 text-green-600';
      case 'schedule': return 'bg-blue-100 text-blue-600';
      case 'comment': return 'bg-purple-100 text-purple-600';
      case 'disclosure': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = activeFilter === '전체' || activity.company === activeFilter;
    const matchesSearch = searchTerm === '' || 
      activity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.code.includes(searchTerm) ||
      activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">최근 활동</h2>
        
        {/* 검색 */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="종목명이나 증권코드로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap gap-2">
          {['전체', '5G베이스', '삼성전자', 'LG에너지', 'NAVER', '카카오'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap cursor-pointer text-sm ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg relative">
            {!activity.isRead && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getActivityColor(activity.type)}`}>
              <i className={`${getActivityIcon(activity.type)}`}></i>
            </div>
            <div className="flex-1">
              <h3 className={`font-medium ${activity.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                {activity.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">{activity.date}</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {activity.company} ({activity.code})
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-inbox-line text-3xl mb-2"></i>
            <p>활동 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
