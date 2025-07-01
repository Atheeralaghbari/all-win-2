// src/app/pages/signup/page.jsx (or wherever your component lives)
'use client';

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { createUserByEmail, signUpByActiveCode } from '@/app/lib/action';
// Make sure the path to your component is correct
import VerificationCodeModal from '@/app/components/VerificationCodeModal';
import SuccessfulMessageModal from '@/app/components/SuccessfulMessageModal';
// It's a React convention to name components with PascalCase
export default function SignUpPage({ userType, countries }) {
  // --- STATE FOR THE MAIN SIGN-UP FORM ---
  const [activeTab, setActiveTab] = useState('tab1');
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useActionState(createUserByEmail, {
    message: null,
    errors: {},
  });

  // --- STATE FOR THE VERIFICATION MODAL ---
  const [showActiveCodeDialog, setShowActiveCodeDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const [isPendingActiveCode, startTransitionActiveCode] = useTransition();
  const [stateOfActiveCode, dispatchActiveCode] = useActionState(
    signUpByActiveCode,
    { message: null, errors: {} }
  );

  // --- EFFECT TO OPEN THE MODAL ON SUCCESS ---
  // When the initial form submission is successful (state has a message but no errors),
  // open the verification code dialog.
  useEffect(() => {
    if (state.status == 200) {
      setShowActiveCodeDialog(true);
    }
  }, [state]);
  useEffect(() => {
    if (stateOfActiveCode.status == 200) {
      setShowActiveCodeDialog(false);
      setSuccessDialog(true);
    }
  }, [stateOfActiveCode]);
  // --- HANDLER FOR THE MAIN FORM SUBMISSION ---
  const handleCreateUser = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startTransition(() => {
      dispatch(formData);
    });
  };

  // --- HANDLER FOR MODAL SUBMISSION ---
  // This function is passed as a prop to the modal.
  // The modal will call it with the completed OTP code.
  const handleVerifyCodeSubmit = (otpCode) => {
    // We construct the FormData here in the parent component,
    // as it has all the necessary context.
    const formData = new FormData();
    console.log('otpCode', otpCode);
    formData.append('otp', otpCode); // The server action should expect this field
    formData.append('email', formRef.current?.email?.value || '');
    formData.append('country_code', formRef.current?.country_code?.value || '');
    formData.append('mobile', formRef.current?.mobile?.value || '');
    formData.append('user_type', userType);
    formData.append(
      'byMobileOrEmail',
      activeTab === 'tab1' ? 'email' : 'mobile'
    );

    // Dispatch the server action for code verification
    startTransitionActiveCode(() => {
      dispatchActiveCode(formData);
    });
  };

  // --- HANDLER FOR RESENDING CODE (Placeholder) ---
  const handleResendCode = () => {
    // You would typically call the 'createUserByEmail' action again here
    // to trigger a new code to be sent.
    console.log('Resend code requested.');
    handleCreateUser(); // Re-submit the form to get a new code
  };

  // --- DERIVED VALUES TO PASS AS PROPS ---
  const verificationMethod = activeTab === 'tab1' ? 'email' : 'mobile';

  const contactInfo =
    verificationMethod === 'email'
      ? state.contactInfo || formRef.current?.email?.value // Prefer value from server state if available
      : state.contactInfo || formRef.current?.mobile?.value;

  const statusMessage = stateOfActiveCode.message
    ? {
        text: stateOfActiveCode.message,
        isError: !!stateOfActiveCode.errors,
      }
    : null;

  return (
    <div className="conatiner mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center ">
        {/* ================================================================== */}
        {/* LEFT PANE (SIGN-UP FORM)                                           */}
        {/* ================================================================== */}
        <div className=" grid grid-cols-1  justify-center   w-full px-2 gap-4 py-4">
          <div className=" gap-4 flex  flex-col px-4">
            <img
              src="/images/logo.svg"
              alt=""
              className="mr-2 w-42 "
            />
            <div className=" flex gap-2 flex-col ">
              <div>إنشاء حساب جديد</div>
              <div className="flex w-fit   bg-[#E3DCFF66] p-1 rounded-full">
                <button
                  className={`py-1 text-center px-4 !rounded-full focus:outline-none !text-sm ${
                    activeTab === 'tab1' ? 'bg-white text-[#6E38FF]' : ''
                  }`}
                  onClick={() => setActiveTab('tab1')}
                >
                  بالبريد الالكتروني
                </button>
                <button
                  className={`py-1 text-center px-4 !rounded-full focus:outline-none !text-sm ${
                    activeTab === 'tab2' ? 'bg-white text-[#6E38FF]' : ''
                  }`}
                  onClick={() => setActiveTab('tab2')}
                >
                  برقم الهاتف
                </button>
              </div>

              {/* The main form */}
              <form
                ref={formRef}
                className="mt-4 p-4 bg-white w-full"
              >
                {/* Hidden fields common to both tabs */}
                <input
                  type="hidden"
                  name="user_type"
                  value={userType}
                />
                <input
                  type="hidden"
                  name="byMobileOrEmail"
                  value={verificationMethod}
                />

                {/* Email Tab */}
                {activeTab === 'tab1' && (
                  <>
                    <div>ادخل بيانات الدخول لحسابك:</div>
                    <label
                      htmlFor="email"
                      className="block mt-2 text-sm font-medium text-gray-700"
                    >
                      البريد الألكتروني
                    </label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="البريد الألكتروني"
                      className="mt-2 p-3 border border-gray-300 rounded w-full"
                    />
                    {state.errors?.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </>
                )}

                {/* Mobile Tab */}
                {activeTab === 'tab2' && (
                  <div className="flex flex-col gap-2">
                    <div>ادخل بيانات الدخول لحسابك:</div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label
                          htmlFor="country_code"
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
                        {state.errors?.country_code && (
                          <p className="text-red-600">
                            {state.errors.country_code[0]}
                          </p>
                        )}
                      </div>

                      <div className="flex-2">
                        <label
                          htmlFor="mobile"
                          className="block mt-2 text-sm font-medium text-gray-700"
                        >
                          رقم الهاتف:
                        </label>
                        <input
                          type="text"
                          placeholder="رقم الهاتف"
                          name="mobile"
                          id="mobile"
                          className="mt-2 p-3 border border-gray-300 rounded w-full"
                        />
                        {state.errors?.mobile && (
                          <p className="text-red-600">
                            {state.errors.mobile[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Common feedback message and buttons for both tabs */}
                {state.message && (
                  <p
                    className={`mt-2 text-sm ${
                      state.errors ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {state.message}
                  </p>
                )}

                <div className="flex justify-start gap-3 mt-4 flex-row-reverse">
                  <button
                    onClick={handleCreateUser}
                    disabled={isPending}
                    type="button"
                    className="relative py-2 px-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center disabled:bg-gray-400"
                  >
                    {isPending ? 'إنتظر...' : 'إنشئ حسابي'}
                  </button>
                  <button className=" relative py-2 px-3 bg-white text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center">
                    عودة
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* RIGHT PANE (DECORATIVE)                                            */}
        {/* ================================================================== */}
        <div className="bg-[#6E38FF] p-4 justify-center hidden md:flex flex-col m-4 rounded-lg">
          <h3 className="text-white text-start items-start flex">
            اجعل عملائك يعيشون مفامرة تسويقية لا تنسى
          </h3>
          <img
            src="/images/mockup.png"
            className="text-center items-center !h-[500px]"
            alt="App Mockup"
          />
          <div className="flex pt-5 pb-1 justify-between items-center">
            <img
              src="/images/Symbol.svg"
              className="!w-20 !h-20"
              alt="Brand Logo"
            />
            <img
              src="/images/max_fashions_logo.svg"
              className="!w-20 !h-20"
              alt="Brand Logo"
            />
            <img
              src="/images/panda.svg"
              className="!w-20 !h-20"
              alt="Brand Logo"
            />
            <img
              src="/images/extra_stores_logo.svg"
              className="!w-20 !h-20"
              alt="Brand Logo"
            />
            <img
              src="/images/Vector.svg"
              className="!w-20 !h-20"
              alt="Brand Logo"
            />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* THE VERIFICATION MODAL COMPONENT                                   */}
      {/* ================================================================== */}
      <VerificationCodeModal
        isOpen={showActiveCodeDialog}
        onClose={() => setShowActiveCodeDialog(false)}
        onSubmit={handleVerifyCodeSubmit}
        onResend={handleResendCode}
        isLoading={isPendingActiveCode}
        statusMessage={statusMessage}
        verificationMethod={verificationMethod}
        contactInfo={contactInfo || '...'}
        // Note: The modal I provided has an OTP length of 6 by default.
        // Your old code had 4. You can adjust the `VerificationCodeModal`
        // component to accept a `length` prop if needed.
      />
      <SuccessfulMessageModal
        isOpen={successDialog}
        onClose={() => setSuccessDialog(false)}
        isLoading={isPendingActiveCode}
      />
    </div>
  );
}
