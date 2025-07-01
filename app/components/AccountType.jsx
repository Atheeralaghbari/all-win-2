'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
export default function AccountType() {
  const [activeTab, setActiveTab] = useState('trader');
  const router = useRouter();
  const inputs = useRef([]);

  const handleChange = (index) => (event) => {
    if (event.target.value.length >= 1) {
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
                    (activeTab == 'trader'
                      ? ' bg-[#E3DCFF33] text-[#6E38FF] !border-[#6E38FF]'
                      : '')
                  }
                  onClick={() => setActiveTab('trader')}
                  // onClick={() => router.push('/sign-in?type="trader')}
                >
                  حساب تاجر
                </button>
                <button
                  className={
                    ' py-3  text-end px-4  border-[#DAE1E9] border-1 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 !text-lg ' +
                    (activeTab == 'marketer'
                      ? ' bg-[#E3DCFF33] text-[#6E38FF] !border-[#6E38FF] '
                      : '')
                  }
                  onClick={() => setActiveTab('marketer')}
                >
                  حساب وسيط معلن
                </button>
              </div>
              <div className="flex justify-start gap-3 mt-2 flex-row-reverse">
                <button
                  className="relative  py-2 px-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center"
                  onClick={() => router.push('/sign-up?type=' + activeTab)}
                >
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
    </div>
  );
}
