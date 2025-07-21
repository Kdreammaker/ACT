
'use client';

import { useState } from 'react';

const mockAnnouncements = [
  {
    id: 1,
    title: '제27기 정기주주총회 소집공고',
    content: '주식회사 IRConnect 제27기 정기주주총회를 다음과 같이 개최하오니 참석하여 주시기 바랍니다.',
    category: '주주총회',
    isLegal: true,
    status: 'published',
    publishDate: '2024.01.20',
    publishTime: '09:00',
    views: 2340,
    author: '관리자',
    createdAt: '2024.01.20'
  },
  {
    id: 2,
    title: '유상증자 결정 공고',
    content: '제3자배정 유상증자 결정에 관하여 상법 제418조에 의거 공고합니다.',
    category: '증자',
    isLegal: true,
    status: 'scheduled',
    publishDate: '2024.01.25',
    publishTime: '14:30',
    views: 0,
    author: '관리자',
    createdAt: '2024.01.18'
  }
];

const categories = ['주주총회', '증자', '합병', '감자', '임원', '영업양수', '배당', '채권자보호'];

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [saveType, setSaveType] = useState<'draft' | 'publish' | 'schedule'>('draft');
  const itemsPerPage = 10;

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === '전체' || announcement.category === selectedCategory;
    const matchesType = selectedType === '전체' || 
                       (selectedType === '법정공고' && announcement.isLegal) ||
                       (selectedType === '일반공고' && !announcement.isLegal);
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement({ ...announcement });
    setShowEditModal(true);
  };

  const handleSave = (type: 'draft' | 'publish' | 'schedule') => {
    const now = new Date();
    const publishDateTime = new Date(`${editingAnnouncement.publishDate} ${editingAnnouncement.publishTime || '00:00'}`);
    
    let status = type;
    if (type === 'schedule') {
      status = publishDateTime <= now ? 'published' : 'scheduled';
    } else if (type === 'publish') {
      status = 'published';
    } else {
      status = 'draft';
    }

    if (editingAnnouncement.id) {
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id 
          ? { ...editingAnnouncement, status, updatedAt: new Date().toLocaleDateString('ko-KR') }
          : a
      ));
    } else {
      const newAnnouncement = {
        ...editingAnnouncement,
        id: Date.now(),
        status,
        views: 0,
        author: '관리자',
        createdAt: new Date().toLocaleDateString('ko-KR')
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    setShowEditModal(false);
    setEditingAnnouncement(null);
    setSaveType('draft');
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 이 공고를 삭제하시겠습니까?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleNewAnnouncement = () => {
    setEditingAnnouncement({
      id: null,
      title: '',
      content: '',
      category: '주주총회',
      isLegal: true,
      status: 'draft',
      publishDate: new Date().toISOString().split('T')[0],
      publishTime: '09:00'
    });
    setShowEditModal(true);
  };

  const getStatusBadge = (status: string, publishDate: string, publishTime: string) => {
    const now = new Date();
    const pubDateTime = new Date(`${publishDate} ${publishTime || '00:00'}`);
    
    switch (status) {
      case 'published':
        return <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">게시됨</span>;
      case 'scheduled':
        return pubDateTime > now ? 
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">예약됨</span> :
          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">게시됨</span>;
      case 'draft':
        return <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">임시저장</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">숨김</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">전자공고 관리</h1>
          <p className="text-gray-600 mt-1">법정 공고 및 일반 공고를 관리할 수 있습니다</p>
        </div>
        <button
          onClick={handleNewAnnouncement}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium whitespace-nowrap flex items-center"
        >
          <div className="w-4 h-4 flex items-center justify-center mr-2">
            <i className="ri-add-line"></i>
          </div>
          새 공고 작성
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 공고</p>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-megaphone-line text-red-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">법정공고</p>
              <p className="text-2xl font-bold text-red-600">{announcements.filter(a => a.isLegal).length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-scales-3-line text-red-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">게시됨</p>
              <p className="text-2xl font-bold text-green-600">{announcements.filter(a => a.status === 'published').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">예약발행</p>
              <p className="text-2xl font-bold text-blue-600">{announcements.filter(a => a.status === 'scheduled').length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">임시저장</p>
              <p className="text-2xl font-bold text-yellow-600">{announcements.filter(a => a.status === 'draft').length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-draft-line text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="공고 제목으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedType === type
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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('전체')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === '전체'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
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
          </div>
        </div>
      </div>

      {/* 공고 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">제목</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">분류</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-40">발행 일시</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">조회수</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">관리</th>
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
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(announcement.status, announcement.publishDate, announcement.publishTime)}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <div>{announcement.publishDate}</div>
                    <div className="text-xs text-gray-400">{announcement.publishTime}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {announcement.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded cursor-pointer"
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
      </div>

      {/* 편집 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingAnnouncement?.id ? '공고 수정' : '새 공고 작성'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={editingAnnouncement?.title || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select
                    value={editingAnnouncement?.category || ''}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공고 유형</label>
                  <select
                    value={editingAnnouncement?.isLegal ? 'legal' : 'general'}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, isLegal: e.target.value === 'legal' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                  >
                    <option value="legal">법정공고</option>
                    <option value="general">일반공고</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">발행일</label>
                  <input
                    type="date"
                    value={editingAnnouncement?.publishDate || ''}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, publishDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">발행시간</label>
                  <input
                    type="time"
                    value={editingAnnouncement?.publishTime || ''}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, publishTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={editingAnnouncement?.content || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleSave('draft')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium whitespace-nowrap flex items-center"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-draft-line"></i>
                  </div>
                  임시저장
                </button>
                <button
                  onClick={() => handleSave('schedule')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap flex items-center"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-time-line"></i>
                  </div>
                  예약발행
                </button>
                <button
                  onClick={() => handleSave('publish')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium whitespace-nowrap flex items-center"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-send-plane-line"></i>
                  </div>
                  즉시발행
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredAnnouncements.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-megaphone-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 필터를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}
