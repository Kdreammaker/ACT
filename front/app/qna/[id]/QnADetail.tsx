
'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockQnADetail = {
  id: 1,
  question: '2024년 신규 사업 계획에 대해 구체적인 내용을 알고 싶습니다.',
  answer: '2024년에는 AI 기반 스마트팩토리 솔루션과 친환경 에너지 사업에 집중 투자할 예정입니다. 총 투자 규모는 약 500억원으로 계획하고 있으며, 이를 통해 2025년까지 매출 20% 증가를 목표로 하고 있습니다.\n\n구체적인 투자 계획은 다음과 같습니다:\n\n1. AI 스마트팩토리 솔루션 (300억원)\n- 제조업체 대상 디지털 전환 솔루션 개발\n- 머신러닝 기반 품질 관리 시스템 구축\n- IoT 센서 네트워크 및 데이터 분석 플랫폼 개발\n\n2. 친환경 에너지 사업 (200억원)\n- 태양광 발전 시설 확충\n- 에너지 저장 시스템(ESS) 기술 개발\n- 전기차 충전 인프라 사업 진출\n\n이러한 투자를 통해 새로운 성장 동력을 확보하고, 지속 가능한 미래 성장을 위한 기반을 마련하겠습니다.',
  author: '투자자A',
  nickname: '투자고수',
  category: '사업계획',
  status: 'answered',
  votes: 24,
  createdAt: '2024.01.15',
  answeredAt: '2024.01.16',
  answeredBy: '관리자',
  isAnonymous: false,
  relatedDocuments: [
    { title: '2024년 사업계획서', size: '2.4MB', type: 'pdf' },
    { title: '투자설명회 자료', size: '5.8MB', type: 'ppt' }
  ]
};

const relatedQuestions = [
  {
    id: 2,
    question: '최근 원자재 가격 상승이 매출에 미치는 영향은 어느 정도인가요?',
    category: '재무',
    status: 'pending',
    votes: 18,
    createdAt: '2024.01.14'
  },
  {
    id: 3,
    question: 'ESG 경영 도입 후 예상되는 비용과 효과에 대해 설명해주세요.',
    category: 'ESG',
    status: 'answered',
    votes: 15,
    createdAt: '2024.01.13'
  },
  {
    id: 4,
    question: '해외 시장 진출 계획이 있으신지 궁금합니다.',
    category: '해외진출',
    status: 'answered',
    votes: 12,
    createdAt: '2024.01.12'
  }
];

export default function QnADetail({ qnaId }: { qnaId: string }) {
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [currentVotes, setCurrentVotes] = useState(mockQnADetail.votes);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setUserVote(null);
      setCurrentVotes(prev => type === 'up' ? prev - 1 : prev + 1);
    } else {
      const prevVote = userVote;
      setUserVote(type);
      
      if (prevVote === null) {
        setCurrentVotes(prev => type === 'up' ? prev + 1 : prev - 1);
      } else {
        setCurrentVotes(prev => type === 'up' ? prev + 2 : prev - 2);
      }
    }
    setShowVoteModal(true);
    setTimeout(() => setShowVoteModal(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'answered':
        return '답변완료';
      case 'pending':
        return '답변대기';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 브레드크럼 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              홈
            </Link>
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </div>
            <Link href="/qna" className="text-gray-500 hover:text-gray-700">
              Q&A
            </Link>
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </div>
            <span className="text-gray-900 font-medium">질문 상세</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 질문 카드 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full font-medium">
                    {mockQnADetail.category}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(mockQnADetail.status)}`}>
                    {getStatusLabel(mockQnADetail.status)}
                  </span>
                  {mockQnADetail.isAnonymous && (
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                      익명
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleVote('up')}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                        userVote === 'up'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-thumb-up-line"></i>
                      </div>
                      <span className="text-sm font-medium">{currentVotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote('down')}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                        userVote === 'down'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-thumb-down-line"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Q. {mockQnADetail.question}
                </h1>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium text-sm">
                          {mockQnADetail.nickname.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">작성자: {mockQnADetail.nickname}</span>
                      </div>
                    </div>
                  </div>
                  <span>작성일: {mockQnADetail.createdAt}</span>
                </div>
              </div>

              {/* 관련 문서 */}
              {mockQnADetail.relatedDocuments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">관련 문서</h3>
                  <div className="space-y-2">
                    {mockQnADetail.relatedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <i className={`${doc.type === 'pdf' ? 'ri-file-pdf-line' : 'ri-file-ppt-line'} text-blue-600`}></i>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.title}</p>
                            <p className="text-sm text-gray-600">{doc.size}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
                          다운로드
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 답변 */}
              {mockQnADetail.status === 'answered' && mockQnADetail.answer && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-green-800">A. 답변</h2>
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium text-xs">
                          {mockQnADetail.answeredBy.charAt(0)}
                        </span>
                      </div>
                      <span>답변자: {mockQnADetail.answeredBy}</span>
                      <span>•</span>
                      <span>답변일: {mockQnADetail.answeredAt}</span>
                    </div>
                  </div>
                  <div className="text-green-700 leading-relaxed whitespace-pre-wrap">
                    {mockQnADetail.answer}
                  </div>
                </div>
              )}

              {mockQnADetail.status === 'pending' && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-time-line text-yellow-600"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-800">답변 대기 중</h3>
                  </div>
                  <p className="text-yellow-700">
                    관리자가 검토 중입니다. 빠른 시일 내에 답변드리겠습니다.
                  </p>
                </div>
              )}
            </div>

            {/* 관련 질문 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">관련 질문</h3>
              <div className="space-y-4">
                {relatedQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          {question.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(question.status)}`}>
                          {getStatusLabel(question.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-thumb-up-line"></i>
                        </div>
                        <span className="text-sm">{question.votes}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/qna/${question.id}`}
                      className="text-gray-900 hover:text-blue-600 font-medium line-clamp-2 transition-colors"
                    >
                      {question.question}
                    </Link>
                    <p className="text-sm text-gray-500 mt-2">{question.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 빠른 액션 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">빠른 액션</h3>
              <div className="space-y-3">
                <Link
                  href="/qna/new"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-add-line"></i>
                  </div>
                  새 질문 작성
                </Link>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-share-line"></i>
                  </div>
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/qna"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-arrow-left-line"></i>
            </div>
            Q&A 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 투표 알림 모달 */}
      {showVoteModal && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
            <span className="text-gray-900 font-medium">
              {userVote === 'up' ? '추천' : userVote === 'down' ? '비추천' : '취소'}되었습니다
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
