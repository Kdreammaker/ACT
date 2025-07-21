
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SampleNoticeDetail() {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const notice = {
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
   - 매출액: 전년 동기 대비 15% 증가 (1,250억원)
   - 영업이익: 전년 동기 대비 22% 증가 (180억원)
   - 당기순이익: 전년 동기 대비 18% 증가 (145억원)

2. 사업부문별 실적 분석
   - IT서비스 부문: 클라우드 전환 프로젝트 확대로 매출 25% 증가
   - 소프트웨어 부문: AI 솔루션 매출 본격화로 신규 매출 350억원 달성
   - 컨설팅 부문: 디지털 트랜스포메이션 컨설팅 수요 증가로 40% 성장

3. 주요 성과 및 지표
   - 신규 계약 체결: 총 45건, 계약금액 780억원
   - 해외 매출 비중: 전체 매출의 35% (437억원)
   - 연구개발 투자: 매출액의 8.5% (106억원)
   - 직원 수: 전년 동기 대비 15% 증가 (1,850명)

4. 향후 전망 및 계획
   - 2024년 연간 매출 목표: 5,200억원 (전년 대비 20% 증가)
   - 신규 사업 투자 계획: AI/빅데이터 분야 집중 투자 200억원
   - 해외 시장 진출: 동남아시아 시장 진출 본격화, 베트남 법인 설립 예정
   - 인력 확충: 개발직군 중심 300명 추가 채용 계획

**참석 안내**

• 현장 참석: 사전 등록 필수 (선착순 80명)
• 온라인 참석: 웹캐스트 동시 송출 (유튜브 라이브)
• 질의응답: 현장 및 온라인 질문 접수
• 동시통역: 영어 동시통역 서비스 제공

**등록 방법**

현장 참석을 원하시는 분은 4월 20일 오후 6시까지 IR팀으로 사전 등록해 주시기 바랍니다.
- 이메일: ir@irconnect.com
- 전화: 02-1234-5678
- 온라인 등록: 회사 홈페이지 IR섹션

**코로나19 방역 수칙**

현장 참석 시 다음 방역 수칙을 준수해 주시기 바랍니다.
- 마스크 착용 필수
- 발열 체크 및 손소독제 사용
- 좌석 간 거리두기 유지

**자료 제공**

• 실적발표 자료: 발표 후 당일 오후 5시 홈페이지 게시
• 녹화영상: 발표 후 3일 내 유튜브 채널 업로드
• 실적설명회 transcript: 발표 후 1주일 내 제공

**주요 일정**

• 4월 20일: 현장 등록 마감
• 4월 23일: 실적자료 사전 공개 (홈페이지)
• 4월 25일: 실적발표회 개최
• 4월 26일: 기관투자자 대상 별도 간담회
• 4월 30일: 1분기 사업보고서 제출

**문의사항**

실적발표회 관련 문의사항이 있으시면 언제든지 IR팀으로 연락 주시기 바랍니다.
- 담당자: 이영희 IR팀장 (yhlee@irconnect.com, 02-1234-5679)
- 부담당자: 박민수 IR대리 (mspark@irconnect.com, 02-1234-5680)

투자자 여러분의 많은 관심과 참여 부탁드립니다.

감사합니다.

IRConnect 주식회사
IR팀 드림`,
    date: '2024.01.15',
    category: '실적발표',
    isImportant: true,
    views: 1234,
    author: 'IR팀',
    attachments: [
      { name: '2024년_1분기_실적발표_자료.pdf', size: '2.4MB' },
      { name: '웹캐스트_참석_안내.pdf', size: '1.2MB' },
      { name: '실적발표회_일정표.xlsx', size: '850KB' }
    ]
  };

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
        <span className="text-gray-900">실적발표 일정 안내</span>
      </div>

      {/* 공지사항 상세 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* 헤더 */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mr-2 whitespace-nowrap">
                  중요
                </span>
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
                    <i className={`${file.name.includes('.xlsx') ? 'ri-file-excel-line text-green-600' : 'ri-file-pdf-line text-red-600'}`}></i>
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
