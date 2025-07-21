
'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section 
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://readdy.ai/api/search-image?query=Modern%20corporate%20office%20building%20at%20sunset%20with%20glass%20windows%20reflecting%20golden%20light%2C%20professional%20business%20environment%20representing%20growth%20and%20success%2C%20clean%20architectural%20lines%20with%20warm%20lighting%20creating%20trust%20and%20ambition%20atmosphere&width=1920&height=600&seq=cta-bg&orientation=landscape')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          지금 바로 시작하세요
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          투자자와 기업을 연결하는 새로운 방식의 IR 플랫폼에서
          더 나은 투자 경험을 만나보세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/signup" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            무료 회원가입
          </Link>
          <Link 
            href="/contact" 
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
