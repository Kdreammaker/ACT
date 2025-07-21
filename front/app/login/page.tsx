
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStep, setResetStep] = useState(1); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSubmitMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (isAccountLocked) {
      setSubmitMessage('계정이 잠겨있습니다. 비밀번호 찾기를 통해 계정을 잠금 해제하세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const submitData = new URLSearchParams();
      submitData.append('email', email);
      submitData.append('password', password);
      submitData.append('rememberMe', rememberMe ? 'true' : 'false');
      submitData.append('failedAttempts', failedAttempts.toString());

      const response = await fetch('https://readdy.ai/api/form/d1tlp9uon8kqeruumg3g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData.toString()
      });

      if (response.ok) {
        setSubmitMessage('로그인 성공! 메인 페이지로 이동합니다...');
        setFailedAttempts(0);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      if (newFailedAttempts >= 5) {
        setIsAccountLocked(true);
        setSubmitMessage('로그인 시도 횟수를 초과했습니다. 계정이 잠겼습니다.');
        setTimeout(() => {
          setShowResetModal(true);
        }, 2000);
      } else {
        setSubmitMessage(`로그인에 실패했습니다. (${newFailedAttempts}/5회)`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (resetStep === 1) {
      setSubmitMessage('인증 코드를 이메일로 발송했습니다.');
      setResetStep(2);
    } else if (resetStep === 2) {
      if (resetCode.length === 6) {
        setSubmitMessage('인증 코드가 확인되었습니다. 새로운 비밀번호를 설정하세요.');
        setResetStep(3);
      } else {
        setSubmitMessage('올바른 6자리 인증 코드를 입력해주세요.');
      }
    } else if (resetStep === 3) {
      if (newPassword !== confirmPassword) {
        setSubmitMessage('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (newPassword === password) {
        setSubmitMessage('이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.');
        return;
      }
      if (newPassword.length < 8) {
        setSubmitMessage('비밀번호는 8자리 이상이어야 합니다.');
        return;
      }

      setSubmitMessage('비밀번호가 성공적으로 변경되었습니다.');
      setIsAccountLocked(false);
      setFailedAttempts(0);
      setShowResetModal(false);
      setResetStep(1);
      setResetCode('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const closeModal = () => {
    setShowResetModal(false);
    setResetStep(1);
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setSubmitMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
            logo
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            로그인
          </h3>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            id="login-form"
            data-readdy-form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isAccountLocked}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${isAccountLocked ? 'bg-gray-100' : ''}`}
                  placeholder="이메일을 입력하세요"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400"></i>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isAccountLocked}
                  className={`appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${isAccountLocked ? 'bg-gray-100' : ''}`}
                  placeholder="비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isAccountLocked}
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400 hover:text-gray-600`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isAccountLocked}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  로그인 상태 유지
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>
            </div>

            {submitMessage && (
              <div
                className={`p-3 rounded-md text-sm ${
                  submitMessage.includes('성공')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : submitMessage.includes('잠겼습니다') || submitMessage.includes('초과')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}
              >
                <i
                  className={`${submitMessage.includes('성공')
                    ? 'ri-check-circle-line'
                    : submitMessage.includes('잠겼습니다') || submitMessage.includes('초과')
                    ? 'ri-error-warning-line'
                    : 'ri-information-line'
                  } mr-2`}
                ></i>
                {submitMessage}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting || isAccountLocked}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <i className={`${isSubmitting ? 'ri-loader-4-line animate-spin' : isAccountLocked ? 'ri-lock-line' : 'ri-login-box-line'} text-blue-500 group-hover:text-blue-400`}></i>
                </span>
                {isAccountLocked ? '계정 잠김' : isSubmitting ? '로그인 중...' : '로그인'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                <i className="ri-google-fill text-red-500"></i>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                <i className="ri-kakao-talk-fill text-yellow-500"></i>
                <span className="ml-2">카카오</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              아직 회원이 아니신가요?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {resetStep === 1 ? '비밀번호 찾기' : resetStep === 2 ? '인증 코드 입력' : '새 비밀번호 설정'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              {resetStep === 1 && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    등록된 이메일 주소로 인증 코드를 발송해드립니다.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>
              )}

              {resetStep === 2 && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    이메일로 발송된 6자리 인증 코드를 입력하세요.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      인증 코드
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-center tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                </div>
              )}

              {resetStep === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    새로운 비밀번호를 설정하세요. 이전 비밀번호와 동일하게 설정할 수 없습니다.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      새 비밀번호
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="새 비밀번호 (8자리 이상)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="비밀번호 확인"
                    />
                  </div>
                </div>
              )}

              {submitMessage && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    submitMessage.includes('성공') || submitMessage.includes('확인')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handlePasswordReset}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer"
                >
                  {resetStep === 1 ? '인증 코드 발송' : resetStep === 2 ? '코드 확인' : '비밀번호 변경'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
