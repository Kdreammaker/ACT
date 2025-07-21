
'use client';

import Link from 'next/link';
import { useState } from 'react';

const noticesData: Record<string, any> = {
  '1': {
    id: 1,
    title: '[공지] 2024년 1분기 실적발표 일정 안내',
    content: `안녕하세요. 주주 및 투자자 여러분께 감사드립니다.

2024년 1분기 실적발표 일정을 다음과 같이 안내드립니다.

**실적발표 일정**

• 실적발표 날짜: 2024년 4월 25일 (목)
• 시간: 오후 2시 ~ 4시
• 장소: 본사 2층 컨퍼런스룸
• 발표자: 김철수 CFO, 이영희 IR팀장

**주요 발표 내용**

1. 2024년 1분기 재무실적 요약
   - 매출액: 전년 동기 대비 15% 증가
   - 영업이익: 전년 동기 대비 22% 증가
   - 당기순이익: 전년 동기 대비 18% 증가

2. 사업부문별 실적 분석
   - IT서비스 부문: 클라우드 전환 프로젝트 확대로 매출 증가
   - 소프트웨어 부문: AI 솔루션 매출 본격화
   - 컨설팅 부문: 디지털 트랜스포메이션 컨설팅 수요 증가

3. 향후 전망 및 계획
   - 2024년 연간 매출 목표: 1,200억원 (전년 대비 20% 증가)
   - 신규 사업 투자 계획: AI/빅데이터 분야 집중 투자
   - 해외 시장 진출: 동남아시아 시장 진출 본격화

**참석 안내**

• 현장 참석: 사전 등록 필수 (선착순 50명)
• 온라인 참석: 웹캐스트 동시 송출
• 질의응답: 현장 및 온라인 질문 접수

**등록 방법**

현장 참석을 원하시는 분은 4월 20일까지 IR팀으로 사전 등록해 주시기 바랍니다.
- 이메일: ir@company.com
- 전화: 02-1234-5678

**자료 제공**

실적발표 자료는 발표 후 당사 홈페이지 IR섹션에서 다운로드 가능합니다.

감사합니다.`,
    date: '2024.01.15',
    category: '실적발표',
    isImportant: true,
    views: 1234,
    author: 'IR팀',
    attachments: [
      { name: '2024년_1분기_실적발표_자료.pdf', size: '2.4MB' },
      { name: '웹캐스트_참석_안내.pdf', size: '1.2MB' }
    ]
  },
  '2': {
    id: 2,
    title: '정기주주총회 개최 안내',
    content: `주주 여러분께 정기주주총회 개최를 다음과 같이 안내드립니다.

**개최 일정**
• 일시: 2024년 3월 29일 (금) 오전 10시
• 장소: 서울시 강남구 본사 1층 대강당

**주요 안건**
1. 제27기 재무제표 승인
2. 이사 선임의 건
3. 정관 변경의 건

자세한 내용은 첨부된 소집공고를 확인해 주시기 바랍니다.`,
    date: '2024.01.12',
    category: '주주총회',
    isImportant: true,
    views: 987,
    author: '경영지원팀',
    attachments: [
      { name: '주주총회_소집공고.pdf', size: '3.1MB' }
    ]
  }
};

interface NoticeDetailProps {
  noticeId: string;
}

export default function NoticeDetail({ noticeId }: NoticeDetailProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const notice = noticesData[noticeId];

  if (!notice) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <i className="ri-file-text-line text-4xl text-gray-300"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">공지사항을 찾을 수 없습니다</h3>
        <p className="text-gray-600 mb-4">요청하신 공지사항이 존재하지 않습니다.</p>
        <Link 
          href="/notices"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          공지사항 목록으로
        </Link>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = notice.title;
    
    switch (platform) {
      case 'kakao':
        window.open(`https://story.kakao.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다.');
        break;
    }
    setShowShareMenu(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* 네비게이션 */}
      <div className="flex items-center text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">홈</Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <Link href="/notices" className="hover:text-blue-600">공지사항</Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="text-gray-900">공지사항 상세</span>
      </div>

      {/* 공지사항 상세 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* 헤더 */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {notice.isImportant && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mr-2 whitespace-nowrap">
                    중요
                  </span>
                )}
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded whitespace-nowrap">
                  {notice.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {notice.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-1">
                  <i className="ri-printer-line"></i>
                </div>
                인쇄
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-share-line"></i>
                  </div>
                  공유
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => handleShare('kakao')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-kakao-talk-fill text-yellow-500"></i>
                      </div>
                      카카오톡
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-facebook-fill text-blue-600"></i>
                      </div>
                      페이스북
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-twitter-fill text-blue-400"></i>
                      </div>
                      트위터
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-link text-gray-600"></i>
                      </div>
                      링크 복사
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>작성자: {notice.author}</span>
              <span>등록일: {notice.date}</span>
              <span>조회수: {notice.views.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 첨부파일 */}
        {notice.attachments && notice.attachments.length > 0 && (
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-attachment-2 text-gray-600"></i>
              </div>
              첨부파일
            </h3>
            <div className="space-y-2">
              {notice.attachments.map((file: any, index: number) => (
                <button
                  key={index}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded mr-3">
                      <i className="ri-file-pdf-line text-red-600"></i>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-500">{file.size}</div>
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-download-line text-gray-400 group-hover:text-blue-600"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 본문 */}
        <div className="p-6">
          <div className="prose max-w-none">
            {notice.content.split('\n').map((line: string, index: number) => (
              <div key={index} className="mb-4">
                {line.startsWith('**') && line.endsWith('**') ? (
                  <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">
                    {line.slice(2, -2)}
                  </h3>
                ) : line.startsWith('•') ? (
                  <div className="flex items-start mb-2">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{line.slice(1).trim()}</span>
                  </div>
                ) : line.match(/^\d+\./) ? (
                  <div className="font-medium text-gray-900 mt-4 mb-2">{line}</div>
                ) : line.trim().startsWith('-') ? (
                  <div className="flex items-start mb-1 ml-4">
                    <span className="text-gray-400 mr-2">-</span>
                    <span className="text-gray-600">{line.trim().slice(1).trim()}</span>
                  </div>
                ) : line.trim() ? (
                  <p className="text-gray-700 leading-relaxed">{line}</p>
                ) : (
                  <br />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <Link
              href="/notices"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-arrow-left-line"></i>
              </div>
              목록으로
            </Link>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-arrow-up-line"></i>
                </div>
                이전글
              </button>
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-arrow-down-line"></i>
                </div>
                다음글
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
