
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const countries = [
  { name: '대한민국', englishName: 'South Korea', code: 'KR', flag: '', dialCode: '+82' },
  { name: '미국', englishName: 'United States', code: 'US', flag: '', dialCode: '+1' },
  { name: '일본', englishName: 'Japan', code: 'JP', flag: '', dialCode: '+81' },
  { name: '중국', englishName: 'China', code: 'CN', flag: '', dialCode: '+86' },
  { name: '독일', englishName: 'Germany', code: 'DE', flag: '', dialCode: '+49' },
  { name: '프랑스', englishName: 'France', code: 'FR', flag: '', dialCode: '+33' },
  { name: '영국', englishName: 'United Kingdom', code: 'GB', flag: '', dialCode: '+44' },
  { name: '이탈리아', englishName: 'Italy', code: 'IT', flag: '', dialCode: '+39' },
  { name: '스페인', englishName: 'Spain', code: 'ES', flag: '', dialCode: '+34' },
  { name: '네덜란드', englishName: 'Netherlands', code: 'NL', flag: '', dialCode: '+31' },
  { name: '벨기에', englishName: 'Belgium', code: 'BE', flag: '', dialCode: '+32' },
  { name: '스위스', englishName: 'Switzerland', code: 'CH', flag: '', dialCode: '+41' },
  { name: '오스트리아', englishName: 'Austria', code: 'AT', flag: '', dialCode: '+43' },
  { name: '덴마크', englishName: 'Denmark', code: 'DK', flag: '', dialCode: '+45' },
  { name: '스웨덴', englishName: 'Sweden', code: 'SE', flag: '', dialCode: '+46' },
  { name: '노르웨이', englishName: 'Norway', code: 'NO', flag: '', dialCode: '+47' },
  { name: '핀란드', englishName: 'Finland', code: 'FI', flag: '', dialCode: '+358' },
  { name: '러시아', englishName: 'Russia', code: 'RU', flag: '', dialCode: '+7' },
  { name: '캐나다', englishName: 'Canada', code: 'CA', flag: '', dialCode: '+1' },
  { name: '호주', englishName: 'Australia', code: 'AU', flag: '', dialCode: '+61' },
  { name: '뉴질랜드', englishName: 'New Zealand', code: 'NZ', flag: '', dialCode: '+64' },
  { name: '싱가포르', englishName: 'Singapore', code: 'SG', flag: '', dialCode: '+65' },
  { name: '태국', englishName: 'Thailand', code: 'TH', flag: '', dialCode: '+66' },
  { name: '베트남', englishName: 'Vietnam', code: 'VN', flag: '', dialCode: '+84' },
  { name: '인도네시아', englishName: 'Indonesia', code: 'ID', flag: '', dialCode: '+62' },
  { name: '말레이시아', englishName: 'Malaysia', code: 'MY', flag: '', dialCode: '+60' },
  { name: '필리핀', englishName: 'Philippines', code: 'PH', flag: '', dialCode: '+63' },
  { name: '인도', englishName: 'India', code: 'IN', flag: '', dialCode: '+91' },
  { name: '파키스탄', englishName: 'Pakistan', code: 'PK', flag: '', dialCode: '+92' },
  { name: '방글라데시', englishName: 'Bangladesh', code: 'BD', flag: '', dialCode: '+880' },
  { name: '브라질', englishName: 'Brazil', code: 'BR', flag: '', dialCode: '+55' },
  { name: '아르헨티나', englishName: 'Argentina', code: 'AR', flag: '', dialCode: '+54' },
  { name: 'чиле', englishName: 'Chile', code: 'CL', flag: '', dialCode: '+56' },
  { name: '멕시코', englishName: 'Mexico', code: 'MX', flag: '', dialCode: '+52' },
  { name: '콜롬비아', englishName: 'Colombia', code: 'CO', flag: '', dialCode: '+57' },
  { name: '페루', englishName: 'Peru', code: 'PE', flag: '', dialCode: '+51' },
  { name: '이집트', englishName: 'Egypt', code: 'EG', flag: '', dialCode: '+20' },
  { name: '남아프리카공화국', englishName: 'South Africa', code: 'ZA', flag: '', dialCode: '+27' },
  { name: '나이지리아', englishName: 'Nigeria', code: 'NG', flag: '', dialCode: '+234' },
  { name: '케냐', englishName: 'Kenya', code: 'KE', flag: '', dialCode: '+254' },
  { name: '사우디아라비아', englishName: 'Saudi Arabia', code: 'SA', flag: '', dialCode: '+966' },
  { name: '아랍에미리트', englishName: 'United Arab Emirates', code: 'AE', flag: '', dialCode: '+971' },
  { name: '터키', englishName: 'Turkey', code: 'TR', flag: '', dialCode: '+90' },
  { name: '이스라엘', englishName: 'Israel', code: 'IL', flag: '', dialCode: '+972' },
  { name: '이란', englishName: 'Iran', code: 'IR', flag: '', dialCode: '+98' },
  { name: '아일랜드', englishName: 'Ireland', code: 'IE', flag: '', dialCode: '+353' },
  { name: '포르투갈', englishName: 'Portugal', code: 'PT', flag: '', dialCode: '+351' },
  { name: '그리스', englishName: 'Greece', code: 'GR', flag: '', dialCode: '+30' },
  { name: '체코', englishName: 'Czech Republic', code: 'CZ', flag: '', dialCode: '+420' },
  { name: '폴란드', englishName: 'Poland', code: 'PL', flag: '', dialCode: '+48' },
  { name: '헝가리', englishName: 'Hungary', code: 'HU', flag: '', dialCode: '+36' },
  { name: '루마니아', englishName: 'Romania', code: 'RO', flag: '', dialCode: '+40' },
  { name: '불가리아', englishName: 'Bulgaria', code: 'BG', flag: '', dialCode: '+359' },
  { name: '크로아티아', englishName: 'Croatia', code: 'HR', flag: '', dialCode: '+385' },
  { name: '우크라이나', englishName: 'Ukraine', code: 'UA', flag: '', dialCode: '+380' }
];

const countryFoods = {
  '한국': [
    { name: '삼겹살', description: '고소하고 기름진 맛', image: 'https://readdy.ai/api/search-image?query=Grilled%20Korean%20pork%20belly%20samgyeopsal%20on%20wooden%20cutting%20board%2C%20perfectly%20cooked%20with%20crispy%20edges%2C%20simple%20clean%20background%2C%20food%20photography%20style%2C%20appetizing%20presentation&width=400&height=300&seq=korea-1&orientation=landscape' },
    { name: '김치찌개', description: '매콤하고 깊은 맛', image: 'https://readdy.ai/api/search-image?query=Korean%20kimchi%20jjigae%20stew%20in%20traditional%20stone%20pot%20with%20kimchi%20and%20pork%2C%20bubbling%20hot%2C%20simple%20clean%20background%2C%20authentic%20Korean%20food%20photography&width=400&height=300&seq=korea-2&orientation=landscape' },
    { name: '치킨', description: '바삭하고 짭짤한 맛', image: 'https://readdy.ai/api/search-image?query=Crispy%20Korean%20fried%20chicken%20pieces%20golden%20brown%20color%20on%20white%20plate%2C%20clean%20simple%20background%2C%20professional%20food%20photography%2C%20mouth-watering%20presentation&width=400&height=300&seq=korea-3&orientation=landscape' },
    { name: '호떡', description: '달콤한 설탕과 견과류 디저트', image: 'https://readdy.ai/api/search-image?query=Korean%20hotteok%20sweet%20pancake%20with%20brown%20sugar%20and%20nuts%20filling%2C%20golden%20crispy%20exterior%20on%20plate%2C%20simple%20clean%20background%2C%20street%20food%20dessert%20photography&width=400&height=300&seq=korea-dessert&orientation=landscape' }
  ],
  '일본': [
    { name: '라면', description: '진한 국물과 쫄깃한 면발', image: 'https://readdy.ai/api/search-image?query=Japanese%20ramen%20bowl%20with%20rich%20broth%2C%20soft%20boiled%20egg%2C%20chashu%20pork%20and%20noodles%2C%20simple%20clean%20background%2C%20authentic%20Japanese%20food%20photography&width=400&height=300&seq=japan-1&orientation=landscape' },
    { name: '초밥', description: '신선한 회와 완벽한 조화', image: 'https://readdy.ai/api/search-image?query=Japanese%20sushi%20set%20nigiri%20and%20maki%20rolls%20on%20wooden%20board%2C%20fresh%20fish%20and%20rice%2C%20simple%20clean%20background%2C%20elegant%20Japanese%20cuisine%20photography&width=400&height=300&seq=japan-2&orientation=landscape' },
    { name: '돈카츠', description: '바삭한 튀김과 부드러운돼지고기', image: 'https://readdy.ai/api/search-image?query=Japanese%20tonkatsu%20crispy%20breaded%20pork%20cutlet%20on%20plate%20with%20cabbage%20salad%2C%20simple%20clean%20background%2C%20traditional%20Japanese%20food%20photography&width=400&height=300&seq=japan-3&orientation=landscape' },
    { name: '도라야키', description: '부드럽고 달콤한 전통 조개껍질 케이크', image: 'https://readdy.ai/api/search-image?query=Japanese%20dorayaki%20pancake%20sandwich%20with%20sweet%20red%20bean%20filling%20on%20wooden%20plate%2C%20golden%20brown%20soft%20pancakes%2C%20simple%20clean%20background%2C%20traditional%20Japanese%20dessert&width=400&height=300&seq=japan-dessert&orientation=landscape' }
  ],
  '중국': [
    { name: '짜장면', description: '달콤한 춘장 소스의 매력', image: 'https://readdy.ai/api/search-image?query=Chinese%20jajangmyeon%20black%20bean%20noodles%20in%20white%20bowl%20with%20diced%20pork%20and%20vegetables%2C%20simple%20clean%20background%2C%20Korean-Chinese%20cuisine%20photography&width=400&height=300&seq=china-1&orientation=landscape' },
    { name: '마파두부', description: '매콤하고 얼얼한 사천 요리', image: 'https://readdy.ai/api/search-image?query=Chinese%20mapo%20tofu%20in%20spicy%20red%20sauce%20with%20ground%20pork%2C%20steaming%20hot%20in%20traditional%20bowl%2C%20simple%20clean%20background%2C%20Sichuan%20cuisine%20photography&width=400&height=300&seq=china-2&orientation=landscape' },
    { name: '탕수육', description: '바삭한 튀김과 새콤달콤한 소스', image: 'https://readdy.ai/api/search-image?query=Chinese%20sweet%20and%20sour%20pork%20tangsu%20with%20crispy%20batter%20and%20colorful%20sauce%2C%20simple%20clean%20background%2C%20Chinese%20restaurant%20food%20photography&width=400&height=300&seq=china-3&orientation=landscape' },
    { name: '월병', description: '錦한 단맛과 견과류가 어우러진 전통 디저트', image: 'https://readdy.ai/api/search-image?query=Chinese%20mooncake%20traditional%20pastry%20with%20lotus%20seed%20filling%20and%20salted%20egg%20yolk%2C%20golden%20brown%20surface%20with%20decorative%20patterns%2C%20simple%20clean%20background%2C%20festive%20dessert%20photography&width=400&height=300&seq=china-dessert&orientation=landscape' }
  ],
  '미국': [
    { name: '햄버거', description: '푸짐한 패티와 신선한 야채', image: 'https://readdy.ai/api/search-image?query=American%20hamburger%20with%20beef%20patty%20lettuce%20tomato%20cheese%20on%20sesame%20bun%2C%20simple%20clean%20background%2C%20classic%20American%20food%20photography&width=400&height=300&seq=usa-1&orientation=landscape' },
    { name: 'BBQ 립', description: '부드러운 갈비와 스모키한 향', image: 'https://readdy.ai/api/search-image?query=American%20BBQ%20ribs%20with%20smoky%20glaze%20on%20wooden%20board%2C%20tender%20meat%20falling%20off%20the%20bone%2C%20simple%20clean%20background%2C%20barbecue%20food%20photography&width=400&height=300&seq=usa-2&orientation=landscape' },
    { name: '윙', description: '매콤한 소스와 바삭한 겉면', image: 'https://readdy.ai/api/search-image?query=American%20buffalo%20wings%20with%20spicy%20sauce%20on%20plate%2C%20crispy%20chicken%20wings%20with%20celery%20sticks%2C%20simple%20clean%20background%2C%20sports%20bar%20food%20photography&width=400&height=300&seq=usa-4&orientation=landscape' },
    { name: '브라우니', description: '진한 초콜릿의 달콤쌉싸름한 디저트', image: 'https://readdy.ai/api/search-image?query=American%20chocolate%20brownie%20squares%20with%20fudgy%20texture%20on%20white%20plate%2C%20rich%20dark%20chocolate%20dessert%20with%20nuts%2C%20simple%20clean%20background%2C%20bakery%20dessert%20photography&width=400&height=300&seq=usa-dessert&orientation=landscape' }
  ],
  '프랑스': [
    { name: '코코뱅', description: '와인에 조린 닭고기 요리', image: 'https://readdy.ai/api/search-image?query=French%20coq%20au%20vin%20braised%20chicken%20in%20red%20wine%20sauce%20with%20vegetables%2C%20elegant%20presentation%20in%20traditional%20pot%2C%20simple%20clean%20background%2C%20French%20cuisine%20photography&width=400&height=300&seq=france-1&orientation=landscape' },
    { name: '스테이크 프리트', description: '완벽한 스테이크와 감자튀김', image: 'https://readdy.ai/api/search-image?query=French%20steak%20frites%20grilled%20beef%20with%20golden%20french%20fries%20on%20white%20plate%2C%20classic%20bistro%20presentation%2C%20simple%20clean%20background%2C%20French%20restaurant%20photography&width=400&height=300&seq=france-3&orientation=landscape' },
    { name: '라따뚜이', description: '프로방스 야채 스튜', image: 'https://readdy.ai/api/search-image?query=French%20ratatouille%20colorful%20vegetable%20stew%20with%20eggplant%20zucchini%20tomatoes%2C%20rustic%20presentation%20in%20cast%20iron%20pan%2C%20simple%20clean%20background%2C%20French%20countryside%20cuisine&width=400&height=300&seq=france-4&orientation=landscape' },
    { name: '마들렌', description: '부드럽고 달콤한 전통 조개껍질 케이크', image: 'https://readdy.ai/api/search-image?query=French%20madeleine%20small%20shell-shaped%20sponge%20cakes%20on%20white%20plate%2C%20golden%20butter%20cakes%20with%20ribbed%20surface%2C%20simple%20clean%20background%2C%20French%20patisserie%20dessert%20photography&width=400&height=300&seq=france-dessert&orientation=landscape' }
  ],
  '독일': [
    { name: '슈니첼', description: '바삭한 독일식 돈가스', image: 'https://readdy.ai/api/search-image?query=German%20schnitzel%20crispy%20breaded%20pork%20cutlet%20on%20plate%20with%20lemon%20wedge%2C%20golden%20brown%20coating%2C%20simple%20clean%20background%2C%20traditional%20German%20cuisine%20photography&width=400&height=300&seq=germany-1&orientation=landscape' },
    { name: '소시지', description: '다양한 독일 전통 소시지', image: 'https://readdy.ai/api/search-image?query=German%20bratwurst%20sausages%20grilled%20with%20sauerkraut%20and%20mustard%20on%20wooden%20plate%2C%20traditional%20German%20food%20presentation%2C%20simple%20clean%20background&width=400&height=300&seq=germany-2&orientation=landscape' },
    { name: '프레첼', description: '짭짤한 독일 전통 빵', image: 'https://readdy.ai/api/search-image?query=German%20pretzel%20with%20coarse%20salt%20on%20wooden%20board%2C%20golden%20brown%20twisted%20bread%2C%20simple%20clean%20background%2C%20traditional%20German%20bakery%20photography&width=400&height=300&seq=germany-4&orientation=landscape' },
    { name: '슈바르츠벨더 키르쉬토르테', description: '체리와 초콜릿의 풍부한 조화', image: 'https://readdy.ai/api/search-image?query=German%20Black%20Forest%20cake%20with%20chocolate%20sponge%2C%20cherries%20and%20whipped%20cream%20layers%20on%20white%20plate%2C%20traditional%20German%20dessert%20with%20cherry%20garnish%2C%20simple%20clean%20background&width=400&height=300&seq=germany-dessert&orientation=landscape' }
  ],
  '스페인': [
    { name: '파에야', description: '사프란 향이 나는 쌀 요리', image: 'https://readdy.ai/api/search-image?query=Spanish%20paella%20with%20saffron%20rice%2C%20seafood%20and%20chicken%20in%20traditional%20paellera%20pan%2C%20colorful%20ingredients%2C%20simple%20clean%20background%2C%20authentic%20Spanish%20cuisine%20photography&width=400&height=300&seq=spain-1&orientation=landscape' },
    { name: '하몽', description: '스페인 전통 생햄', image: 'https://readdy.ai/api/search-image?query=Spanish%20jamon%20iberico%20thin%20sliced%20cured%20ham%20on%20wooden%20board%20with%20knife%2C%20premium%20Spanish%20delicacy%2C%20simple%20clean%20background%2C%20elegant%20presentation&width=400&height=300&seq=spain-2&orientation=landscape' },
    { name: '타파스', description: '다양한 스페인 안주 요리', image: 'https://readdy.ai/api/search-image?query=Spanish%20tapas%20variety%20on%20wooden%20board%20with%20olives%20patatas%20bravas%20croquettes%2C%20assorted%20small%20plates%2C%20simple%20clean%20background%2C%20Spanish%20bar%20food%20photography&width=400&height=300&seq=spain-4&orientation=landscape' },
    { name: '츄로스', description: '바삭한 반죽을 튀겨 설탕을 뿌린 ディ저트', image: 'https://readdy.ai/api/search-image?query=Spanish%20churros%20fried%20dough%20pastry%20with%20cinnamon%20sugar%20on%20white%20plate%2C%20golden%20crispy%20sticks%20with%20chocolate%20dipping%20sauce%2C%20simple%20clean%20background%2C%20traditional%20Spanish%20dessert&width=400&height=300&seq=spain-dessert&orientation=landscape' }
  ],
  '인도네시아': [
    { name: '나시고렝', description: '인도네시아식 볶음밥', image: 'https://readdy.ai/api/search-image?query=Indonesian%20nasi%20goreng%20fried%20rice%20with%20egg%20shrimp%20and%20vegetables%20on%20banana%20leaf%2C%20authentic%20Indonesian%20cuisine%2C%20simple%20clean%20background%2C%20Southeast%20Asian%20food%20photography&width=400&height=300&seq=indonesia-1&orientation=landscape' },
    { name: '렌당', description: '코코넛 카레로 조린 쇠고기', image: 'https://readdy.ai/api/search-image?query=Indonesian%20rendang%20beef%20curry%20with%20coconut%20milk%20and%20spices%2C%20rich%20dark%20sauce%2C%20simple%20clean%20background%2C%20traditional%20Padang%20cuisine%20photography&width=400&height=300&seq=indonesia-2&orientation=landscape' },
    { name: '사테', description: '향신료 마리네이드꼬치구이', image: 'https://readdy.ai/api/search-image?query=Indonesian%20satay%20grilled%20meat%20skewers%20with%20peanut%20sauce%2C%20charcoal%20grilled%20with%20spices%2C%20simple%20clean%20background%2C%20street%20food%20photography&width=400&height=300&seq=indonesia-3&orientation=landscape' },
    { name: '클레판', description: '코코넛과 야자설탕의 달콤한 떡', image: 'https://readdy.ai/api/search-image?query=Indonesian%20klepon%20green%20rice%20cake%20balls%20with%20palm%20sugar%20filling%20and%20grated%20coconut%2C%20traditional%20sweet%20dumplings%20on%20banana%20leaf%2C%20simple%20clean%20background%2C%20Indonesian%20dessert%20photography&width=400&height=300&seq=indonesia-dessert&orientation=landscape' }
  ],
  '이탈리아': [
    { name: '피자', description: '치즈와 토마토의 완벽한 조화', image: 'https://readdy.ai/api/search-image?query=Italian%20pizza%20margherita%20with%20fresh%20mozzarella%20basil%20and%20tomato%20sauce%20on%20wooden%20board%2C%20authentic%20Neapolitan%20style%2C%20simple%20clean%20background&width=400&height=300&seq=italy-1&orientation=landscape' },
    { name: '파스타', description: '알덴테 면발과 풍부한 소스', image: 'https://readdy.ai/api/search-image?query=Italian%20pasta%20carbonara%20with%20eggs%20pancetta%20and%20parmesan%20cheese%20in%20white%20bowl%2C%20creamy%20sauce%20with%20black%20pepper%2C%20simple%20clean%20background&width=400&height=300&seq=italy-2&orientation=landscape' },
    { name: '리조또', description: '크리미한 이탈리아 쌀 요리', image: 'https://readdy.ai/api/search-image?query=Italian%20risotto%20with%20mushrooms%20and%20parmesan%20cheese%20in%20white%20bowl%2C%20creamy%20arborio%20rice%2C%20simple%20clean%20background%2C%20elegant%20Italian%20cuisine&width=400&height=300&seq=italy-3&orientation=landscape' },
    { name: '티라미수', description: '커피와 마스카포네의 환상적인 조화', image: 'https://readdy.ai/api/search-image?query=Italian%20tiramisu%20dessert%20with%20ladyfingers%20soaked%20in%20coffee%20and%20mascarpone%20cream%20layers%2C%20dusted%20with%20cocoa%20powder%20in%20glass%2C%20simple%20clean%20background%2C%20classic%20Italian%20dessert&width=400&height=300&seq=italy-dessert&orientation=landscape' }
  ]
};

const foodCountries = [ '한국', '일본', '중국', '미국', '프랑스', '독일', '스페인', '인도네시아', '이탈리아' ];

const heroSlides = [
  {
    country: 'Korea',
    flag: '',
    food: '삼겹살',
    subtitle: '고소하고 기름진 삼겹살에',
    image: 'https://readdy.ai/api/search-image?query=Grilled%20Korean%20pork%20belly%20samgyeopsal%20sizzling%20on%20barbecue%20grill%20with%20golden%20crispy%20edges%2C%20warm%20restaurant%20lighting%2C%20cozy%20Korean%20barbecue%20atmosphere%2C%20appetizing%20food%20photography%20style%20with%20blurred%20background&width=1920&height=1080&seq=hero-korea&orientation=landscape'
  },
  {
    country: 'Japan',
    flag: '',
    food: '초밥',
    subtitle: '신선한 초밥에',
    image: 'https://readdy.ai/api/search-image?query=Fresh%20Japanese%20sushi%20nigiri%20and%20sashimi%20on%20wooden%20board%20in%20elegant%20Japanese%20restaurant%2C%20soft%20ambient%20lighting%2C%20cozy%20atmosphere%2C%20premium%20sushi%20presentation%20with%20blurred%20background&width=1920&height=1080&seq=hero-japan&orientation=landscape'
  },
  {
    country: 'China',
    flag: '',
    food: '마파두부',
    subtitle: '매콤한 마파두부에',
    image: 'https://readdy.ai/api/search-image?query=Chinese%20mapo%20tofu%20in%20spicy%20red%20sauce%20bubbling%20in%20traditional%20stone%20pot%2C%20warm%20restaurant%20lighting%2C%20authentic%20Chinese%20dining%20atmosphere%2C%20appetizing%20Sichuan%20cuisine%20with%20blurred%20background&width=1920&height=1080&seq=hero-china&orientation=landscape'
  },
  {
    country: 'USA',
    flag: '',
    food: '브라우니',
    subtitle: '달콤한 브라우니에',
    image: 'https://readdy.ai/api/search-image?query=Rich%20chocolate%20brownies%20with%20fudgy%20texture%20on%20rustic%20wooden%20table%2C%20warm%20cafe%20lighting%2C%20cozy%20American%20dessert%20atmosphere%2C%20decadent%20chocolate%20dessert%20with%20blurred%20background&width=1920&height=1080&seq=hero-usa&orientation=landscape'
  },
  {
    country: 'France',
    flag: '',
    food: '라따뚜이',
    subtitle: '프로방스 라따뚜이에',
    image: 'https://readdy.ai/api/search-image?query=French%20ratatouille%20colorful%20vegetable%20stew%20in%20rustic%20cast%20iron%20pot%2C%20warm%20French%20bistro%20lighting%2C%20cozy%20Provence%20atmosphere%2C%20rustic%20French%20cuisine%20with%20blurred%20background&width=1920&height=1080&seq=hero-france&orientation=landscape'
  },
  {
    country: 'Germany',
    flag: '',
    food: '슈니첼',
    subtitle: '바삭한 슈니첼에',
    image: 'https://readdy.ai/api/search-image?query=German%20schnitzel%20golden%20crispy%20breaded%20pork%20cutlet%20on%20wooden%20plate%2C%20warm%20German%20restaurant%20lighting%2C%20cozy%20beer%20hall%20atmosphere%2C%20traditional%20German%20cuisine%20with%20blurred%20background&width=1920&height=1080&seq=hero-germany&orientation=landscape'
  },
  {
    country: 'Spain',
    flag: '',
    food: '하몽',
    subtitle: '풍미 깊은 하몽에',
    image: 'https://readdy.ai/api/search-image?query=Spanish%20jamon%20iberico%20thin%20sliced%20cured%20ham%20on%20wooden%20board%2C%20warm%20Spanish%20tapas%20bar%20lighting%2C%20cozy%20Mediterranean%20atmosphere%2C%20premium%20Spanish%20delicacy%20with%20blurred%20background&width=1920&height=1080&seq=hero-spain&orientation=landscape'
  },
  {
    country: 'Indonesia',
    flag: '',
    food: '렌당',
    subtitle: '진한 향신료 렌당에',
    image: 'https://readdy.ai/api/search-image?query=Indonesian%20rendang%20beef%20curry%20with%20rich%20coconut%20milk%20sauce%20in%20traditional%20bowl%2C%20warm%20Indonesian%20restaurant%20lighting%2C%20authentic%20Southeast%20Asian%20atmosphere%2C%20spicy%20curry%20dish%20with%20blurred%20background&width=1920&height=1080&seq=hero-indonesia&orientation=landscape'
  },
  {
    country: 'Italy',
    flag: '',
    food: '티라미수',
    subtitle: '달콤한 티라미수에',
    image: 'https://readdy.ai/api/search-image?query=Italian%20tiramisu%20dessert%20with%20coffee%20soaked%20ladyfingers%20and%20mascarpone%20cream%20in%20elegant%20glass%2C%20warm%20Italian%20cafe%20lighting%2C%20cozy%20trattoria%20atmosphere%2C%20classic%20Italian%20dessert%20with%20blurred%20background&width=1920&height=1080&seq=hero-italy&orientation=landscape'
  }
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    countrySearch: '',
    age: '',
    gender: '',
    marketingAgree: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedFoodCountry, setSelectedFoodCountry] = useState('한국');
  const [autoSlideTimer, setAutoSlideTimer] = useState(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCountrySearch = (e) => {
    const searchValue = e.target.value;
    setFormData(prev => ({
      ...prev,
      countrySearch: searchValue,
      country: ''
    }));

    if (searchValue.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.englishName.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.code.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.dialCode.includes(searchValue)
      );
      setFilteredCountries(filtered);
    }
    setShowCountryDropdown(true);
  };

  const selectCountry = (country) => {
    setFormData(prev => ({
      ...prev,
      country: country.name,
      countrySearch: country.name
    }));
    setShowCountryDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.marketingAgree) {
      alert('마케팅 동의가 필요합니다.');
      return;
    }
    if (!formData.country) {
      alert('출신 국가를 선택해주세요.');
      return;
    }
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      country: '',
      countrySearch: '',
      age: '',
      gender: '',
      marketingAgree: false
    });
    setShowCountryDropdown(false);
    setFilteredCountries(countries);
  };

  const selectFoodCountry = (country) => {
    setSelectedFoodCountry(country);
    resetAutoSlideTimer();
  };

  const resetAutoSlideTimer = () => {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
    const timer = setInterval(() => {
      setSelectedFoodCountry(prev => {
        const currentIndex = foodCountries.indexOf(prev);
        const nextIndex = (currentIndex + 1) % foodCountries.length;
        return foodCountries[nextIndex];
      });
    }, 10000);
    setAutoSlideTimer(timer);
  };

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 10000);

    return () => clearInterval(heroTimer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-[3000ms] ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 42, 102, 0.4), rgba(31, 42, 102, 0.4)), url('${heroSlides[currentHeroSlide].image}')`
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-[3000ms] ease-in-out">
            오늘 저녁, {heroSlides[currentHeroSlide].flag}{heroSlides[currentHeroSlide].food}에<br />
            <span className="text-yellow-400">어떤 맥주</span>를 마실까요?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto transition-all duration-[3000ms] ease-in-out">
            Soolomon이 30초 만에 당신의 식사를 완벽하게 만들어 줄<br />
            인생 맥주를 찾아드립니다
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Link
              href="/recommend"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              추천 체험하기
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              얼리엑세스 등록
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              세계 각국의 대표 음식
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              전 세계 인기 음식들의 맥주 페어링을 미리 확인해보세요
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {foodCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => selectFoodCountry(country)}
                  className={`px-6 py-3 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${selectedFoodCountry === country ? 'bg-yellow-400 text-gray-900 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {countryFoods[selectedFoodCountry]?.map((food, index) => (
              <Link key={index} href={`/recommend?food=${food.name}`} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{food.name}</h3>
                    <p className="text-gray-600">{food.description}</p>
                  </div>
                </div>
              </Link>
            )) || []}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              원하는 음식이 없으신가요? 새로운 맥주 페어링을 요청해보세요!
            </p>
            <button
              onClick={() => window.open('https://forms.gle/example-food-recommendation-request', '_blank')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap font-semibold inline-flex items-center"
            >
              <i className="ri-mail-send-line mr-2"></i>
              음식별 맥주 추천 请求하기
            </button>
          </div>

        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              TPO에 맞는 맥주 추천
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              특별한 순간, 상황에 딱 맞는 맥주를 추천해드려요
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { tpo: '남성데이트', title: '남성과의 데이트', icon: 'ri-heart-line', color: 'bg-blue-100 text-blue-600', description: '진중하고 매력적인 분위기' },
              { tpo: '여성데이트', title: '여성과의 데이트', icon: 'ri-heart-2-line', color: 'bg-pink-100 text-pink-600', description: '로맨틱하고 우아한 분위기' },
              { tpo: '아버지생신', title: '아버지 생신', icon: 'ri-user-heart-line', color: 'bg-green-100 text-green-600', description: '정중하고 따뜻한 자리' },
              { tpo: '어머니생신', title: '어머니 생신', icon: 'ri-heart-3-line', color: 'bg-purple-100 text-purple-600', description: '감사와 사랑을 담은 자리' },
              { tpo: '포트럭파티', title: '포트럭 파티', icon: 'ri-group-line', color: 'bg-orange-100 text-orange-600', description: '즐겁고 활기찬 모임' },
              { tpo: '상사승진축하', title: '상사 승진 축하', icon: 'ri-trophy-line', color: 'bg-yellow-100 text-yellow-600', description: '격식있는 축하 자리' },
              { tpo: '발렌타인데이', title: '발렌타인 데이', icon: 'ri-heart-add-line', color: 'bg-red-100 text-red-600', description: '특별한 로맨스' },
              { tpo: '결혼기념일', title: '결혼기념일', icon: 'ri-heart-pulse-line', color: 'bg-indigo-100 text-indigo-600', description: '소중한 추억의 날' },
              { tpo: '비오는날', title: '비오는 날', icon: 'ri-rainy-line', color: 'bg-gray-100 text-gray-600', description: '차분하고 포근한 분위기' },
              { tpo: '눈오는날', title: '눈오는 날', icon: 'ri-snowy-line', color: 'bg-blue-100 text-blue-600', description: '낭만적인 겨울 정취' }
            ].map((item, index) => (
              <Link key={index} href={`/recommend?tpo=${item.tpo}`} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <i className={`${item.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              원하는 상황이 없으신가요? 새로운 TPO 맥주 추천을 요청해보세요!
            </p>
            <button
              onClick={() => window.open('https://forms.gle/example-tpo-recommendation-request', '_blank')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap font-semibold inline-flex items-center"
            >
              <i className="ri-mail-send-line mr-2"></i>
              TPO별 맥주 추천 요청하기
            </button>
          </div>

        </div>
      </section>

      <section className="py-20 bg-yellow-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            지금 바로 시작보세요!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            오늘 저녁 메뉴가 정해졌다면, 완벽한 맥주 페어링을 찾아보세요
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            얼리엑세스 등록
          </button>
        </div>
      </section>

      <Footer />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">얼리엑세스 등록</h2>
                  <p className="text-gray-600">特別한 소식을 가장 먼저 받아보세요!</p>
                </div>

                <form id="early-access-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="이름을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일 주소 *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="이메일을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">출신국가 *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="countrySearch"
                        value={formData.countrySearch}
                        onChange={handleCountrySearch}
                        onFocus={() => setShowCountryDropdown(true)}
                        required
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                        placeholder="국가명을 입력해주세요 (예: 대한민국, Korea, +82)"
                        autoComplete="off"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="ri-search-line text-gray-400"></i>
                      </div>

                      {showCountryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country.code}
                                onClick={() => selectCountry(country)}
                                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <span className="text-xl mr-3">{country.flag}</span>
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <span className="text-sm text-gray-900">{country.name}</span>
                                    <span className="text-xs text-gray-500 ml-2">({country.code})</span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {country.englishName} • {country.dialCode}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500">
                              일치하는 국가가 없습니다
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">나이 *</label>
                    <div className="relative">
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm appearance-none bg-white"
                      >
                        <option value="">나이를 선택해주세요</option>
                        <option value="20-25">20-25세</option>
                        <option value="26-30">26-30세</option>
                        <option value="31-35">31-35세</option>
                        <option value="36-40">36-40세</option>
                        <option value="41+">41세 이상</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">성별 *</label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm appearance-none bg-white"
                      >
                        <option value="">성별을 선택해주세요</option>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                        <option value="선택안함">선택안함</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-4">
                    <input
                      type="checkbox"
                      name="marketingAgree"
                      checked={formData.marketingAgree}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <label className="text-sm text-gray-600">
                      마케팅 정보 수신에 동의합니다. (필수)
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      登録하기
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-check-line text-2xl text-yellow-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">登録完了!</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  술로몬 성주께서 파티가 준비되는대로
                  <br />
                  초대장을 보내드릴 예정입니다.
                  <br />
                  중간중간 소식도 공유드릴게요!
                </p>
                <button
                  onClick={resetModal}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
