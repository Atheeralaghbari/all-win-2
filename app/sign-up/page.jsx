'use client';
import { useState } from 'react';
export default function contacUs() {
  const [activeTab, setActiveTab] = useState('tab1');
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
              <div className="flex w-fit   bg-[#E3DCFF66] p-1 rounded-full">
                <button
                  className={
                    ' py-1  text-center px-4   !rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 !text-sm ' +
                    (activeTab == 'tab1' ? ' bg-white text-[#6E38FF] ' : '')
                  }
                  onClick={() => setActiveTab('tab1')}
                >
                  بالبريد الالكتروني
                </button>
                <button
                  className={
                    ' py-1  text-center px-4   !rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 !text-sm ' +
                    (activeTab == 'tab2' ? ' bg-white text-[#6E38FF] ' : '')
                  }
                  // onclick="showTab('tab2')"
                  onClick={() => setActiveTab('tab2')}
                >
                  برقم الهاتف{' '}
                </button>
              </div>
              <div className="mt-4 p-4 bg-white  w-full">
                {activeTab == 'tab1' ? (
                  <>
                    {' '}
                    <div
                      id="tab1"
                      className="tab-content"
                    >
                      <div>ادخل بيانات الدخول لحسابك:</div>
                      {/* <h2 className="text-xl font-semibold">Content for Tab 1</h2>
              <p>This is the content of the first tab.</p> */}
                      <label
                        htmlFor="input1"
                        className="block mt-2 text-sm font-medium text-gray-700"
                      >
                        البريد الألكتروني
                      </label>
                      <input
                        type="text"
                        placeholder="البريد الألكتروني"
                        className="mt-2 p-3 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="flex justify-start gap-3 mt-4 flex-row-reverse">
                      <button className="relative  py-2 px-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                        إنشئ حسابي
                        {/* <img
                          src="images/2.svg"
                          className="items-end absolute left-2 bottom-0 top-0 m-auto"
                        /> */}
                      </button>
                      <button className=" relative py-2 px-3 bg-white text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center">
                        عودة
                      </button>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {activeTab == 'tab2' ? (
                  <>
                    {' '}
                    <div
                      id="tab1"
                      className="tab-content flex gap-2  flex-col"
                    >
                      <div>ادخل بيانات الدخول لحسابك:</div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label
                            htmlFor="input1"
                            className="block mt-2 text-sm font-medium text-gray-700"
                          >
                            الدولة
                          </label>
                          <select
                            type="text"
                            placeholder="رقم الهاتف"
                            className="mt-2 p-3 border border-gray-300 rounded w-full"
                          >
                            <option>test</option>
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
                            className="mt-2 p-3 border border-gray-300 rounded w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start gap-3 mt-4 flex-row-reverse">
                      <button className="relative  py-2 px-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                        إنشئ حسابي
                        {/* <img
                          src="images/2.svg"
                          className="items-end absolute left-2 bottom-0 top-0 m-auto"
                        /> */}
                      </button>
                      <button className=" relative py-2 px-3 bg-white text-[#6E38FF] !rounded-md hover:bg-white border flex justify-center">
                        عودة
                      </button>
                    </div>
                  </>
                ) : (
                  ''
                )}
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
