
'use client';

import Link from 'next/link';

const financialDocuments = [
  {
    name: '재무상태표',
    filename: '2024_재무상태표.pdf',
    icon: 'ri-file-text-line'
  },
  {
    name: '손익계산서',
    filename: '2024_손익계산서.pdf',
    icon: 'ri-line-chart-line'
  },
  {
    name: '현금흐름표',
    filename: '2024_현금흐름표.pdf',
    icon: 'ri-exchange-line'
  },
  {
    name: '자본변동표',
    filename: '2024_자본변동표.pdf',
    icon: 'ri-bar-chart-line'
  },
  {
    name: '주석',
    filename: '2024_주석.pdf',
    icon: 'ri-file-list-line'
  }
];

export default function FinancialPreview() {
  const handleDownload = (filename: string) => {
    // 실제 구현시에는 서버에서 파일을 다운로드하는 로직을 구현
    console.log(`다운로드: ${filename}`);
    alert(`${filename} 다운로드를 시작합니다.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-file-chart-line text-indigo-600"></i>
            </div>
            재무정보
          </h2>
          <Link href="/financial" className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
            상세보기
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-4">2024년 결산 기준</div>
        <div className="space-y-3">
          {financialDocuments.map((doc, index) => (
            <button
              key={index}
              onClick={() => handleDownload(doc.filename)}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className={`${doc.icon} text-blue-600`}></i>
                </div>
                <span className="text-sm font-medium text-gray-900">{doc.name}</span>
              </div>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-download-line text-gray-400"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
