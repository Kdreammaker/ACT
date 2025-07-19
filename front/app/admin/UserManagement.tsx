'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  age: string;
  gender: string;
  registeredAt: string;
  lastActive: string;
  recommendationCount: number;
  isActive: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '김철수', email: 'chulsoo@gmail.com', country: '대한민국', age: '26-30', gender: '남성', registeredAt: '2024-01-15', lastActive: '2024-12-01', recommendationCount: 23, isActive: true },
    { id: 2, name: '이영희', email: 'younghee@naver.com', country: '대한민국', age: '31-35', gender: '여성', registeredAt: '2024-01-20', lastActive: '2024-11-30', recommendationCount: 18, isActive: true },
    { id: 3, name: 'John Smith', email: 'john@gmail.com', country: 'United States', age: '20-25', gender: '남성', registeredAt: '2024-02-01', lastActive: '2024-11-29', recommendationCount: 31, isActive: true },
    { id: 4, name: '박민수', email: 'minsu@kakao.com', country: '대한민국', age: '36-40', gender: '남성', registeredAt: '2024-02-15', lastActive: '2024-11-28', recommendationCount: 12, isActive: true },
    { id: 5, name: 'Maria Garcia', email: 'maria@email.com', country: 'Spain', age: '26-30', gender: '여성', registeredAt: '2024-03-01', lastActive: '2024-11-27', recommendationCount: 45, isActive: true },
    { id: 6, name: '최유진', email: 'yujin@gmail.com', country: '대한민국', age: '20-25', gender: '여성', registeredAt: '2024-03-10', lastActive: '2024-10-15', recommendationCount: 7, isActive: false }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterActive, setFilterActive] = useState('');

  const countries = [...new Set(users.map(user => user.country))].sort();
  const genders = ['남성', '여성', '선택안함'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !filterCountry || user.country === filterCountry;
    const matchesGender = !filterGender || user.gender === filterGender;
    const matchesActive = !filterActive || 
                         (filterActive === 'active' && user.isActive) ||
                         (filterActive === 'inactive' && !user.isActive);

    return matchesSearch && matchesCountry && matchesGender && matchesActive;
  });

  const toggleUserActive = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
  };

  const deleteUser = (id: number) => {
    if (confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const exportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "이름,이메일,국가,나이,성별,가입일,마지막활동,추천횟수,상태\n"
      + filteredUsers.map(user => 
          `${user.name},${user.email},${user.country},${user.age},${user.gender},${user.registeredAt},${user.lastActive},${user.recommendationCount},${user.isActive ? '활성' : '비활성'}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "사용자목록.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-gray-600">
            총 {users.length}명의 사용자 (활성: {users.filter(u => u.isActive).length}명, 비활성: {users.filter(u => !u.isActive).length}명)
          </p>
        </div>
        <button
          onClick={exportUsers}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium"
        >
          <i className="ri-download-line mr-2"></i>
          CSV 내보내기
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="이름 또는 이메일 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <div>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
            >
              <option value="">모든 국가</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
            >
              <option value="">모든 성별</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white"
            >
              <option value="">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCountry('');
                setFilterGender('');
                setFilterActive('');
              }}
              className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              필터 초기화
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">사용자</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">국가</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">정보</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">활동</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">상태</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{user.country}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="text-gray-700">{user.age}, {user.gender}</p>
                      <p className="text-gray-500">가입: {user.registeredAt}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="text-gray-700">추천 {user.recommendationCount}회</p>
                      <p className="text-gray-500">최근: {user.lastActive}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      user.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.isActive ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleUserActive(user.id)}
                        className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer whitespace-nowrap ${
                          user.isActive 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {user.isActive ? '비활성화' : '활성화'}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors cursor-pointer whitespace-nowrap"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="ri-user-line text-4xl"></i>
              </div>
              <p className="text-gray-600">검색 조건에 맞는 사용자가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}