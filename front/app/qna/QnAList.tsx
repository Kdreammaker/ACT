'use client';

import Link from 'next/link';
import { useState } from 'react';

const allQnAItems = [
  {
    id: 1,
    question: '2024년 신규 사업 계획에 대해 구체적인 내용을 알고 싶습니다.',
    answer: '2024년에는 AI 기반 스마트팩토리 솔루션과 친환경 에너지 사업에 집중 투자할 예정입니다. 총 투자 규모는 약 500억원으로 계획하고 있으며, 이를 통해 2025년까지 매출 20% 증가를 목표로 하고 있습니다.',
    author: '투자자A',
    date: '2024.01.15',
    votes: 24,
    hasAnswer: true,
    category: '사업계획'
  },
  {
    id: 2,
    question: '최근 원자재 가격 상승이 매출에 미치는 영향은 어느 정도인가요?',
    answer: '현재 주요 원자재 가격 상승으로 인해 제조원가가 약 8% 증가하였습니다. 이에 대응하여 제품 가격 조정과 원가절감 노력을 통해 영향을 최소화하고 있으며, 2024년 2분기부터는 안정화될 것으로 예상됩니다.',
    author: '투자자B',
    date: '2024.01.14',
    votes: 18,
    hasAnswer: true,
    category: '재무'
  },
  {
    id: 3,
    question: 'ESG 경영 도입 후 예상되는 비용과 효과에 대해 설명해주세요.',
    answer: '',
    author: '투자자C',
    date: '2024.01.13',
    votes: 15,
    hasAnswer: false,
    category: 'ESG'
  },
  {
    id: 4,
    question: '해외 진출 계획이 있는지, 있다면 어느 지역을 고려하고 있나요?',
    answer: '현재 동남아시아 지역을 우선 타겟으로 하여 베트남과 태국 시장 진출을 검토하고 있습니다. 2024년 하반기에 현지 파트너사와의 협력을 통해 시범 사업을 시작할 계획입니다.',
    author: '투자자D',
    date: '2024.01.12',
    votes: 12,
    hasAnswer: true,
    category: '해외진출'
  },
  {
    id: 5,
    question: '향후 배당 정책에 대한 계획을 알려주세요.',
    answer: '주주가치 제고를 위해 안정적인 배당 정책을 유지하고 있습니다. 현재 배당수익률 3.5% 수준을 목표로 하며, 실적 개선에 따라 점진적인 배당 증가를 검토하고 있습니다.',
    author: '투자자E',
    date: '2024.01.11',
    votes: 31,
    hasAnswer: true,
    category: '배당'
  },
  {
    id: 6,
    question: 'R&D 투자 현황과 향후 계획에 대해 알고 싶습니다.',
    answer: '',
    author: '투자자F',
    date: '2024.01.10',
    votes: 9,
    hasAnswer: false,
    category: '연구개발'
  },
  {
    id: 7,
    question: '경쟁사 대비 우리 회사의 경쟁 우위는 무엇인가요?',
    answer: '당사는 특허 기술력과 고객 맞춤형 솔루션 제공에서 경쟁 우위를 가지고 있습니다. 특히 핵심 기술 특허 200여건 보유와 15년간 축적된 노하우를 바탕으로 차별화된 서비스를 제공하고 있습니다.',
    author: '투자자G',
    date: '2024.01.09',
    votes: 22,
    hasAnswer: true,
    category: '경쟁력'
  },
  {
    id: 8,
    question: '신제품 출시 일정과 예상 매출 기여도는?',
    answer: '2024년 3분기에 신제품 3종을 출시할 예정이며, 이를 통해 2024년 하반기부터 전체 매출의 15% 정도 기여할 것으로 예상됩니다.',
    author: '투자자H',
    date: '2024.01.08',
    votes: 17,
    hasAnswer: true,
    category: '신제품'
  }
];

const categories = ['전체', '사업계획', '재무', 'ESG', '해외진출', '배당', '연구개발', '경쟁력', '신제품'];

export default function QnAList() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnswered, setFilterAnswered] = useState('전체');
  const itemsPerPage = 5;

  const filteredItems = allQnAItems.filter(item => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAnswer = filterAnswered === '전체' || 
                         (filterAnswered === '답변완료' && item.hasAnswer) ||
                         (filterAnswered === '답변대기' && !item.hasAnswer);
    return matchesCategory && matchesSearch && matchesAnswer;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleVote = (itemId: number) => {
    alert('추천 완료되었습니다.');
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="질문 내용으로 검색"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
            <Link 
              href="/qna/new"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium whitespace-nowrap flex items-center"
            >
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-add-line"></i>
              </div>
              질문 등록
            </Link>
          </div>
          
          <div className="flex flex-col space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">답변 상태</h3>
              <div className="flex space-x-2">
                {['전체', '답변완료', '답변대기'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterAnswered(status);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      filterAnswered === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Q&A 목록 */}
      <div className="space-y-4">
        {currentItems.map((item) => (
          <Link key={item.id} href={`/qna/${item.id}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                  {item.hasAnswer ? (
                    <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
                      답변완료
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-600 text-sm px-3 py-1 rounded-full font-medium">
                      답변대기
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleVote(item.id);
                  }}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-thumb-up-line"></i>
                  </div>
                  <span className="text-sm font-medium">{item.votes}</span>
                </button>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Q. {item.question}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
              
              {item.hasAnswer && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
                  <h4 className="text-md font-semibold text-green-800 mb-2">A. 답변</h4>
                  <p className="text-green-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
              
              {!item.hasAnswer && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-yellow-700 text-sm">
                    답변을 준비 중입니다. 빠른 시일 내에 답변드리겠습니다.
                  </p>
                </div>
              )}
            </div>
          </Link>
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
                    ? 'bg-green-600 text-white'
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

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-question-answer-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600 mb-4">다른 검색어나 카테고리를 선택해보세요.</p>
          <Link 
            href="/qna/new"
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
          >
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-add-line"></i>
            </div>
            새 질문 등록
          </Link>
        </div>
      )}
    </div>
  );
}