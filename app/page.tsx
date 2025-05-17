import Header from './components/Header'; //
import Slider from './components/Slider';
import Feature from './components/Feature';
// import Link from 'next/link';
import Script from 'next/script';
export default async function Home() {
  const data = await fetch(
    'https://italent.me/aw-admin/api/v1/website/frontend/hero-section'
  );
  const hero = await data.json();
  const dataOfAdvertisement = await fetch(
    'https://italent.me/aw-admin/api/v1/website/frontend/advertisements-website'
  );
  const advertisement = await dataOfAdvertisement.json();
  const dataOfAllContent = await fetch(
    'https://italent.me/aw-admin/api/v1/website/frontend/all-contents'
  );
  const allContent = await dataOfAllContent.json();
  console.log(allContent);
  return (
    <>
      {' '}
      <Script
        src={`/js/custom.js`}
        strategy="lazyOnload"
      />
      <div>
        {/* ======== HERO Section ======== */}

        <section className="hero px-0 pt-4 pb-12 mb-12">
          <div className="container mx-auto px-4">
            <Header />

            <div className="hero-row flex  flex-col-reverse md:flex-row  gap-8 mb-6 px-4 md:px-6">
              <div className="w-full lg:w-8/12 ">
                <div className="py-12">
                  <div className="typing-section">
                    <h1 className="text-white text-4xl">
                      <span className="text-white text-md  md:text-4xl pl-2">
                        {' '}
                        {hero.data._title}
                      </span>

                      <span
                        id="text-container"
                        // className="p1\"
                      >
                        <div
                          className="hidden"
                          id="_title_second_part"
                        >
                          {hero.data._title_second_part}
                        </div>
                        <span
                          id="changing-word"
                          className="text-[#F4F30E] text-md md:text-4xl"
                        ></span>

                        <span
                          id="cursor"
                          className="cursor text-[#F4F30E] text-md md:text-4xl"
                        ></span>
                      </span>
                    </h1>
                  </div>

                  <p className="text-white text-base font-normal mb-12">
                    {hero.data._description}
                  </p>

                  <a
                    href=""
                    className="inline-flex items-center justify-center w-full md:w-auto bg-[#F4F30E] !text-[#3F20A6] rounded-full px-6 py-2 hover:bg-[#F4F30E] hero-btn text-base"
                  >
                    {hero.data._url_title}

                    <img
                      src="images/tabler_chevron-left.png"
                      alt=""
                      className="mr-2 h-4 w-4"
                    />
                  </a>
                </div>
              </div>
              {/* Image Column */}
              <div className="w-full lg:w-4/12  flex justify-center lg:justify-start items-center">
                <img
                  src="images/hero img.svg"
                  alt=""
                  className="block max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======== SLIDER Section ======== */}

        <Slider data={advertisement.data} />

        <section className="success-nums mb-12">
          <div className="container mx-auto px-4">
            <div className="text-center p-12 pb-4 success-nums-div">
              <h2 className="text-4xl mb-4 font-extrabold">
                {allContent.data.number_success._title}
              </h2>
              <p className="px-12 mx-4 success-nums-p">
                {allContent.data.number_success._description}
              </p>
            </div>
            <div className="flex flex-wrap gap-12 items-center justify-content-center text-center nums-div">
              {allContent.data.number_success.items.map(
                (ele: any, key: number) => {
                  return (
                    <div
                      className="  md:mx-12"
                      key={key}
                    >
                      <div className="state-box">
                        <div className="state-number">
                          <strong className="block text-4xl md:text-6xl">
                            {ele.value}
                          </strong>
                          <span className="state-unit">
                            {ele.value_unit_text}
                          </span>
                        </div>
                        <span className="state-highlight"> {ele._title}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* ======== NUMBERS ROW Section ======== */}
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <div className="p-4">
              <div className="numbers-row flex flex-col-reverse md:flex-row  gap-8 rounded-xl p-12">
                <div className="w-full lg:w-7/12 ">
                  <div className="py-4">
                    <h2 className="text-4xl mb-4 !font-extrabold">
                      {allContent.data.number_active._title}
                    </h2>
                    <p className="mb-6 numbers-row-p">
                      {allContent.data.number_active._description}
                    </p>
                    <a
                      href=""
                      className="!inline-flex justify-center items-center text-white  text-base rounded-full py-1 px-6 numbers-btn"
                    >
                      انضم إلينا كتاجر
                      <img
                        src="images/tabler_chevron-left.svg"
                        alt=""
                        className="mr-2 h-4 w-4"
                      />
                    </a>
                  </div>
                </div>

                {/* Stats Column */}
                <div className="w-full lg:w-5/12 ">
                  <div className="py-2 flex justify-center lg:justify-start">
                    <div className="grid grid-cols-2 gap-4">
                      {allContent.data.number_active.items.map(
                        (ele: any, key: any) => {
                          return (
                            <div
                              className="col-span-1"
                              key={key}
                            >
                              <div className="state-box">
                                <div className="number-div">
                                  <strong className="block text-2xl md:text-6xl">
                                    {ele.value}
                                  </strong>
                                </div>
                                <div className="number-highlight">
                                  {ele._title}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== STEPS Section ======== */}

        <section className="steps mb-12">
          <div className="container mx-auto px-4">
            <p className="text-center text-xl md:text-3xl mb-6">
              {allContent.data['4_steps']._title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 steps-container">
              {/* Card 1 */}
              {allContent.data['4_steps'].items.map((ele: any, key: any) => {
                return (
                  <div
                    className="col-span-1"
                    key={key}
                  >
                    <div className="step-card rounded-xl h-full flex flex-col border border-gray-200 overflow-hidden">
                      {' '}
                      <div className="h-48 text-center m-2 flex items-center justify-center rounded-xl steps-img bg-gray-100">
                        {' '}
                        <img
                          src={ele.image}
                          alt="step1"
                          className="max-w-full h-auto object-contain" // Replaced img-fluid card-img
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="font-semibold !text-xl text-center mb-3">
                            {ele._title}
                          </h3>

                          <p className="text-base text-center px-1 card-p mb-3">
                            {ele._content}
                          </p>
                        </div>

                        <a
                          href=""
                          className="!text-[#6E38FF] block rounded-full p-1 text-center step-link hover:bg-purple-100"
                        >
                          إبدأ حملتك الان
                          <img
                            src={'images/tabler_chevron-left.png'}
                            alt=""
                            className="inline-block ml-1 h-4 w-4" // Added inline-block, ml-1
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======== SUCCESS PARTNERS Section ======== */}

        <section className="success-partner mb-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto md:mx-12">
              {' '}
              <h2 className="text-5xl font-bold mb-2">
                {' '}
                {allContent.data['partner']._title}
              </h2>
              <p className="font-normal text-gray-700 mb-12">
                {allContent.data['partner']._description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {allContent.data['partner'].items.map((ele: any, key: any) => {
                  return (
                    <div
                      className=""
                      key={key}
                    >
                      <div className="partner-div rounded-xl flex items-center justify-center px-4 py-4 border border-gray-200 min-h-[80px]">
                        {' '}
                        <img
                          src={ele.logo}
                          alt=""
                          className="max-w-full h-auto max-h-12"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ======== CTA Section ======== */}
        <section
          id="cta"
          className="mb-12 py-12"
        >
          <div className="container mx-auto px-4">
            <div className="cta-section flex items-center flex-col-reverse md:flex-row-reverse mx-4 !p-12 rounded-2xl">
              <div className="w-full lg:w-7/12 my-auto  py-5">
                <h2 className="text-4xl font-bold !text-[#F4F30E] mb-3">
                  {allContent.data['campaign']._title}
                </h2>

                <p className="text-white font-normal mb-6">
                  {allContent.data['campaign']._description}
                </p>

                <a
                  href="#"
                  className="inline-block rounded-full bg-[#F4F30E] !text-[#3F20A6] text-base font-normal px-6 py-2 hover:bg-[#F4F30E]"
                >
                  أطلق حملتك الآن!
                </a>
              </div>

              <div className="w-full lg:w-5/12 order-first lg:order-last flex justify-center lg:justify-end">
                {' '}
                <img
                  src="images/cta.png"
                  alt=""
                  className="block my-5 mx-auto max-w-full h-auto" // removed mb-4
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======== FEATURES Section ======== */}

        <Feature allContent={allContent} />
        {/* ======== TESTIMONIAL SLIDER Section ======== */}

        <section className="mb-12 second-slider">
          <div className="container mx-auto px-4 testimonial-slider">
            <div className="mx-auto md:mx-12">
              <h2 className="font-bold text-3xl md:text-4xl mb-2">
                {' '}
                {allContent.data['testimonial']._title}
              </h2>
              <p className="font-normal text-gray-700 mb-6">
                {allContent.data['testimonial']._description}
              </p>
              <div className="swiper mySwiper relative">
                {' '}
                {/* Added relative */}
                <div className="swiper-wrapper">
                  {/* Slide 1 */}
                  {allContent.data['testimonial'].items.map(
                    (ele: any, key: any) => {
                      return (
                        <div
                          className="swiper-slide p-6 border rounded-lg bg-gray-50"
                          key={key}
                        >
                          {' '}
                          <img
                            src="images/tabler_quote-filled.svg"
                            alt=""
                            className="h-12 w-12 mb-4"
                          />{' '}
                          <p className="testimonial-text text-xl md:text-2xl font-normal mb-6">
                            {ele._content}
                          </p>
                          <div className="flex justify-end hidden md:hidden">
                            {' '}
                            <img
                              src="images/tabler_quote-filled (1).svg"
                              alt=""
                              className="h-12 w-12 block"
                            />
                          </div>
                          <p className="testimonial-author text-base font-medium text-right mt-4">
                            {' '}
                            {ele._name} – {ele._job_title}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                {/* Swiper Navigation */}
                <div className="swiper-controls flex items-center justify-end mt-4 space-x-2">
                  {' '}
                  <div className="swiper-button-prev cursor-pointer p-2 rounded-full hover:bg-gray-200">
                    {' '}
                    <img
                      src="images/tabler_arrow-right.svg"
                      alt="Previous"
                      className="h-6 w-6"
                    />
                  </div>
                  <div className="swiper-button-next cursor-pointer p-2 rounded-full hover:bg-gray-200">
                    {' '}
                    <img
                      src="images/tabler_arrow-left.svg"
                      alt="Next"
                      className="h-6 w-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== LAST CTA Section ======== */}
        <section className="mb-12 py-12">
          <div className="container mx-auto px-4">
            <div className="p-12 mx-4 last-sec text-center rounded-2xl">
              <h2 className="text-4xl font-bold !text-[#F4F30E] mb-3">
                {allContent.data['join_us']._title}
              </h2>

              <p className="text-white font-normal mb-6 max-w-xl mx-auto last-sec-p">
                {allContent.data['join_us']._description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 last-sec-btn">
                <a
                  href="/sign-in"
                  className="inline-block rounded-full bg-white !text-[#6E38FF] text-base font-normal px-6 py-2 hover:bg-gray-100"
                >
                  انضم إلينا كمسوق
                </a>

                <a
                  href="/sign-in"
                  className="inline-block rounded-full bg-[#F4F30E] !text-[#3F20A6] text-base font-normal px-6 py-2 hover:bg-[#F4F30E]"
                >
                  انضم معنا كتاجر
                </a>
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
                      هو منصة تسويق إحترافية بطريقة مبتكرة باستخدام برنامج
                      الواقع المعزز ( AR) يضمن الفعالية والفائدة العكسية للمتاجر
                      التي يحدد فيه المبلغ المرصود للحملة التسويقية وعدد العملاء
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
                  <h4 className="text-md !font-bold mb-3">
                    حمل تطبيق الكل رابح
                  </h4>

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
    </>
  );
}
