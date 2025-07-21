
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
    downloadCount: 1540,
    status: 'published',
    createdBy: '관리자'
  },
  {
    id: 2,
    title: '주주총회 소집공고',
    description: '제27기 정기주주총회 소집에 관한 공고',
    date: '2024.01.18',
    type: '주주총회',
    isUrgent: true,
    fileSize: '1.8MB',
    downloadCount: 892,
    status: 'published',
    createdBy: '관리자'
  },
  {
    id: 3,
    title: '자회사 지분 취득 결정',
    description: '자회사 ABC테크 추가 지분 취득 결정',
    date: '2024.01.15',
    type: '투자결정',
    isUrgent: false,
    fileSize: '1.2MB',
    downloadCount: 654,
    status: 'published',
    createdBy: '관리자'
  },
  {
    id: 4,
    title: '유상증자 결정공시',
    description: '제3자배정 유상증자 결정에 관한 사항',
    date: '2024.01.12',
    type: '증자',
    isUrgent: false,
    fileSize: '3.1MB',
    downloadCount: 1123,
    status: 'draft',
    createdBy: '관리자'
  },
  {
    id: 5,
    title: '주요사항보고서(파생상품)',
    description: '파생상품 거래 관련 주요사항보고서',
    date: '2024.01.10',
    type: '파생상품',
    isUrgent: false,
    fileSize: '847KB',
    downloadCount: 423,
    status: 'published',
    createdBy: '관리자'
  },
  {
    id: 6,
    title: '대규모기업집단 현황공시',
    description: '2024년 대규모기업집단 현황 공시',
    date: '2024.01.08',
    type: '기업집단',
    isUrgent: false,
    fileSize: '5.2MB',
    downloadCount: 789,
    status: 'published',
    createdBy: '관리자'
  },
  {
    id: 7,
    title: '감사보고서',
    description: '2023년 독립감사인의 감사보고서',
    date: '2024.01.05',
    type: '감사보고서',
    isUrgent: false,
    fileSize: '4.7MB',
    downloadCount: 2156,
    status: 'published',
    createdBy: '관리자'
  },
  {
    id: 8,
    title: 'ESG 경영보고서',
    description: '2023년 ESG 경영 성과 보고서',
    date: '2024.01.03',
    type: 'ESG',
    isUrgent: false,
    fileSize: '6.8MB',
    downloadCount: 967,
    status: 'published',
    createdBy: '관리자'
  }
];

const disclosureTypes = ['전체', '실적공시', '주주총회', '투자결정', '증자', '파생상품', '기업집단', '감사보고서', 'ESG'];
const statusOptions = ['전체', 'draft', 'published'];

export default function DisclosureManagement() {
  const [disclosures, setDisclosures] = useState(allDisclosures);
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDisclosure, setSelectedDisclosure] = useState<any>(null);
  const [disclosureForm, setDisclosureForm] = useState({
    title: '',
    description: '',
    type: '실적공시',
    isUrgent: false,
    content: '',
    file: null as File | null
  });
  const itemsPerPage = 10;

  const filteredDisclosures = disclosures.filter(disclosure => {
    const matchesType = selectedType === '전체' || disclosure.type === selectedType;
    const matchesStatus = selectedStatus === '전체' || disclosure.status === selectedStatus;
    const matchesSearch = disclosure.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         disclosure.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDisclosures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDisclosures = filteredDisclosures.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateDisclosure = () => {
    setDisclosureForm({
      title: '',
      description: '',
      type: '실적공시',
      isUrgent: false,
      content: '',
      file: null
    });
    setShowDisclosureModal(true);
  };

  const handleSaveDisclosure = () => {
    const newDisclosure = {
      id: disclosures.length + 1,
      ...disclosureForm,
      date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
      fileSize: disclosureForm.file ? `${(disclosureForm.file.size / (1024 * 1024)).toFixed(1)}MB` : '0KB',
      downloadCount: 0,
      status: 'published',
      createdBy: '관리자'
    };

    setDisclosures([newDisclosure, ...disclosures]);

    // 참고문서 DB에 자동 등록
    addToReferenceDB({
      title: newDisclosure.title,
      description: newDisclosure.description,
      source: '공시자료',
      tag: '공시자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: newDisclosure.date,
      fileSize: newDisclosure.fileSize,
      usageCount: 0,
      lastUsed: '-'
    });

    setShowDisclosureModal(false);
    alert('공시자료가 등록되었습니다.');
  };

  const addToReferenceDB = (document: any) => {
    console.log('참고문서 DB에 추가:', document);
    // 실제 구현에서는 전역 상태나 API 호출을 통해 참고문서 DB에 추가
  };

  const handleViewDetail = (disclosure: any) => {
    setSelectedDisclosure(disclosure);
    setShowDetailModal(true);
  };

  const handleDeleteDisclosure = (id: number) => {
    if (confirm('공시자료를 삭제하시겠습니까?')) {
      setDisclosures(disclosures.filter(disclosure => disclosure.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDisclosureForm({...disclosureForm, file});
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return '임시저장';
      case 'published': return '발행완료';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-600';
      case 'published': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공시자료 관리</h1>
          <p className="text-gray-600 mt-1">법정 공시자료와 투자자 공시정보를 관리합니다</p>
        </div>
        <button
          onClick={handleCreateDisclosure}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          새 공시자료 등록
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 공시자료</p>
              <p className="text-2xl font-bold text-gray-900">{disclosures.length}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-text-line text-indigo-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">긴급 공시</p>
              <p className="text-2xl font-bold text-red-600">{disclosures.filter(d => d.isUrgent).length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-red-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">이번달 공시</p>
              <p className="text-2xl font-bold text-blue-600">{disclosures.filter(d => d.date.includes('2024.01')).length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 다운로드</p>
              <p className="text-2xl font-bold text-green-600">{disclosures.reduce((sum, d) => sum + d.downloadCount, 0).toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-download-line text-green-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
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
          <div className="flex space-x-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm pr-8"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === '전체' ? '전체 상태' : getStatusLabel(status)}
                </option>
              ))}
            </select>
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
      </div>

      {/* 공시자료 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">공시자료 정보</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">구분</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">파일정보</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">등록일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentDisclosures.map((disclosure) => (
                <tr key={disclosure.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-gray-900 mr-2">{disclosure.title}</h3>
                          {disclosure.isUrgent && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                              긴급
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">{disclosure.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      {disclosure.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{disclosure.fileSize}</p>
                      <p className="text-xs text-gray-600">{disclosure.downloadCount.toLocaleString()} 다운로드</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(disclosure.status)}`}>
                      {getStatusLabel(disclosure.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {disclosure.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewDetail(disclosure)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                        title="상세 보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => addToReferenceDB({
                          title: disclosure.title,
                          description: disclosure.description,
                          source: '공시자료',
                          tag: '공시자료',
                          isActive: disclosure.status === 'published',
                          uploadedBy: '관리자',
                          uploadDate: disclosure.date,
                          fileSize: disclosure.fileSize,
                          usageCount: 0,
                          lastUsed: '-'
                        })}
                        className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded"
                        title="참고문서 DB에 추가"
                      >
                        <i className="ri-database-2-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteDisclosure(disclosure.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
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
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 공시자료 등록 모달 */}
      {showDisclosureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">새 공시자료 등록</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공시 구분</label>
                  <select
                    value={disclosureForm.type}
                    onChange={(e) => setDisclosureForm({...disclosureForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8"
                  >
                    {disclosureTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={disclosureForm.isUrgent}
                      onChange={(e) => setDisclosureForm({...disclosureForm, isUrgent: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">긴급 공시</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={disclosureForm.title}
                  onChange={(e) => setDisclosureForm({...disclosureForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="공시자료 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <input
                  type="text"
                  value={disclosureForm.description}
                  onChange={(e) => setDisclosureForm({...disclosureForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="공시자료에 대한 간단한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={disclosureForm.content}
                  onChange={(e) => setDisclosureForm({...disclosureForm, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="공시자료 내용을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 첨부</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  PDF, Word, Excel 파일만 업로드 가능합니다. (최대 50MB)
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDisclosureModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSaveDisclosure}
                disabled={!disclosureForm.title.trim() || !disclosureForm.description.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 공시자료 상세 보기 모달 */}
      {showDetailModal && selectedDisclosure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">공시자료 상세 정보</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedDisclosure.status)}`}>
                  {getStatusLabel(selectedDisclosure.status)}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">공시 구분</label>
                  <p className="text-sm text-gray-900">{selectedDisclosure.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">등록일</label>
                  <p className="text-sm text-gray-900">{selectedDisclosure.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">파일 크기</label>
                  <p className="text-sm text-gray-900">{selectedDisclosure.fileSize}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">다운로드 수</label>
                  <p className="text-sm text-gray-900">{selectedDisclosure.downloadCount.toLocaleString()}회</p>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">제목</label>
                  {selectedDisclosure.isUrgent && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded ml-2">
                      긴급
                    </span>
                  )}
                </div>
                <p className="text-gray-900 font-medium">{selectedDisclosure.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <p className="text-gray-900">{selectedDisclosure.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일</label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center mr-3">
                        <i className="ri-file-text-line text-indigo-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedDisclosure.title}.pdf</p>
                        <p className="text-sm text-gray-600">{selectedDisclosure.fileSize}</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium whitespace-nowrap">
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                닫기
              </button>
            </div>
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
