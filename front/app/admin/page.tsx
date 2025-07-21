'use client';

import { useState } from 'react';
import AdminHeader from './AdminHeader';
import DashboardOverview from './DashboardOverview';
import NoticesManagement from './NoticesManagement';
import QnAManagement from './QnAManagement';
import AnnouncementsManagement from './AnnouncementsManagement';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import MessageManagement from './MessageManagement';
import DisclosureManagement from './DisclosureManagement';
import MaterialsManagement from './MaterialsManagement';
import FinancialManagement from './FinancialManagement';
import InquiryManagement from './InquiryManagement';

const menuItems = [
  { id: 'dashboard', label: '대시보드', icon: 'ri-dashboard-3-line' },
  { id: 'notices', label: '공지사항 관리', icon: 'ri-notification-3-line' },
  { id: 'qna', label: 'Q&A 관리', icon: 'ri-question-answer-line' },
  { id: 'announcements', label: '전자공고 관리', icon: 'ri-megaphone-line' },
  { id: 'users', label: '사용자 관리', icon: 'ri-user-settings-line' },
  { id: 'messages', label: '메시지 발송', icon: 'ri-message-line' },
  { id: 'disclosure', label: '공시자료', icon: 'ri-file-text-line' },
  { id: 'materials', label: '홍보자료', icon: 'ri-folder-line' },
  { id: 'financial', label: '재무정보', icon: 'ri-line-chart-line' },
  { id: 'inquiry', label: '문의하기', icon: 'ri-customer-service-2-line' },
  { id: 'settings', label: '시스템 설정', icon: 'ri-settings-3-line' }
];

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'notices':
        return <NoticesManagement />;
      case 'qna':
        return <QnAManagement />;
      case 'announcements':
        return <AnnouncementsManagement />;
      case 'users':
        return <UserManagement />;
      case 'messages':
        return <MessageManagement />;
      case 'disclosure':
        return <DisclosureManagement />;
      case 'materials':
        return <MaterialsManagement />;
      case 'financial':
        return <FinancialManagement />;
      case 'inquiry':
        return <InquiryManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex">
        {/* 사이드바 */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">관리자 메뉴</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors whitespace-nowrap ${
                    activeMenu === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className={`${item.icon} text-lg`}></i>
                  </div>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}