
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white font-pacifico mb-4 block">
              IRConnect
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              투자자와 기업을 연결하는 혁신적인 IR 플랫폼입니다. 
              투명하고 신뢰할 수 있는 소통을 통해 더 나은 투자 환경을 만들어갑니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white">이용약관</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 IRConnect. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-shield-check-line text-green-500"></i>
            </div>
            <span className="text-gray-400 text-sm">SSL 보안 인증</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
