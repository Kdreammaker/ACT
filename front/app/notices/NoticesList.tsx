'use client';

import Link from 'next/link';
import { useState } from 'react';

const allNotices = [
  {
    id: 1,
    title: '[공지] 2024년 1분기 실적발표 일정 안내',
    content: '2024년 1분기 실적발표 일정을 다음과 같이 안내드립니다.',
    date: '2024.01.15',
    category: '실적발표',
    isImportant: true,
    views: 1234
  },
  {
    id: 2,
    title: '정기주주총회 개최 안내',
    content: '제27기 정기주주총회 개최에 대해 안내드립니다.',
    date: '2024.01.12',
    category: '주주총회',
    isImportant: true,
    views: 987
  },
  {
    id: 3,
    title: '배당금 지급 일정 변경 안내',
    content: '2023년 배당금 지급 일정이 변경되어 안내드립니다.',
    date: '2024.01.10',
    category: '배당',
    isImportant: false,
    views: 756
  },
  {
    id: 4,
    title: 'IR 홈페이지 시스템 점검 안내',
    content: 'IR 홈페이지 시스템 점검으로 인한 서비스 중단 안내',
    date: '2024.01.08',
    category: '시스템',
    isImportant: false,
    views: 543
  },
  {
    id: 5,
    title: '2023년 4분기 실적 컨퍼런스콜 개최 안내',
    content: '2023년 4분기 실적 컨퍼런스콜 개최에 대해 안내드립니다.',
    date: '2024.01.05',
    category: '컨퍼런스콜',
    isImportant: false,
    views: 432
  },
  {
    id: 6,
    title: '신규 사업부 설립 공고',
    content: '미래성장동력 확보를 위한 신규 사업부 설립을 공고합니다.',
    date: '2024.01.03',
    category: '사업',
    isImportant: true,
    views: 1098
  },
  {
    id: 7,
    title: 'ESG 경영 보고서 발간 안내',
    content: '2023년 ESG 경영 보고서가 발간되었습니다.',
    date: '2023.12.28',
    category: 'ESG',
    isImportant: false,
    views: 654
  },
  {
    id: 8,
    title: '임원진 인사발령 공고',
    content: '임원진 인사발령에 대해 공고드립니다.',
    date: '2023.12.25',
    category: '인사',
    isImportant: false,
    views: 321
  }
];

const categories = ['전체', '실적발표', '주주총회', '배당', '시스템', '컨퍼런스콜', '사업', 'ESG', '인사'];

export default function NoticesList() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const filteredNotices = allNotices.filter(notice => {
    const matchesCategory = selectedCategory === '전체' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="제목 또는 내용으로 검색"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">제목</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">카테고리</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">등록일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentNotices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/notices/${notice.id}`} className="block">
                      <div className="flex items-center">
                        {notice.isImportant && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded mr-2 whitespace-nowrap">
                            중요
                          </span>
                        )}
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {notice.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                        {notice.content}
                      </p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {notice.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {notice.date}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {notice.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center px-6 py-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredNotices.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-notification-off-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 카테고리를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}