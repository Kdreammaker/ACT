
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600 font-pacifico">
              IRConnect
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-lg font-semibold text-gray-900">관리자 페이지</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">관</span>
                </div>
                <span className="text-gray-700 font-medium">관리자</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50 w-48">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                    프로필 설정
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                    알림 설정
                  </button>
                  <hr className="my-1" />
                  <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    사이트로 이동
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
