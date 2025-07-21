'use client';

import { useState } from 'react';

const allAnnouncements = [
  {
    id: 1,
    title: '제27기 정기주주총회 소집공고',
    content: '주식회사 IRConnect 제27기 정기주주총회를 다음과 같이 개최하오니 참석하여 주시기 바랍니다.',
    date: '2024.01.20',
    category: '주주총회',
    isLegal: true,
    dueDate: '2024.03.15',
    publishDate: '2024.01.20',
    views: 2340
  },
  {
    id: 2,
    title: '유상증자 결정 공고',
    content: '제3자배정 유상증자 결정에 관하여 상법 제418조에 의거 공고합니다.',
    date: '2024.01.18',
    category: '증자',
    isLegal: true,
    dueDate: '2024.02.18',
    publishDate: '2024.01.18',
    views: 1876
  },
  {
    id: 3,
    title: '흡수합병 공고',
    content: '당사의 자회사인 ABC테크놀로지 흡수합병에 관하여 공고드립니다.',
    date: '2024.01.15',
    category: '합병',
    isLegal: true,
    dueDate: '2024.03.15',
    publishDate: '2024.01.15',
    views: 1543
  },
  {
    id: 4,
    title: '감자 결정 공고',
    content: '자본금 감소(감자) 결정에 관하여 상법 제438조에 의거 공고합니다.',
    date: '2024.01.12',
    category: '감자',
    isLegal: true,
    dueDate: '2024.02.12',
    publishDate: '2024.01.12',
    views: 987
  },
  {
    id: 5,
    title: '이사 선임 공고',
    content: '2024년 정기주주총회에서 선임될 이사 후보자에 대해 공고드립니다.',
    date: '2024.01.10',
    category: '임원',
    isLegal: false,
    dueDate: '2024.03.10',
    publishDate: '2024.01.10',
    views: 756
  },
  {
    id: 6,
    title: '영업양수 공고',
    content: 'XYZ솔루션의 영업 일부 양수에 관하여 공고드립니다.',
    date: '2024.01.08',
    category: '영업양수',
    isLegal: true,
    dueDate: '2024.02.08',
    publishDate: '2024.01.08',
    views: 634
  },
  {
    id: 7,
    title: '배당금 지급 공고',
    content: '2023년 제26기 결산배당금 지급에 관하여 공고드립니다.',
    date: '2024.01.05',
    category: '배당',
    isLegal: false,
    dueDate: '2024.04.05',
    publishDate: '2024.01.05',
    views: 2156
  },
  {
    id: 8,
    title: '채권자보호절차 공고',
    content: '합병에 따른 채권자보호절차에 관하여 상법 제527조의3에 의거 공고합니다.',
    date: '2024.01.03',
    category: '채권자보호',
    isLegal: true,
    dueDate: '2024.03.03',
    publishDate: '2024.01.03',
    views: 432
  }
];

const announcementCategories = ['전체', '주주총회', '증자', '합병', '감자', '임원', '영업양수', '배당', '채권자보호'];

export default function AnnouncementsList() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLegal, setFilterLegal] = useState('전체');
  const itemsPerPage = 5;

  const filteredAnnouncements = allAnnouncements.filter(announcement => {
    const matchesCategory = selectedCategory === '전체' || announcement.category === selectedCategory;
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLegal = filterLegal === '전체' || 
                        (filterLegal === '법정공고' && announcement.isLegal) ||
                        (filterLegal === '일반공고' && !announcement.isLegal);
    return matchesCategory && matchesSearch && matchesLegal;
  });

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="공고 제목 또는 내용으로 검색"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
              <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
            <div className="flex space-x-2">
              {['전체', '법정공고', '일반공고'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterLegal(type);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    filterLegal === type
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {announcementCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 전자공고 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">제목</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">분류</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">공고일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">만료일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentAnnouncements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center mb-2">
                      {announcement.isLegal && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded mr-2 whitespace-nowrap">
                          법정
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mr-2">
                        {announcement.category}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {announcement.content}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                      announcement.isLegal 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {announcement.isLegal ? '법정공고' : '일반공고'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {announcement.publishDate}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {announcement.dueDate}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {announcement.views.toLocaleString()}
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
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-search-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 카테고리를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}