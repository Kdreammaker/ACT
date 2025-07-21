'use client';

import { useState } from 'react';

const allDisclosures = [
  {
    id: 1,
    title: '2024년 1분기 실적공시',
    description: '2024년 1분기 경영실적 공시',
    date: '2024.01.20',
    type: '실적공시',
    isUrgent: true,
    fileSize: '2.4MB',
    downloadCount: 1540
  },
  {
    id: 2,
    title: '주주총회 소집공고',
    description: '제27기 정기주주총회 소집에 관한 공고',
    date: '2024.01.18',
    type: '주주총회',
    isUrgent: true,
    fileSize: '1.8MB',
    downloadCount: 892
  },
  {
    id: 3,
    title: '자회사 지분 취득 결정',
    description: '자회사 ABC테크 추가 지분 취득 결정',
    date: '2024.01.15',
    type: '투자결정',
    isUrgent: false,
    fileSize: '1.2MB',
    downloadCount: 654
  },
  {
    id: 4,
    title: '유상증자 결정공시',
    description: '제3자배정 유상증자 결정에 관한 사항',
    date: '2024.01.12',
    type: '증자',
    isUrgent: false,
    fileSize: '3.1MB',
    downloadCount: 1123
  },
  {
    id: 5,
    title: '주요사항보고서(파생상품)',
    description: '파생상품 거래 관련 주요사항보고서',
    date: '2024.01.10',
    type: '파생상품',
    isUrgent: false,
    fileSize: '847KB',
    downloadCount: 423
  },
  {
    id: 6,
    title: '대규모기업집단 현황공시',
    description: '2024년 대규모기업집단 현황 공시',
    date: '2024.01.08',
    type: '기업집단',
    isUrgent: false,
    fileSize: '5.2MB',
    downloadCount: 789
  },
  {
    id: 7,
    title: '감사보고서',
    description: '2023년 독립감사인의 감사보고서',
    date: '2024.01.05',
    type: '감사보고서',
    isUrgent: false,
    fileSize: '4.7MB',
    downloadCount: 2156
  },
  {
    id: 8,
    title: 'ESG 경영보고서',
    description: '2023년 ESG 경영 성과 보고서',
    date: '2024.01.03',
    type: 'ESG',
    isUrgent: false,
    fileSize: '6.8MB',
    downloadCount: 967
  }
];

const disclosureTypes = ['전체', '실적공시', '주주총회', '투자결정', '증자', '파생상품', '기업집단', '감사보고서', 'ESG'];

export default function DisclosureList() {
  const [selectedType, setSelectedType] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  const filteredDisclosures = allDisclosures.filter(disclosure => {
    const matchesType = selectedType === '전체' || disclosure.type === selectedType;
    const matchesSearch = disclosure.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         disclosure.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDisclosures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDisclosures = filteredDisclosures.slice(startIndex, startIndex + itemsPerPage);

  const handleDownload = (disclosure: any) => {
    console.log(`다운로드: ${disclosure.title}`);
    alert(`${disclosure.title} 파일을 다운로드합니다.`);
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {disclosureTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="공시자료 검색"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 공시자료 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentDisclosures.map((disclosure) => (
          <div key={disclosure.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full font-medium">
                  {disclosure.type}
                </span>
                {disclosure.isUrgent && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                    긴급
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">{disclosure.date}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {disclosure.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {disclosure.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-file-text-line"></i>
                  </div>
                  {disclosure.fileSize}
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-download-line"></i>
                  </div>
                  {disclosure.downloadCount.toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => handleDownload(disclosure)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors whitespace-nowrap flex items-center"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-1">
                  <i className="ri-download-line"></i>
                </div>
                다운로드
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              다음
            </button>
          </div>
        </div>
      )}

      {filteredDisclosures.length === 0 && (
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