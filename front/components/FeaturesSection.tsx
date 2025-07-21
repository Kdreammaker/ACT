
'use client';

const features = [
  {
    title: '실시간 소통',
    description: '투자자의 질문에 대한 즉시 알림과 공식 답변을 통해 신속한 소통이 가능합니다',
    image: 'https://readdy.ai/api/search-image?query=Modern%20smartphone%20displaying%20real-time%20notifications%20and%20messaging%20interface%20with%20professional%20business%20communication%2C%20clean%20mobile%20app%20design%20with%20notification%20badges%20and%20instant%20messaging%20features%2C%20representing%20real-time%20investor%20communication&width=600&height=400&seq=feature1&orientation=landscape'
  },
  {
    title: '투명한 정보 공개',
    description: '모든 공시자료와 재무정보를 투명하게 공개하여 신뢰할 수 있는 투자 환경을 조성합니다',
    image: 'https://readdy.ai/api/search-image?query=Professional%20business%20documents%20and%20financial%20reports%20displayed%20on%20a%20modern%20digital%20interface%2C%20transparent%20glass%20panels%20with%20financial%20data%20visualization%2C%20clean%20corporate%20environment%20representing%20transparency%20and%20trust%20in%20business%20communications&width=600&height=400&seq=feature2&orientation=landscape'
  },
  {
    title: '보안과 신뢰성',
    description: '금융 수준의 보안 시스템과 주주 인증을 통해 안전하고 신뢰할 수 있는 플랫폼을 제공합니다',
    image: 'https://readdy.ai/api/search-image?query=Secure%20digital%20lock%20and%20shield%20icons%20representing%20cybersecurity%20and%20data%20protection%20in%20financial%20technology%2C%20modern%20blue%20and%20white%20interface%20with%20security%20certificates%20and%20encrypted%20data%20visualization%2C%20professional%20tech%20security%20concept&width=600&height=400&seq=feature3&orientation=landscape'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            왜 IRConnect를 선택해야 할까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            투자자와 기업 모두에게 최고의 경험을 제공하는 핵심 기능들
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
