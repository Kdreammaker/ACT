
'use client';

import Link from 'next/link';

const qnaItems = [
  {
    id: 1,
    question: '2024년 신규 사업 계획에 대해 구체적인 내용을 알고 싶습니다.',
    author: '투자자A',
    date: '2024.01.15',
    votes: 24,
    hasAnswer: true,
    category: '사업계획'
  },
  {
    id: 2,
    question: '최근 원자재 가격 상승이 매출에 미치는 영향은 어느 정도인가요?',
    author: '투자자B',
    date: '2024.01.14',
    votes: 18,
    hasAnswer: true,
    category: '재무'
  },
  {
    id: 3,
    question: 'ESG 경영 도입 후 예상되는 비용과 효과에 대해 설명해주세요.',
    author: '투자자C',
    date: '2024.01.13',
    votes: 15,
    hasAnswer: false,
    category: 'ESG'
  },
  {
    id: 4,
    question: '해외 진출 계획이 있는지, 있다면 어느 지역을 고려하고 있나요?',
    author: '투자자D',
    date: '2024.01.12',
    votes: 12,
    hasAnswer: true,
    category: '해외진출'
  }
];

export default function QnAPreview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <i className="ri-question-answer-fill text-green-600"></i>
            </div>
            Q&A
          </h2>
          <div className="flex items-center space-x-3">
            <Link 
              href="/qna/new" 
              className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 text-sm font-medium whitespace-nowrap flex items-center"
            >
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-add-line"></i>
              </div>
              질문 등록
            </Link>
            <Link href="/qna" className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
              전체보기
            </Link>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {qnaItems.map((item) => (
          <Link 
            key={item.id}
            href={`/qna/${item.id}`}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded mr-2 whitespace-nowrap">
                  {item.category}
                </span>
                {item.hasAnswer ? (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    답변완료
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    답변대기
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-4 h-4 flex items-center justify-center mr-1">
                  <i className="ri-thumb-up-line"></i>
                </div>
                {item.votes}
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {item.question}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{item.author}</span>
              <span>{item.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
