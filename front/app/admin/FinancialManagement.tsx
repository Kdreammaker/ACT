
'use client';

import { useState } from 'react';

const financialDocuments = [
  { 
    id: 1,
    name: '재무상태표', 
    filename: '2024_재무상태표.pdf', 
    icon: 'ri-file-text-line',
    period: '2024',
    type: 'annual',
    size: '2.4MB',
    uploadDate: '2024.01.15',
    status: 'published'
  },
  { 
    id: 2,
    name: '손익계산서', 
    filename: '2024_손익계산서.pdf', 
    icon: 'ri-line-chart-line',
    period: '2024',
    type: 'annual',
    size: '1.8MB',
    uploadDate: '2024.01.15',
    status: 'published'
  },
  { 
    id: 3,
    name: '현금흐름표', 
    filename: '2024_현금흐름표.pdf', 
    icon: 'ri-exchange-line',
    period: '2024',
    type: 'annual',
    size: '1.5MB',
    uploadDate: '2024.01.15',
    status: 'published'
  },
  { 
    id: 4,
    name: '자본변동표', 
    filename: '2024_자본변동표.pdf', 
    icon: 'ri-bar-chart-line',
    period: '2024',
    type: 'annual',
    size: '1.2MB',
    uploadDate: '2024.01.15',
    status: 'draft'
  },
  { 
    id: 5,
    name: '주석', 
    filename: '2024_주석.pdf', 
    icon: 'ri-file-list-line',
    period: '2024',
    type: 'annual',
    size: '3.5MB',
    uploadDate: '2024.01.15',
    status: 'published'
  },
  { 
    id: 6,
    name: '재무상태표', 
    filename: '2024_상반기_재무상태표.pdf', 
    icon: 'ri-file-text-line',
    period: '2024년 상반기',
    type: 'half',
    size: '2.1MB',
    uploadDate: '2024.07.15',
    status: 'published'
  },
  { 
    id: 7,
    name: '손익계산서', 
    filename: '2024_1분기_손익계산서.pdf', 
    icon: 'ri-line-chart-line',
    period: '2024년 1분기',
    type: 'quarter',
    size: '1.6MB',
    uploadDate: '2024.04.15',
    status: 'published'
  }
];

const periods = [
  { id: 'annual', name: '결산', years: ['2024', '2023', '2022', '2021', '2020'] },
  { id: 'half', name: '반기', periods: ['2024년 상반기', '2024년 하반기', '2023년 상반기', '2023년 하반기', '2022년 상반기'] },
  { id: 'quarter', name: '분기', periods: ['2024년 4분기', '2024년 3분기', '2024년 2분기', '2024년 1분기', '2023년 4분기'] }
];

const documentTypes = ['재무상태표', '손익계산서', '현금흐름표', '자본변동표', '주석'];
const statusOptions = ['전체', 'draft', 'published'];

export default function FinancialManagement() {
  const [documents, setDocuments] = useState(financialDocuments);
  const [selectedPeriod, setSelectedPeriod] = useState('annual');
  const [selectedYear, setSelectedYear] = useState(periods[0].years![0]);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentForm, setDocumentForm] = useState({
    name: '재무상태표',
    period: '2024',
    type: 'annual',
    file: null as File | null,
    description: ''
  });
  const itemsPerPage = 10;

  const filteredDocuments = documents.filter(doc => {
    const matchesStatus = selectedStatus === '전체' || doc.status === selectedStatus;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.period.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateDocument = () => {
    setDocumentForm({
      name: '재무상태표',
      period: selectedYear,
      type: selectedPeriod,
      file: null,
      description: ''
    });
    setShowDocumentModal(true);
  };

  const handleSaveDocument = () => {
    const newDocument = {
      id: documents.length + 1,
      ...documentForm,
      filename: `${documentForm.period}_${documentForm.name}.pdf`,
      icon: getDocumentIcon(documentForm.name),
      size: documentForm.file ? `${(documentForm.file.size / (1024 * 1024)).toFixed(1)}MB` : '0KB',
      uploadDate: new Date().toLocaleDateString('ko-KR').replace(/\\. /g, '.').replace('.', ''),
      status: 'published'
    };

    setDocuments([newDocument, ...documents]);

    // 참고문서 DB에 자동 등록
    addToReferenceDB({
      title: `${newDocument.period} ${newDocument.name}`,
      description: documentForm.description || `${newDocument.period} ${newDocument.name} 재무자료`,
      source: '재무정보',
      tag: '재무자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: newDocument.uploadDate,
      fileSize: newDocument.size,
      usageCount: 0,
      lastUsed: '-'
    });

    setShowDocumentModal(false);
    alert('재무자료가 등록되었습니다.');
  };

  const handleViewDetail = (document: any) => {
    setSelectedDocument(document);
    setShowDetailModal(true);
  };

  const handleDeleteDocument = (id: number) => {
    if (confirm('재무자료를 삭제하시겠습니까?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentForm({...documentForm, file});
    }
  };

  const handleDownload = (document: any) => {
    console.log(`다운로드: ${document.filename}`);
    alert(`${document.filename} 파일을 다운로드합니다.`);
  };

  const getCurrentPeriods = () => {
    const currentPeriod = periods.find(p => p.id === selectedPeriod);
    if (currentPeriod?.years) return currentPeriod.years;
    if (currentPeriod?.periods) return currentPeriod.periods;
    return [];
  };

  const getDocumentIcon = (name: string) => {
    switch (name) {
      case '재무상태표': return 'ri-file-text-line';
      case '손익계산서': return 'ri-line-chart-line';
      case '현금흐름표': return 'ri-exchange-line';
      case '자본변동표': return 'ri-bar-chart-line';
      case '주석': return 'ri-file-list-line';
      default: return 'ri-file-text-line';
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

  const getPeriodTypeLabel = (type: string) => {
    switch (type) {
      case 'annual': return '결산';
      case 'half': return '반기';
      case 'quarter': return '분기';
      default: return '알 수 없음';
    }
  };

  const addToReferenceDB = (document: any) => {
    console.log('참고문서 DB에 추가:', document);
    // 실제 구현에서는 전역 상태나 API 호출을 통해 참고문서 DB에 추가
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">재무정보 관리</h1>
          <p className="text-gray-600 mt-1">회사의 재무 현황과 성과 자료를 관리합니다</p>
        </div>
        <button
          onClick={handleCreateDocument}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          새 재무자료 등록
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 재무자료</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-text-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">결산 자료</p>
              <p className="text-2xl font-bold text-green-600">{documents.filter(d => d.type === 'annual').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-line text-green-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">분기 자료</p>
              <p className="text-2xl font-bold text-purple-600">{documents.filter(d => d.type === 'quarter').length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-bar-chart-line text-purple-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">발행완료</p>
              <p className="text-2xl font-bold text-indigo-600">{documents.filter(d => d.status === 'published').length}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-indigo-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 주기 선택 탭 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => {
                  setSelectedPeriod(period.id);
                  if (period.years) setSelectedYear(period.years[0]);
                  else setSelectedYear(period.periods![0]);
                }}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedPeriod === period.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-calendar-line"></i>
                </div>
                {period.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 기간 및 필터 선택 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">기간 선택</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {getCurrentPeriods().map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedYear(period)}
                  className={`px-4 py-2 rounded-lg border font-medium text-sm whitespace-nowrap transition-colors ${
                    selectedYear === period
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="재무자료 검색"
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === '전체' ? '전체 상태' : getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 재무자료 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">문서명</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">기간</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">구분</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">크기</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">업로드일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <i className={`${document.icon} text-blue-600`}></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{document.name}</h3>
                        <p className="text-sm text-gray-600">{document.filename}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {document.period}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      {getPeriodTypeLabel(document.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {document.size}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(document.status)}`}>
                      {getStatusLabel(document.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {document.uploadDate}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewDetail(document)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                        title="상세 보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleDownload(document)}
                        className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded"
                        title="다운로드"
                      >
                        <i className="ri-download-line"></i>
                      </button>
                      <button
                        onClick={() => addToReferenceDB({
                          title: `${document.period} ${document.name}`,
                          description: `${document.period} ${document.name} 재무자료`,
                          source: '재무정보',
                          tag: '재무자료',
                          isActive: document.status === 'published',
                          uploadedBy: '관리자',
                          uploadDate: document.uploadDate,
                          fileSize: document.size,
                          usageCount: 0,
                          lastUsed: '-'
                        })}
                        className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded"
                        title="참고문서 DB에 추가"
                      >
                        <i className="ri-database-2-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(document.id)}
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
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 재무자료 등록 모달 */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">새 재무자료 등록</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문서 종류</label>
                  <select
                    value={documentForm.name}
                    onChange={(e) => setDocumentForm({...documentForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">기간 구분</label>
                  <select
                    value={documentForm.type}
                    onChange={(e) => setDocumentForm({...documentForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="annual">결산</option>
                    <option value="half">반기</option>
                    <option value="quarter">분기</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">적용 기간</label>
                <input
                  type="text"
                  value={documentForm.period}
                  onChange={(e) => setDocumentForm({...documentForm, period: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 2024, 2024년 1분기, 2024년 상반기"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <textarea
                  value={documentForm.description}
                  onChange={(e) => setDocumentForm({...documentForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="재무자료에 대한 간단한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 첨부</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.xls,.xlsx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  PDF, Excel 파일만 업로드 가능합니다. (최대 50MB)
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDocumentModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSaveDocument}
                disabled={!documentForm.period.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 재무자료 상세 보기 모달 */}
      {showDetailModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">재무자료 상세 정보</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedDocument.status)}`}>
                  {getStatusLabel(selectedDocument.status)}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">문서명</label>
                  <p className="text-sm text-gray-900">{selectedDocument.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">기간</label>
                  <p className="text-sm text-gray-900">{selectedDocument.period}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">구분</label>
                  <p className="text-sm text-gray-900">{getPeriodTypeLabel(selectedDocument.type)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">파일 크기</label>
                  <p className="text-sm text-gray-900">{selectedDocument.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">업로드일</label>
                  <p className="text-sm text-gray-900">{selectedDocument.uploadDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">파일명</label>
                  <p className="text-sm text-gray-900">{selectedDocument.filename}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 다운로드</label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <i className={`${selectedDocument.icon} text-blue-600`}></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedDocument.name}</p>
                        <p className="text-sm text-gray-600">{selectedDocument.filename} • {selectedDocument.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(selectedDocument)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors whitespace-nowrap flex items-center"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-download-line"></i>
                      </div>
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

      {/* 하단 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
            <i className="ri-information-line text-blue-600"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">재무정보 관리 안내</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              • 모든 재무 데이터는 K-IFRS 기준으로 작성해주세요.<br/>
              • 감사받은 재무제표는 매년 3월 말까지 업로드해주세요.<br/>
              • 분기별 재무정보는 분기 종료 후 45일 이내에 업로드해주세요.<br/>
              • 파일은 PDF 또는 Excel 형식으로 업로드 가능합니다.
            </p>
          </div>
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-search-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 필터를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}
