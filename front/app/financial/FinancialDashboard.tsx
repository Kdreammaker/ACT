
'use client';

import { useState } from 'react';

const financialDocuments = [
  { name: '재무상태표', filename: '2024_재무상태표.pdf', icon: 'ri-file-text-line' },
  { name: '손익계산서', filename: '2024_손익계산서.pdf', icon: 'ri-line-chart-line' },
  { name: '현금흐름표', filename: '2024_현금흐름표.pdf', icon: 'ri-exchange-line' },
  { name: '자본변동표', filename: '2024_자본변동표.pdf', icon: 'ri-bar-chart-line' },
  { name: '주석', filename: '2024_주석.pdf', icon: 'ri-file-list-line' }
];

const periods = [
  { id: 'annual', name: '결산', years: ['2024', '2023', '2022', '2021', '2020'] },
  { id: 'half', name: '반기', periods: ['2024년 상반기', '2024년 하반기', '2023년 상반기', '2023년 하반기', '2022년 상반기'] },
  { id: 'quarter', name: '분기', periods: ['2024년 4분기', '2024년 3분기', '2024년 2분기', '2024년 1분기', '2023년 4분기'] }
];

export default function FinancialDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('annual');
  const [selectedYear, setSelectedYear] = useState(periods[0].years![0]);

  const handleDownload = (docName: string, period: string) => {
    const filename = `${period}_${docName}.pdf`;
    console.log(`다운로드: ${filename}`);
    alert(`${filename} 파일을 다운로드합니다.`);
  };

  const getCurrentPeriods = () => {
    const currentPeriod = periods.find(p => p.id === selectedPeriod);
    if (currentPeriod?.years) return currentPeriod.years;
    if (currentPeriod?.periods) return currentPeriod.periods;
    return [];
  };

  return (
    <div className="space-y-8">
      {/* 주기 선택 탭 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => {
                  setSelectedPeriod(period.id);
                  if (period.years) setSelectedYear(period.years[0]);
                  else setSelectedYear(period.periods![0]);
                }}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedPeriod === period.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-calendar-line"></i>
                </div>
                {period.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 기간 선택 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">기간 선택</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {getCurrentPeriods().map((period) => (
            <button
              key={period}
              onClick={() => setSelectedYear(period)}
              className={`px-4 py-2 rounded-lg border font-medium text-sm whitespace-nowrap transition-colors ${
                selectedYear === period
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 재무제표 다운로드 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            {selectedYear} 재무제표
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            선택한 기간의 재무제표를 다운로드하실 수 있습니다.
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialDocuments.map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
                    <i className={`${doc.icon} text-blue-600 text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{doc.name}</h4>
                    <p className="text-sm text-gray-500">{selectedYear}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(doc.name, selectedYear)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-download-line"></i>
                  </div>
                  다운로드
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
            <i className="ri-information-line text-blue-600"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">재무정보 안내</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              • 모든 재무 데이터는 K-IFRS 기준으로 작성되었습니다.<br/>
              • 감사받은 재무제표는 매년 3월 말까지 공시됩니다.<br/>
              • 분기별 재무정보는 분기 종료 후 45일 이내에 공시됩니다.<br/>
              • 추가 문의사항은 IR팀(ir@irconnect.com)으로 연락 주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
