
'use client';

import { useState } from 'react';

const allSchedules = [
  {
    id: 1,
    title: '2024년 1분기 실적발표',
    description: '2024년 1분기 경영실적 발표 및 향후 전망 발표',
    date: '2024.01.25',
    time: '14:00',
    type: '실적발표',
    status: '예정',
    location: '본사 대회의실',
    capacity: 100,
    registered: 67
  },
  {
    id: 2,
    title: '기업탐방 프로그램',
    description: '기관투자자 대상 기업탐방 및 현장 견학',
    date: '2024.01.20',
    time: '10:00',
    type: '기업탐방',
    status: '예약중',
    location: '본사 및 생산시설',
    capacity: 30,
    registered: 28
  },
  {
    id: 3,
    title: 'IR 컨퍼런스 참여',
    description: '한국거래소 주관 IR 컨퍼런스 참여',
    date: '2024.01.18',
    time: '15:30',
    type: 'IR행사',
    status: '예약중',
    location: '코엑스 컨벤션센터',
    capacity: 200,
    registered: 200
  },
  {
    id: 4,
    title: '애널리스트 간담회',
    description: '증권사 애널리스트 대상 간담회',
    date: '2024.01.15',
    time: '16:00',
    type: '간담회',
    status: '완료',
    location: '서울 중구 호텔',
    capacity: 50,
    registered: 42
  },
  {
    id: 5,
    title: '2024년 사업전략 설명회',
    description: '2024년 주요 사업 전략 및 목표 발표',
    date: '2024.02.05',
    time: '11:00',
    type: '설명회',
    status: '예정',
    location: '본사 오디토리움',
    capacity: 150,
    registered: 23
  },
  {
    id: 6,
    title: '해외 투자자 로드쇼',
    description: '미국 및 유럽 기관투자자 대상 로드쇼',
    date: '2024.02.12',
    time: '09:00',
    type: '로드쇼',
    status: '예정',
    location: '뉴욕, 런던',
    capacity: 80,
    registered: 15
  }
];

const eventTypes = ['전체', '실적발표', '기업탐방', 'IR행사', '간담회', '설명회', '로드쇼'];
const statusTypes = ['전체', '예정', '예약중', '완료'];

export default function IRScheduleList() {
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [participants, setParticipants] = useState([
    {
      name: '',
      email: '',
      phone: '',
      company: '',
      position: ''
    }
  ]);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const itemsPerPage = 4;

  const filteredSchedules = allSchedules.filter(schedule => {
    const matchesType = selectedType === '전체' || schedule.type === selectedType;
    const matchesStatus = selectedStatus === '전체' || schedule.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);

  const handleReservation = schedule => {
    setSelectedSchedule(schedule);
    setShowApplicationModal(true);
  };

  const handleCancel = scheduleId => {
    setSelectedSchedule(scheduleId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    alert('참가 신청이 취소되었습니다.');
    setShowCancelModal(false);
    setSelectedSchedule(null);
  };

  const addParticipant = () => {
    if (participants.length < selectedSchedule?.capacity - selectedSchedule?.registered) {
      setParticipants([
        ...participants,
        {
          name: '',
          email: '',
          phone: '',
          company: '',
          position: ''
        }
      ]);
    }
  };

  const removeParticipant = index => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index, field, value) => {
    const updated = participants.map((participant, i) =>
      i === index ? { ...participant, [field]: value } : participant
    );
    setParticipants(updated);
  };

  const submitApplication = () => {
    alert('참가 신청이 완료되었습니다.');
    setShowApplicationModal(false);
    setSelectedSchedule(null);
    setParticipants([
      {
        name: '',
        email: '',
        phone: '',
        company: '',
        position: ''
      }
    ]);
    setHasVehicle(false);
    setVehicleNumber('');
  };

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">행사 유형</h3>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedType === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">상태</h3>
            <div className="flex flex-wrap gap-2">
              {statusTypes.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* IR 일정 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentSchedules.map(schedule => (
          <div key={schedule.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full font-medium">
                  {schedule.type}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    schedule.status === '예정'
                      ? 'bg-blue-100 text-blue-600'
                      : schedule.status === '예약중'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {schedule.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{schedule.title}</h3>

              <p className="text-gray-600 mb-4 line-clamp-2">{schedule.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-calendar-line"></i>
                  </div>
                  {schedule.date} {schedule.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  {schedule.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <i className="ri-group-line"></i>
                  </div>
                  {schedule.registered}/{schedule.capacity}명
                </div>
              </div>

              {schedule.status === '예정' && (
                <div className="pt-4 border-t border-gray-100">
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed whitespace-nowrap"
                  >
                    참가 신청 준비중
                  </button>
                </div>
              )}

              {schedule.status === '예약중' && schedule.id === 2 && (
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleReservation(schedule)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors whitespace-nowrap"
                  >
                    참가 신청하기
                  </button>
                </div>
              )}

              {schedule.status === '예약중' && schedule.id === 3 && (
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleCancel(schedule.id)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium transition-colors whitespace-nowrap"
                  >
                    신청 취소하기
                  </button>
                </div>
              )}

              {schedule.status === '완료' && (
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-medium whitespace-nowrap">
                    행사 종료
                  </button>
                </div>
              )}
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              다음
            </button>
          </div>
        </div>
      )}

      {filteredSchedules.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-calendar-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">예정된 일정이 없습니다</h3>
          <p className="text-gray-600">다른 필터 조건을 선택해보세요.</p>
        </div>
      )}

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">신청 취소 확인</h3>
              <p className="text-gray-600 mb-6">정말로 참가 신청을 취소하시겠습니까?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium whitespace-nowrap"
                >
                  아니오
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 font-medium whitespace-nowrap"
                >
                  예, 취소합니다
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 참가 신청 모달 */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">참가 신청</h3>
                <div className="text-sm text-gray-500">
                  {participants.length}/{selectedSchedule?.capacity - selectedSchedule?.registered}명
                </div>
              </div>

              <div className="space-y-6">
                {participants.map((participant, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">참가자 {index + 1}</h4>
                      {participants.length > 1 && (
                        <button
                          onClick={() => removeParticipant(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <div className="w-5 h-5 flex items-center justify-center">
                            <i className="ri-close-line"></i>
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                        <input
                          type="text"
                          value={participant.name}
                          onChange={e => updateParticipant(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="이름을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input
                          type="email"
                          value={participant.email}
                          onChange={e => updateParticipant(index, 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="이메일을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                        <input
                          type="tel"
                          value={participant.phone}
                          onChange={e => updateParticipant(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="연락처를 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
                        <input
                          type="text"
                          value={participant.company}
                          onChange={e => updateParticipant(index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="회사명을 입력하세요"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                        <input
                          type="text"
                          value={participant.position}
                          onChange={e => updateParticipant(index, 'position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="직책을 입력하세요"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {participants.length < selectedSchedule?.capacity - selectedSchedule?.registered && (
                  <button
                    onClick={addParticipant}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap"
                  >
                    <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
                      <i className="ri-add-line"></i>
                    </div>
                    참가 인원 추가하기
                  </button>
                )}

                {/* 차량 정보 */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">차량 정보</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hasVehicle}
                        onChange={e => setHasVehicle(e.target.checked)}
                        className="mr-2"
                      />
                      차량 지참
                    </label>

                    {hasVehicle && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">차량 번호</label>
                        <input
                          type="text"
                          value={vehicleNumber}
                          onChange={e => setVehicleNumber(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="차량 번호를 입력하세요 (예: 12가3456)"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  onClick={submitApplication}
                  className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
                >
                  신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
