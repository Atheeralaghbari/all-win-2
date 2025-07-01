'use client';
import {
  useState,
  useRef,
  useTransition,
  useActionState,
  useEffect,
} from 'react';
import Link from 'next/link';
import {
  SignInBySentCode,
  SignInByActiveCode,
  signInByUsername,
  resetPasswordBySentCode,
} from '@/app/lib/action';

import VerificationCodeModal from '@/app/components/VerificationCodeModal';
export default function SignIn({ countries }) {
  const initialState = { message: null, errors: {} };
  const [activeTab, setActiveTab] = useState('tab1');
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useActionState(SignInBySentCode, initialState);
  const [showActiveCodeDialog, setShowActiveCodeDialog] = useState(false);
  const [isPendingActiveCode, startTransitionActiveCode] = useTransition();
  const [isPendeingSignInByUserName, startTransitionSignInByUserNamee] =
    useTransition();
  const [isPendeingOfResetPassword, startTransitionResetPassword] =
    useTransition();
  const [stateOfActiveCode, dispatchActiveCode] = useActionState(
    SignInByActiveCode,
    { message: null, errors: {} }
  );
  const [stateOfSignInByUserAndPassword, dispatchSignInByUserAndPassword] =
    useActionState(signInByUsername, { message: null, errors: {} });
  const [stateOfResetPassword, dispatchResetPassword] = useActionState(
    resetPasswordBySentCode,
    { message: null, errors: {} }
  );
  const handlePasswordSendCode = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startTransitionResetPassword(() => {
      dispatchResetPassword(formData);
    });
  };
  const handleLoginByUserName = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startTransitionSignInByUserNamee(() => {
      dispatchSignInByUserAndPassword(formData);
    });
  };
  const handleLogin = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startTransition(() => {
      dispatch(formData);
    });
  };
  const handleVerifyCodeSubmit = (otpCode) => {
    // We construct the FormData here in the parent component,
    // as it has all the necessary context.
    const formData = new FormData();
    console.log('otpCode', otpCode);
    formData.append('otp', otpCode); // The server action should expect this field
    formData.append('email', formRef.current?.email?.value || '');
    formData.append('country_code', formRef.current?.country_code?.value || '');
    formData.append('mobile', formRef.current?.mobile?.value || '');
    formData.append(
      'byMobileOrEmail',
      activeTab === 'tab1' ? 'email' : 'mobile'
    );

    // Dispatch the server action for code verification
    startTransitionActiveCode(() => {
      dispatchActiveCode(formData);
    });
  };
  // --- HANDLER FOR THE MAIN FORM SUBMISSION ---
  const handleResendCode = () => {
    handleLogin();
  };
  const verificationMethod = activeTab === 'tab1' ? 'email' : 'mobile';

  const statusMessage = stateOfActiveCode.message
    ? {
        text: stateOfActiveCode.message,
        isError: !!stateOfActiveCode.errors,
      }
    : null;
  const contactInfo =
    verificationMethod === 'email'
      ? state.contactInfo || formRef.current?.email?.value // Prefer value from server state if available
      : state.contactInfo || formRef.current?.mobile?.value;
  useEffect(() => {
    if (state.status == 200) {
      setShowActiveCodeDialog(true);
    }
  }, [state]);
  useEffect(() => {
    if (stateOfActiveCode.status == 200) {
      setShowActiveCodeDialog(false);
    }
  }, [stateOfActiveCode]);
  return (
    <div className="conatiner mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center ">
        <div className=" grid grid-cols-1  justify-center   w-full px-2 gap-4">
          <div className="px-4 mt-4">
            <a
              href=""
              className="!text-[#3E4852] !text-underline !decoration-solid "
            >
              English
            </a>
          </div>
          <div className=" gap-4 flex justify-center flex-col items-center">
            {' '}
            <img
              src="images/logo.svg"
              alt=""
              className="mr-2 w-42 "
            />
            <div className="w-full ">
              <div className="flex   space-x-4 bg-[#E3DCFF66] p-1 rounded-full w-full  mx-auto max-w-xl  ">
                <button
                  className={
                    'flex-1 py-1  text-center px-2   !rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 !text-sm ' +
                    (activeTab == 'tab1' ? ' bg-white text-[#6E38FF] ' : '')
                  }
                  onClick={() => setActiveTab('tab1')}
                >
                  بالبريد الالكتروني
                </button>
                <button
                  className={
                    'flex-1 py-1  text-center px-2   !rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 !text-sm ' +
                    (activeTab == 'tab2' ? ' bg-white text-[#6E38FF] ' : '')
                  }
                  // onclick="showTab('tab2')"
                  onClick={() => setActiveTab('tab2')}
                >
                  برقم الهاتف{' '}
                </button>
                <button
                  className={
                    'flex-2 py-1  text-center px-2   !rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 !text-sm ' +
                    (activeTab == 'tab3' ? ' bg-white text-[#6E38FF] ' : '')
                  }
                  // onclick="showTab('tab3')"
                  onClick={() => setActiveTab('tab3')}
                >
                  اسم المستخدم او كود المستخدم
                </button>
              </div>
              <form
                ref={formRef}
                className="mt-4 p-4 bg-white  w-full mx-auto max-w-xl"
              >
                {activeTab == 'tab1' ? (
                  <>
                    {' '}
                    <div
                      id="tab1"
                      className="tab-content"
                    >
                      <input
                        type="hidden"
                        name="byMobileOrEmail"
                        value={activeTab === 'tab1' ? 'email' : 'mobile'}
                      />
                      <label
                        htmlFor="input1"
                        className="block mt-2 text-sm font-medium text-gray-700"
                      >
                        البريد الألكتروني
                      </label>
                      <input
                        type="text"
                        placeholder="البريد الألكتروني"
                        name="email"
                        className="mt-2 p-3 border border-gray-300 rounded w-full"
                      />
                      {state?.errors?.email && (
                        <p className="text-red-600">{state.errors.email[0]}</p>
                      )}
                    </div>
                    {formRef.current?.byMobileOrEmail?.value == 'email' &&
                      state?.message && (
                        <p
                          className={`mt-2 text-sm ${
                            state.errors ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {state.message}
                        </p>
                      )}
                    <button
                      onClick={handleLogin}
                      disabled={isPending}
                      className="mt-4 relative w-full py-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center"
                    >
                      {isPending ? 'إنتظر...' : 'تسجيل دخول'}
                      <img
                        src="images/2.svg"
                        className="items-end absolute left-2 bottom-0 top-0 m-auto"
                      />
                    </button>
                    <Link
                      href="/account-type"
                      className="mt-2 relative w-full py-3 bg-[#E3DCFF] text-[#6E38FF] !rounded-md hover:bg-[#E3DCFF] flex justify-center"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </>
                ) : (
                  ''
                )}
                {activeTab == 'tab2' ? (
                  <>
                    {' '}
                    <div
                      id="tab1"
                      className="tab-content flex gap-2"
                    >
                      <div className="flex-1">
                        <input
                          type="hidden"
                          name="byMobileOrEmail"
                          value={activeTab === 'tab1' ? 'email' : 'mobile'}
                        />
                        <label
                          htmlFor="input1"
                          className="block mt-2 text-sm font-medium text-gray-700"
                        >
                          الدولة
                        </label>
                        <select
                          name="country_code"
                          id="country_code"
                          className="mt-2 p-3 border border-gray-300 rounded w-full"
                        >
                          {countries.map((country, index) => (
                            <option
                              key={index}
                              value={country.phone_code}
                            >
                              {country.phone_code} {country._name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-2">
                        <label
                          htmlFor="input1"
                          className="block mt-2 text-sm font-medium text-gray-700"
                        >
                          رقم الهاتف:
                        </label>
                        <input
                          type="text"
                          placeholder="رقم الهاتف"
                          name="mobile"
                          className="mt-2 p-3 border border-gray-300 rounded w-full"
                        />
                      </div>
                    </div>
                    {formRef.current?.byMobileOrEmail?.value == 'mobile' &&
                      state?.message && (
                        <p
                          className={`mt-2 text-sm ${
                            state.errors ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {state.message}
                        </p>
                      )}
                    <button
                      type="button"
                      onClick={handleLogin}
                      disabled={isPending}
                      className="mt-4 relative w-full py-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center"
                    >
                      {isPending ? 'إنتظر...' : 'تسجيل دخول'}
                      <img
                        src="images/2.svg"
                        className="items-end absolute left-2 bottom-0 top-0 m-auto"
                      />
                    </button>
                    <Link
                      href="/sign-up"
                      className="mt-2 relative w-full py-3 bg-[#E3DCFF] text-[#6E38FF] !rounded-md hover:bg-[#E3DCFF] flex justify-center"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </>
                ) : (
                  ''
                )}

                {activeTab == 'tab3' ? (
                  <>
                    {' '}
                    <div
                      id="tab3"
                      className="tab-content"
                    >
                      <div>
                        <label
                          htmlFor="input1"
                          className="block mt-2 text-sm font-medium text-gray-700"
                        >
                          اسم المستخدم/ رقم كود التاجر:
                        </label>
                        <input
                          type="text"
                          placeholder="اسم المستخدم/ رقم كود التاجر"
                          name="username"
                          className="mt-2 p-3 border border-gray-300 rounded w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="input1"
                          className="block mt-2 text-sm font-medium text-gray-700"
                        >
                          كلمة المرور
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="كلمة المرور"
                          className="mt-2 p-3 border border-gray-300 rounded w-full"
                        />
                      </div>
                      {/* <Link
                        href="/reset-password"
                        onClick={handlePasswordSendCode}
                        type="button"
                        className="text-left flex justify-end !text-[#6E38FF] text-underline"
                      >
                        نسيت كلمة المرور!
                      </Link> */}
                    </div>
                    {formRef.current?.password?.value &&
                      stateOfSignInByUserAndPassword?.message && (
                        <p
                          className={`mt-2 text-sm ${
                            stateOfSignInByUserAndPassword.errors
                              ? 'text-red-600'
                              : 'text-green-600'
                          }`}
                        >
                          {stateOfSignInByUserAndPassword.message}
                        </p>
                      )}
                    <button
                      onClick={handleLoginByUserName}
                      disabled={isPendeingSignInByUserName}
                      className="mt-4 relative w-full py-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center"
                    >
                      {isPendeingSignInByUserName ? 'إنتظر...' : 'تسجيل دخول'}
                      <img
                        src="images/2.svg"
                        className="items-end absolute left-2 bottom-0 top-0 m-auto"
                      />
                    </button>
                    <Link
                      href="/account-type"
                      className="mt-2 relative w-full py-3 bg-[#E3DCFF] text-[#6E38FF] !rounded-md hover:bg-[#E3DCFF] flex justify-center"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </>
                ) : (
                  ''
                )}
              </form>
            </div>
          </div>

          <div className="text-gray-600 flex items-end text-center justify-center">
            جميع الحقوق محفوظة ، الكل رابح 2025
          </div>
        </div>

        <div className="bg-[#6E38FF] p-4 justify-center hidden md:flex flex-col m-4 rounded-lg">
          <h3 className="text-white text-start items-start flex">
            اجعل عملائك يعيشون مفامرة تسويقية لا تنسى
          </h3>
          <img
            src="images/mockup.png"
            className="text-center items-center !h-[500px]"
          />
          <div className="flex pt-5 pb-1 justify-between items-center">
            <img
              src="images/Symbol.svg"
              className="!w-20 !h-20"
            />
            <img
              src="images/max_fashions_logo.svg"
              className="!w-20 !h-20"
            />
            <img
              src="images/panda.svg"
              className="!w-20 !h-20"
            />
            <img
              src="images/extra_stores_logo.svg"
              className="!w-20 !h-20"
            />
            <img
              src="images/Vector.svg"
              className="!w-20 !h-20"
            />
          </div>
        </div>
      </div>
      <VerificationCodeModal
        isOpen={showActiveCodeDialog}
        onClose={() => setShowActiveCodeDialog(false)}
        onSubmit={handleVerifyCodeSubmit}
        onResend={handleResendCode}
        isLoading={isPendingActiveCode}
        statusMessage={statusMessage}
        verificationMethod={verificationMethod}
        contactInfo={contactInfo || '...'}
      />
    </div>
  );
}
