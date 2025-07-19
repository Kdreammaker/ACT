
'use client';

import { useState } from 'react';

interface Food {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  category: string;
  ingredients: string;
  cookingMethod: string;
  flavor: string;
  isActive: boolean;
}

export default function FoodManagement() {
  const [foods, setFoods] = useState<Food[]>([
    { 
      id: 1, 
      name: '삼겹살', 
      country: '한국', 
      description: '고소하고 기름진 맛', 
      image: 'https://readdy.ai/api/search-image?query=Korean-pork-belly&width=300&height=200&seq=1&orientation=landscape', 
      category: '메인', 
      ingredients: '돼지고기, 마늘, 양파',
      cookingMethod: '구이',
      flavor: '고소함, 기름진맛, 담백함',
      isActive: true 
    },
    { 
      id: 2, 
      name: '김치찌개', 
      country: '한국', 
      description: '매콤하고 깊은 맛', 
      image: 'https://readdy.ai/api/search-image?query=Korean-kimchi-stew&width=300&height=200&seq=2&orientation=landscape', 
      category: '메인', 
      ingredients: '김치, 돼지고기, 두부, 대파',
      cookingMethod: '끓임',
      flavor: '매운맛, 신맛, 감칠맛',
      isActive: true 
    },
    { 
      id: 3, 
      name: '피자', 
      country: '이탈리아', 
      description: '치즈와 토마토의 완벽한 조화', 
      image: 'https://readdy.ai/api/search-image?query=Italian-pizza&width=300&height=200&seq=3&orientation=landscape', 
      category: '메인', 
      ingredients: '밀가루, 치즈, 토마토소스, 올리브오일',
      cookingMethod: '오븐구이',
      flavor: '짠맛, 고소함, 허브향',
      isActive: true 
    },
    { 
      id: 4, 
      name: '라면', 
      country: '일본', 
      description: '진한 국물과 쫄깃한 면발', 
      image: 'https://readdy.ai/api/search-image?query=Japanese-ramen&width=300&height=200&seq=4&orientation=landscape', 
      category: '메인', 
      ingredients: '면, 돼지뼈, 미소, 파',
      cookingMethod: '끓임',
      flavor: '진한맛, 짠맛, 감칠맛',
      isActive: true 
    },
    { 
      id: 5, 
      name: '호떡', 
      country: '한국', 
      description: '달콤한 설탕과 견과류 디저트', 
      image: 'https://readdy.ai/api/search-image?query=Korean-hotteok&width=300&height=200&seq=5&orientation=landscape', 
      category: '디저트', 
      ingredients: '밀가루, 설탕, 견과류, 계피',
      cookingMethod: '부침',
      flavor: '단맛, 고소함, 바삭함',
      isActive: false 
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [csvData, setCsvData] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    image: '',
    category: '메인',
    ingredients: '',
    cookingMethod: '',
    flavor: ''
  });

  const categories = ['메인', '사이드', '디저트', '음료'];

  const handleAdd = () => {
    setEditingFood(null);
    setFormData({ 
      name: '', 
      country: '', 
      description: '', 
      image: '', 
      category: '메인',
      ingredients: '',
      cookingMethod: '',
      flavor: ''
    });
    setShowModal(true);
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      country: food.country,
      description: food.description,
      image: food.image,
      category: food.category,
      ingredients: food.ingredients,
      cookingMethod: food.cookingMethod,
      flavor: food.flavor
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingFood) {
      setFoods(prev => prev.map(food =>
        food.id === editingFood.id
          ? { ...food, ...formData }
          : food
      ));
    } else {
      const newFood: Food = {
        id: Math.max(...foods.map(f => f.id)) + 1,
        ...formData,
        isActive: true
      };
      setFoods(prev => [...prev, newFood]);
    }

    setShowModal(false);
  };

  const handleCsvUpload = () => {
    if (!csvData.trim()) return;

    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const newFoods: Food[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= 8) {
        const food: Food = {
          id: Math.max(...foods.map(f => f.id), 0) + newFoods.length + 1,
          name: values[0] || '',
          country: values[1] || '',
          category: values[2] || '메인',
          ingredients: values[3] || '',
          cookingMethod: values[4] || '',
          flavor: values[5] || '',
          description: values[6] || '',
          image: values[7] || '',
          isActive: true
        };
        newFoods.push(food);
      }
    }

    setFoods(prev => [...prev, ...newFoods]);
    setShowCsvModal(false);
    setCsvData('');
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setFoods(prev => prev.filter(food => food.id !== id));
    }
  };

  const toggleActive = (id: number) => {
    setFoods(prev => prev.map(food =>
      food.id === id
        ? { ...food, isActive: !food.isActive }
        : food
    ));
  };

  const exportCsv = () => {
    const headers = ['음식명', '국가', '카테고리', '주요재료', '요리법', '향미', '설명', '이미지URL', '활성상태'];
    const csvContent = [
      headers.join(','),
      ...foods.map(food => [
        food.name,
        food.country,
        food.category,
        food.ingredients,
        food.cookingMethod,
        food.flavor,
        food.description,
        food.image,
        food.isActive ? '활성' : '비활성'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '음식목록.csv';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">총 {foods.length}개의 음식이 등록되어 있습니다.</p>
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
            음식 추가
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food.id} className={`bg-white rounded-xl border-2 overflow-hidden ${food.isActive ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
            <div className="aspect-video bg-gray-100">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${food.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {food.isActive ? '활성' : '비활성'}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {food.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{food.country}</p>
              <p className="text-sm text-gray-700 mb-4">{food.description}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleActive(food.id)}
                  className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer whitespace-nowrap ${
                    food.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {food.isActive ? '비활성화' : '활성화'}
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(food)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
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
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">CSV 파일로 음식 대량 등록</h3>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">CSV 형식 안내</h4>
              <p className="text-sm text-gray-600 mb-2">첫 번째 줄은 헤더이며, 다음 순서로 입력해주세요:</p>
              <code className="text-xs bg-white p-2 rounded border block">
                음식명,국가,카테고리,주요재료,요리법,향미,설명,이미지URL<br/>
                삼겹살,한국,메인,돼지고기&양파&마늘,구이,고소함&기름진맛,고소하고 기름진 맛,https://example.com/image.jpg<br/>
                피자,이탈리아,메인,밀가루&치즈&토마토소스,오븐구이,짠맛&고소함&허브향,치즈와 토마토의 조화,https://example.com/pizza.jpg
              </code>
              <p className="text-xs text-gray-500 mt-2">
                * 주요재료, 향미는 &으로 구분하여 입력<br/>
                * 주요재료, 요리법, 향미는 내부 매칭용 데이터로 사용자 페이지에 노출되지 않음
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">CSV 데이터</label>
              <textarea
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                rows={10}
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
              {editingFood ? '음식 수정' : '음식 추가'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">음식명 (제품명)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="음식명을 입력하세요"
                />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">주요 재료 <span className="text-xs text-gray-500">(내부 매칭용)</span></label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="예: 돼지고기, 양파, 마늘"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">요리법 <span className="text-xs text-gray-500">(내부 매칭용)</span></label>
                <input
                  type="text"
                  value={formData.cookingMethod}
                  onChange={(e) => setFormData(prev => ({ ...prev, cookingMethod: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="예: 구이, 끓임, 튀김"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">향미 <span className="text-xs text-gray-500">(내부 매칭용)</span></label>
                <input
                  type="text"
                  value={formData.flavor}
                  onChange={(e) => setFormData(prev => ({ ...prev, flavor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="예: 고소함, 매운맛, 짠맛"
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
                  placeholder="음식에 대한 설명을 입력하세요"
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
                  {editingFood ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
