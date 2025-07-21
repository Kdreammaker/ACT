
'use client';

import { useState } from 'react';

export default function CorporateProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [profile, setProfile] = useState({
    companyName: '주식회사 테크노베이션',
    businessNumber: '123-45-67890',
    address: '서울시 강남구 테헤란로 456',
    phone: '02-1234-5678',
    website: 'www.technovation.co.kr',
    email: 'info@technovation.co.kr'
  });

  const [managerInfo, setManagerInfo] = useState({
    name: '김담당',
    department: 'IR팀',
    position: '팀장',
    email: 'manager@technovation.co.kr',
    phone: '02-1234-5679',
    address: '서울시 강남구 테헤란로 456'
  });

  const documents = {
    businessRegistration: {
      name: '법인등기부등본.pdf',
      uploadDate: '2024-01-10',
      url: '#'
    },
    businessLicense: {
      name: '사업자등록증.pdf',
      uploadDate: '2024-01-10',
      url: '#'
    },
    businessCard: {
      name: '담당자명함.jpg',
      uploadDate: '2024-01-10',
      url: '#'
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleFileView = (docType: string) => {
    alert(`${docType} 파일을 확인합니다.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">법인 정보</h2>
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

      {/* 탭 메뉴 */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'company'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          회사 정보
        </button>
        <button
          onClick={() => setActiveTab('manager')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'manager'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          담당자 정보
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          제출 서류
        </button>
      </div>

      {/* 회사 정보 탭 */}
      {activeTab === 'company' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">회사명</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.companyName}
                onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사업자등록번호</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.businessNumber}
                onChange={(e) => setProfile({...profile, businessNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.businessNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">대표 전화번호</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">대표 이메일</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">홈페이지</label>
            {isEditing ? (
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({...profile, website: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            ) : (
              <p className="text-gray-900 py-2">{profile.website}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">회사 주소</label>
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
      )}

      {/* 담당자 정보 탭 */}
      {activeTab === 'manager' && (
        <div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 text-blue-700">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-information-line"></i>
              </div>
              <p className="text-sm">담당자 정보는 제출한 명함을 기준으로 자동 입력됩니다.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">담당자 이름</label>
              {isEditing ? (
                <input
                  type="text"
                  value={managerInfo.name}
                  onChange={(e) => setManagerInfo({...managerInfo, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              ) : (
                <p className="text-gray-900 py-2">{managerInfo.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">부서/직책</label>
              {isEditing ? (
                <input
                  type="text"
                  value={`${managerInfo.department} ${managerInfo.position}`}
                  onChange={(e) => {
                    const [dept, pos] = e.target.value.split(' ');
                    setManagerInfo({...managerInfo, department: dept || '', position: pos || ''});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              ) : (
                <p className="text-gray-900 py-2">{managerInfo.department} {managerInfo.position}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일 주소</label>
              {isEditing ? (
                <input
                  type="email"
                  value={managerInfo.email}
                  onChange={(e) => setManagerInfo({...managerInfo, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              ) : (
                <p className="text-gray-900 py-2">{managerInfo.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={managerInfo.phone}
                  onChange={(e) => setManagerInfo({...managerInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              ) : (
                <p className="text-gray-900 py-2">{managerInfo.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">회사 주소</label>
              {isEditing ? (
                <input
                  type="text"
                  value={managerInfo.address}
                  onChange={(e) => setManagerInfo({...managerInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              ) : (
                <p className="text-gray-900 py-2">{managerInfo.address}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 제출 서류 탭 */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">법인등기부등본</h3>
                <p className="text-sm text-gray-500">업로드일: {documents.businessRegistration.uploadDate}</p>
                <p className="text-sm text-gray-600">{documents.businessRegistration.name}</p>
              </div>
              <button
                onClick={() => handleFileView('법인등기부등본')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-eye-line"></i>
                </div>
                <span>파일보기</span>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">사업자등록증</h3>
                <p className="text-sm text-gray-500">업로드일: {documents.businessLicense.uploadDate}</p>
                <p className="text-sm text-gray-600">{documents.businessLicense.name}</p>
              </div>
              <button
                onClick={() => handleFileView('사업자등록증')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-eye-line"></i>
                </div>
                <span>파일보기</span>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">담당자 명함</h3>
                <p className="text-sm text-gray-500">업로드일: {documents.businessCard.uploadDate}</p>
                <p className="text-sm text-gray-600">{documents.businessCard.name}</p>
                <p className="text-sm text-blue-600 mt-1">* 담당자 정보의 기준이 되는 파일입니다</p>
              </div>
              <button
                onClick={() => handleFileView('담당자 명함')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-eye-line"></i>
                </div>
                <span>파일보기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && activeTab !== 'documents' && (
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
