// src/components/VerificationCodeModal.jsx

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A modal dialog for entering a verification code (OTP).
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls if the modal is visible.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {function} props.onSubmit - Function to call with the OTP when the form is submitted.
 * @param {function} props.onResend - Function to call when the "Resend Code" button is clicked.
 * @param {boolean} props.isLoading - Disables the submit button to prevent multiple submissions.
 * @param {'email' | 'mobile'} props.verificationMethod - The method used for verification ('email' or 'mobile').
 * @param {string} props.contactInfo - The email or mobile number where the code was sent.
 * @param {object} [props.statusMessage] - An optional object to display feedback messages.
 * @param {string} props.statusMessage.text - The message text.
 * @param {boolean} props.statusMessage.isError - If true, the message is styled as an error.
 * @param {object} props.hiddenFormData - Data to be included in hidden form fields.
 */
function VerificationCodeModal({
  isOpen,
  onClose,
  onSubmit,
  onResend,
  isLoading = false,
  verificationMethod,
  contactInfo,
  statusMessage,
  hiddenFormData = {},
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

  const handleChange = (index) => (e) => {
    const { value } = e.target;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index) => (e) => {
    // Move focus to the previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

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
        className="relative mx-auto flex w-1/3 max-w-md flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <img
          src="/images/message-received.svg"
          alt="Verification code sent"
          className="h-40 w-40"
        />
        <h2 className="!text-lg font-semibold">
          لقد ارسلنا رمز التحقق إلى
          {verificationMethod === 'email' ? ' لإيميلك ' : ' رقم هاتفك! '}
        </h2>
        <p className="mt-2 text-center">
          ارسلنا رمز التحقق{' '}
          {verificationMethod === 'email' ? 'للأيميل' : 'للرقم '}
          <span className="font-medium text-[#6E38FF]">{contactInfo}</span>
        </p>

        {/* We use a form to hold the data, but handle submission via onClick */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-center w-full"
        >
          <div
            className="flex space-x-2"
            // dir="ltr"
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                inputMode="numeric"
                name={`otp[${index}]`}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:border-blue-500 focus:outline-none"
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                disabled={isLoading}
              />
            ))}
          </div>

          {statusMessage?.text && (
            <p
              className={`mt-4 text-sm ${
                statusMessage.isError ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {statusMessage.text}
            </p>
          )}

          <div className="flex justify-between w-full mt-4">
            <button
              type="button"
              onClick={onResend}
              className=" relative py-2 px-3 bg-[#E3DCFF33] text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center"
              disabled={isLoading}
            >
              لم يصلني الرمز!
            </button>
            <div className="flex flex-row-reverse gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="!rounded-md bg-[#6E38FF] px-3 py-2 text-white hover:bg-[#5a24e6] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isLoading ? 'جاري التحقق...' : 'التالي'}
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
VerificationCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  verificationMethod: PropTypes.oneOf(['email', 'mobile']).isRequired,
  contactInfo: PropTypes.string.isRequired,
  statusMessage: PropTypes.shape({
    text: PropTypes.string,
    isError: PropTypes.bool,
  }),
  hiddenFormData: PropTypes.object,
};

export default VerificationCodeModal;
