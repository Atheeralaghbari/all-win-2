'use client';
import { useState } from 'react';
export default function contacUs() {
  const [activeTab, setActiveTab] = useState('tab1');
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
              <div className="mt-4 p-4 bg-white  w-full mx-auto max-w-xl">
                {activeTab == 'tab1' ? (
                  <>
                    {' '}
                    <div
                      id="tab1"
                      className="tab-content"
                    >
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
                    <button className="mt-4 relative w-full py-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                      تسجيل دخول
                      <img
                        src="images/2.svg"
                        className="items-end absolute left-2 bottom-0 top-0 m-auto"
                      />
                    </button>
                    <a
                      href="/sign-up"
                      className="mt-2 relative w-full py-3 bg-[#E3DCFF] text-[#6E38FF] !rounded-md hover:bg-[#E3DCFF] flex justify-center"
                    >
                      إنشاء حساب جديد
                    </a>
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
                    <button className="mt-4 relative w-full py-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                      تسجيل دخول
                      <img
                        src="images/2.svg"
                        className="items-end absolute left-2 bottom-0 top-0 m-auto"
                      />
                    </button>
                    <a
                      href="/sign-up"
                      className="mt-2 relative w-full py-3 bg-[#E3DCFF] text-[#6E38FF] !rounded-md hover:bg-[#E3DCFF] flex justify-center"
                    >
                      إنشاء حساب جديد
                    </a>
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
                          type="text"
                          placeholder="كلمة المرور"
                          className="mt-2 p-3 border border-gray-300 rounded w-full"
                        />
                      </div>
                      <a
                        href=""
                        className="text-left flex justify-end !text-[#6E38FF]"
                      >
                        نسيت كلمة المرور!
                      </a>
                    </div>
                    <button className="mt-4 relative w-full py-3 bg-[#6E38FF] text-white !rounded-md hover:bg-[#6E38FF] flex justify-center">
                      تسجيل دخول
                      <img
                        src="images/2.svg"
                        className="items-end absolute left-2 bottom-0 top-0 m-auto"
                      />
                    </button>
                    <a
                      href="/sign-up"
                      className="mt-2 relative w-full py-3 bg-[#E3DCFF] text-[#6E38FF] !rounded-md hover:bg-[#E3DCFF] flex justify-center"
                    >
                      إنشاء حساب جديد
                    </a>
                  </>
                ) : (
                  ''
                )}
              </div>
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
    </div>
  );
}
