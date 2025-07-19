
'use client';

interface BeerRecommendationProps {
  food: string;
  onBack: () => void;
}

interface Beer {
  name: string;
  country: string;
  countryFlag: string;
  manufacturer: string;
  style: string;
  alcohol: string;
  description: string;
  tags: string[];
  reason: string;
  similarBeers: string[];
  image: string;
  price: string;
}

export default function BeerRecommendation({ food, onBack }: BeerRecommendationProps) {
  const getBeerRecommendations = (food: string): Beer[] => {
    const recommendations: { [key: string]: Beer[] } = {
      '삼겹살': [
        {
          name: '제주 펠롱 에일',
          country: '한국',
          countryFlag: '🇰🇷',
          manufacturer: '제주맥주',
          style: '브라운 에일',
          alcohol: '5.0%',
          description: '제주도의 깨끗한 물과 엄선된 몰트로 만든 구수하고 부드러운 브라운 에일입니다. 견과류와 캐러멜 향이 어우러져 깊은 맛을 선사합니다.',
          tags: ['크래프트', '지역특산', '비건'],
          reason: '삼겹살의 기름진 맛을 깔끔하게 잡아주는 견과류 향이 일품이에요',
          similarBeers: ['세븐브로이 브라운에일', '더부스 너티브라운'],
          image: 'https://readdy.ai/api/search-image?query=Korean%20craft%20beer%20bottle%20brown%20ale%20with%20golden%20amber%20color%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style%2C%20appetizing%20beer%20photography&width=300&height=400&seq=beer-1&orientation=portrait',
          price: '3,500원'
        },
        {
          name: '카스 프레시',
          country: '한국',
          countryFlag: '🇰🇷',
          manufacturer: 'OB맥주',
          style: '라거',
          alcohol: '4.5%',
          description: '깔끔하고 상쾌한 맛이 특징인 한국의 대표 라거 맥주입니다. 부드러운 목�넘김과 시원한 청량감을 제공합니다.',
          tags: ['저칼로리', '대중적'],
          reason: '시원하고 깔끔한 맛으로 기름기를 말끔히 씻어내줍니다',
          similarBeers: ['하이트 엑스트라 콜드', '맥스'],
          image: 'https://readdy.ai/api/search-image?query=Korean%20lager%20beer%20bottle%20clear%20golden%20color%20with%20condensation%20drops%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-2&orientation=portrait',
          price: '2,800원'
        },
        {
          name: '호가든',
          country: '벨기에',
          countryFlag: '🇧🇪',
          manufacturer: 'AB InBev',
          style: '벨기에 화이트',
          alcohol: '4.9%',
          description: '오렌지 껍질과 고수를 사용해 만든 벨기에 전통 화이트 맥주입니다. 부드럽고 상큼한 향이 특징적입니다.',
          tags: ['프리미엄', '전통방식'],
          reason: '오렌지 향과 고수향이 삼겹살의 느끼함을 중화시켜줘요',
          similarBeers: ['블루문', '파울라너 헤페바이스'],
          image: 'https://readdy.ai/api/search-image?query=Belgian%20white%20beer%20bottle%20with%20wheat%20beer%20cloudy%20appearance%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-3&orientation=portrait',
          price: '4,200원'
        }
      ],
      '치킨': [
        {
          name: '하이네켄',
          country: '네덜란드',
          countryFlag: '🇳🇱',
          manufacturer: 'Heineken N.V.',
          style: '유로피언 라거',
          alcohol: '5.0%',
          description: '1873년부터 이어온 전통 레시피로 만든 세계적인 프리미엄 라거입니다. 균형잡힌 쓴맛과 깔끔한 후미가 특징입니다.',
          tags: ['프리미엄', '글로벌', '대중적'],
          reason: '치킨의 바삭함과 완벽하게 어울리는 깔끔한 쓴맛이 특징이에요',
          similarBeers: ['칼스버그', '스텔라 아르투아'],
          image: 'https://readdy.ai/api/search-image?query=Green%20beer%20bottle%20international%20lager%20with%20golden%20color%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-4&orientation=portrait',
          price: '3,800원'
        },
        {
          name: '버드와이저',
          country: '미국',
          countryFlag: '🇺🇸',
          manufacturer: 'AB InBev',
          style: '아메리칸 라거',
          alcohol: '5.0%',
          description: '미국의 대표 라거 맥주로 쌀을 첨가해 만든 가볍고 상쾌한 맛이 특징입니다. 부드러운 목넘김과 깔끔한 마무리가 인상적입니다.',
          tags: ['아메리칸', '대중적', '저칼로리'],
          reason: '가벼운 맛과 탄산감이 치킨의 기름기를 시원하게 날려줍니다',
          similarBeers: ['쿠어스 라이트', '밀러 라이트'],
          image: 'https://readdy.ai/api/search-image?query=American%20lager%20beer%20bottle%20red%20and%20white%20label%20with%20golden%20beer%20color%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=beer-5&orientation=portrait',
          price: '3,500원'
        }
      ],
      '피자': [
        {
          name: '스텔라 아르투아',
          country: '벨기에',
          countryFlag: '🇧🇪',
          manufacturer: 'AB InBev',
          style: '벨기에 라거',
          alcohol: '5.2%',
          description: '1366년부터 시작된 벨기에 양조 전통을 이어받은 프리미엄 라거입니다. 섬세한 홉 향과 균형잡힌 맛이 특징입니다.',
          tags: ['프리미엄', '전통방식', '글로벌'],
          reason: '피자의 치즈와 토마토 소스에 완벽하게 어울리는 균형잡힌 맛',
          similarBeers: ['페로니', '하이네켄'],
          image: 'https://readdy.ai/api/search-image?query=Premium%20Belgian%20lager%20beer%20bottle%20with%20golden%20chalice%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-6&orientation=portrait',
          price: '4,500원'
        },
        {
          name: '코로나',
          country: '멕시코',
          countryFlag: '🇲🇽',
          manufacturer: 'AB InBev',
          style: '멕시칸 라거',
          alcohol: '4.5%',
          description: '멕시코의 햇살과 바다를 담은 상쾌한 라거 맥주입니다. 라임과 함께 마시면 더욱 상큼하고 시원한 맛을 즐길 수 있습니다.',
          tags: ['라임페어링', '저도수', '여름특화'],
          reason: '라임과 함께 마시면 피자의 풍미를 더욱 살려줍니다',
          similarBeers: ['도스 에키스', '파시피코'],
          image: 'https://readdy.ai/api/search-image?query=Mexican%20beer%20bottle%20clear%20glass%20with%20lime%20wedge%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-7&orientation=portrait',
          price: '4,000원'
        }
      ]
    };

    return recommendations[food] || [
      {
        name: '추천 맥주 1',
        country: '한국',
        countryFlag: '🇰🇷',
        manufacturer: '추천 브랜드',
        style: '라거',
        alcohol: '4.5%',
        description: `${food}와 잘 어울리는 깔끔하고 시원한 맛의 맥주입니다. 균형잡힌 홉과 몰트의 조화가 일품입니다.`,
        tags: ['균형잡힌', '대중적'],
        reason: `${food}와 잘 어울리는 깔끔하고 시원한 맛의 맥주입니다`,
        similarBeers: ['카스', '하이트'],
        image: 'https://readdy.ai/api/search-image?query=Generic%20craft%20beer%20bottle%20with%20golden%20color%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-default-1&orientation=portrait',
        price: '3,500원'
      },
      {
        name: '추천 맥주 2',
        country: '미국',
        countryFlag: '🇺🇸',
        manufacturer: '크래프트 브루어리',
        style: 'IPA',
        alcohol: '5.5%',
        description: `${food}의 풍미를 더욱 살려주는 홉의 쌉쌀한 맛이 일품입니다. 감귤류의 향과 쌉쌀한 뒷맛이 조화롭습니다.`,
        tags: ['크래프트', '홉향강함', '신제품'],
        reason: `${food}의 풍미를 더욱 살려주는 홉의 쌉쌀한 맛이 일품입니다`,
        similarBeers: ['더부스 IPA', '세븐브로이 IPA'],
        image: 'https://readdy.ai/api/search-image?query=IPA%20craft%20beer%20bottle%20with%20amber%20color%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography%20style&width=300&height=400&seq=beer-default-2&orientation=portrait',
        price: '4,200원'
      }
    ];
  };

  const recommendedBeers = getBeerRecommendations(food);

  const handleShare = (beer: Beer) => {
    const shareText = `🍺 ${food}에 딱 맞는 맥주 추천!\\n\\n${beer.countryFlag} ${beer.name} (${beer.style})\\n💡 ${beer.reason}\\n\\n나도 Soolomon에서 맥주 추천받기 👉`;
    
    if (navigator.share) {
      navigator.share({
        title: `${food} 맥주 추천 - Soolomon`,
        text: shareText,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin);
      alert('추천 내용이 복사되었습니다!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <button
          onClick={onBack}
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-6 cursor-pointer"
        >
          <i className="ri-arrow-left-line text-xl mr-2"></i>
          다른 음식 선택하기
        </button>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="text-yellow-600">{food}</span>에 딱 맞는 맥주
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          전문가가 추천하는 {food}와 완벽한 조화를 이루는 맥주들을 만나보세요
        </p>
      </div>

      {/* Beer Recommendations */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {recommendedBeers.map((beer, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Beer Image */}
            <div className="aspect-square bg-gray-50 p-8 flex items-center justify-center">
              <img 
                src={beer.image}
                alt={beer.name}
                className="h-full w-auto object-contain object-center"
              />
            </div>
            
            {/* Beer Info */}
            <div className="p-6">
              {/* Basic Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{beer.name}</h3>
                  <span className="text-lg font-bold text-yellow-600">{beer.price}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{beer.countryFlag}</span>
                  <span className="text-gray-600">{beer.country}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{beer.manufacturer}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-gray-100 px-2 py-1 rounded">{beer.style}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{beer.alcohol}</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {beer.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">맥주 설명</h4>
                <p className="text-gray-700 text-sm">{beer.description}</p>
              </div>
              
              {/* Recommendation Reason */}
              <div className="bg-yellow-50 p-4 rounded-xl mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2"></i>
                  추천 이유
                </h4>
                <p className="text-gray-700 text-sm">{beer.reason}</p>
              </div>
              
              {/* Similar Beers */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">비슷한 맥주</h4>
                <div className="flex flex-wrap gap-2">
                  {beer.similarBeers.map((similar, similarIndex) => (
                    <span key={similarIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {similar}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleShare(beer)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                >
                  <i className="ri-share-line mr-2"></i>
                  공유하기
                </button>
                <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-heart-line text-xl text-gray-400 hover:text-red-500"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-information-line text-yellow-600 mr-3"></i>
          {food} 페어링 꿀팁
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🌡️ 온도가 중요해요</h4>
            <p className="text-gray-600">맥주는 4-6도로 차갑게, {food}는 따뜻할 때 함께 드시면 최고의 맛을 경험할 수 있어요.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">⏰ 타이밍을 맞춰주세요</h4>
            <p className="text-gray-600">{food}가 나오기 직전에 맥주를 따라서 탄산과 거품이 살아있을 때 드세요.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🥂 적당한 양으로</h4>
            <p className="text-gray-600">한 번에 많이 마시지 말고 {food}와 번갈아가며 조금씩 음미해보세요.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">👥 함께 나누세요</h4>
            <p className="text-gray-600">친구들과 함께 다양한 맥주를 나눠 마시며 취향을 발견해보세요.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12 p-8 bg-yellow-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          다른 음식도 궁금하시나요?
        </h3>
        <p className="text-gray-600 mb-6">
          Soolomon에서 더 많은 음식과 맥주 페어링을 발견해보세요
        </p>
        <button
          onClick={onBack}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors cursor-pointer whitespace-nowrap"
        >
          다른 음식 선택하기
        </button>
      </div>
    </div>
  );
}
