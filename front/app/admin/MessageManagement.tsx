'use client';

import { useState } from 'react';

const mockMessages = [
  {
    id: 1,
    title: '주주총회 개최 안내',
    content: '제27기 정기주주총회가 2024년 3월 15일에 개최됩니다. 많은 참석 부탁드립니다.',
    type: 'sms',
    recipients: 'all',
    recipientCount: 1234,
    status: 'sent',
    sentDate: '2024.01.20 14:30',
    createdBy: '관리자'
  },
  {
    id: 2,
    title: '2024년 1분기 실적 발표',
    content: '안녕하세요. 2024년 1분기 실적을 발표하게 되어 알려드립니다. 자세한 내용은 첨부된 자료를 확인해주세요.',
    type: 'email',
    recipients: 'corporate',
    recipientCount: 45,
    status: 'scheduled',
    sentDate: '2024.01.22 10:00',
    createdBy: '관리자'
  },
  {
    id: 3,
    title: '신규 서비스 오픈 안내',
    content: '새로운 투자자 서비스가 오픈되었습니다. 지금 바로 확인해보세요!',
    type: 'kakao',
    recipients: 'individual',
    recipientCount: 892,
    status: 'draft',
    sentDate: '',
    createdBy: '관리자'
  },
  {
    id: 4,
    title: '시스템 점검 안내',
    content: '2024년 1월 25일 새벽 2시부터 4시까지 시스템 점검이 진행됩니다.',
    type: 'sms',
    recipients: 'active',
    recipientCount: 1156,
    status: 'sent',
    sentDate: '2024.01.19 18:00',
    createdBy: '관리자'
  }
];

const messageTypes = ['전체', 'sms', 'kakao', 'email'];
const messageStatuses = ['전체', 'draft', 'scheduled', 'sent'];
const recipientTypes = ['all', 'individual', 'corporate', 'active'];

export default function MessageManagement() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageForm, setMessageForm] = useState({
    title: '',
    content: '',
    type: 'sms',
    recipients: 'all',
    scheduledDate: '',
    scheduledTime: ''
  });
  const itemsPerPage = 10;

  const filteredMessages = messages.filter(message => {
    const matchesType = selectedType === '전체' || message.type === selectedType;
    const matchesStatus = selectedStatus === '전체' || message.status === selectedStatus;
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateMessage = () => {
    setMessageForm({
      title: '',
      content: '',
      type: 'sms',
      recipients: 'all',
      scheduledDate: '',
      scheduledTime: ''
    });
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      ...messageForm,
      recipientCount: getRecipientCount(messageForm.recipients),
      status: messageForm.scheduledDate ? 'scheduled' : 'sent',
      sentDate: messageForm.scheduledDate ? 
        `${messageForm.scheduledDate} ${messageForm.scheduledTime}` : 
        new Date().toLocaleString('ko-KR'),
      createdBy: '관리자'
    };
    
    setMessages([newMessage, ...messages]);
    setShowMessageModal(false);
    alert('메시지가 발송되었습니다.');
  };

  const handleViewDetail = (message: any) => {
    setSelectedMessage(message);
    setShowDetailModal(true);
  };

  const handleDeleteMessage = (id: number) => {
    if (confirm('메시지를 삭제하시겠습니까?')) {
      setMessages(messages.filter(message => message.id !== id));
    }
  };

  const getRecipientCount = (type: string) => {
    switch (type) {
      case 'all': return 1234;
      case 'individual': return 892;
      case 'corporate': return 45;
      case 'active': return 1156;
      default: return 0;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sms': return '문자';
      case 'kakao': return '카카오톡';
      case 'email': return '이메일';
      default: return '알 수 없음';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return '임시저장';
      case 'scheduled': return '예약발송';
      case 'sent': return '발송완료';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-600';
      case 'scheduled': return 'bg-yellow-100 text-yellow-600';
      case 'sent': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getRecipientsLabel = (recipients: string) => {
    switch (recipients) {
      case 'all': return '전체 사용자';
      case 'individual': return '개인회원';
      case 'corporate': return '법인회원';
      case 'active': return '활성 사용자';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메시지 발송</h1>
          <p className="text-gray-600 mt-1">사용자들에게 문자, 카카오톡, 이메일을 발송할 수 있습니다</p>
        </div>
        <button
          onClick={handleCreateMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          새 메시지 작성
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 발송 건수</p>
              <p className="text-2xl font-bold text-gray-900">{messages.filter(m => m.status === 'sent').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-send-plane-line text-green-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">예약 발송</p>
              <p className="text-2xl font-bold text-yellow-600">{messages.filter(m => m.status === 'scheduled').length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">임시저장</p>
              <p className="text-2xl font-bold text-gray-600">{messages.filter(m => m.status === 'draft').length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <i className="ri-draft-line text-gray-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 수신자</p>
              <p className="text-2xl font-bold text-blue-600">{messages.reduce((sum, m) => sum + m.recipientCount, 0).toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-blue-600"></i>
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
              placeholder="메시지 제목으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {messageTypes.map(type => (
                <option key={type} value={type}>
                  {type === '전체' ? '전체 유형' : getTypeLabel(type)}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {messageStatuses.map(status => (
                <option key={status} value={status}>
                  {status === '전체' ? '전체 상태' : getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">메시지 정보</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">유형</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">수신자</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-24">상태</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-40">발송일시</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-32">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentMessages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{message.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{message.content}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {getTypeLabel(message.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{getRecipientsLabel(message.recipients)}</p>
                      <p className="text-xs text-gray-600">{message.recipientCount.toLocaleString()}명</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(message.status)}`}>
                      {getStatusLabel(message.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {message.sentDate || '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewDetail(message)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                        title="상세 보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
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
                      ? 'bg-blue-600 text-white'
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

      {/* 메시지 작성 모달 */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">새 메시지 작성</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">발송 유형</label>
                  <select
                    value={messageForm.type}
                    onChange={(e) => setMessageForm({...messageForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="sms">문자</option>
                    <option value="kakao">카카오톡</option>
                    <option value="email">이메일</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">수신자</label>
                  <select
                    value={messageForm.recipients}
                    onChange={(e) => setMessageForm({...messageForm, recipients: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="all">전체 사용자</option>
                    <option value="individual">개인회원만</option>
                    <option value="corporate">법인회원만</option>
                    <option value="active">활성 사용자만</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    예상 수신자: {getRecipientCount(messageForm.recipients).toLocaleString()}명
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={messageForm.title}
                  onChange={(e) => setMessageForm({...messageForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="메시지 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={messageForm.content}
                  onChange={(e) => setMessageForm({...messageForm, content: e.target.value})}
                  rows={6}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="메시지 내용을 입력하세요"
                />
                <p className="text-xs text-gray-500 mt-1">{messageForm.content.length}/500자</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">예약 발송 (선택사항)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">발송 날짜</label>
                    <input
                      type="date"
                      value={messageForm.scheduledDate}
                      onChange={(e) => setMessageForm({...messageForm, scheduledDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">발송 시간</label>
                    <input
                      type="time"
                      value={messageForm.scheduledTime}
                      onChange={(e) => setMessageForm({...messageForm, scheduledTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  날짜와 시간을 설정하지 않으면 즉시 발송됩니다.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageForm.title.trim() || !messageForm.content.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
              >
                {messageForm.scheduledDate ? '예약 발송' : '즉시 발송'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메시지 상세 보기 모달 */}
      {showDetailModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">메시지 상세 정보</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedMessage.status)}`}>
                  {getStatusLabel(selectedMessage.status)}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">발송 유형</label>
                  <p className="text-sm text-gray-900">{getTypeLabel(selectedMessage.type)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">수신자</label>
                  <p className="text-sm text-gray-900">
                    {getRecipientsLabel(selectedMessage.recipients)} ({selectedMessage.recipientCount.toLocaleString()}명)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">발송일시</label>
                  <p className="text-sm text-gray-900">{selectedMessage.sentDate || '미발송'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                  <p className="text-sm text-gray-900">{selectedMessage.createdBy}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <p className="text-gray-900 font-medium">{selectedMessage.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.content}</p>
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

      {filteredMessages.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-message-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 필터를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}