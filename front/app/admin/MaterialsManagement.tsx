
'use client';

import { useState } from 'react';

const allMaterials = [
  {
    id: 1,
    title: '2024년 회사소개서',
    description: '회사 개요, 사업현황, 미래 전략이 포함된 종합 소개자료',
    date: '2024.01.15',
    type: '회사소개서',
    format: 'PDF',
    fileSize: '8.5MB',
    downloadCount: 2341,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=modern%20corporate%20presentation%20brochure%20cover%20design%20with%20blue%20theme%2C%20professional%20business%20document%20layout%2C%20clean%20minimalist%20style%2C%20company%20profile%20book%20cover&width=300&height=200&seq=mat1&orientation=landscape'
  },
  {
    id: 2,
    title: 'IR 프레젠테이션',
    description: '투자자 대상 사업현황 및 재무성과 발표자료',
    date: '2024.01.12',
    type: 'IR자료',
    format: 'PPT',
    fileSize: '12.3MB',
    downloadCount: 1876,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=investor%20relations%20presentation%20slides%20template%2C%20financial%20charts%20and%20graphs%2C%20business%20growth%20infographics%2C%20professional%20corporate%20design&width=300&height=200&seq=mat2&orientation=landscape'
  },
  {
    id: 3,
    title: '제품 카탈로그',
    description: '주요 제품 및 서비스 소개 카탈로그',
    date: '2024.01.10',
    type: '제품소개',
    format: 'PDF',
    fileSize: '15.7MB',
    downloadCount: 1542,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=product%20catalog%20design%20layout%2C%20technology%20products%20showcase%2C%20professional%20brochure%20template%2C%20modern%20industrial%20design%20catalog&width=300&height=200&seq=mat3&orientation=landscape'
  },
  {
    id: 4,
    title: '기업 브로셔',
    description: '기업 문화, 비전, 핵심가치를 담은 브로셔',
    date: '2024.01.08',
    type: '브로셔',
    format: 'PDF',
    fileSize: '6.2MB',
    downloadCount: 987,
    status: 'draft',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=corporate%20brochure%20design%2C%20company%20culture%20and%20values%20presentation%2C%20modern%20business%20leaflet%20layout%2C%20professional%20tri-fold%20brochure&width=300&height=200&seq=mat4&orientation=landscape'
  },
  {
    id: 5,
    title: '연차보고서',
    description: '2023년 연차보고서 (Annual Report)',
    date: '2024.01.05',
    type: '보고서',
    format: 'PDF',
    fileSize: '18.9MB',
    downloadCount: 3421,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=annual%20report%20cover%20design%2C%20corporate%20financial%20report%20layout%2C%20professional%20business%20document%20design%2C%20yearly%20performance%20report&width=300&height=200&seq=mat5&orientation=landscape'
  },
  {
    id: 6,
    title: '투자설명회 영상',
    description: '2024년 투자설명회 하이라이트 영상',
    date: '2024.01.03',
    type: '영상자료',
    format: 'MP4',
    fileSize: '245MB',
    downloadCount: 654,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=investment%20presentation%20video%20thumbnail%2C%20corporate%20meeting%20room%20setup%2C%20business%20conference%20presentation%2C%20professional%20video%20cover%20design&width=300&height=200&seq=mat6&orientation=landscape'
  },
  {
    id: 7,
    title: '지속가능경영 보고서',
    description: 'ESG 경영 성과 및 지속가능경영 현황 보고서',
    date: '2023.12.28',
    type: 'ESG',
    format: 'PDF',
    fileSize: '11.4MB',
    downloadCount: 1234,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=sustainability%20report%20cover%20design%2C%20ESG%20corporate%20responsibility%20document%2C%20environmental%20business%20report%20layout%2C%20green%20corporate%20design&width=300&height=200&seq=mat7&orientation=landscape'
  },
  {
    id: 8,
    title: '기업 홍보영상',
    description: '회사 소개 및 비전을 담은 홍보영상',
    date: '2023.12.25',
    type: '영상자료',
    format: 'MP4',
    fileSize: '187MB',
    downloadCount: 2156,
    status: 'published',
    createdBy: '관리자',
    thumbnail: 'https://readdy.ai/api/search-image?query=corporate%20promotional%20video%20thumbnail%2C%20company%20introduction%20video%20cover%2C%20business%20marketing%20material%20design%2C%20professional%20video%20presentation&width=300&height=200&seq=mat8&orientation=landscape'
  }
];

const materialTypes = ['전체', '회사소개서', 'IR자료', '제품소개', '브로셔', '보고서', '영상자료', 'ESG'];
const statusOptions = ['전체', 'draft', 'published'];

export default function MaterialsManagement() {
  const [materials, setMaterials] = useState(allMaterials);
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [materialForm, setMaterialForm] = useState({
    title: '',
    description: '',
    type: '회사소개서',
    format: 'PDF',
    content: '',
    file: null as File | null,
    thumbnail: null as File | null
  });
  const itemsPerPage = 9;

  const filteredMaterials = materials.filter(material => {
    const matchesType = selectedType === '전체' || material.type === selectedType;
    const matchesStatus = selectedStatus === '전체' || material.status === selectedStatus;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateMaterial = () => {
    setMaterialForm({
      title: '',
      description: '',
      type: '회사소개서',
      format: 'PDF',
      content: '',
      file: null,
      thumbnail: null
    });
    setShowMaterialModal(true);
  };

  const handleSaveMaterial = () => {
    const newMaterial = {
      id: materials.length + 1,
      ...materialForm,
      date: new Date().toLocaleDateString('ko-KR').replace(/\\. /g, '.').replace('.', ''),
      fileSize: materialForm.file ? `${(materialForm.file.size / (1024 * 1024)).toFixed(1)}MB` : '0KB',
      downloadCount: 0,
      status: 'published',
      createdBy: '관리자',
      thumbnail: 'https://readdy.ai/api/search-image?query=corporate%20document%20cover%20design%2C%20professional%20business%20material%20layout%2C%20modern%20presentation%20design&width=300&height=200&seq=new_material&orientation=landscape'
    };

    setMaterials([newMaterial, ...materials]);

    // 참고문서 DB에 자동 등록
    addToReferenceDB({
      title: newMaterial.title,
      description: newMaterial.description,
      source: '홍보자료',
      tag: '홍보자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: newMaterial.date,
      fileSize: newMaterial.fileSize,
      usageCount: 0,
      lastUsed: '-'
    });

    setShowMaterialModal(false);
    alert('홍보자료가 등록되었습니다.');
  };

  // 참고문서 DB에 추가하는 함수
  const addToReferenceDB = (document: any) => {
    console.log('참고문서 DB에 추가:', document);
    // 실제 구현에서는 전역 상태나 API 호출을 통해 참고문서 DB에 추가
  };

  const handleViewDetail = (material: any) => {
    setSelectedMaterial(material);
    setShowDetailModal(true);
  };

  const handleDeleteMaterial = (id: number) => {
    if (confirm('홍보자료를 삭제하시겠습니까?')) {
      setMaterials(materials.filter(material => material.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMaterialForm({...materialForm, file});
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMaterialForm({...materialForm, thumbnail: file});
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
          <h1 className="text-2xl font-bold text-gray-900">홍보자료 관리</h1>
          <p className="text-gray-600 mt-1">기업 소개 및 투자 관련 홍보자료를 관리합니다</p>
        </div>
        <button
          onClick={handleCreateMaterial}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-medium whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          새 홍보자료 등록
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 홍보자료</p>
              <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-folder-line text-orange-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">영상 자료</p>
              <p className="text-2xl font-bold text-purple-600">{materials.filter(m => m.type === '영상자료').length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-video-line text-purple-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">이번달 등록</p>
              <p className="text-2xl font-bold text-blue-600">{materials.filter(m => m.date.includes('2024.01')).length}</p>
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
              <p className="text-2xl font-bold text-green-600">{materials.reduce((sum, m) => sum + m.downloadCount, 0).toLocaleString()}</p>
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
            {materialTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-orange-600 text-white'
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm pr-8"
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
                placeholder="홍보자료 검색"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 홍보자료 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={material.thumbnail}
                alt={material.title}
                className="w-full h-48 object-cover object-top"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {material.type}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex space-x-2">
                <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded font-medium">
                  {material.format}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(material.status)}`}>
                  {getStatusLabel(material.status)}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {material.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {material.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{material.date}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 flex items-center justify-center mr-1">
                      <i className="ri-file-text-line"></i>
                    </div>
                    {material.fileSize}
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 flex items-center justify-center mr-1">
                      <i className="ri-download-line"></i>
                    </div>
                    {material.downloadCount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDetail(material)}
                  className="flex-1 border border-orange-600 text-orange-600 py-2 px-3 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  상세보기
                </button>
                <button
                  onClick={() => addToReferenceDB({
                    title: material.title,
                    description: material.description,
                    source: '홍보자료',
                    tag: '홍보자료',
                    isActive: material.status === 'published',
                    uploadedBy: '관리자',
                    uploadDate: material.date,
                    fileSize: material.fileSize,
                    usageCount: 0,
                    lastUsed: '-'
                  })}
                  className="w-10 h-10 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="참고문서 DB에 추가"
                >
                  <i className="ri-database-2-line"></i>
                </button>
                <button
                  onClick={() => handleDeleteMaterial(material.id)}
                  className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="삭제"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
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
                    ? 'bg-orange-600 text-white'
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

      {/* 홍보자료 등록 모달 */}
      {showMaterialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">새 홍보자료 등록</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">자료 구분</label>
                  <select
                    value={materialForm.type}
                    onChange={(e) => setMaterialForm({...materialForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 pr-8"
                  >
                    {materialTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">파일 형식</label>
                  <select
                    value={materialForm.format}
                    onChange={(e) => setMaterialForm({...materialForm, format: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 pr-8"
                  >
                    <option value="PDF">PDF</option>
                    <option value="PPT">PPT</option>
                    <option value="MP4">MP4</option>
                    <option value="DOC">DOC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm({...materialForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="홍보자료 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <input
                  type="text"
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm({...materialForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="홍보자료에 대한 간단한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={materialForm.content}
                  onChange={(e) => setMaterialForm({...materialForm, content: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="홍보자료 내용을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">썸네일 이미지</label>
                <input
                  type="file"
                  onChange={handleThumbnailUpload}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG 파일만 업로드 가능합니다. (권장 크기: 300x200px)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 첨부</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  PDF, Word, PowerPoint, MP4 파일만 업로드 가능합니다. (최대 500MB)
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowMaterialModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSaveMaterial}
                disabled={!materialForm.title.trim() || !materialForm.description.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 홍보자료 상세 보기 모달 */}
      {showDetailModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">홍보자료 상세 정보</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedMaterial.status)}`}>
                  {getStatusLabel(selectedMaterial.status)}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex space-x-6">
                <div className="w-64 flex-shrink-0">
                  <img
                    src={selectedMaterial.thumbnail}
                    alt={selectedMaterial.title}
                    className="w-full h-40 object-cover object-top rounded-lg border border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">자료 구분</label>
                      <p className="text-sm text-gray-900">{selectedMaterial.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">파일 형식</label>
                      <p className="text-sm text-gray-900">{selectedMaterial.format}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">등록일</label>
                      <p className="text-sm text-gray-900">{selectedMaterial.date}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">파일 크기</label>
                      <p className="text-sm text-gray-900">{selectedMaterial.fileSize}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">다운로드 수</label>
                      <p className="text-sm text-gray-900">{selectedMaterial.downloadCount.toLocaleString()}회</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">등록자</label>
                      <p className="text-sm text-gray-900">{selectedMaterial.createdBy}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <p className="text-gray-900 font-medium">{selectedMaterial.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <p className="text-gray-900">{selectedMaterial.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일</label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center mr-3">
                        <i className={`${selectedMaterial.format === 'MP4' ? 'ri-video-line' : 'ri-file-text-line'} text-orange-600`}></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedMaterial.title}.{selectedMaterial.format.toLowerCase()}</p>
                        <p className="text-sm text-gray-600">{selectedMaterial.fileSize}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
                        미리보기
                      </button>
                      <button className="text-orange-600 hover:text-orange-700 text-sm font-medium whitespace-nowrap">
                        다운로드
                      </button>
                    </div>
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

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-folder-open-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 카테고리를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}
