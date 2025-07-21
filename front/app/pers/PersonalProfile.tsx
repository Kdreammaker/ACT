
'use client';

import { useState } from 'react';

export default function PersonalProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [profile, setProfile] = useState({
    name: '김철수',
    nickname: 'investor123',
    email: 'kimcs@email.com',
    phone: '010-1234-5678',
    birth: '1985-03-15',
    address: '서울시 강남구 테헤란로 123'
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowPhoneVerification(false);
  };

  const handlePhoneChange = () => {
    setShowPhoneVerification(true);
  };

  const handlePhoneVerification = () => {
    alert('본인 인증이 완료되었습니다.');
    setShowPhoneVerification(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">개인 정보</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap cursor-pointer"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className={`ri-${isEditing ? 'close' : 'edit'}-line`}></i>
          </div>
          <span>{isEditing ? '취소' : '수정'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : (
            <p className="text-gray-900 py-2">{profile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.nickname}
              onChange={(e) => setProfile({...profile, nickname: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : (
            <p className="text-gray-900 py-2">{profile.nickname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
          {isEditing ? (
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : (
            <p className="text-gray-900 py-2">{profile.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  onClick={handlePhoneChange}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap cursor-pointer"
                >
                  본인인증
                </button>
              </div>
              {showPhoneVerification && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 mb-2">본인 인증이 필요합니다.</p>
                  <button
                    onClick={handlePhoneVerification}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap cursor-pointer"
                  >
                    PASS로 인증하기
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-900 py-2">{profile.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
          {isEditing ? (
            <input
              type="date"
              value={profile.birth}
              onChange={(e) => setProfile({...profile, birth: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : (
            <p className="text-gray-900 py-2">{profile.birth}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({...profile, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : (
            <p className="text-gray-900 py-2">{profile.address}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer"
          >
            저장하기
          </button>
        </div>
      )}
    </div>
  );
}
