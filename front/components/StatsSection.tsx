
'use client';

const stats = [
  {
    number: '500+',
    label: '등록 기업',
    description: '다양한 규모의 기업들이 참여'
  },
  {
    number: '10,000+',
    label: '투자자',
    description: '활발한 소통을 이어가는 투자자들'
  },
  {
    number: '50,000+',
    label: '질문과 답변',
    description: '투명한 소통의 결과'
  },
  {
    number: '99.9%',
    label: '시스템 안정성',
    description: '신뢰할 수 있는 플랫폼 운영'
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            숫자로 보는 IRConnect
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            많은 투자자와 기업들이 신뢰하는 IR 플랫폼
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-blue-100 mb-2">
                {stat.label}
              </div>
              <div className="text-blue-200 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
