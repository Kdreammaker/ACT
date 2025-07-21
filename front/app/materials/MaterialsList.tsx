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
    thumbnail: 'https://readdy.ai/api/search-image?query=corporate%20promotional%20video%20thumbnail%2C%20company%20introduction%20video%20cover%2C%20business%20marketing%20material%20design%2C%20professional%20video%20presentation&width=300&height=200&seq=mat8&orientation=landscape'
  }
];

const materialTypes = ['전체', '회사소개서', 'IR자료', '제품소개', '브로셔', '보고서', '영상자료', 'ESG'];

export default function MaterialsList() {
  const [selectedType, setSelectedType] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  const filteredMaterials = allMaterials.filter(material => {
    const matchesType = selectedType === '전체' || material.type === selectedType;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage);

  const handleDownload = (material: any) => {
    console.log(`다운로드: ${material.title}`);
    alert(`${material.title} 파일을 다운로드합니다.`);
  };

  const handlePreview = (material: any) => {
    console.log(`미리보기: ${material.title}`);
    alert(`${material.title} 미리보기를 엽니다.`);
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
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
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded font-medium">
                  {material.format}
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
                  onClick={() => handlePreview(material)}
                  className="flex-1 border border-orange-600 text-orange-600 py-2 px-3 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  미리보기
                </button>
                <button
                  onClick={() => handleDownload(material)}
                  className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-download-line"></i>
                  </div>
                  다운로드
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