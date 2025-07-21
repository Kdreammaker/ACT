
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [memberType, setMemberType] = useState<'individual' | 'corporate'>('individual');
  const [isPassVerified, setIsPassVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    gender: '',
    birthDate: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeThirdParty: false,
    agreeMarketing: false,
    agreeMarketingSms: false,
    agreeMarketingEmail: false,
    agreeMarketingKakao: false,
    agreeElectronicNotice: false
  });
  const [files, setFiles] = useState({
    businessRegistration: null as File | null,
    corporateRegistration: null as File | null,
    businessCard: null as File | null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handlePassVerification = () => {
    setIsPassVerified(true);
    setFormData(prev => ({
      ...prev,
      name: '김철수',
      phone: '010-1234-5678',
      gender: '남성',
      birthDate: '1990-01-15'
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));

      // 마케팅 전체 동의 처리
      if (name === 'agreeMarketing') {
        setFormData(prev => ({
          ...prev,
          agreeMarketing: checked,
          agreeMarketingSms: checked,
          agreeMarketingEmail: checked,
          agreeMarketingKakao: checked
        }));
      }

      // 개별 마케팅 동의 시 전체 동의 상태 업데이트
      if (name === 'agreeMarketingSms' || name === 'agreeMarketingEmail' || name === 'agreeMarketingKakao') {
        setFormData(prev => {
          const newData = { ...prev, [name]: checked };
          newData.agreeMarketing = newData.agreeMarketingSms && newData.agreeMarketingEmail && newData.agreeMarketingKakao;
          return newData;
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
      if (allowedTypes.includes(file.type)) {
        setFiles(prev => ({ ...prev, [fileType]: file }));
      } else {
        alert('jpg, png, pdf, zip 파일만 업로드 가능합니다.');
      }
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.nickname || !formData.password || !formData.confirmPassword) {
      return '모든 필수 항목을 입력해주세요.';
    }

    if (formData.password !== formData.confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }

    if (formData.password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.';
    }

    if (!formData.agreeTerms || !formData.agreePrivacy || !formData.agreeThirdParty) {
      return '필수 약관에 동의해주세요.';
    }

    if (memberType === 'individual' && !isPassVerified) {
      return 'PASS 인증을 완료해주세요.';
    }

    if (memberType === 'corporate') {
      if (!files.businessRegistration || !files.corporateRegistration || !files.businessCard) {
        return '모든 첨부파일을 업로드해주세요.';
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setSubmitMessage(error);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare form data for submission
      const submitData = new URLSearchParams();

      // Add basic form fields
      submitData.append('memberType', memberType);
      submitData.append('email', formData.email);
      submitData.append('nickname', formData.nickname);
      submitData.append('password', formData.password);

      if (memberType === 'individual' && isPassVerified) {
        submitData.append('name', formData.name);
        submitData.append('phone', formData.phone);
        submitData.append('gender', formData.gender);
        submitData.append('birthDate', formData.birthDate);
      }

      // Add agreement status
      submitData.append('agreeTerms', formData.agreeTerms ? 'true' : 'false');
      submitData.append('agreePrivacy', formData.agreePrivacy ? 'true' : 'false');
      submitData.append('agreeThirdParty', formData.agreeThirdParty ? 'true' : 'false');
      submitData.append('agreeMarketing', formData.agreeMarketing ? 'true' : 'false');
      submitData.append('agreeMarketingSms', formData.agreeMarketingSms ? 'true' : 'false');
      submitData.append('agreeMarketingEmail', formData.agreeMarketingEmail ? 'true' : 'false');
      submitData.append('agreeMarketingKakao', formData.agreeMarketingKakao ? 'true' : 'false');
      submitData.append('agreeElectronicNotice', formData.agreeElectronicNotice ? 'true' : 'false');

      // Handle file uploads for corporate members
      if (memberType === 'corporate') {
        submitData.append('businessRegistration', files.businessRegistration ? 'Uncollectable' : '');
        submitData.append('corporateRegistration', files.corporateRegistration ? 'Uncollectable' : '');
        submitData.append('businessCard', files.businessCard ? 'Uncollectable' : '');
      }

      // Submit form data
      const response = await fetch('https://readdy.ai/api/form/d1tlnj3ejblhb0t33q2g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData.toString()
      });

      if (response.ok) {
        if (memberType === 'individual') {
          setSubmitMessage('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setSubmitMessage('법인회원 가입 신청이 완료되었습니다. 로그인 페이지로 이동합니다.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
            <p className="text-gray-600">IR 플랫폼에 오신 것을 환영합니다</p>
          </div>

          {/* 회원 유형 선택 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">회원 유형</h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setMemberType('individual')}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  memberType === 'individual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <i className="ri-user-line text-2xl mb-2"></i>
                  <div className="font-medium">개인회원</div>
                  <div className="text-sm text-gray-500">자동 승인</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setMemberType('corporate')}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  memberType === 'corporate'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <i className="ri-building-line text-2xl mb-2"></i>
                  <div className="font-medium">법인회원</div>
                  <div className="text-sm text-gray-500">관리자 승인</div>
                </div>
              </button>
            </div>
          </div>

          <form
            id="signup-form"
            data-readdy-form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* 개인회원 PASS 인증 */}
            {memberType === 'individual' && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">본인 인증</h4>
                {!isPassVerified ? (
                  <button
                    type="button"
                    onClick={handlePassVerification}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-shield-check-line mr-2"></i>
                    PASS로 인증하기
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center text-green-600 mb-4">
                      <i className="ri-check-circle-fill mr-2"></i>
                      본인 인증이 완료되었습니다
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">이름:</span>
                        <span className="ml-2 font-medium">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">휴대전화:</span>
                        <span className="ml-2 font-medium">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">성별:</span>
                        <span className="ml-2 font-medium">{formData.gender}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">생년월일:</span>
                        <span className="ml-2 font-medium">{formData.birthDate}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 기본 정보 입력 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 주소 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  닉네임 *
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8자 이상 입력하세요"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 확인 *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* 법인회원 파일 업로드 */}
            {memberType === 'corporate' && (
              <div className="space-y-4">
                <h4 className="font-semibold">첨부서류</h4>
                <p className="text-sm text-gray-600">jpg, png, pdf, zip 파일만 업로드 가능합니다.</p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    법인등기부등본 *
                  </label>
                  <input
                    type="file"
                    name="corporateRegistration"
                    accept=".jpg,.jpeg,.png,.pdf,.zip"
                    onChange={(e) => handleFileChange(e, 'corporateRegistration')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  {files.corporateRegistration && (
                    <p className="text-sm text-green-600 mt-1">
                      <i className="ri-check-line mr-1"></i>
                      {files.corporateRegistration.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    사업자등록증 *
                  </label>
                  <input
                    type="file"
                    name="businessRegistration"
                    accept=".jpg,.jpeg,.png,.pdf,.zip"
                    onChange={(e) => handleFileChange(e, 'businessRegistration')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  {files.businessRegistration && (
                    <p className="text-sm text-green-600 mt-1">
                      <i className="ri-check-line mr-1"></i>
                      {files.businessRegistration.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    명함 *
                  </label>
                  <input
                    type="file"
                    name="businessCard"
                    accept=".jpg,.jpeg,.png,.pdf,.zip"
                    onChange={(e) => handleFileChange(e, 'businessCard')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  {files.businessCard && (
                    <p className="text-sm text-green-600 mt-1">
                      <i className="ri-check-line mr-1"></i>
                      {files.businessCard.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 약관 동의 */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">약관 동의</h4>

              {/* 필수 약관 */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    required
                  />
                  <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                    <span className="text-red-500">*</span> 이용약관에 동의합니다.
                    <Link href="/terms" className="text-blue-600 hover:underline ml-1">
                      [보기]
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    required
                  />
                  <label htmlFor="agreePrivacy" className="ml-2 text-sm text-gray-700">
                    <span className="text-red-500">*</span> 개인정보처리방침에 동의합니다.
                    <Link href="/privacy" className="text-blue-600 hover:underline ml-1">
                      [보기]
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeThirdParty"
                    name="agreeThirdParty"
                    checked={formData.agreeThirdParty}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    required
                  />
                  <label htmlFor="agreeThirdParty" className="ml-2 text-sm text-gray-700">
                    <span className="text-red-500">*</span> 제3자 정보제공에 동의합니다.
                    <Link href="/third-party" className="text-blue-600 hover:underline ml-1">
                      [보기]
                    </Link>
                  </label>
                </div>
              </div>

              {/* 선택 약관 */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeMarketing"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <label htmlFor="agreeMarketing" className="ml-2 text-sm text-gray-700">
                      마케팅 수신에 동의합니다. (선택사항)
                    </label>
                  </div>

                  {/* 마케팅 세부 동의 */}
                  <div className="ml-6 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agreeMarketingSms"
                        name="agreeMarketingSms"
                        checked={formData.agreeMarketingSms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="agreeMarketingSms" className="ml-2 text-sm text-gray-600">
                        문자
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agreeMarketingEmail"
                        name="agreeMarketingEmail"
                        checked={formData.agreeMarketingEmail}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="agreeMarketingEmail" className="ml-2 text-sm text-gray-600">
                        이메일
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agreeMarketingKakao"
                        name="agreeMarketingKakao"
                        checked={formData.agreeMarketingKakao}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="agreeMarketingKakao" className="ml-2 text-sm text-gray-600">
                        카카오톡
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeElectronicNotice"
                      name="agreeElectronicNotice"
                      checked={formData.agreeElectronicNotice}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <label htmlFor="agreeElectronicNotice" className="ml-2 text-sm text-gray-700">
                      각종 공시 발송 필요사항을 전자적 형태(문자, 이메일, 카카오톡)로 대체하여 받는 것에 동의합니다. (선택사항)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 결과 메시지 */}
            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitMessage.includes('완료') || submitMessage.includes('신청')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <i
                  className={`${submitMessage.includes('완료') || submitMessage.includes('신청')
                    ? 'ri-check-circle-line'
                    : 'ri-error-warning-line'
                  } mr-2`}
                ></i>
                {submitMessage}
              </div>
            )}

            {/* 가입 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting || (memberType === 'individual' && !isPassVerified)}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap font-medium"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  처리 중...
                </>
              ) : (
                memberType === 'individual' ? '회원가입 완료' : '법인회원 가입 신청'
              )}
            </button>
          </form>

          {/* 로그인 링크 */}
          <div className="text-center mt-6">
            <span className="text-gray-600">이미 계정이 있으신가요? </span>
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
