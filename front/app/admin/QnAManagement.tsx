
'use client';

import { useState } from 'react';
import TemplateModal from './components/TemplateModal';
import ReferenceDBModal from './components/ReferenceDBModal';
import DocumentSelectModal from './components/DocumentSelectModal';

const mockQnAItems = [
  {
    id: 1,
    question: '2024년 신규 사업 계획에 대해 구체적인 내용을 알고 싶습니다.',
    answer: '2024에는 AI 기반 스마트팩토리 솔루션과 친환경 에너지 사업에 집중 투자할 예정입니다. 총 투자 규모는 약 500억원으로 계획하고 있으며, 이를 통해 2025년까지 매출 20% 증가를 목표로 하고 있습니다.',
    author: '투자자A',
    email: 'investor@example.com',
    category: '사업계획',
    status: 'answered',
    priority: 'high',
    votes: 24,
    createdAt: '2024.01.15',
    answeredAt: '2024.01.16',
    isAnonymous: false
  },
  {
    id: 2,
    question: '최근 원자재 가격 상승이 매출에 미치는 영향은 어느 정도인가요?',
    answer: '',
    author: '투자자B',
    email: 'investor2@example.com',
    category: '재무',
    status: 'pending',
    priority: 'medium',
    votes: 18,
    createdAt: '2024.01.14',
    answeredAt: null,
    isAnonymous: false
  },
  {
    id: 3,
    question: 'ESG 경영 도입 후 예상되는 비용과 효과에 대해 설명해주세요.',
    answer: '',
    author: '익명',
    email: '',
    category: 'ESG',
    status: 'pending',
    priority: 'low',
    votes: 15,
    createdAt: '2024.01.13',
    answeredAt: null,
    isAnonymous: true
  }
];

const categories = ['전체', '사업계획', '재무', 'ESG', '해외진출', '배당', '연구개발', '경쟁력', '신제품'];
const statusOptions = ['전체', 'pending', 'answered', 'hidden'];
const priorityOptions = ['전체', 'high', 'medium', 'low'];

export default function QnAManagement() {
  const [qnaItems, setQnAItems] = useState(mockQnAItems);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedPriority, setSelectedPriority] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answeringItem, setAnsweringItem] = useState<any>(null);
  const [answerText, setAnswerText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAISidebar, setShowAISidebar] = useState(true);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showReferenceDBModal, setShowReferenceDBModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showDocumentSelectModal, setShowDocumentSelectModal] = useState(false);
  const [availableDocuments] = useState([
    { id: 1, title: '연간보고서 2024', pages: '15-18페이지: 성장전략', type: 'report' },
    { id: 2, title: 'Q4 2024 실적발표', pages: '5페이지: 시장 상황', type: 'earnings' },
    { id: 3, title: '지속가능경영보고서', pages: '전체', type: 'esg' },
    { id: 4, title: '사업보고서 2024', pages: '12-25페이지: 사업현황', type: 'business' },
    { id: 5, title: 'IR 프레젠테이션', pages: '8-12ページ: 미래전략', type: 'presentation' }
  ]);
  const [selectedDocuments, setSelectedDocuments] = useState([1, 2]);
  const [selectedKeyPoints, setSelectedKeyPoints] = useState(['장기 전략', '성장 지속가능성', '시장 상황']);
  const [selectedResponseStyle, setSelectedResponseStyle] = useState('전문적');

  const filteredItems = qnaItems.filter(item => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === '전체' || item.status === selectedStatus;
    const matchesPriority = selectedPriority === '전체' || item.priority === selectedPriority;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesPriority && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleAnswer = (item: any) => {
    setAnsweringItem(item);
    setAnswerText(item.answer || '');
    setShowAnswerModal(true);
    setShowAISidebar(true);
  };

  const handleSaveAnswer = () => {
    setQnAItems(qnaItems.map(item =>
      item.id === answeringItem.id
        ? { ...item, answer: answerText, status: 'answered', answeredAt: new Date().toLocaleDateString('ko-KR') }
        : item
    ));
    setShowAnswerModal(false);
    setAnsweringItem(null);
    setAnswerText('');
    setShowAISidebar(true);
  };

  const handleAddDocument = (documentId: number) => {
    if (!selectedDocuments.includes(documentId)) {
      setSelectedDocuments([...selectedDocuments, documentId]);
    }
    setShowDocumentModal(false);
  };

  const handleRemoveDocument = (documentId: number) => {
    setSelectedDocuments(selectedDocuments.filter(id => id !== documentId));
  };

  const handleSelectFromDB = (document: any) => {
    const newDoc = {
      id: availableDocuments.length + document.id,
      title: document.title,
      pages: document.description,
      type: document.tag.toLowerCase()
    };

    if (!selectedDocuments.includes(newDoc.id)) {
      setSelectedDocuments([...selectedDocuments, newDoc.id]);
    }
    setShowDocumentSelectModal(false);
  };

  const handleApplyTemplate = (template: any) => {
    setAnswerText(template.content);
    setShowTemplateModal(false);
    setTemplates(templates.map(t =>
      t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
    ));
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'report':
        return 'ri-file-text-line';
      case 'earnings':
        return 'ri-line-chart-line';
      case 'esg':
        return 'ri-leaf-line';
      case 'business':
        return 'ri-building-line';
      case 'presentation':
        return 'ri-slideshow-line';
      default:
        return 'ri-file-text-line';
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setQnAItems(qnaItems.map(item => item.id === id ? { ...item, status } : item));
  };

  const handlePriorityChange = (id: number, priority: string) => {
    setQnAItems(qnaItems.map(item => item.id === id ? { ...item, priority } : item));
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 이 질문을 삭제하시겠습니까?')) {
      setQnAItems(qnaItems.filter(item => item.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'hidden':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-orange-100 text-orange-600';
      case 'low':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleResponseStyleChange = (style: string) => {
    setSelectedResponseStyle(style);

    if (answeringItem) {
      let styleBasedResponse = '';

      switch (style) {
        case '간결한':
          styleBasedResponse = `질문: ${answeringItem.question}\\\\n\\\\n답변:\\\\n• 핵심 사항만 간단히 설명\\\\n• 주요 포인트 3가지로 요약\\\\n• 구체적 수치 및 일정 포함\\\\n\\\\n추가 문의사항이 있으시면 언제든 연락 주시기 바랍니다.`;
          break;
        case '전문적':
          styleBasedResponse = `귀하의 문의사항에 대해 전문적인 관점에서 답변드리겠습니다.\\\\n\\\\n${answeringItem.question}\\\\n\\\\n이와 관련하여 다음과 같이 答변드립니다:\\\\n\\\\n1. 현재 상황 분석\\\\n- 시장 환경 및 업계 동향 고려\\\\n- 당사의 전략적 포지션 평가\\\\n\\\\n2. 구체적인 대응 방안\\\\n- 단계별 실행 계획\\\\n- 예상 성과 및 리스크 분석\\\\n\\\\n3. 향후 전망\\\\n- 중장기적 관점에서의 영향\\\\n- 지속적인 모니터링 계획\\\\n\\\\n감사합니다.`;
          break;
        case '상세한':
          styleBasedResponse = `안녕하세요. 귀하의 질문에 대해 상세히 설명드리겠습니다.\\\\n\\\\n【질문 내용】\\\\n${answeringItem.question}\\\\n\\\\n【상세 답변】\\\\n\\\\n1. 배경 및 현황\\\\n   - 관련 시장 상황 분석\\\\n   - 당사의 현재 포지션\\\\n   - 업계 전반적 동향\\\\n\\\\n2. 구체적 내용\\\\n   - 세부 실행 계획\\\\n   - 투자 규모 및 일정\\\\n   - 예상 효과 및 성과 지표\\\\n\\\\n3. 리스크 요인\\\\n   - 잠재적 위험 요소\\\\n   - 대응 방안\\\\n   - 모니터링 체계\\\\n\\\\n4. 향후 계획\\\\n   - 단계별 로드맵\\\\n   - 성과 측정 방법\\\\n   - 지속적 개선 계획\\\\n\\\\n추가 궁금한 사항이 있으시면 언제든 문의해 주시기 바랍니다.`;
          break;
        case '친근한':
          styleBasedResponse = `안녕하세요! \\\\n\\\\n좋은 질문을 해주셔서 감사합니다. ${answeringItem.question}에 대해 쉽게 설명드릴게요.\\\\n\\\\n🔍 간단히 말씀드리면:\\\\n- 핵심 내용을 알기 쉽게 정리\\\\n- 구체적인 예시와 함께 설명\\\\n- 실질적인 도움이 되는 정보 제공\\\\n\\\\n📊 자세한 내용:\\\\n1. 현재 상황은 이렇습니다\\\\n2. 우리가 계획하고 있는 것들\\\\n3. 앞으로 기대할 수 있는 것들\\\\n\\\\n궁금한 점이 더 있으시면 언제든지 편하게 물어보세요! 😊`;
          break;
        case '기술적':
          styleBasedResponse = `기술적 관점에서 답변드리겠습니다.\\\\n\\\\n【Query Analysis】\\\\n${answeringItem.question}\\\\n\\\\n【Technical Response】\\\\n\\\\n▶ Technical Specifications:\\\\n- 시스템 아키텍처 관점\\\\n- 기술적 구현 방안\\\\n- 성능 최적화 전략\\\\n\\\\n▶ Implementation Details:\\\\n- 핵심 기술 스택\\\\n- 개발 프로세스\\\\n- 品질 보증 체계\\\\n\\\\n▶ Performance Metrics:\\\\n- KPI 및 측정 지표\\\\n- 벤치마킹 결과\\\\n- 최적화 성과\\\\n\\\\n▶ Technical Roadmap:\\\\n- 기술 발전 로드맵\\\\n- 연구개발 계획\\\\n- 혁신 전략\\\\n\\\\n기술적 세부사항에 대한 추가 문의는 언제든 환영합니다.`;
          break;
        default:
          return;
      }

      setAnswerText(styleBasedResponse);
    }
  };

  const handleDocumentSelect = (documents: any[]) => {
    const newDocuments = documents.map(doc => ({
      id: availableDocuments.length + doc.id,
      title: doc.title,
      pages: doc.description,
      type: doc.tag.toLowerCase()
    }));

    const newIds = newDocuments.map(doc => doc.id);
    setSelectedDocuments([...selectedDocuments, ...newIds]);
  };

  const handleRemoveKeyPoint = (keyPointToRemove: string) => {
    setSelectedKeyPoints(selectedKeyPoints.filter(point => point !== keyPointToRemove));
  };

  const handleAddKeyPoint = (newKeyPoint: string) => {
    if (newKeyPoint.trim() && !selectedKeyPoints.includes(newKeyPoint.trim())) {
      setSelectedKeyPoints([...selectedKeyPoints, newKeyPoint.trim()]);
    }
  };

  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: '사업계획 관련 표준 답변',
      category: '사업계획',
      content: '당사는 지속적인 성장을 위해 다음과 같은 사업계획을 수립하고 있습니다.\\\\n\\\\n1. 핵심 사업 영역 확장\\\\n2. 신기술 개발 및 투자\\\\n3. 시장 점유율 확대\\\\n\\\\n구체적인 내용은 다음과 같습니다...',
      createdBy: '관리자',
      createdAt: '2024.01.10',
      usageCount: 15
    },
    {
      id: 2,
      title: '재무 현황 표준 답변',
      category: '재무',
      content: '당사의 재무 현황은 다음과 같습니다.\\\\n\\\\n- 매출액: 전년 대비 증가\\\\n- 영업이익: 안정적 수준 유지\\\\n- 부채비율: 건전한 수준\\\\n\\\\n자세한 재무 정보는 공시자료를 참고해 주시기 바랍니다.',
      createdBy: '관리자',
      createdAt: '2024.01.08',
      usageCount: 23
    },
    {
      id: 3,
      title: 'ESG 경영 표준 답변',
      category: 'ESG',
      content: '당사는 지속 가능한 경영을 위해 ESG 경영을 적극 추진하고 있습니다.\\\\n\\\\n[환경(E)]\\\\n- 친환경 제품 개발\\\\n- 탄소 배출량 감축\\\\n\\\\n[사회(S)]\\\\n- 임직원 복지 향상\\\\n- 지역사회 공헌\\\\n\\\\n[지배구조(G)]\\\\n- 투명한 경영\\\\n- 이사회 독립성 강화',
      createdBy: '관리자',
      createdAt: '2024.01.05',
      usageCount: 8
    }
  ]);

  const [referenceDocuments] = useState([
    {
      id: 1,
      title: '2024년 1분기 실적발표 일정 안내',
      description: '2024년 1분기 실적발표 일정을 다음과 같이 안내드립니다.',
      source: '공지사항',
      tag: '공지사항',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.15',
      fileSize: '2.4MB',
      usageCount: 12,
      lastUsed: '2024.01.20'
    },
    {
      id: 2,
      title: '2024년 1분기 실적공시',
      description: '2024년 1분기 경영실적 공시',
      source: '공시자료',
      tag: '공시资料',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.20',
      fileSize: '2.4MB',
      usageCount: 8,
      lastUsed: '2024.01.22'
    },
    {
      id: 3,
      title: '2024년 회사소개서',
      description: '회사 개요, 사업현황, 미래 전략이 포함된 종합 소개자료',
      source: '홍보자료',
      tag: '홍보자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.15',
      fileSize: '8.5MB',
      usageCount: 15,
      lastUsed: '2024.01.21'
    },
    {
      id: 4,
      title: '2024년 재무상태표',
      description: '2024년 재무상태표',
      source: '재무정보',
      tag: '재무자료',
      isActive: true,
      uploadedBy: '관리자',
      uploadDate: '2024.01.15',
      fileSize: '2.4MB',
      usageCount: 6,
      lastUsed: '2024.01.19'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Q&A 관리</h1>
          <p className="text-gray-600 mt-1">투자자 질문에 답변하고 관리할 수 있습니다</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap flex items-center"
          >
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-file-copy-line"></i>
            </div>
            템플릿 보기
          </button>
          <button
            onClick={() => setShowReferenceDBModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium whitespace-nowrap flex items-center"
          >
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-database-2-line"></i>
            </div>
            참고문서 DB
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 질문</p>
              <p className="text-2xl font-bold text-gray-900">{qnaItems.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-question-answer-line text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">답변 대기</p>
              <p className="text-2xl font-bold text-yellow-600">{qnaItems.filter(q => q.status === 'pending').length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">답변 완료</p>
              <p className="text-2xl font-bold text-green-600">{qnaItems.filter(q => q.status === 'answered').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">높은 우선순위</p>
              <p className="text-2xl font-bold text-red-600">{qnaItems.filter(q => q.priority === 'high').length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-red-600"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="질문 내용으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === '전체' ? '전체 상태' :
                      status === 'pending' ? '답변대기' :
                        status === 'answered' ? '답변완료' : '숨김'}
                  </option>
                ))}
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8"
              >
                {priorityOptions.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === '전체' ? '전체 우선순위' :
                      priority === 'high' ? '높음' :
                        priority === 'medium' ? '보통' : '낮음'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                  {item.status === 'pending' ? '답변대기' :
                    item.status === 'answered' ? '답변완료' : '숨김'}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority === 'high' ? '높음' :
                    item.priority === 'medium' ? '보통' : '낮음'}
                </span>
                {item.isAnonymous && (
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                    익명
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-thumb-up-line"></i>
                </div>
                <span className="text-sm font-medium">{item.votes}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Q. {item.question}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>작성자: {item.author}</span>
                  {!item.isAnonymous && item.email && (
                    <span>이메일: {item.email}</span>
                  )}
                </div>
                <span>{item.createdAt}</span>
              </div>
            </div>

            {item.status === 'answered' && item.answer && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <h4 className="text-md font-semibold text-green-800 mb-2">A. 답변</h4>
                <p className="text-green-700 leading-relaxed whitespace-pre-wrap">
                  {item.answer}
                </p>
                <p className="text-xs text-green-600 mt-2">답변일: {item.answeredAt}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <select
                  value={item.priority}
                  onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                  className="text-xs px-2 py-1 border border-gray-300 rounded pr-8"
                >
                  <option value="high">높음</option>
                  <option value="medium">보통</option>
                  <option value="low">낮음</option>
                </select>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="text-xs px-2 py-1 border border-gray-300 rounded pr-8"
                >
                  <option value="pending">답변대기</option>
                  <option value="answered">답변완료</option>
                  <option value="hidden">숨김</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAnswer(item)}
                  className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 whitespace-nowrap"
                >
                  {item.status === 'answered' ? '답변 수정' : '답변 작성'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 whitespace-nowrap"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${currentPage === page
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              다음
            </button>
          </div>
        </div>
      )}

      {showAnswerModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex">
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">답변 작성</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">질문</h4>
                  <p className="text-gray-700 leading-relaxed">{answeringItem?.question}</p>
                  <div className="text-sm text-gray-500 mt-2 flex items-center space-x-4">
                    <span>작성자: {answeringItem?.author}</span>
                    <span>작성일: {answeringItem?.createdAt}</span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                      {answeringItem?.category}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">답변 내용</label>
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    rows={16}
                    placeholder="전문적이고 상세한 답변을 작성해주세요..."
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-gray-500">
                      {answerText.length} 자
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        미리보기
                      </button>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        초안 저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-attachment-2"></i>
                    </div>
                    <span className="text-sm">첨부파일</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-table-line"></i>
                    </div>
                    <span className="text-sm">표 삽입</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAnswerModal(false)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveAnswer}
                    disabled={!answerText.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    답변 저장
                  </button>
                </div>
              </div>
            </div>

            {showAISidebar && (
              <div className="w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
                <div className="px-4 py-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">AI 응답 도우미</h4>
                    <button
                      onClick={() => setShowAISidebar(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-close-line"></i>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                        <div className="w-4 h-4 flex items-center justify-center mr-2">
                          <i className="ri-file-text-line text-blue-600"></i>
                        </div>
                        참고 문서
                        <button
                          onClick={() => setShowDocumentSelectModal(true)}
                          className="ml-auto text-blue-600 text-sm hover:text-blue-700"
                        >
                          + 문서 추가
                        </button>
                      </h5>
                      <div className="space-y-2">
                        {selectedDocuments.map(docId => {
                          const doc = availableDocuments.find(d => d.id === docId);
                          if (!doc) return null;
                          return (
                            <div key={doc.id} className="flex items-center space-x-2 p-2 bg-blue-50 rounded border border-blue-200">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className={`${getDocumentIcon(doc.type)} text-blue-600`}></i>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-blue-900">{doc.title}</p>
                                <p className="text-xs text-blue-600">{doc.pages}</p>
                              </div>
                              <div className="flex space-x-1">
                                <button className="w-4 h-4 flex items-center justify-center text-blue-600 hover:text-blue-700">
                                  <i className="ri-eye-line"></i>
                                </button>
                                <button className="w-4 h-4 flex items-center justify-center text-blue-600 hover:text-blue-700">
                                  <i className="ri-external-link-line"></i>
                                </button>
                                <button
                                  onClick={() => handleRemoveDocument(doc.id)}
                                  className="w-4 h-4 flex items-center justify-center text-red-600 hover:text-red-700"
                                >
                                  <i className="ri-close-line"></i>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="문서 찾기"
                            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="absolute left-2.5 top-2.5 w-3 h-3 flex items-center justify-center">
                            <i className="ri-search-line text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
                        <span>인용</span>
                        <button
                          onClick={() => {
                            if (answeringItem?.question) {
                              navigator.clipboard.writeText(answeringItem.question);
                              // Simple visual feedback
                              const button = document.activeElement as HTMLButtonElement;
                              const originalText = button.innerHTML;
                              button.innerHTML = '<i class="ri-check-line"></i>';
                              setTimeout(() => {
                                button.innerHTML = originalText;
                              }, 1000);
                            }
                          }}
                          className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
                          title="인용 내용 복사"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                      </h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {answeringItem?.question}
                      </p>
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="w-4 h-4 flex items-center justify-center mt-0.5">
                            <i className="ri-lightbulb-flash-line text-blue-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900 mb-1">선택된 문서에서 관련 정보 발견:</p>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• 연간보고서 2024: 15-18페이지의 성장전략 개요</li>
                              <li>• Q4 2024 실적발표: CEO의 시장 상황 언급 (5페이지)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-3">응답 스타일</h5>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleResponseStyleChange('전문적')}
                          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                            selectedResponseStyle === '전문적'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          전문적
                        </button>
                        <button
                          onClick={() => handleResponseStyleChange('간결한')}
                          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                            selectedResponseStyle === '간결한'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          간결한
                        </button>
                        <button
                          onClick={() => handleResponseStyleChange('상세한')}
                          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                            selectedResponseStyle === '상세한'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          상세한
                        </button>
                        <button
                          onClick={() => handleResponseStyleChange('친근한')}
                          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                            selectedResponseStyle === '친근한'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          친근한
                        </button>
                        <button
                          onClick={() => handleResponseStyleChange('기술적')}
                          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                            selectedResponseStyle === '기술적'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          기술적
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-3">포함할 핵심 포인트</h5>
                      <div className="space-y-2">
                        {selectedKeyPoints.map((keyPoint, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{keyPoint}</span>
                            <button
                              onClick={() => handleRemoveKeyPoint(keyPoint)}
                              className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="다른 핵심 포인트 추가..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const target = e.target as HTMLInputElement;
                              handleAddKeyPoint(target.value);
                              target.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                  <button
                    onClick={() => {
                      const generateResponse = () => {
                        const selectedDocs = selectedDocuments.map(docId =>
                          availableDocuments.find(d => d.id === docId)
                        ).filter(Boolean);

                        const baseResponse = `안녕하세요. 귀하의 질문에 대해 답변드리겠습니다.\\\\n\\\\n${answeringItem?.question}\\\\n\\\\n이와 관련하여 다음과 같이 答변드립니다:\\\\n\\\\n1. 현재 상황 분석\\\\n- 참고문서를 기반으로 한 정확한 정보 제공\\\\n- 최신 데이터 반영\\\\n\\\\n2. 구체적인 답변\\\\n- ${selectedDocs.map(doc => doc?.title).join(', ')} 자료를 바탕으로\\\\n- 전문적이고 상세한 설명\\\\n\\\\n3. 추가 정보\\\\n- 관련 공시자료 및 보고서 참조 가능\\\\n- 궁금한 사항이 있으시면 언제든 문의해 주세요\\\\n\\\\n감사합니다.`;

                        setAnswerText(baseResponse);
                      };
                      generateResponse();
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-magic-line"></i>
                    </div>
                    <span>응답 생성</span>
                  </button>
                  <div className="mt-3 text-center">
                    <button
                      onClick={() => setShowReferenceDBModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      더 많은 참고자료 찾기
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700 ml-4">
                      인용 복사
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showDocumentSelectModal && (
        <DocumentSelectModal
          onClose={() => setShowDocumentSelectModal(false)}
          onSelect={handleDocumentSelect}
        />
      )}

      {showTemplateModal && (
        <TemplateModal
          templates={templates}
          onApply={handleApplyTemplate}
          onClose={() => setShowTemplateModal(false)}
          onSaveTemplate={(template: any) => {
            const newTemplate = {
              id: templates.length + 1,
              ...template,
              createdBy: '관리자',
              createdAt: new Date().toLocaleDateString('ko-KR').replace(/\//g, '.').replace('.', ''),
              usageCount: 0
            };
            setTemplates([newTemplate, ...templates]);
          }}
        />
      )}

      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">참고 문서 추가</h3>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {availableDocuments.filter(doc => !selectedDocuments.includes(doc.id)).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAddDocument(doc.id)}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg">
                      <i className={`${getDocumentIcon(doc.type)} text-blue-600`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{doc.title}</h4>
                      <p className="text-sm text-gray-600">{doc.pages}</p>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-add-line text-blue-600"></i>
                    </div>
                  </div>
                ))}
              </div>
              {availableDocuments.filter(doc => !selectedDocuments.includes(doc.id)).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">추가할 수 있는 문서가 없습니다.</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDocumentModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-question-answer-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 필터를 선택해보세요.</p>
        </div>
      )}

      {showReferenceDBModal && (
        <ReferenceDBModal
          onClose={() => setShowReferenceDBModal(false)}
        />
      )}
    </div>
  );
}
