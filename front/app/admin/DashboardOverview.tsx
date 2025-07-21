
'use client';

import { useState, useEffect } from 'react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalNotices: 45,
    totalQnA: 128,
    pendingAnswers: 12,
    totalUsers: 1567,
    monthlyVisitors: 8945,
    totalAnnouncements: 23
  });

  const recentActivities = [
    { id: 1, type: 'question', content: '2024년 신규 사업 계획에 대한 질문이 등록되었습니다', time: '5분 전', author: '투자자A' },
    { id: 2, type: 'notice', content: '1분기 실적발표 일정 공지사항이 수정되었습니다', time: '15분 전', author: '관리자' },
    { id: 3, type: 'answer', content: 'ESG 경영 관련 질문에 답변이 등록되었습니다', time: '1시간 전', author: '관리자' },
    { id: 4, type: 'user', content: '새로운 사용자가 가입했습니다', time: '2시간 전', author: '시스템' },
    { id: 5, type: 'announcement', content: '주주총회 소집공고가 게시되었습니다', time: '3시간 전', author: '관리자' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'question': return 'ri-question-answer-line text-green-600';
      case 'notice': return 'ri-notification-3-line text-blue-600';
      case 'answer': return 'ri-chat-check-line text-purple-600';
      case 'user': return 'ri-user-add-line text-orange-600';
      case 'announcement': return 'ri-megaphone-line text-red-600';
      default: return 'ri-information-line text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 대시보드</h1>
        <p className="text-gray-600">IRConnect 시스템 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 공지사항</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalNotices}</p>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-arrow-up-line"></i>
                </div>
                <span>+3 이번 달</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-notification-3-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 Q&A</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalQnA}</p>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-arrow-up-line"></i>
                </div>
                <span>+12 이번 주</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-question-answer-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">답변 대기</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingAnswers}</p>
              <div className="text-xs text-red-600 flex items-center mt-1">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-time-line"></i>
                </div>
                <span>처리 필요</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-2xl text-yellow-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 사용자</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-arrow-up-line"></i>
                </div>
                <span>+45 이번 달</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-2xl text-purple-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">월간 방문자</p>
              <p className="text-2xl font-bold text-gray-900">{stats.monthlyVisitors.toLocaleString()}</p>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-arrow-up-line"></i>
                </div>
                <span>+12% 전월 대비</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-2xl text-indigo-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">전자공고</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAnnouncements}</p>
              <div className="text-xs text-blue-600 flex items-center mt-1">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-arrow-up-line"></i>
                </div>
                <span>+2 이번 주</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-megaphone-line text-2xl text-red-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full flex-shrink-0">
                  <i className={getActivityIcon(activity.type)}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <i className="ri-add-line text-blue-600"></i>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">새 공지사항 작성</h3>
          <p className="text-sm text-gray-600">새로운 공지사항을 등록합니다</p>
        </button>

        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <i className="ri-chat-check-line text-green-600"></i>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Q&A 답변 작성</h3>
          <p className="text-sm text-gray-600">대기 중인 질문에 답변합니다</p>
        </button>

        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
            <i className="ri-megaphone-line text-red-600"></i>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">전자공고 게시</h3>
          <p className="text-sm text-gray-600">새로운 전자공고를 게시합니다</p>
        </button>

        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <i className="ri-user-settings-line text-purple-600"></i>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">사용자 관리</h3>
          <p className="text-sm text-gray-600">사용자 계정을 관리합니다</p>
        </button>
      </div>
    </div>
  );
}
