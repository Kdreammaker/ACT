
'use client';

interface TPORecommendationProps {
  tpo: string;
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

export default function TPORecommendation({ tpo, onBack }: TPORecommendationProps) {
  const getTPOTitle = (tpo: string) => {
    const titles: { [key: string]: string } = {
      '남성데이트': '남성과의 데이트',
      '여성데이트': '여성과의 데이트',
      '아버지생신': '아버지 생신',
      '어머니생신': '어머니 생신',
      '포트럭파티': '포트럭 파티',
      '상사승진축하': '상사의 승진 축하',
      '발렌타인데이': '발렌타인 데이',
      '결혼기념일': '결혼기념일',
      '비오는날': '비오는 날',
      '눈오는날': '눈오는 날'
    };
    return titles[tpo] || tpo;
  };

  const getBeerRecommendations = (tpo: string): Beer[] => {
    const recommendations: { [key: string]: Beer[] } = {
      '남성데이트': [
        {
          name: '기네스 드래프트',
          country: '아일랜드',
          countryFlag: '🇮🇪',
          manufacturer: 'Diageo',
          style: '아이리시 스타우트',
          alcohol: '4.2%',
          description: '크리미한 거품과 진한 로스트 맛이 특징인 아일랜드 대표 스타우트입니다. 부드러운 질감과 깊은 풍미가 매력적입니다.',
          tags: ['프리미엄', '클래식', '남성적'],
          reason: '남성적이고 깊은 맛으로 진중한 대화 분위기를 만들어줍니다',
          similarBeers: ['머피스 스타우트', '영 더블 초콜릿 스타우트'],
          image: 'https://readdy.ai/api/search-image?query=Guinness%20stout%20beer%20bottle%20with%20dark%20black%20color%20and%20creamy%20foam%20head%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=guinness&orientation=portrait',
          price: '5,500원'
        },
        {
          name: '하이네켄',
          country: '네덜란드',
          countryFlag: '🇳🇱',
          manufacturer: 'Heineken N.V.',
          style: '유로피언 라거',
          alcohol: '5.0%',
          description: '1873년부터 이어온 전통 레시피로 만든 세계적인 프리미엄 라거입니다. 균형잡힌 쓴맛과 깔끔한 후미가 특징입니다.',
          tags: ['프리미엄', '글로벌', '대중적'],
          reason: '세련되고 국제적인 이미지로 좋은 인상을 남길 수 있어요',
          similarBeers: ['칼스버그', '스텔라 아르투아'],
          image: 'https://readdy.ai/api/search-image?query=Heineken%20beer%20bottle%20green%20glass%20with%20golden%20lager%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=heineken&orientation=portrait',
          price: '3,800원'
        },
        {
          name: '코젤 다크',
          country: '체코',
          countryFlag: '🇨🇿',
          manufacturer: 'Kozel Brewery',
          style: '체코 다크 라거',
          alcohol: '3.8%',
          description: '체코 전통 방식으로 양조한 진한 색깔의 라거입니다. 캐러멜과 몰트의 달콤한 향이 조화롭게 어우러집니다.',
          tags: ['체코전통', '다크라거', '부드러움'],
          reason: '독특하고 깊은 맛으로 특별한 인상을 줄 수 있습니다',
          similarBeers: ['필스너 우르켈 다크', '버드바이저 다크'],
          image: 'https://readdy.ai/api/search-image?query=Czech%20dark%20lager%20beer%20bottle%20with%20amber%20brown%20color%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=kozel&orientation=portrait',
          price: '4,200원'
        }
      ],
      '여성데이트': [
        {
          name: '호가든',
          country: '벨기에',
          countryFlag: '🇧🇪',
          manufacturer: 'AB InBev',
          style: '벨기에 화이트',
          alcohol: '4.9%',
          description: '오렌지 껍질과 고수를 사용해 만든 벨기에 전통 화이트 맥주입니다. 부드럽고 상큼한 향이 특징적입니다.',
          tags: ['프리미엄', '상큼함', '우아함'],
          reason: '상큼하고 우아한 맛으로 로맨틱한 분위기를 연출해줍니다',
          similarBeers: ['블루문', '파울라너 헤페바이스'],
          image: 'https://readdy.ai/api/search-image?query=Belgian%20white%20beer%20bottle%20with%20cloudy%20wheat%20beer%20appearance%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=hoegaarden&orientation=portrait',
          price: '4,200원'
        },
        {
          name: '코로나',
          country: '멕시코',
          countryFlag: '🇲🇽',
          manufacturer: 'AB InBev',
          style: '멕시칸 라거',
          alcohol: '4.5%',
          description: '멕시코의 햇살과 바다를 담은 상쾌한 라거 맥주입니다. 라임과 함께 마시면 더욱 상큼하고 시원한 맛을 즐길 수 있습니다.',
          tags: ['라임페어링', '저도수', '상큼함'],
          reason: '라임과 함께 마시는 특별한 경험으로 기억에 남을 거예요',
          similarBeers: ['도스 에키스', '파시피코'],
          image: 'https://readdy.ai/api/search-image?query=Corona%20beer%20bottle%20clear%20glass%20with%20lime%20wedge%20garnish%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=corona&orientation=portrait',
          price: '4,000원'
        },
        {
          name: '스텔라 아르투아',
          country: '벨기에',
          countryFlag: '🇧🇪',
          manufacturer: 'AB InBev',
          style: '벨기에 라거',
          alcohol: '5.2%',
          description: '1366년부터 시작된 벨기에 양조 전통을 이어받은 프리미엄 라거입니다. 섬세한 홉 향과 균형잡힌 맛이 특징입니다.',
          tags: ['프리미엄', '전통방식', '우아함'],
          reason: '세련되고 고급스러운 이미지로 특별한 순간을 만들어줍니다',
          similarBeers: ['페로니', '하이네켄'],
          image: 'https://readdy.ai/api/search-image?query=Stella%20Artois%20premium%20lager%20beer%20bottle%20with%20golden%20chalice%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=stella&orientation=portrait',
          price: '4,500원'
        }
      ],
      '아버지생신': [
        {
          name: '안동소주 맥주',
          country: '한국',
          countryFlag: '🇰🇷',
          manufacturer: '안동소주',
          style: '한국 프리미엄 라거',
          alcohol: '4.5%',
          description: '전통 양조 기법과 현대적 맥주 제조법이 만난 특별한 맥주입니다. 깔끔하면서도 깊은 맛이 일품입니다.',
          tags: ['한국전통', '프리미엄', '어른취향'],
          reason: '전통과 현대가 만난 특별한 맛으로 어른들이 좋아하실 거예요',
          similarBeers: ['경월 맥주', '문배주 맥주'],
          image: 'https://readdy.ai/api/search-image?query=Korean%20premium%20lager%20beer%20bottle%20with%20traditional%20design%20elements%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=andong&orientation=portrait',
          price: '5,000원'
        },
        {
          name: '아사히 슈퍼 드라이',
          country: '일본',
          countryFlag: '🇯🇵',
          manufacturer: 'Asahi Breweries',
          style: '일본 드라이 라거',
          alcohol: '5.0%',
          description: '깔끔하고 드라이한 맛이 특징인 일본 대표 맥주입니다. 뒷맛이 깔끔해 식사와 잘 어울립니다.',
          tags: ['드라이', '깔끔함', '식사용'],
          reason: '깔끔하고 부담없는 맛으로 어른들이 선호하는 스타일입니다',
          similarBeers: ['기린 이치방', '삿포로'],
          image: 'https://readdy.ai/api/search-image?query=Asahi%20Super%20Dry%20beer%20bottle%20with%20silver%20label%20and%20clear%20golden%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=asahi&orientation=portrait',
          price: '3,500원'
        },
        {
          name: '칭따오',
          country: '중국',
          countryFlag: '🇨🇳',
          manufacturer: 'Tsingtao Brewery',
          style: '중국 라거',
          alcohol: '4.7%',
          description: '1903년부터 시작된 중국의 대표 맥주 브랜드입니다. 부드럽고 균형잡힌 맛으로 많은 사랑을 받고 있습니다.',
          tags: ['아시아대표', '균형잡힌', '전통'],
          reason: '오랜 역사와 전통이 있는 맥주로 어른들께 친숙할 거예요',
          similarBeers: ['하얼빈', '설화'],
          image: 'https://readdy.ai/api/search-image?query=Tsingtao%20beer%20bottle%20with%20green%20label%20and%20golden%20lager%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=tsingtao&orientation=portrait',
          price: '3,200원'
        }
      ]
    };

    return recommendations[tpo] || [
      {
        name: '추천 맥주 1',
        country: '한국',
        countryFlag: '🇰🇷',
        manufacturer: '추천 브랜드',
        style: '라거',
        alcohol: '4.5%',
        description: `${getTPOTitle(tpo)}에 어울리는 깔끔하고 시원한 맛의 맥주입니다.`,
        tags: ['균형잡힌', '대중적'],
        reason: `${getTPOTitle(tpo)}에 어울리는 깔끔하고 시원한 맛의 맥주입니다`,
        similarBeers: ['카스', '하이트'],
        image: 'https://readdy.ai/api/search-image?query=Generic%20craft%20beer%20bottle%20with%20golden%20color%20beer%2C%20simple%20clean%20background%2C%20professional%20product%20photography&width=300&height=400&seq=default-1&orientation=portrait',
        price: '3,500원'
      }
    ];
  };

  const getTPOTips = (tpo: string) => {
    const tips: { [key: string]: { pairing: string; manner: string } } = {
      '남성데이트': {
        pairing: '진한 맛의 맥주와 함께 스테이크나 바비큐 같은 육류 요리를 추천합니다. 깊은 대화를 나누며 천천히 음미해보세요.',
        manner: '맥주를 따를 때는 상대방 것을 먼저 따라주고, 건배할 때는 눈을 마주치며 진심을 담아 건배하세요.'
      },
      '여성데이트': {
        pairing: '상큼하고 가벼운 맥주와 함께 샐러드나 해산물 요리를 추천합니다. 라임이나 레몬을 곁들이면 더욱 특별해집니다.',
        manner: '맥주 잔을 우아하게 들고, 상대방의 취향을 물어보며 배려하는 모습을 보여주세요.'
      },
      '아버지생신': {
        pairing: '전통적이고 깊은 맛의 맥주와 함께 한식이나 구이 요리를 추천합니다. 안주는 간단하게 준비하는 것이 좋습니다.',
        manner: '어른께 먼저 따라드리고, 두 손으로 정중하게 건배하며 감사의 마음을 표현하세요.'
      }
    };
    return tips[tpo] || {
      pairing: '상황에 맞는 적절한 안주와 함께 드시면 더욱 좋습니다.',
      manner: '상대방을 배려하며 적당한 양을 마시는 것이 중요합니다.'
    };
  };

  const getFoodRecommendations = (tpo: string) => {
    const foods: { [key: string]: string[] } = {
      '남성데이트': ['스테이크', '바비큐 립', '치킨윙'],
      '여성데이트': ['시저샐러드', '연어 카르파치오', '브루스케타'],
      '아버지생신': ['갈비구이', '삼겹살', '족발'],
      '어머니생신': ['과일 안주', '치즈 플래터', '견과류'],
      '포트럭파티': ['피자', '치킨', '나초'],
      '상사승진축하': ['회', '안주 세트', '육회'],
      '발렌타인데이': ['초콜릿', '딸기', '치즈케이크'],
      '결혼기념일': ['오마카세', '스테이크', '랍스터'],
      '비오는날': ['파전', '치킨', '라면'],
      '눈오는날': ['어묵', '붕어빵', '호떡']
    };
    return foods[tpo] || ['적절한 안주', '가벼운 요리', '간단한 스낵'];
  };

  const recommendedBeers = getBeerRecommendations(tpo);
  const tpoTips = getTPOTips(tpo);
  const foodRecommendations = getFoodRecommendations(tpo);

  const handleShare = (beer: Beer) => {
    const shareText = `🍺 ${getTPOTitle(tpo)}에 딱 맞는 맥주 추천!\\n\\n${beer.countryFlag} ${beer.name} (${beer.style})\\n💡 ${beer.reason}\\n\\n나도 Soolomon에서 맥주 추천받기 👉`;
    
    if (navigator.share) {
      navigator.share({
        title: `${getTPOTitle(tpo)} 맥주 추천 - Soolomon`,
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
          다른 상황 선택하기
        </button>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="text-yellow-600">{getTPOTitle(tpo)}</span>에 딱 맞는 맥주
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          전문가가 추천하는 {getTPOTitle(tpo)} 상황에 완벽한 맥주들을 만나보세요
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

      {/* TPO Tips & Food Recommendations */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Pairing Tips & Manner */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <i className="ri-lightbulb-line text-yellow-600 mr-3"></i>
            페어링 팁 & 매너
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <i className="ri-restaurant-line text-yellow-600 mr-2"></i>
                페어링 팁
              </h4>
              <p className="text-gray-600">{tpoTips.pairing}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <i className="ri-user-heart-line text-yellow-600 mr-2"></i>
                매너 가이드
              </h4>
              <p className="text-gray-600">{tpoTips.manner}</p>
            </div>
          </div>
        </div>

        {/* Food Recommendations */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <i className="ri-restaurant-2-line text-yellow-600 mr-3"></i>
            추천 음식
          </h3>
          <p className="text-gray-600 mb-4">
            {getTPOTitle(tpo)}에 어울리는 음식들을 추천해드려요
          </p>
          <div className="grid gap-4">
            {foodRecommendations.map((food, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-restaurant-line text-yellow-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{food}</h4>
                  <p className="text-sm text-gray-600">맥주와 완벽한 조화</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Tips */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-information-line text-yellow-600 mr-3"></i>
          {getTPOTitle(tpo)} 맥주 꿀팁
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🌡️ 온도가 중요해요</h4>
            <p className="text-gray-600">맥주는 4-6도로 차갑게 보관했다가 마시기 직전에 따라주세요.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">⏰ 타이밍을 맞춰주세요</h4>
            <p className="text-gray-600">상황에 맞는 적절한 시간에 맥주를 제안하는 것이 중요합니다.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🥂 적당한 양으로</h4>
            <p className="text-gray-600">과하지 않게 적당한 양을 마시며 분위기를 즐겨보세요.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">💝 상대방 배려</h4>
            <p className="text-gray-600">상대방의 취향과 상황을 고려해서 맥주를 선택해주세요.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12 p-8 bg-yellow-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          다른 상황도 궁금하시나요?
        </h3>
        <p className="text-gray-600 mb-6">
          Soolomon에서 더 많은 상황별 맥주 추천을 받아보세요
        </p>
        <button
          onClick={onBack}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors cursor-pointer whitespace-nowrap"
        >
          다른 상황 선택하기
        </button>
      </div>
    </div>
  );
}
