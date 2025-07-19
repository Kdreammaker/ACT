
'use client';

import { useState } from 'react';

interface Alcohol {
  id: number;
  name: string;
  brewery: string;
  type: string;
  style: string;
  country: string;
  abv: number;
  ibu?: number;
  description: string;
  flavors: string[];
  image: string;
  isActive: boolean;
}

export default function BeerManagement() {
  const [alcohols, setAlcohols] = useState<Alcohol[]>([
    { id: 1, name: '하이트 진로', brewery: '하이트진로', type: '맥주', style: '라거', country: '한국', abv: 4.5, ibu: 12, description: '깔끔하고 시원한 맛의 대표 국산 맥주', flavors: ['깔끔함', '시원함', '가벼움'], image: 'https://readdy.ai/api/search-image?query=Korean-beer-bottle&width=300&height=400&seq=1&orientation=portrait', isActive: true },
    { id: 2, name: '카스', brewery: 'OB맥주', type: '맥주', style: '라거', country: '한국', abv: 4.5, ibu: 10, description: '부드럽고 깔끔한 목 넘김', flavors: ['부드러움', '깔끔함'], image: 'https://readdy.ai/api/search-image?query=Korean-Cass-beer&width=300&height=400&seq=2&orientation=portrait', isActive: true },
    { id: 3, name: '아사히 슈퍼드라이', brewery: '아사히', type: '맥주', style: '라거', country: '일본', abv: 5.0, ibu: 16, description: '드라이하고 깔끔한 일본 대표 맥주', flavors: ['드라이함', '깔끔함', '상쾌함'], image: 'https://readdy.ai/api/search-image?query=Asahi-Super-Dry-beer&width=300&height=400&seq=3&orientation=portrait', isActive: true },
    { id: 4, name: '샤또 마고 2018', brewery: '샤또 마고', type: '와인', style: '까베르네 소비뇽', country: '프랑스', abv: 13.5, description: '보르도 최고급 와인', flavors: ['떫은맛', '과일향', '복합미'], image: 'https://readdy.ai/api/search-image?query=French-bordeaux-wine-bottle&width=300&height=400&seq=4&orientation=portrait', isActive: true },
    { id: 5, name: '맥캘란 18년', brewery: '맥캘란', type: '위스키', style: '싱글몰트', country: '스코틀랜드', abv: 43.0, description: '깊고 풍부한 셰리캐스크 숙성', flavors: ['견과류', '바닐라', '스모키함'], image: 'https://readdy.ai/api/search-image?query=Macallan-whisky-bottle&width=300&height=400&seq=5&orientation=portrait', isActive: true }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [editingAlcohol, setEditingAlcohol] = useState<Alcohol | null>(null);
  const [csvData, setCsvData] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brewery: '',
    type: '맥주',
    style: '',
    country: '',
    abv: 0,
    ibu: 0,
    description: '',
    flavors: '',
    image: ''
  });

  const alcoholTypes = ['맥주', '와인', '위스키', '브랜디', '보드카', '진', '럼', '데킬라', '사케', '소주', '기타'];

  const handleAdd = () => {
    setEditingAlcohol(null);
    setFormData({ name: '', brewery: '', type: '맥주', style: '', country: '', abv: 0, ibu: 0, description: '', flavors: '', image: '' });
    setShowModal(true);
  };

  const handleEdit = (alcohol: Alcohol) => {
    setEditingAlcohol(alcohol);
    setFormData({
      name: alcohol.name,
      brewery: alcohol.brewery,
      type: alcohol.type,
      style: alcohol.style,
      country: alcohol.country,
      abv: alcohol.abv,
      ibu: alcohol.ibu || 0,
      description: alcohol.description,
      flavors: alcohol.flavors.join(', '),
      image: alcohol.image
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const alcoholData = {
      ...formData,
      flavors: formData.flavors.split(',').map(f => f.trim()).filter(f => f),
      ibu: formData.type === '맥주' ? formData.ibu : undefined
    };
    
    if (editingAlcohol) {
      setAlcohols(prev => prev.map(alcohol => 
        alcohol.id === editingAlcohol.id 
          ? { ...alcohol, ...alcoholData }
          : alcohol
      ));
    } else {
      const newAlcohol: Alcohol = {
        id: Math.max(...alcohols.map(a => a.id)) + 1,
        ...alcoholData,
        isActive: true
      };
      setAlcohols(prev => [...prev, newAlcohol]);
    }
    
    setShowModal(false);
  };

  const handleCsvUpload = () => {
    if (!csvData.trim()) return;
    
    const lines = csvData.trim().split('\n');
    const newAlcohols: Alcohol[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= 8) {
        const alcohol: Alcohol = {
          id: Math.max(...alcohols.map(a => a.id), 0) + newAlcohols.length + 1,
          name: values[0] || '',
          brewery: values[1] || '',
          type: values[2] || '맥주',
          style: values[3] || '',
          country: values[4] || '',
          abv: parseFloat(values[5]) || 0,
          ibu: values[2] === '맥주' ? parseInt(values[6]) || undefined : undefined,
          description: values[7] || '',
          flavors: values[8] ? values[8].split('|').map(f => f.trim()) : [],
          image: values[9] || '',
          isActive: true
        };
        newAlcohols.push(alcohol);
      }
    }
    
    setAlcohols(prev => [...prev, ...newAlcohols]);
    setShowCsvModal(false);
    setCsvData('');
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setAlcohols(prev => prev.filter(alcohol => alcohol.id !== id));
    }
  };

  const toggleActive = (id: number) => {
    setAlcohols(prev => prev.map(alcohol => 
      alcohol.id === id 
        ? { ...alcohol, isActive: !alcohol.isActive }
        : alcohol
    ));
  };

  const exportCsv = () => {
    const headers = ['술명', '양조장/제조사', '종류', '스타일', '국가', '도수', 'IBU', '설명', '향미', '이미지URL', '활성상태'];
    const csvContent = [
      headers.join(','),
      ...alcohols.map(alcohol => [
        alcohol.name,
        alcohol.brewery,
        alcohol.type,
        alcohol.style,
        alcohol.country,
        alcohol.abv,
        alcohol.ibu || '',
        alcohol.description,
        alcohol.flavors.join('|'),
        alcohol.image,
        alcohol.isActive ? '활성' : '비활성'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '술목록.csv';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">총 {alcohols.length}개의 술이 등록되어 있습니다.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCsvModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium"
          >
            <i className="ri-file-upload-line mr-2"></i>
            CSV 업로드
          </button>
          <button
            onClick={exportCsv}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium"
          >
            <i className="ri-download-line mr-2"></i>
            CSV 내보내기
          </button>
          <button
            onClick={handleAdd}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium"
          >
            <i className="ri-add-line mr-2"></i>
            술 추가
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alcohols.map((alcohol) => (
          <div key={alcohol.id} className={`bg-white rounded-xl border-2 overflow-hidden ${alcohol.isActive ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
            <div className="aspect-[3/4] bg-gray-100">
              <img
                src={alcohol.image}
                alt={alcohol.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{alcohol.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${alcohol.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {alcohol.isActive ? '활성' : '비활성'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{alcohol.brewery}</p>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{alcohol.type}</span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{alcohol.style}</span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{alcohol.country}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>알코올: {alcohol.abv}%</span>
                {alcohol.ibu && <span>IBU: {alcohol.ibu}</span>}
              </div>
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {alcohol.flavors.slice(0, 3).map((flavor, index) => (
                    <span key={index} className="px-1 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">
                      {flavor}
                    </span>
                  ))}
                  {alcohol.flavors.length > 3 && (
                    <span className="px-1 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                      +{alcohol.flavors.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{alcohol.description}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleActive(alcohol.id)}
                  className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer whitespace-nowrap ${
                    alcohol.isActive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {alcohol.isActive ? '비활성화' : '활성화'}
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(alcohol)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(alcohol.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCsvModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">CSV 파일로 술 대량 등록</h3>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">CSV 형식 안내</h4>
              <p className="text-sm text-gray-600 mb-2">첫 번째 줄은 헤더이며, 다음 순서로 입력해주세요:</p>
              <code className="text-xs bg-white p-2 rounded border block">
                술명,양조장/제조사,종류,스타일,국가,도수,IBU,설명,향미(|로구분),이미지URL<br/>
                하이트진로,하이트진로,맥주,라거,한국,4.5,12,깔끔하고 시원한 맛,깔끔함|시원함,https://example.com/beer.jpg<br/>
                맥캘란18년,맥캘란,위스키,싱글몰트,스코틀랜드,43.0,,깊고 풍부한 맛,견과류|바닐라|스모키함,https://example.com/whisky.jpg
              </code>
              <p className="text-xs text-gray-500 mt-2">* IBU는 맥주가 아닌 경우 비워두세요<br/>* 향미는 |로 구분하여 입력하세요</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">CSV 데이터</label>
              <textarea
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                placeholder="CSV 데이터를 붙여넣기 하거나 직접 입력하세요..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowCsvModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleCsvUpload}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                업로드
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {editingAlcohol ? '술 수정' : '술 추가'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">술명</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="술명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">양조장/제조사</label>
                <input
                  type="text"
                  value={formData.brewery}
                  onChange={(e) => setFormData(prev => ({ ...prev, brewery: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="양조장/제조사명을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">종류</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
                  >
                    {alcoholTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">스타일</label>
                  <input
                    type="text"
                    value={formData.style}
                    onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="예: 라거, IPA, 싱글몰트"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">국가</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="국가명을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">알코올 도수 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.abv}
                    onChange={(e) => setFormData(prev => ({ ...prev, abv: parseFloat(e.target.value) || 0 }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="예: 4.5"
                  />
                </div>

                {formData.type === '맥주' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IBU</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={formData.ibu}
                      onChange={(e) => setFormData(prev => ({ ...prev, ibu: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="예: 12"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">향미 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={formData.flavors}
                  onChange={(e) => setFormData(prev => ({ ...prev, flavors: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="예: 깔끔함, 시원함, 과일향"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="술에 대한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이미지 URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="이미지 URL을 입력하세요"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  {editingAlcohol ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
