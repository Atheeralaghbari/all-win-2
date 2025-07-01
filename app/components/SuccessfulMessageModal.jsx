// src/components/VerificationCodeModal.jsx

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A modal dialog for entering a verification code (OTP).
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls if the modal is visible.
 * @param {function} props.onClose - Function to call when the modal should be closed.


 * @param {boolean} props.isLoading - Disables the submit button to prevent multiple submissions.
 */
function SuccessfulMessageModal({
  isOpen,
  onClose,

  isLoading = false,
}) {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputsRef = useRef([]);

  // Focus the first input when the modal opens
  useEffect(() => {
    if (isOpen) {
      inputsRef.current[0]?.focus();
    }
  }, [isOpen]);

  // Reset OTP when the modal is closed or contact info changes
  useEffect(() => {
    if (!isOpen) {
      setOtp(new Array(4).fill(''));
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length === otp.length && !isLoading) {
      onSubmit(otpCode, hiddenFormData);
    }
  };

  // If the modal is not open, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="verificationModal"
      className={
        ' fixed inset-0 z-50 flex items-center justify-center bg-[#00000057] '
        // +
        // (isOpen ? ' flex' : ' hidden')
      }
      onClick={onClose} // Close modal on background click
    >
      <div
        className="relative mx-auto flex w-1/3 max-w-md flex-col  justify-center rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* <img
          src="/images/message-received.svg"
          alt="Verification code sent"
          className="h-40 w-40"
        /> */}
        <img
          src="/images/tabler_circle-check-filled.svg"
          className="h-10 w-10"
        />

        <h2 className="!text-lg font-semibold">
          تم انشاء حسابك بنجاح!
          {/* {verificationMethod === 'email' ? ' لإيميلك ' : ' رقم هاتفك! '} */}
        </h2>
        <p className="mt-1">
          يرجى تسجيل الدخول لإكمال بيانات الحساب.{' '}
          {/* {verificationMethod === 'email' ? 'للأيميل' : 'للرقم '} */}
          {/* <span className="font-medium text-[#6E38FF]">{contactInfo}</span> */}
        </p>

        {/* We use a form to hold the data, but handle submission via onClick */}
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex flex-col items-center w-full"
        >
          <div
            className="flex space-x-2"
            // dir="ltr"
          ></div>

          <div className="flex justify-between w-full mt-1">
            <div className="flex flex-row-reverse gap-3 w-full justify-between ">
              <button
                type="submit"
                disabled={isLoading}
                className="!rounded-md bg-[#6E38FF] px-3 py-2 text-white hover:bg-[#5a24e6] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isLoading ? 'جاري التحقق...' : 'الانتقال إلى لوحة التحكم'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="!rounded-md border bg-white px-3 py-2 text-[#6E38FF] hover:bg-gray-100"
              >
                عودة
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Using PropTypes for better type checking and documentation
SuccessfulMessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,

  isLoading: PropTypes.bool,

  hiddenFormData: PropTypes.object,
};

export default SuccessfulMessageModal;
