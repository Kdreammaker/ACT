
'use client';

import { useState } from 'react';

const mockUsers = [
  {
    id: 1,
    name: '김투자',
    email: 'kim.investor@example.com',
    type: 'individual',
    status: 'active',
    joinDate: '2024.01.15',
    lastLogin: '2024.01.20',
    questionsCount: 12,
    loginCount: 45,
    phone: '010-1234-5678',
    realName: '김철수',
    stockCount: 1500
  },
  {
    id: 2,
    name: '이관리',
    email: 'admin@irconnect.com',
    type: 'admin',
    status: 'active',
    joinDate: '2023.01.01',
    lastLogin: '2024.01.20',
    questionsCount: 0,
    loginCount: 324,
    phone: '010-9999-0000',
    realName: '이관리',
    stockCount: 0,
    isSuper: true,
    department: 'IT관리팀',
    position: '최고관리자',
    nickname: '슈퍼관리자'
  },
  {
    id: 6,
    name: '김일반',
    email: 'staff1@irconnect.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024.01.10',
    lastLogin: '2024.01.19',
    questionsCount: 0,
    loginCount: 25,
    phone: '010-1111-2222',
    realName: '김일반',
    stockCount: 0,
    isSuper: false,
    department: 'IR팀',
    position: '담당자',
    nickname: '일반관리자1'
  },
  {
    id: 3,
    name: '박기업',
    email: 'corp@example.com',
    type: 'corporate',
    status: 'pending',
    joinDate: '2024.01.18',
    lastLogin: '2024.01.18',
    questionsCount: 0,
    loginCount: 1,
    phone: '02-123-4567',
    realName: '박기업',
    stockCount: 5000,
    companyName: '박기업 주식회사',
    businessNumber: '123-45-67890',
    manager: '김담당자',
    managerEmail: 'manager@corp.com',
    managerPhone: '02-123-4568'
  },
  {
    id: 4,
    name: '최법인',
    email: 'corp2@example.com',
    type: 'corporate',
    status: 'active',
    joinDate: '2023.12.10',
    lastLogin: '2024.01.19',
    questionsCount: 8,
    loginCount: 45,
    phone: '02-987-6543',
    realName: '최법인',
    stockCount: 2800,
    companyName: '최법인 코퍼레이션',
    businessNumber: '987-65-43210',
    manager: '이IR',
    managerEmail: 'ir@corp2.com',
    managerPhone: '02-987-6544'
  },
  {
    id: 5,
    name: '정탈퇴',
    email: 'withdrawn@example.com',
    type: 'individual',
    status: 'withdrawn',
    joinDate: '2023.11.05',
    lastLogin: '2023.12.15',
    questionsCount: 3,
    loginCount: 8,
    phone: '010-0000-0000',
    realName: '정탈퇴',
    stockCount: 0
  }
];

const typeOptions = ['전체', 'individual', 'corporate', 'admin'];
const statusOptions = ['전체', 'pending', 'active', 'withdrawn'];

// 현재 로그인한 관리자 정보 (실제로는 로그인 상태에서 가져와야 함)
const currentAdmin = {
  id: 2,
  isSuper: true // 최고관리자 여부
};

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showShareholderModal, setShowShareholderModal] = useState(false);
  const [showSanctionModal, setShowSanctionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [shareholders, setShareholders] = useState<any[]>([]);
  const [sanctionForm, setSanctionForm] = useState({
    type: 'question_limit',
    reason: '',
    days: 7,
    notifyEmail: true,
    notifySms: true
  });
  const [approvalForm, setApprovalForm] = useState({
    action: 'approve',
    reason: ''
  });
  const [corporateManager, setCorporateManager] = useState({
    name: '',
    department: '',
    position: '',
    email: '',
    phone: ''
  });
  const [adminForm, setAdminForm] = useState({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    department: '',
    position: ''
  });
  const itemsPerPage = 10;

  // 일반 관리자 수 계산
  const generalAdminCount = users.filter(user => user.type === 'admin' && !user.isSuper).length;

  const filteredUsers = users.filter(user => {
    const matchesType = selectedType === '전체' || user.type === selectedType;
    const matchesStatus = selectedStatus === '전체' || user.status === selectedStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = (id: number, status: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, status } : user));
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    if (user.type === 'corporate') {
      setCorporateManager({
        name: user.manager || '',
        department: '',
        position: '',
        email: user.managerEmail || '',
        phone: user.managerPhone || ''
      });
    }
    setShowUserModal(true);
  };

  const handleSanction = (user: any) => {
    setSelectedUser(user);
    setSanctionForm({
      type: 'question_limit',
      reason: '',
      days: 7,
      notifyEmail: true,
      notifySms: true
    });
    setShowSanctionModal(true);
  };

  const handleApplySanction = () => {
    alert(`${selectedUser.name} 사용자에게 ${getSanctionTypeLabel(sanctionForm.type)} 제재가 적용되었습니다.`);
    setShowSanctionModal(false);
  };

  const handleApproval = (user: any) => {
    setSelectedUser(user);
    setApprovalForm({
      action: 'approve',
      reason: ''
    });
    setShowApprovalModal(true);
  };

  const handleApprovalSubmit = () => {
    if (approvalForm.action === 'approve') {
      setUsers(users.map(user =>
        user.id === selectedUser.id ? { ...user, status: 'active' } : user
      ));
      alert(`${selectedUser.name} 법인회원이 승인되었습니다.`);
    } else {
      alert(`${selectedUser.name} 법인회원 승인이 거절되었습니다. 거절 사유가 이메일로 발송됩니다.`);
    }
    setShowApprovalModal(false);
  };

  const handleShareholderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockShareholders = [
        { name: '김철수', shares: 1500, percentage: 15.0, address: '서울시 강남구' },
        { name: '최법인', shares: 2800, percentage: 28.0, address: '서울시 서초구' },
        { name: '박기업', shares: 5000, percentage: 50.0, address: '서울시 종로구' },
        { name: '기타주주', shares: 700, percentage: 7.0, address: '기타' }
      ];
      setShareholders(mockShareholders);
      setShowShareholderModal(true);
    }
  };

  const handleAddAdmin = () => {
    if (generalAdminCount >= 2) {
      alert('일반 관리자는 최대 2명까지만 추가할 수 있습니다.');
      return;
    }

    setAdminForm({
      name: '',
      nickname: '',
      email: '',
      phone: '',
      department: '',
      position: ''
    });
    setShowAddAdminModal(true);
  };

  const handleEditAdmin = (admin: any) => {
    setSelectedUser(admin);
    setAdminForm({
      name: admin.realName,
      nickname: admin.nickname,
      email: admin.email,
      phone: admin.phone,
      department: admin.department,
      position: admin.position
    });
    setShowEditAdminModal(true);
  };

  const handleSaveAdmin = () => {
    if (!adminForm.name || !adminForm.nickname || !adminForm.email || !adminForm.phone ||
        !adminForm.department || !adminForm.position) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newAdmin = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: adminForm.nickname,
      email: adminForm.email,
      type: 'admin',
      status: 'active',
      joinDate: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
      lastLogin: '-',
      questionsCount: 0,
      loginCount: 0,
      phone: adminForm.phone,
      realName: adminForm.name,
      stockCount: 0,
      isSuper: false,
      department: adminForm.department,
      position: adminForm.position,
      nickname: adminForm.nickname
    };

    setUsers([...users, newAdmin]);
    setShowAddAdminModal(false);
    alert('일반 관리자가 추가되었습니다.');
  };

  const handleUpdateAdmin = () => {
    if (!adminForm.name || !adminForm.nickname || !adminForm.email || !adminForm.phone ||
        !adminForm.department || !adminForm.position) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setUsers(users.map(user =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: adminForm.nickname,
            realName: adminForm.name,
            email: adminForm.email,
            phone: adminForm.phone,
            department: adminForm.department,
            position: adminForm.position,
            nickname: adminForm.nickname
          }
        : user
    ));
    setShowEditAdminModal(false);
    alert('관리자 정보가 수정되었습니다.');
  };

  const handleDeleteAdmin = (adminId: number) => {
    if (confirm('정말로 이 관리자를 삭제하시겠습니까?')) {
      setUsers(users.filter(user => user.id !== adminId));
      alert('관리자가 삭제되었습니다.');
    }
  };

  const handleViewDocument = (docType: string) => {
    alert(`${docType} 문서를 확인합니다.`);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return '개인';
      case 'corporate': return '법인';
      case 'admin': return '관리자';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'withdrawn': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return '활성';
      case 'pending': return '승인대기';
      case 'withdrawn': return '탈퇴';
      default: return '알 수 없음';
    }
  };

  const getSanctionTypeLabel = (type: string) => {
    switch (type) {
      case 'question_limit': return '질문 제한';
      case 'login_limit': return '로그인 제한';
      case 'account_delete': return '계정 삭제';
      default: return '제재';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
          <p className="text-gray-600 mt-1">등록된 사용자들을 관리하고 권한을 설정할 수 있습니다</p>
        </div>
        <div className="flex space-x-3">
          {currentAdmin.isSuper && (
            <button
              onClick={handleAddAdmin}
              disabled={generalAdminCount >= 2}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <i className="ri-user-add-line mr-2"></i>
              관리자 추가 ({generalAdminCount}/2)
            </button>
          )}
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap">
            <i className="ri-upload-line mr-2"></i>
            주주명부 업로드
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleShareholderUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 사용자</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-purple-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">개인회원</p>
              <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.type === 'individual').length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">법인회원</p>
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.type === 'corporate').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-green-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">승인대기</p>
              <p className="text-2xl font-bold text-yellow-600">{users.filter(u => u.status === 'pending').length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 보유주식</p>
              <p className="text-2xl font-bold text-red-600">{users.reduce((sum, u) => sum + u.stockCount, 0).toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-stock-line text-red-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm pr-8"
            >
              {typeOptions.map(type => (
                <option key={type} value={type}>
                  {type === '전체' ? '전체 구분' : getTypeLabel(type)}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm pr-8"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === '전체' ? '전체 상태' : getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">사용자 정보</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">구분</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">보유주식</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 font-medium text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          {user.type === 'admin' && user.isSuper && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">최고관리자</span>
                          )}
                          {user.type === 'admin' && !user.isSuper && (
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">일반관리자</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.type === 'admin' && (
                          <p className="text-xs text-gray-500">{user.department} · {user.position}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                      user.type === 'admin' ? 'bg-red-100 text-red-600' :
                      user.type === 'corporate' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getTypeLabel(user.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.type !== 'admin' ? (
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 bg-white pr-8"
                      >
                        <option value="pending">승인대기</option>
                        <option value="active">활성</option>
                        <option value="withdrawn">탈퇴</option>
                      </select>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600">
                        활성
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 font-medium">
                    {user.stockCount > 0 ? `${user.stockCount.toLocaleString()}주` : '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                        title="상세 정보 보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      {user.type !== 'admin' && (
                        <button
                          onClick={() => handleSanction(user)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                          title="제재 조치"
                        >
                          <i className="ri-forbid-line"></i>
                        </button>
                      )}
                      {user.type === 'corporate' && user.status === 'pending' && (
                        <button
                          onClick={() => handleApproval(user)}
                          className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded"
                          title="승인 처리"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                      )}
                      {user.type === 'admin' && (
                        <>
                          {(currentAdmin.isSuper || (!currentAdmin.isSuper && user.id === currentAdmin.id)) && (
                            <button
                              onClick={() => handleEditAdmin(user)}
                              className="w-8 h-8 flex items-center justify-center text-orange-600 hover:bg-orange-50 rounded"
                              title="정보 수정"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                          )}
                          {currentAdmin.isSuper && !user.isSuper && (
                            <button
                              onClick={() => handleDeleteAdmin(user.id)}
                              className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                              title="관리자 삭제"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center px-6 py-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 사용자 상세 정보 모달 */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">사용자 상세 정보</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xl">
                    {selectedUser.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              {/* 기본 정보 */}
              <div>
                <h5 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">본명</label>
                    <p className="text-sm text-gray-900">{selectedUser.realName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">구분</label>
                    <p className="text-sm text-gray-900">{getTypeLabel(selectedUser.type)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <p className="text-sm text-gray-900">{getStatusLabel(selectedUser.status)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">휴대전화</label>
                    <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">가입일</label>
                    <p className="text-sm text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">최종 로그인</label>
                    <p className="text-sm text-gray-900">{selectedUser.lastLogin}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">보유주식</label>
                    <p className="text-sm text-gray-900">{selectedUser.stockCount > 0 ? `${selectedUser.stockCount.toLocaleString()}주` : '없음'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">질문 수</label>
                    <p className="text-sm text-gray-900">{selectedUser.questionsCount}개</p>
                  </div>
                </div>
              </div>

              {/* 법인 정보 */}
              {selectedUser.type === 'corporate' && (
                <>
                  <div>
                    <h5 className="text-lg font-medium text-gray-900 mb-4">법인 정보</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
                        <p className="text-sm text-gray-900">{selectedUser.companyName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">사업자등록번호</label>
                        <p className="text-sm text-gray-900">{selectedUser.businessNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* 제출 서류 */}
                  <div>
                    <h5 className="text-lg font-medium text-gray-900 mb-4">제출 서류</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">법인등기부등본</p>
                          <p className="text-sm text-gray-600">business_registration.pdf</p>
                        </div>
                        <button
                          onClick={() => handleViewDocument('법인등기부등본')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                        >
                          보기
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">사업자등록증</p>
                          <p className="text-sm text-gray-600">business_license.pdf</p>
                        </div>
                        <button
                          onClick={() => handleViewDocument('사업자등록증')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                        >
                          보기
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">명함</p>
                          <p className="text-sm text-gray-600">business_card.jpg</p>
                        </div>
                        <button
                          onClick={() => handleViewDocument('명함')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                        >
                          보기
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 담당자 정보 입력 */}
                  <div>
                    <h5 className="text-lg font-medium text-gray-900 mb-4">담당자 정보</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">담당자명</label>
                        <input
                          type="text"
                          value={corporateManager.name}
                          onChange={(e) => setCorporateManager({ ...corporateManager, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="담당자 이름"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                        <input
                          type="text"
                          value={corporateManager.department}
                          onChange={(e) => setCorporateManager({ ...corporateManager, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="부서명"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                        <input
                          type="text"
                          value={corporateManager.position}
                          onChange={(e) => setCorporateManager({ ...corporateManager, position: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="직책"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input
                          type="email"
                          value={corporateManager.email}
                          onChange={(e) => setCorporateManager({ ...corporateManager, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="이메일 주소"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                        <input
                          type="tel"
                          value={corporateManager.phone}
                          onChange={(e) => setCorporateManager({ ...corporateManager, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="연락처"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <div className="flex space-x-3">
                {selectedUser.type === 'corporate' && selectedUser.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setShowUserModal(false);
                        handleApproval(selectedUser);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium whitespace-nowrap"
                    >
                      승인처리
                    </button>
                    <button
                      onClick={() => {
                        setShowUserModal(false);
                        setApprovalForm({ action: 'reject', reason: '' });
                        setShowApprovalModal(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium whitespace-nowrap"
                    >
                      승인거절
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 제재 모달 */}
      {showSanctionModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">제재 조치</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedUser.name} 사용자에 대한 제재를 설정합니다</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제재 유형</label>
                <select
                  value={sanctionForm.type}
                  onChange={(e) => setSanctionForm({ ...sanctionForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="question_limit">질문 제한</option>
                  <option value="login_limit">로그인 제한</option>
                  <option value="account_delete">계정 삭제</option>
                </select>
              </div>

              {(sanctionForm.type === 'question_limit' || sanctionForm.type === 'account_delete') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제한 일수</label>
                  <input
                    type="number"
                    value={sanctionForm.days}
                    onChange={(e) => setSanctionForm({ ...sanctionForm, days: parseInt(e.target.value) })}
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제재 사유</label>
                <textarea
                  value={sanctionForm.reason}
                  onChange={(e) => setSanctionForm({ ...sanctionForm, reason: e.target.value })}
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
                  placeholder="제재 사유를 입력하세요"
                />
                <p className="text-xs text-gray-500 mt-1">{sanctionForm.reason.length}/500자</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">통보 방식</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sanctionForm.notifyEmail}
                      onChange={(e) => setSanctionForm({ ...sanctionForm, notifyEmail: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">이메일 통보</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sanctionForm.notifySms}
                      onChange={(e) => setSanctionForm({ ...sanctionForm, notifySms: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">문자 통보</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowSanctionModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleApplySanction}
                disabled={!sanctionForm.reason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
              >
                제재 적용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 승인 처리 모달 */}
      {showApprovalModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {approvalForm.action === 'approve' ? '법인회원 승인' : '법인회원 승인 거절'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{selectedUser.companyName}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setApprovalForm({ ...approvalForm, action: 'approve' })}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    approvalForm.action === 'approve'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  승인
                </button>
                <button
                  onClick={() => setApprovalForm({ ...approvalForm, action: 'reject' })}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    approvalForm.action === 'reject'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  거절
                </button>
              </div>

              {approvalForm.action === 'reject' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">거절 사유</label>
                  <textarea
                    value={approvalForm.reason}
                    onChange={(e) => setApprovalForm({ ...approvalForm, reason: e.target.value })}
                    rows={4}
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
                    placeholder="승인 거절 사유를 입력하세요"
                  />
                  <p className="text-xs text-gray-500 mt-1">{approvalForm.reason.length}/500자</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleApprovalSubmit}
                disabled={approvalForm.action === 'reject' && !approvalForm.reason.trim()}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  approvalForm.action === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400'
                }`}
              >
                {approvalForm.action === 'approve' ? '승인하기' : '거절하기'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 주주명부 모달 */}
      {showShareholderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">주주명부 현황</h3>
              <p className="text-sm text-gray-600 mt-1">폐쇄명부일 기준 주주 현황입니다</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">주주명</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">보유주식수</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">지분율</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">주소</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shareholders.map((shareholder, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{shareholder.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{shareholder.shares.toLocaleString()}주</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{shareholder.percentage}%</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{shareholder.address}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-3 text-sm text-gray-900">총계</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">
                        {shareholders.reduce((sum, s) => sum + s.shares, 0).toLocaleString()}주
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">100.0%</td>
                      <td className="px-4 py-3 text-sm text-gray-600">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowShareholderModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 필터를 선택해보세요.</p>
        </div>
      )}

      {/* 관리자 추가 모달 */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">일반 관리자 추가</h3>
              <p className="text-sm text-gray-600 mt-1">새로운 일반 관리자를 추가합니다</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="실명"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
                  <input
                    type="text"
                    value={adminForm.nickname}
                    onChange={(e) => setAdminForm({ ...adminForm, nickname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="표시될 이름"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="이메일 주소"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">휴대전화번호</label>
                <input
                  type="tel"
                  value={adminForm.phone}
                  onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="010-0000-0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <input
                    type="text"
                    value={adminForm.department}
                    onChange={(e) => setAdminForm({ ...adminForm, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="부서명"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                  <input
                    type="text"
                    value={adminForm.position}
                    onChange={(e) => setAdminForm({ ...adminForm, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="직책명"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddAdminModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSaveAdmin}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium whitespace-nowrap"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 관리자 정보 수정 모달 */}
      {showEditAdminModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">관리자 정보 수정</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedUser.name} 관리자 정보를 수정합니다</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="실명"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
                  <input
                    type="text"
                    value={adminForm.nickname}
                    onChange={(e) => setAdminForm({ ...adminForm, nickname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="표시될 이름"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="이메일 주소"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">휴대전화번호</label>
                <input
                  type="tel"
                  value={adminForm.phone}
                  onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="010-0000-0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <input
                    type="text"
                    value={adminForm.department}
                    onChange={(e) => setAdminForm({ ...adminForm, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="부서명"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                  <input
                    type="text"
                    value={adminForm.position}
                    onChange={(e) => setAdminForm({ ...adminForm, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="직책명"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditAdminModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleUpdateAdmin}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium whitespace-nowrap"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
