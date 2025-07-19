
'use client';

import { useState, useEffect } from 'react';
import FoodManagement from './FoodManagement';
import TPOManagement from './TPOManagement';
import UserManagement from './UserManagement';
import BeerManagement from './BeerManagement';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 247,
    totalRecommendations: 1834,
    totalFoods: 36,
    totalBeers: 128
  });

  const menuItems = [
    { id: 'dashboard', name: '대시보드', icon: 'ri-dashboard-line' },
    { id: 'foods', name: '음식 관리', icon: 'ri-restaurant-line' },
    { id: 'tpo', name: 'TPO 관리', icon: 'ri-calendar-event-line' },
    { id: 'beers', name: '술 관리', icon: 'ri-goblet-line' },
    { id: 'users', name: '사용자 관리', icon: 'ri-user-line' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'foods':
        return <FoodManagement />;
      case 'tpo':
        return <TPOManagement />;
      case 'beers':
        return <BeerManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">총 사용자</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-xl text-blue-600"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">총 추천 수</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalRecommendations.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="ri-star-line text-xl text-yellow-600"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">등록된 음식</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalFoods}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-restaurant-line text-xl text-green-600"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">등록된 술</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBeers}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <i className="ri-goblet-line text-xl text-orange-600"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 사용자 활동</h3>
                <div className="space-y-4">
                  {[
                    { user: 'user123@gmail.com', action: '맥주 추천 요청', food: '삼겹살', time: '5분 전' },
                    { user: 'foodlover@naver.com', action: 'TPO 추천 요청', tpo: '데이트', time: '12분 전' },
                    { user: 'beermaster@kakao.com', action: '맥주 추천 요청', food: '피자', time: '18분 전' },
                    { user: 'gourmet@gmail.com', action: '얼리엑세스 등록', time: '25분 전' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-xs text-gray-600">
                          {activity.action} {activity.food && `- ${activity.food}`} {activity.tpo && `- ${activity.tpo}`}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 음식 순위</h3>
                <div className="space-y-3">
                  {[
                    { name: '삼겹살', count: 156, country: '한국' },
                    { name: '피자', count: 134, country: '이탈리아' },
                    { name: '치킨', count: 128, country: '한국' },
                    { name: '라면', count: 98, country: '일본' },
                    { name: '햄버거', count: 87, country: '미국' }
                  ].map((food, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{food.name}</p>
                          <p className="text-xs text-gray-500">{food.country}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{food.count}회</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-yellow-500 mr-8" style={{ fontFamily: '"Pacifico", serif' }}>
                Soolomon Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                관리자: adotdreammaker@gmail.com
              </div>
              <button
                onClick={onLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                <i className="ri-logout-line mr-1"></i>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <nav className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === item.id
                        ? 'bg-yellow-100 text-yellow-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`${item.icon} mr-3`}></i>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {menuItems.find((item) => item.id === activeTab)?.name || '대시보드'}
                </h2>
              </div>
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
