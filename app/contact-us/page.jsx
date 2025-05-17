import Header from '../components/Header';

export default function page({}) {
  return (
    <div>
      {' '}
      <div className="!h-320 md:!h-250">
        <section className="hero px-0 pt-4 !h-220 md:!h-180 mb-12 overflow-visible">
          <div className="container mx-auto px-4">
            <Header />
            <div className=" flex relative  flex-col-reverse md:flex-row  gap-8 mb-1 px-4 md:px-6 justify-center">
              <div className="w-full  flex justify-center flex-col items-center">
                <div className="py-2">
                  <div className="typing-section text-center">
                    <h1 className="text-white text-4xl">
                      <span className="text-[#F4F30E] !text-xl  md:!text-4xl pl-2">
                        تواصل مع منصة الكل رابح
                      </span>

                      <span>
                        <div
                          // className="hidden"
                          className="text-lg"
                          id="_title_second_part"
                        >
                          نود أن نستمع إلى أرائكم وشكاويكم:
                        </div>
                      </span>
                    </h1>
                  </div>
                </div>

                <div className=" max-w-2xl mx-auto absolute top-40">
                  <div className="p-4 rounded-4 mx-auto w-100 form-container mt-0">
                    <div className="custom-card">
                      <form>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              الاسم الأول:
                            </label>
                            <input
                              type="text"
                              className="form-control font-14 weight-500 p-3"
                              placeholder="عبدالعزيز سليمان"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              الاسم الاخير:
                            </label>
                            <input
                              type="text"
                              className="form-control font-14 weight-500 p-3"
                              placeholder="عبدالعزيز سليمان"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              البريد الإلكتروني :
                            </label>
                            <input
                              type="email"
                              className="form-control font-14 weight-500 p-3"
                              placeholder="someone@gmail.com"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              رقم الجوال:
                            </label>
                            <div className="input-group phone-field">
                              <div className="country-selector">
                                <select
                                  id="country-code"
                                  className="border-0 bg-transparent font-14 weight-500"
                                >
                                  <option
                                    value="+966"
                                    data-flag="sa"
                                  >
                                    +966
                                  </option>
                                  <option
                                    value="+971"
                                    data-flag="ae"
                                  >
                                    +971
                                  </option>
                                  <option
                                    value="+965"
                                    data-flag="kw"
                                  >
                                    +965
                                  </option>
                                  <option
                                    value="+20"
                                    data-flag="eg"
                                  >
                                    +20
                                  </option>
                                </select>
                              </div>

                              <input
                                type="tel"
                                id="phone"
                                className="form-control font-14 weight-500 py-3"
                                placeholder="543 725 8971"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              اسم الشركة:
                            </label>
                            <input
                              type="email"
                              className="form-control font-14 weight-500 p-3"
                              placeholder="someone@gmail.com"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              المسمى الوظيفي:
                            </label>
                            <input
                              type="email"
                              className="form-control font-14 weight-500 p-3"
                              placeholder="someone@gmail.com"
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="form-label font-14 weight-500 secondaryBlack-color">
                              الرسالة
                            </label>
                            <textarea
                              type="email"
                              className="form-control font-14 weight-500 p-3"
                              placeholder="someone@gmail.com"
                              minLength={10}
                              rows={10}
                            />
                          </div>
                        </div>

                        <div className="text-end mb-5">
                          <button
                            type="submit"
                            className="btn font-16 text-white float-lg-start form-btn"
                          >
                            إرسال
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section
        id="cta"
        className="mb-5 py-5"
      >
        <div className="container">
          <div className="row p-5 mx-4 cta-section rounded-5">
            <div className="col-lg-7 col-md-12 col-sm-12 col-12 my-auto order-last order-lg-first py-5">
              <h2 className="weight-700 font-36 yellow-color mb-3">
                لا تدع متجرك يفوّت الفرصة!
              </h2>
              <p className="text-white weight-400 mb-4">
                امنح عملاءك تجربة تسوق تفاعلية لا تُنسى وزد مبيعاتك بطرق تسويقية
                مبتكرة وممتعة! مع أدواتنا الذكية، يمكنك تصميم حملات جذابة بسهولة
                وتحليل أدائها بدقة لضمان نجاحها.
              </p>
              <a
                href="#"
                className="btn rounded-5 purple-color font-16 weight-400 yellow-btn"
              >
                أطلق حملتك الآن!
              </a>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 order-first order-lg-last">
              <img
                src="images/cta.png"
                alt=""
                className="d-block my-5 mb-4 mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ======== FOOTER Section ======== */}
      <section className="footer bg-gray-100">
        {' '}
        <footer>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 footer-row">
              <div className="md:col-span-6">
                <div className="logo-col">
                  <a
                    href="#"
                    aria-label="Logo"
                    className="footer-logo-div"
                  >
                    <img
                      src="images/logo footer.svg"
                      alt="Footer Logo"
                      className="block footer-logo mb-3 h-10"
                    />{' '}
                  </a>

                  <p className="text-base font-normal text-gray-600 footer-p">
                    هو منصة تسويق إحترافية بطريقة مبتكرة باستخدام برنامج الواقع
                    المعزز ( AR) يضمن الفعالية والفائدة العكسية للمتاجر التي
                    يحدد فيه المبلغ المرصود للحملة التسويقية وعدد العملاء
                    المطلوب للمشاركة في الحملة التسويقية
                  </p>

                  <ul className="flex gap-2 mt-4">
                    {' '}
                    <li className="text-center">
                      <a
                        className="social-icon  !bg-[#6e38ff] block p-0 rounded-full hover:bg-gray-200"
                        href="#"
                        aria-label="instagram"
                      >
                        {' '}
                        <img
                          src="images/mingcute_instagram-line.svg"
                          className="p-2 social-img  h-10 w-10"
                          alt="Instagram"
                        />{' '}
                      </a>
                    </li>
                    {/* Repeat for other social icons */}
                    <li className="text-center">
                      <a
                        className="social-icon !bg-[#6e38ff] block p-0 rounded-full hover:bg-gray-200"
                        href="#"
                        aria-label="facebook"
                      >
                        <img
                          src="images/ri_facebook-fill.svg"
                          className="p-2 social-img  h-10 w-10"
                          alt="Facebook"
                        />
                      </a>
                    </li>
                    <li className="text-center">
                      <a
                        className="social-icon !bg-[#6e38ff] block p-0 rounded-full hover:bg-gray-200"
                        href="#"
                        aria-label="twitter"
                      >
                        <img
                          src="images/prime_twitter.svg"
                          className="p-2 social-img  h-10 w-10"
                          alt="Twitter"
                        />
                      </a>
                    </li>
                    <li className="text-center">
                      <a
                        className="social-icon !bg-[#6e38ff] block p-0 rounded-full hover:bg-gray-200"
                        href="#"
                        aria-label="whatsapp"
                      >
                        <img
                          src="images/ic_round-whatsapp.svg"
                          className="p-2 social-img  h-10 w-10"
                          alt="WhatsApp"
                        />
                      </a>
                    </li>
                    <li className="text-center">
                      <a
                        className="social-icon block !bg-[#6e38ff] p-0 rounded-full hover:bg-gray-200"
                        href="#"
                        aria-label="tiktok"
                      >
                        <img
                          src="images/ic_outline-tiktok.svg"
                          className="p-2 social-img  h-10 w-10"
                          alt="TikTok"
                        />
                      </a>
                    </li>
                    <li className="text-center">
                      <a
                        className="social-icon !bg-[#6e38ff] block p-0 rounded-full hover:bg-gray-200"
                        href="#"
                        aria-label="youtube"
                      >
                        <img
                          src="images/mingcute_youtube-line.svg"
                          className="p-2 social-img h-10 w-10"
                          alt="YouTube"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Links Column 1 */}
              <div className="md:col-span-2">
                <div className="!text-md !font-bold mb-3">
                  الحملات التسويقية
                </div>

                <ul className="footer-list space-y-2">
                  {' '}
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      الواقع المعزز
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      الخدمات الأساسية
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      حساب التاجر
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      الشروط والأحكام
                    </a>
                  </li>
                </ul>
              </div>
              {/* Links Column 2 */}
              <div className="md:col-span-2">
                <h4 className="!text-md !font-bold mb-3">الكل الرابح</h4>
                <ul className="footer-list space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      نبذة عن المشروع
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      آلية العمل
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      اتصل بنا
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base font-normal !text-gray-700 block hover:text-purple-600"
                    >
                      تسجيل الدخول
                    </a>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-md !font-bold mb-3">حمل تطبيق الكل رابح</h4>

                <div className="flex flex-col gap-2">
                  <a href="">
                    <img
                      src="images/AppStore.svg"
                      alt="Download on the App Store"
                      className="h-10"
                    />
                  </a>{' '}
                  <a href="">
                    <img
                      src="images/Google App.svg"
                      alt="Get it on Google Play"
                      className="h-10"
                    />
                  </a>
                  <a href="">
                    <img
                      src="images/AppGallery.svg"
                      alt="Explore it on AppGallery"
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-300">
              © {new Date().getFullYear()} الكل رابح. All rights reserved.
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
