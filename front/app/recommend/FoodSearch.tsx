
'use client';

import { useState } from 'react';

interface FoodSearchProps {
  onFoodSelect: (food: string) => void;
}

export default function FoodSearch({ onFoodSelect }: FoodSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const popularFoods = [
    { name: '삼겹살', category: '한식', emoji: '🥓' },
    { name: '치킨', category: '양식', emoji: '🍗' },
    { name: '피자', category: '양식', emoji: '🍕' },
    { name: '타코', category: '멕시코', emoji: '🌮' },
    { name: '햄버거', category: '패스트푸드', emoji: '🍔' },
    { name: '스테이크', category: '양식', emoji: '🥩' },
    { name: '치킨너겟', category: '패스트푸드', emoji: '🍗' },
    { name: '볶음밥', category: '한식', emoji: '🍛' },
    { name: '라멘', category: '일식', emoji: '🍜' },
    { name: '파스타', category: '양식', emoji: '🍝' },
    { name: '김치찌개', category: '한식', emoji: '🍲' },
    { name: '곱창', category: '한식', emoji: '🥘' }
  ];

  const filteredFoods = popularFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onFoodSelect(searchTerm.trim());
    }
  };

  const handleRecommendationRequest = () => {
    window.open('https://forms.gle/example-recommendation-request', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          어떤 음식과 함께하시나요?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          음식 이름을 검색하거나 아래 인기 메뉴에서 선택해주세요. 
          30초 만에 최고의 맥주 페어링을 찾아드릴게요!
        </p>
      </div>

      {/* Search Form */}
      <div className="mb-12">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="음식 이름을 입력해주세요 (예: 삼겹살, 치킨, 피자...)"
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-search-line text-lg"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Popular Foods Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          인기 메뉴에서 선택하기
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFoods.map((food, index) => (
            <button
              key={index}
              onClick={() => onFoodSelect(food.name)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-yellow-200 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {food.emoji}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{food.name}</h3>
              <p className="text-sm text-gray-500">{food.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && filteredFoods.length === 0 && (
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <i className="ri-search-line text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-500 mb-6">
            '{searchTerm}'에 대한 결과를 찾을 수 없어요. 
            새로운 음식 추천을 요청해보시거나 다른 음식명으로 검색해보세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRecommendationRequest}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap font-semibold"
            >
              <i className="ri-mail-send-line mr-2"></i>
              추천 요청하기
            </button>
            <button
              onClick={() => onFoodSelect(searchTerm)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              '{searchTerm}' 맥주 추천받기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
