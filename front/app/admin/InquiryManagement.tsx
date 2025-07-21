
'use client';

import { useState } from 'react';

const inquiryTypes = ['시스템 오류', '기능 개선', '신규 기능', '사용법 문의', '데이터 관련', '보안 문의', '성능 문제', '기타'];
const statusOptions = ['대기중', '진행중', '완료', '보류'];

const mockInquiries = [
  {
    id: 1,
    type: '시스템 오류',
    title: 'Q&A 관리에서 답변 저장 시 오류 발생',
    content: '답변을 작성하고 저장 버튼을 클릭했을 때 간헐적으로 500 오류가 발생합니다. 브라우저 콘솔에서 확인한 오류 메시지를 첨부합니다.',
    author: '관리자1',
    createdAt: '2024.01.20',
    status: '진행중',
    hasAttachment: true,
    answer: '해당 오류는 서버 타임아웃 문제로 확인되었습니다. 답변 내용이 긴 경우 발생할 수 있으며, 서버 설정을 조정하여 해결했습니다. 업데이트 후 정상 작동을 확인해 주세요.',
    answeredAt: '2024.01.21',
    answeredBy: '시스템 설계자'
  },
  {
    id: 2,
    type: '기능 개선',
    title: '사용자 관리에서 일괄 처리 기능 추가 요청',
    content: '현재 사용자 승인/거부를 한 명씩 처리해야 하는데, 여러 명을 한 번에 처리할 수 있는 기능을 추가해주세요.',
    author: '관리자2',
    createdAt: '2024.01.18',
    status: '완료',
    hasAttachment: false,
    answer: '일괄 처리 기능을 추가했습니다. 사용자 목록에서 체크박스로 여러 사용자를 선택한 후 상단의 일괄 처리 버튼을 이용하시면 됩니다.',
    answeredAt: '2024.01.19',
    answeredBy: '시스템 설계자'
  },
  {
    id: 3,
    type: '사용법 문의',
    title: '참고문서 DB에서 문서 태그 관리 방법',
    content: '참고문서 DB에 등록된 문서들의 태그를 수정하고 싶은데 방법을 알려주세요.',
    author: '관리자1',
    createdAt: '2024.01.15',
    status: '대기중',
    hasAttachment: false,
    answer: '',
    answeredAt: null,
    answeredBy: null
  }
];

const mockFAQs = [
  {
    id: 1,
    category: '시스템 오류',
    question: '로그인이 안 될 때는 어떻게 해야 하나요?',
    answer: '1. 브라우저의 쿠키와 캐시를 삭제해 보세요\n2. 다른 브라우저에서 시도해 보세요\n3. 비밀번호를 재설정해 보세요\n4. 문제가 지속되면 시스템 관리자에게 문의하세요',
    viewCount: 45
  },
  {
    id: 2,
    category: '기능 개선',
    question: '새로운 기능을 요청하려면 어떻게 해야 하나요?',
    answer: '문의하기 메뉴에서 "기능 개선" 또는 "신규 기능" 유형을 선택하여 상세한 요구사항을 작성해 주세요. 우선순위와 필요성을 함께 설명해 주시면 검토 후 개발 일정을 안내드립니다.',
    viewCount: 32
  },
  {
    id: 3,
    category: '사용법 문의',
    question: '대시보드의 통계 데이터는 언제 업데이트되나요?',
    answer: '대시보드의 통계 데이터는 매일 오전 2시에 자동으로 업데이트됩니다. 실시간 데이터가 필요한 경우 각 관리 메뉴에서 확인하실 수 있습니다.',
    viewCount: 28
  },
  {
    id: 4,
    category: '데이터 관련',
    question: '데이터 백업은 어떻게 이루어지나요?',
    answer: '시스템 데이터는 매일 자동으로 백업되며, 주요 설정 변경 시에도 추가 백업이 생성됩니다. 데이터 복구가 필요한 경우 시스템 설계자에게 문의해 주세요.',
    viewCount: 18
  }
];

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [faqs] = useState(mockFAQs);
  const [activeTab, setActiveTab] = useState('inquiry');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [showFAQDetail, setShowFAQDetail] = useState<any>(null);

  // 필터 상태
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  // 폼 상태
  const [inquiryForm, setInquiryForm] = useState({
    type: '',
    title: '',
    content: '',
    file: null as File | null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 문의사항 필터링
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesType = selectedType === '전체' || inquiry.type === selectedType;
    const matchesStatus = selectedStatus === '전체' || inquiry.status === selectedStatus;
    const matchesSearch = inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // FAQ 필터링
  const filteredFAQs = faqs.filter(faq => {
    const matchesType = selectedType === '전체' || faq.category === selectedType;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmitInquiry = () => {
    if (!inquiryForm.type || !inquiryForm.title.trim() || !inquiryForm.content.trim()) {
      alert('문의 유형, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    const newInquiry = {
      id: inquiries.length + 1,
      ...inquiryForm,
      author: '현재 관리자',
      createdAt: new Date().toLocaleDateString('ko-KR').replace(/\\/g, '.'),
      status: '대기중',
      hasAttachment: !!inquiryForm.file,
      answer: '',
      answeredAt: null,
      answeredBy: null
    };

    setInquiries([newInquiry, ...inquiries]);
    setInquiryForm({
      type: '',
      title: '',
      content: '',
      file: null
    });
    setShowInquiryForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '대기중':
        return 'bg-yellow-100 text-yellow-600';
      case '진행중':
        return 'bg-blue-100 text-blue-600';
      case '완료':
        return 'bg-green-100 text-green-600';
      case '보류':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      '시스템 오류': 'bg-red-100 text-red-600',
      '기능 개선': 'bg-blue-100 text-blue-600',
      '신규 기능': 'bg-green-100 text-green-600',
      '사용법 문의': 'bg-purple-100 text-purple-600',
      '데이터 관련': 'bg-orange-100 text-orange-600',
      '보안 문의': 'bg-red-100 text-red-600',
      '성능 문제': 'bg-yellow-100 text-yellow-600',
      '기타': 'bg-gray-100 text-gray-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">문의하기</h1>
          <p className="text-gray-600 mt-1">시스템 설계자에게 기술적인 문의를 할 수 있습니다</p>
        </div>
        <button
          onClick={() => setShowInquiryForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap flex items-center"
        >
          <div className="w-4 h-4 flex items-center justify-center mr-2">
            <i className="ri-question-answer-line"></i>
          </div>
          새 문의 등록
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 문의</p>
              <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-question-answer-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">대기중</p>
              <p className="text-2xl font-bold text-yellow-600">{inquiries.filter(i => i.status === '대기중').length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">진행중</p>
              <p className="text-2xl font-bold text-blue-600">{inquiries.filter(i => i.status === '진행중').length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-settings-3-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">완료</p>
              <p className="text-2xl font-bold text-green-600">{inquiries.filter(i => i.status === '완료').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'inquiry'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              문의 내역
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* 필터 및 검색 */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={activeTab === 'inquiry' ? '문의 제목이나 내용으로 검색' : 'FAQ 검색'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
              </div>
              <div className="flex space-x-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="전체">전체 유형</option>
                  {inquiryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {activeTab === 'inquiry' && (
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="전체">전체 상태</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* 문의 내역 탭 */}
          {activeTab === 'inquiry' && (
            <div className="space-y-4">
              {currentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${getTypeColor(inquiry.type)}`}>
                        {inquiry.type}
                      </span>
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                      {inquiry.hasAttachment && (
                        <span className="text-gray-500 text-sm flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-attachment-2"></i>
                          </div>
                          첨부파일
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{inquiry.createdAt}</span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{inquiry.title}</h3>
                    <p className="text-gray-700 leading-relaxed line-clamp-2">{inquiry.content}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      작성자: {inquiry.author}
                    </div>
                  </div>

                  {inquiry.status === '완료' && inquiry.answer && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                      <h4 className="text-md font-semibold text-green-800 mb-2">답변</h4>
                      <p className="text-green-700 leading-relaxed whitespace-pre-wrap line-clamp-3">
                        {inquiry.answer}
                      </p>
                      <div className="text-xs text-green-600 mt-2">
                        답변자: {inquiry.answeredBy} | 답변일: {inquiry.answeredAt}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 whitespace-nowrap"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              ))}

              {filteredInquiries.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-question-answer-line text-4xl text-gray-300"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">문의 내역이 없습니다</h3>
                  <p className="text-gray-600 mb-4">새로운 문의를 등록해보세요.</p>
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    첫 번째 문의 등록
                  </button>
                </div>
              )}

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center pt-6">
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
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${currentPage === page
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
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      다음
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FAQ 탭 */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getTypeColor(faq.category)}`}>
                      {faq.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-eye-line"></i>
                      </div>
                      {faq.viewCount}회 조회
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-3">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowFAQDetail(faq)}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 whitespace-nowrap"
                    >
                      전체 보기
                    </button>
                  </div>
                </div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-question-mark-line text-4xl text-gray-300"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">FAQ가 없습니다</h3>
                  <p className="text-gray-600">다른 검색어나 카테고리를 선택해보세요.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 문의 등록 모달 */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">새 문의 등록</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">문의 유형 *</label>
                <select
                  value={inquiryForm.type}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">문의 유형 선택</option>
                  {inquiryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                <input
                  type="text"
                  value={inquiryForm.title}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="문의 제목을 입력하세요"
                  maxLength={100}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {inquiryForm.title.length}/100
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용 *</label>
                <textarea
                  value={inquiryForm.content}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="문의 내용을 상세히 작성해주세요"
                  maxLength={1000}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {inquiryForm.content.length}/1000
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">첨부파일</label>
                <input
                  type="file"
                  onChange={(e) => setInquiryForm({ ...inquiryForm, file: e.target.files?.[0] || null })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.hwp,.txt,.zip"
                />
                <p className="text-xs text-gray-500 mt-1">
                  이미지, 문서, 압축파일 등 업로드 가능 (최대 10MB)
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-share-line text-blue-600"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-900">전체 관리자와 공유</span>
                </div>
                <p className="text-xs text-gray-600">
                  등록하신 문의는 모든 관리자가 볼 수 있으며, 답변도 공유됩니다.
                  이를 통해 유사한 문의에 대한 해결책을 함께 확인할 수 있습니다.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowInquiryForm(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSubmitInquiry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
              >
                문의 등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 문의 상세보기 모달 */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">문의 상세</h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-close-line text-xl"></i>
                  </div>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getTypeColor(selectedInquiry.type)}`}>
                    {selectedInquiry.type}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(selectedInquiry.status)}`}>
                    {selectedInquiry.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedInquiry.title}</h2>
                <div className="text-sm text-gray-500 mb-4">
                  작성자: {selectedInquiry.author} | 작성일: {selectedInquiry.createdAt}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.content}
                  </p>
                </div>
                {selectedInquiry.hasAttachment && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-attachment-2"></i>
                      </div>
                      <span>첨부파일: 문의_스크린샷.png</span>
                      <button className="text-blue-600 hover:text-blue-700">다운로드</button>
                    </div>
                  </div>
                )}
              </div>

              {selectedInquiry.answer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">답변</h3>
                  <p className="text-green-700 leading-relaxed whitespace-pre-wrap mb-4">
                    {selectedInquiry.answer}
                  </p>
                  <div className="text-sm text-green-600">
                    답변자: {selectedInquiry.answeredBy} | 답변일: {selectedInquiry.answeredAt}
                  </div>
                </div>
              )}

              {selectedInquiry.status === '대기중' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-time-line text-yellow-600"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-800">답변 대기 중</h4>
                      <p className="text-sm text-yellow-700">
                        시스템 설계자가 검토 중입니다. 답변이 완료되면 알림을 받으실 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAQ 상세보기 모달 */}
      {showFAQDetail && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">FAQ 상세</h3>
                <button
                  onClick={() => setShowFAQDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-close-line text-xl"></i>
                  </div>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getTypeColor(showFAQDetail.category)}`}>
                    {showFAQDetail.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    {showFAQDetail.viewCount}회 조회
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{showFAQDetail.question}</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-green-700 leading-relaxed whitespace-pre-wrap">
                    {showFAQDetail.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
