
'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-xl font-bold text-yellow-500 mb-4" style={{ fontFamily: '"Pacifico", serif' }}>
            Soolomon
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            음식과 맥주의 완벽한 페어링을 30초 만에 찾아드립니다. 
            더 이상 맥주 선택 고민하지 마세요!
          </p>
          <div className="text-sm text-gray-500">
            <p>&copy; 2024 Soolomon. 맛있는 페어링의 시작.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
