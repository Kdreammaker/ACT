'use client';

import { useState } from 'react';

interface DocumentSelectModalProps {
  onClose: () => void;
  onSelect: (documents: any[]) => void;
}

export default function DocumentSelectModal({ onClose, onSelect }: DocumentSelectModalProps) {
  const [documents] = useState([
    {
      id: 1,
      title: '2024년 1분기 실적발표 일정 안내',
      description: '2024년 1분기 실적발표 일정을 다음과 같이 안내드립니다.',
      source: '공지사항',
      tag: '공지사항',
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
      uploadedBy: '김부장',
      uploadDate: '2024.01.10',
      fileSize: '5.2MB',
      usageCount: 3,
      lastUsed: '2024.01.18'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const tags = ['전체', '공지사항', '공시자료', '홍보자료', '재무자료', '직접등록'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '전체' || doc.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handleToggleDocument = (id: number) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedDocs = documents.filter(doc => selectedDocuments.includes(doc.id));
    onSelect(selectedDocs);
    onClose();
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case '공지사항':
        return 'bg-blue-100 text-blue-600';
      case '공시자료':
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
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">문서 추가</h3>
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

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">전체 문서</p>
              <p className="text-xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-600">선택된 문서</p>
              <p className="text-xl font-bold text-blue-600">{selectedDocuments.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-600">활성 문서</p>
              <p className="text-xl font-bold text-green-600">{documents.length}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-sm text-orange-600">총 사용횟수</p>
              <p className="text-xl font-bold text-orange-600">{documents.reduce((sum, d) => sum + d.usageCount, 0)}</p>
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
                    ? 'bg-blue-600 text-white'
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
                className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-12">선택</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">문서 정보</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">태그</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">등록자</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">사용현황</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(document.id)}
                        onChange={() => handleToggleDocument(document.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
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
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {document.uploadedBy}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{document.usageCount}회</p>
                        <p className="text-xs text-gray-500">사용</p>
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

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedDocuments.length}개 문서 선택됨
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedDocuments.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium whitespace-nowrap"
            >
              추가 ({selectedDocuments.length})
            </button>
          </div>
        </div>

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