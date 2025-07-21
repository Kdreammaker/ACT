'use client';

import { useState } from 'react';

interface ReferenceDBModalProps {
  onClose: () => void;
}

export default function ReferenceDBModal({ onClose }: ReferenceDBModalProps) {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: '2024년 1분기 실적발표 일정 안내',
      description: '2024년 1분기 실적발표 일정을 다음과 같이 안내드립니다.',
      source: '공지사항',
      tag: '공지사항',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.15',
      fileSize: '2.4MB',
      usageCount: 12,
      lastUsed: '2024.01.20'
    },
    {
      id: 2,
      title: '2024년 1분기 실적공시',
      description: '2024년 1분기 경영실적 공시',
      source: '공시자료',
      tag: '공시자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.20',
      fileSize: '2.4MB',
      usageCount: 8,
      lastUsed: '2024.01.22'
    },
    {
      id: 3,
      title: '2024년 회사소개서',
      description: '회사 개요, 사업현황, 미래 전략이 포함된 종합 소개자료',
      source: '홍보자료',
      tag: '홍보자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.15',
      fileSize: '8.5MB',
      usageCount: 15,
      lastUsed: '2024.01.21'
    },
    {
      id: 4,
      title: '2024년 재무상태표',
      description: '2024년 재무상태표',
      source: '재무정보',
      tag: '재무자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.15',
      fileSize: '2.4MB',
      usageCount: 6,
      lastUsed: '2024.01.19'
    },
    {
      id: 5,
      title: '내부 경영전략 자료',
      description: '외부 공개가 어려운 내부 경영전략 및 향후 계획 자료',
      source: '직접등록',
      tag: '직접등록',
      isActive: false,
      uploadedBy: '김부장',
      uploadDate: '2024.01.10',
      fileSize: '5.2MB',
      usageCount: 3,
      lastUsed: '2024.01.18'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentForm, setDocumentForm] = useState({
    title: '',
    description: '',
    file: null as File | null,
    tags: [] as string[],
    isActive: true
  });

  const itemsPerPage = 10;
  const tags = ['전체', '공지사항', '공시资料', '홍보자료', '재무자료', '직접등록'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '전체' || doc.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handleToggleActive = (id: number) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, isActive: !doc.isActive } : doc
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('참고문서를 삭제하시겠습니까?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleDownload = (document: any) => {
    console.log(`다운로드: ${document.title}`);
    alert(`${document.title} 파일을 다운로드합니다.`);
  };

  const handleAddDocument = () => {
    const newDocument = {
      id: documents.length + 1,
      ...documentForm,
      source: '직접등록',
      tag: '직접등록',
      uploadedBy: '관리자',
      uploadDate: new Date().toLocaleDateString('ko-KR').replace(/\\/g, '.').replace('.', ''),
      fileSize: documentForm.file ? `${(documentForm.file.size / (1024 * 1024)).toFixed(1)}MB` : '0KB',
      usageCount: 0,
      lastUsed: '-'
    };

    setDocuments([newDocument, ...documents]);
    setShowAddModal(false);
    setDocumentForm({
      title: '',
      description: '',
      file: null,
      tags: [],
      isActive: true
    });
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case '공지사항':
        return 'bg-blue-100 text-blue-600';
      case '공시资料':
        return 'bg-indigo-100 text-indigo-600';
      case '홍보자료':
        return 'bg-orange-100 text-orange-600';
      case '재무자료':
        return 'bg-green-100 text-green-600';
      case '직접등록':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">참고문서 DB 관리</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-medium whitespace-nowrap"
              >
                직접 등록
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-xl"></i>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">전체 문서</p>
              <p className="text-xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-600">활성 문서</p>
              <p className="text-xl font-bold text-green-600">{documents.filter(d => d.isActive).length}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-yellow-600">비활성 문서</p>
              <p className="text-xl font-bold text-yellow-600">{documents.filter(d => !d.isActive).length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-600">총 사용횟수</p>
              <p className="text-xl font-bold text-blue-600">{documents.reduce((sum, d) => sum + d.usageCount, 0)}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedTag === tag
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="문서 검색"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">문서 정보</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">태그</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">등록자</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">사용현황</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{document.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1 mb-2">{document.description}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span>{document.fileSize}</span>
                          <span>등록일: {document.uploadDate}</span>
                          <span>최종사용: {document.lastUsed}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getTagColor(document.tag)}`}>
                        {document.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={document.isActive}
                          onChange={() => handleToggleActive(document.id)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {document.uploadedBy}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{document.usageCount}회</p>
                        <p className="text-xs text-gray-500">사용</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDownload(document)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                          title="다운로드"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(document.id)}
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
                    className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${currentPage === page
                      ? 'bg-purple-600 text-white'
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

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">새 참고문서 등록</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    value={documentForm.title}
                    onChange={(e) => setDocumentForm({ ...documentForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="문서 제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                  <textarea
                    value={documentForm.description}
                    onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="문서에 대한 설명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">파일 첨부</label>
                  <input
                    type="file"
                    onChange={(e) => setDocumentForm({ ...documentForm, file: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, Word, Excel, PowerPoint 파일 업로드 가능 (최대 50MB)
                  </p>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={documentForm.isActive}
                      onChange={(e) => setDocumentForm({ ...documentForm, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">등록 후 즉시 활성화</span>
                  </label>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  onClick={handleAddDocument}
                  disabled={!documentForm.title.trim() || !documentForm.description.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="ri-database-2-line text-4xl text-gray-300"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 검색어나 태그를 선택해보세요.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}