'use client';

import { useState } from 'react';

interface TPO {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

export default function TPOManagement() {
  const [tpos, setTpos] = useState<TPO[]>([
    { id: 1, name: '남성데이트', title: '남성과의 데이트', description: '진중하고 매력적인 분위기', icon: 'ri-heart-line', color: 'bg-blue-100 text-blue-600', isActive: true },
    { id: 2, name: '여성데이트', title: '여성과의 데이트', description: '로맨틱하고 우아한 분위기', icon: 'ri-heart-2-line', color: 'bg-pink-100 text-pink-600', isActive: true },
    { id: 3, name: '아버지생신', title: '아버지 생신', description: '정중하고 따뜻한 자리', icon: 'ri-user-heart-line', color: 'bg-green-100 text-green-600', isActive: true },
    { id: 4, name: '어머니생신', title: '어머니 생신', description: '감사와 사랑을 담은 자리', icon: 'ri-heart-3-line', color: 'bg-purple-100 text-purple-600', isActive: true },
    { id: 5, name: '포트럭파티', title: '포트럭 파티', description: '즐겁고 활기찬 모임', icon: 'ri-group-line', color: 'bg-orange-100 text-orange-600', isActive: true },
    { id: 6, name: '상사승진축하', title: '상사 승진 축하', description: '격식있는 축하 자리', icon: 'ri-trophy-line', color: 'bg-yellow-100 text-yellow-600', isActive: true },
    { id: 7, name: '발렌타인데이', title: '발렌타인 데이', description: '특별한 로맨스', icon: 'ri-heart-add-line', color: 'bg-red-100 text-red-600', isActive: true },
    { id: 8, name: '결혼기념일', title: '결혼기념일', description: '소중한 추억의 날', icon: 'ri-heart-pulse-line', color: 'bg-indigo-100 text-indigo-600', isActive: true },
    { id: 9, name: '비오는날', title: '비오는 날', description: '차분하고 포근한 분위기', icon: 'ri-rainy-line', color: 'bg-gray-100 text-gray-600', isActive: true },
    { id: 10, name: '눈오는날', title: '눈오는 날', description: '낭만적인 겨울 정취', icon: 'ri-snowy-line', color: 'bg-blue-100 text-blue-600', isActive: false }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTPO, setEditingTPO] = useState<TPO | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    icon: 'ri-heart-line',
    color: 'bg-blue-100 text-blue-600'
  });

  const iconOptions = [
    'ri-heart-line', 'ri-heart-2-line', 'ri-heart-3-line', 'ri-heart-add-line', 'ri-heart-pulse-line',
    'ri-user-heart-line', 'ri-group-line', 'ri-trophy-line', 'ri-calendar-event-line', 'ri-gift-line',
    'ri-rainy-line', 'ri-snowy-line', 'ri-sun-line', 'ri-moon-line', 'ri-star-line'
  ];

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-600', label: '파란색' },
    { value: 'bg-pink-100 text-pink-600', label: '분홍색' },
    { value: 'bg-green-100 text-green-600', label: '초록색' },
    { value: 'bg-purple-100 text-purple-600', label: '보라색' },
    { value: 'bg-orange-100 text-orange-600', label: '주황색' },
    { value: 'bg-yellow-100 text-yellow-600', label: '노란색' },
    { value: 'bg-red-100 text-red-600', label: '빨간색' },
    { value: 'bg-indigo-100 text-indigo-600', label: '남색' },
    { value: 'bg-gray-100 text-gray-600', label: '회색' }
  ];

  const handleAdd = () => {
    setEditingTPO(null);
    setFormData({ name: '', title: '', description: '', icon: 'ri-heart-line', color: 'bg-blue-100 text-blue-600' });
    setShowModal(true);
  };

  const handleEdit = (tpo: TPO) => {
    setEditingTPO(tpo);
    setFormData({
      name: tpo.name,
      title: tpo.title,
      description: tpo.description,
      icon: tpo.icon,
      color: tpo.color
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTPO) {
      setTpos(prev => prev.map(tpo => 
        tpo.id === editingTPO.id 
          ? { ...tpo, ...formData }
          : tpo
      ));
    } else {
      const newTPO: TPO = {
        id: Math.max(...tpos.map(t => t.id)) + 1,
        ...formData,
        isActive: true
      };
      setTpos(prev => [...prev, newTPO]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setTpos(prev => prev.filter(tpo => tpo.id !== id));
    }
  };

  const toggleActive = (id: number) => {
    setTpos(prev => prev.map(tpo => 
      tpo.id === id 
        ? { ...tpo, isActive: !tpo.isActive }
        : tpo
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">총 {tpos.length}개의 TPO가 등록되어 있습니다.</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium"
        >
          <i className="ri-add-line mr-2"></i>
          TPO 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tpos.map((tpo) => (
          <div key={tpo.id} className={`bg-white rounded-xl border-2 p-6 ${tpo.isActive ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${tpo.color} rounded-full flex items-center justify-center`}>
                <i className={`${tpo.icon} text-xl`}></i>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${tpo.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {tpo.isActive ? '활성' : '비활성'}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{tpo.title}</h3>
            <p className="text-sm text-gray-600 mb-2">ID: {tpo.name}</p>
            <p className="text-sm text-gray-700 mb-4">{tpo.description}</p>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleActive(tpo.id)}
                className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer whitespace-nowrap ${
                  tpo.isActive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {tpo.isActive ? '비활성화' : '활성화'}
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(tpo)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                >
                  <i className="ri-edit-line"></i>
                </button>
                <button
                  onClick={() => handleDelete(tpo.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                >
                  <i className="ri-delete-line"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {editingTPO ? 'TPO 수정' : 'TPO 추가'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TPO ID</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="예: 남성데이트"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">표시명</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="예: 남성과의 데이트"
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
                  placeholder="TPO에 대한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">아이콘</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  required
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">색상</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  required
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
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
                  {editingTPO ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}