
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 font-pacifico">
              IRConnect
            </Link>
          </div>
          
          {/* 데스크톱용 네비게이션 제거하고 햄버거 메뉴만 유지 */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
              로그인
            </Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap">
              회원가입
            </Link>
            <button 
              className="p-2 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50 w-48">
            <Link href="/notices" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              공지사항
            </Link>
            <Link href="/ir-schedule" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              IR일정
            </Link>
            <Link href="/disclosure" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              공시자료
            </Link>
            <Link href="/materials" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              홍보자료
            </Link>
            <Link href="/qna" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              Q&A
            </Link>
            <Link href="/announcements" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              전자공고
            </Link>
            <Link href="/financial" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">
              재무정보
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
