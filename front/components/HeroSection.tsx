
'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat h-96 flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Modern%20professional%20business%20meeting%20room%20with%20corporate%20executives%20discussing%20financial%20reports%20and%20investment%20strategies%2C%20clean%20minimalist%20office%20environment%20with%20large%20windows%20showing%20city%20skyline%2C%20bright%20natural%20lighting%2C%20contemporary%20furniture%20and%20technology%20displays%2C%20representing%20trust%20and%20transparency%20in%20corporate%20communications&width=1920&height=600&seq=hero-main&orientation=landscape')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            투자자와 기업을<br />
            <span className="text-blue-400">투명하게 연결</span>합니다
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-2xl mx-auto">
            신뢰할 수 있는 IR 플랫폼에서 실시간 소통하고, 
            정확한 정보를 바탕으로 더 나은 투자 결정을 내리세요
          </p>
        </div>
      </div>
    </section>
  );
}
