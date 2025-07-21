
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = ['사업계획', '재무', 'ESG', '해외진출', '배당', '연구개발', '경쟁력', '신제품'];

export default function QnAForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    details: '',
    author: '',
    email: '',
    isAnonymous: false
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('파일 크기는 10MB를 초과할 수 없습니다.');
        e.target.value = '';
        return;
      }
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.question.trim()) {
      alert('카테고리와 질문 내용을 입력해주세요.');
      return;
    }

    if (!formData.isAnonymous && (!formData.author.trim() || !formData.email.trim())) {
      alert('작성자 정보를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccessModal(true);
    } catch (error) {
      alert('질문 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/qna');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-full text-center px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    formData.category === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {category}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 질문 제목 */}
          <div>
            <label htmlFor="question" className="block text-sm font-semibold text-gray-900 mb-2">
              질문 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="궁금한 내용을 간단히 요약해 주세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              maxLength={100}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.question.length}/100
            </div>
          </div>

          {/* 질문 상세 내용 */}
          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-gray-900 mb-2">
              질문 상세 내용
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="구체적인 질문 내용을 자세히 작성해 주세요"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.details.length}/500
            </div>
          </div>

          {/* 파일 첨부 */}
          <div>
            <label htmlFor="file" className="block text-sm font-semibold text-gray-900 mb-2">
              파일 첨부
            </label>
            <div className="space-y-3">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-8 h-8 flex items-center justify-center mb-2">
                      <i className="ri-upload-cloud-2-line text-2xl text-gray-400"></i>
                    </div>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">클릭하여 파일 선택</span> 또는 드래그하여 업로드
                    </p>
                    <p className="text-xs text-gray-500">최대 10MB, 1개 파일</p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.hwp,.txt,.jpg,.jpeg,.png,.gif"
                  />
                </label>
              </div>

              {uploadedFile && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center mr-3">
                        <i className="ri-file-line text-gray-500"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 익명 질문 옵션 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">익명으로 질문하기</span>
            </label>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              익명 질문시 작성자 정보가 공개되지 않습니다
            </p>
          </div>

          {/* 작성자 정보 */}
          {!formData.isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-900 mb-2">
                  작성자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="답변 받을 이메일을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <i className="ri-information-line text-blue-600"></i>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-blue-800 mb-1">질문 등록 안내</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• 등록된 질문은 검토 후 답변이 제공됩니다</li>
                  <li>• 답변은 보통 3-5 영업일 내에 완료됩니다</li>
                  <li>• 중복되거나 부적절한 질문은 삭제될 수 있습니다</li>
                  <li>• 답변 완료시 이메일로 알림을 받으실 수 있습니다</li>
                  <li>• 익명 질문일 경우 답변 알람이 가지 않습니다</li>
                  <li>• 인격적인 비방 및 욕설이 있을 경우, 일정 기간 질문 등록이 제한될 수 있으며 민/형사상 책임을 질 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
            <Link
              href="/qna"
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap text-center"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <i className="ri-loader-line animate-spin"></i>
                  </div>
                  등록 중...
                </span>
              ) : (
                '질문 등록'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-green-100 rounded-full">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">질문이 등록되었습니다</h3>
              <p className="text-gray-600 mb-6">
                전문가 검토 후 답변을 제공해드리겠습니다.<br />
                답변 완료시 이메일로 알림을 받으실 수 있습니다.
              </p>
              <button
                onClick={handleSuccessClose}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium whitespace-nowrap"
              >
                Q&A 목록으로 이동
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
