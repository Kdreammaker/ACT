
'use client';

import { useState } from 'react';

const mockNotices = [
  {
    id: 1,
    title: '[공지] 2024년 1분기 실적발표 일정 안내',
    content: '2024년 1분기 실적발표 일정을 다음과 같이 안내드립니다.',
    category: '실적발표',
    isImportant: true,
    views: 1234,
    status: 'published',
    author: '관리자',
    createdAt: '2024.01.15',
    updatedAt: '2024.01.15',
    attachments: [
      { name: '2024년_1분기_실적발표_자료.pdf', size: '2.4MB', type: 'application/pdf' },
      { name: '웹캐스트_참석_안내.pdf', size: '1.2MB', type: 'application/pdf' }
    ]
  },
  {
    id: 2,
    title: '정기주주총회 개최 안내',
    content: '제27기 정기주주총회 개최에 대해 안내드립니다.',
    category: '주주총회',
    isImportant: true,
    views: 987,
    status: 'published',
    author: '관리자',
    createdAt: '2024.01.12',
    updatedAt: '2024.01.12',
    attachments: [
      { name: '주주총회_소집공고.pdf', size: '3.1MB', type: 'application/pdf' }
    ]
  },
  {
    id: 3,
    title: '배당금 지급 일정 변경 안내',
    content: '2023년 배당금 지급 일정이 변경되어 안내드립니다.',
    category: '배당',
    isImportant: false,
    views: 756,
    status: 'draft',
    author: '관리자',
    createdAt: '2024.01.10',
    updatedAt: '2024.01.11',
    attachments: []
  }
];

const categories = ['전체', '실적발표', '주주총회', '배당', '시스템', '컨퍼런스콜', '사업', 'ESG', '인사'];

export default function NoticesManagement() {
  const [notices, setNotices] = useState(mockNotices);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [attachments, setAttachments] = useState<any[]>([]);
  const itemsPerPage = 10;

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === '전체' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (notice: any) => {
    setEditingNotice({ ...notice });
    setAttachments(notice.attachments || []);
    setShowEditModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB',
        type: file.type,
        file: file
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (editingNotice.id) {
      setNotices(notices.map(n => n.id === editingNotice.id ? { 
        ...editingNotice, 
        attachments: attachments,
        updatedAt: new Date().toLocaleDateString('ko-KR') 
      } : n));
    } else {
      const newNotice = {
        ...editingNotice,
        id: Date.now(),
        views: 0,
        author: '관리자',
        attachments: attachments,
        createdAt: new Date().toLocaleDateString('ko-KR'),
        updatedAt: new Date().toLocaleDateString('ko-KR')
      };
      setNotices([newNotice, ...notices]);
    }

    // 참고문서 DB에 자동 등록
    if (editingNotice.title && editingNotice.content) {
      addToReferenceDB({
        title: editingNotice.title,
        description: editingNotice.content.substring(0, 100) + '...',
        source: '공지사항',
        tag: '공지사항',
        isActive: editingNotice.status === 'published',
        uploadedBy: '관리자',
        uploadDate: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        fileSize: attachments.length > 0 ? attachments[0].size : '텍스트',
        usageCount: 0,
        lastUsed: '-'
      });
    }

    setShowEditModal(false);
    setEditingNotice(null);
    setAttachments([]);
  };

  // 참고문서 DB에 추가하는 함수 (실제로는 전역 상태나 API 호출)
  const addToReferenceDB = (document: any) => {
    console.log('참고문서 DB에 추가:', document);
    // 실제 구현에서는 전역 상태나 API 호출을 통해 참고문서 DB에 추가
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setNotices(notices.map(n => n.id === id ? { ...n, status } : n));
  };

  const handleNewNotice = () => {
    setEditingNotice({
      id: null,
      title: '',
      content: '',
      category: '실적발표',
      isImportant: false,
      status: 'draft'
    });
    setAttachments([]);
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
          <p className="text-gray-600 mt-1">공지사항을 작성, 수정, 삭제할 수 있습니다</p>
        </div>
        <button
          onClick={handleNewNotice}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap flex items-center"
        >
          <div className="w-4 h-4 flex items-center justify-center mr-2">
            <i className="ri-add-line"></i>
          </div>
          새 공지사항
        </button>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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
          <div className="relative">
            <input
              type="text"
              placeholder="제목으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">제목</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">카테고리</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">첨부파일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">조회수</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">작성일</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-40">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentNotices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center mb-1">
                      {notice.isImportant && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded mr-2 whitespace-nowrap">
                          중요
                        </span>
                      )}
                      <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {notice.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">{notice.content}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {notice.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {notice.attachments && notice.attachments.length > 0 ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-attachment-2 text-blue-600"></i>
                        </div>
                        <span className="text-sm text-blue-600">{notice.attachments.length}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={notice.status}
                      onChange={(e) => handleStatusChange(notice.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded border border-gray-300 bg-white pr-8"
                    >
                      <option value="draft">임시저장</option>
                      <option value="published">게시됨</option>
                      <option value="hidden">숨김</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {notice.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {notice.createdAt}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => addToReferenceDB({
                          title: notice.title,
                          description: notice.content.substring(0, 100) + '...',
                          source: '공지사항',
                          tag: '공지사항',
                          isActive: notice.status === 'published',
                          uploadedBy: '관리자',
                          uploadDate: notice.createdAt,
                          fileSize: notice.attachments?.length > 0 ? notice.attachments[0].size : '텍스트',
                          usageCount: 0,
                          lastUsed: '-'
                        })}
                        className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded"
                        title="참고문서 DB에 추가"
                      >
                        <i className="ri-database-2-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
      </div>

      {/* 편집 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingNotice?.id ? '공지사항 수정' : '새 공지사항 작성'}
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    value={editingNotice?.title || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select
                    value={editingNotice?.category || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  >
                    {categories.filter(c => c !== '전체').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={editingNotice?.content || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 파일 첨부 섹션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">첨부파일</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-upload-cloud-2-line text-3xl text-gray-400"></i>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      파일 선택
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PDF, DOC, XLS, PPT, 이미지 파일 등 (최대 10MB)</p>
                  </div>

                  {/* 첨부된 파일 목록 */}
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">첨부된 파일</h4>
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded mr-3">
                              <i className="ri-file-line text-blue-600"></i>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-xs text-gray-500">{file.size}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="w-6 h-6 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingNotice?.isImportant || false}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isImportant: e.target.checked })}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">중요 공지사항</span>
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
