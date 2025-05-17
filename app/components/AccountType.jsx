'use client';
import { useState, useRef } from 'react';
export default function AccountType() {
  const [activeTab, setActiveTab] = useState('tab1');

  const inputs = useRef([]);

  const handleChange = (index) => (event) => {
    if (event.target.value.length >= 1) {
      console.log('1', index, inputs);
      if (index <= inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === 'Backspace' && event.target.value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  return (
    <div className="conatiner mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center ">
        <div className=" grid grid-cols-1  justify-center   w-full px-2 gap-4 py-4">
          <div className=" gap-4 flex  flex-col px-4">
            {' '}
            <img
              src="images/logo.svg"
              alt=""
              className="mr-2 w-42 "
            />
            <div className=" flex gap-2 flex-col ">
              <div>إنشاء حساب جديد</div>
              <div className="flex w-full  flex-col p-1 rounded-full gap-2 mt-4 ">
                <div className="text-sm mb-2 !text-[#3E4852]">
                  {' '}
                  ما نوع الحساب الذي تريده:
                </div>
                <button
                  className={
                    ' py-3  text-end px-4 border-[#DAE1E9]   border-1 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 !text-lg ' +
                    (activeTab == 'tab1'
                      ? ' bg-[#E3DCFF33] text-[#6E38FF] !border-[#6E38FF]'
                      : '')
                  }
                  onClick={() => setActiveTab('tab1')}
                >
                  حساب تاجر
                </button>
                <button
                  className={
                    ' py-3  text-end px-4  border-[#DAE1E9] border-1 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 !text-lg ' +
                    (activeTab == 'tab2'
                      ? ' bg-[#E3DCFF33] text-[#6E38FF] !border-[#6E38FF] '
                      : '')
                  }
                  onClick={() => setActiveTab('tab2')}
                >
                  حساب وسيط معلن
                </button>
              </div>
              <div className="flex justify-start gap-3 mt-2 flex-row-reverse">
                <button className="relative  py-2 px-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                  التالي
                </button>
                <button className=" relative py-2 px-3 bg-white text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center">
                  عودة
                </button>
              </div>
            </div>
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
      <div
        id="myModal"
        className="modal  items-center justify-center !fixed w-full h-full z-50 top-0 right-0 bottom-0 m-auto left-0 !bg-[#00000057] !flex "
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto flex justify-center flex-col items-center">
          <img
            src="/images/message-received.svg"
            className="w-40 h-40"
          />
          <h2 className="!text-lg font-semibold">
            لقد ارسلنا رمز التحقق إلى رقم هاتفك!
          </h2>
          <p className="mt-2">
            ارسلنا رمز التحقق للرقم
            <span className="text-[#6E38FF]"> +9665418742 :</span>
          </p>
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
              />
            ))}
          </div>
          <div className="flex justify-between w-full">
            <button className=" relative py-2 px-3 bg-[#E3DCFF33] text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center">
              لم يصلني الرمز!
            </button>
            <div className="flex justify-start gap-3 flex-row-reverse">
              <button className="relative  py-2 px-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                التالي
              </button>
              <button className=" relative py-2 px-3 bg-white text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center">
                عودة
              </button>
            </div>
          </div>
          {/* <div className="mt-4 flex justify-end"> */}
          {/* <button
              id="closeModal"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
