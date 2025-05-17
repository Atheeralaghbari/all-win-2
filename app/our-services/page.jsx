import Header from '../components/Header';

export default async function about() {
  const dataOfServices = await fetch(
    'https://italent.me/aw-admin/api/v1/website/frontend/1st-block-service'
  );
  const services = await dataOfServices.json();
  const dataOfAllContent = await fetch(
    'https://italent.me/aw-admin/api/v1/website/frontend/all-contents'
  );
  const allContent = await dataOfAllContent.json();
  return (
    <div>
      <section className="main-hero px-0 pt-3 pb-3 mb-5">
        <div className="container">
          <Header />
        </div>
      </section>
      <section className="container align-items-center mb-5">
        <div className=" grid   grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" align-content-center flex flex-col  justify-center ">
            <h2 className="lh-lg">{services.data._title}</h2>
            <p className="paragraph-color">{services.data._content}</p>{' '}
            <a
              href=""
              className="!inline-flex !mr-auto justify-center !w-fit items-center text-white  text-base rounded-full py-1 px-6 numbers-btn items-end"
            >
              انضم إلينا كتاجر
              <img
                src={services.data.image}
                alt=""
                className="mr-2 h-4 w-4"
              />
            </a>
          </div>
          <div className="  justify-content-center d-flex ">
            <img src="images/about.svg" />
          </div>
        </div>
      </section>

      <section className="steps mb-12 bg-[#552DD9] py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xl md:text-3xl !mb-4 text-white">
            {allContent.data.service._title}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 steps-container mt-4">
            {allContent.data['service'].items.map((ele, key) => {
              return (
                <div
                  key={key}
                  className="col-span-1"
                  // key={key}
                >
                  <div className="step-card rounded-xl h-full flex flex-col border border-gray-200 overflow-hidden bg-white">
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
                        <h3 className="font-semibold !text-lg text-center mb-3">
                          {ele._title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
            {allContent.data['4_steps'].items.map((ele, key) => {
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

      <section
        id="cta"
        className="mb-12 py-12"
      >
        <div className="container mx-auto px-4">
          <div className="cta-section flex items-center flex-col-reverse  md:flex-row-reverse mx-4 !p-12 rounded-2xl">
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
      <section className="footer">
        <footer>
          <div className="container">
            <div className="row g-5 py-5 footer-row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="logo-col">
                  <a
                    href="#"
                    aria-label=""
                    className="footer-logo-div"
                  >
                    <img
                      src="images/logo footer.svg"
                      alt=""
                      className="d-block footer-logo mb-3"
                    />
                  </a>

                  <p className="font-16 font-400 footer-p">
                    هو منصة تسويق إحترافية بطريقة مبتكرة باستخدام برنامج الواقع
                    المعزز ( AR) يضمن الفعالية والفائدة العكسية للمتاجر التي
                    يحدد فيه المبلغ المرصود للحملة التسويقية وعدد العملاء
                    المطلوب للمشاركة في الحملة التسويقية
                  </p>
                  <ul className="nav d-flex gap-2 social-nav">
                    <li className="nav-item text-center">
                      <a
                        className="nav-link social-icon p-0"
                        href="#"
                        aria-label="snapchat"
                      >
                        <img
                          src="images/mingcute_instagram-line.svg"
                          className="p-2 social-img"
                          alt=""
                        />
                      </a>
                    </li>
                    <li className="nav-item text-center">
                      <a
                        className="nav-link social-icon p-0"
                        href="#"
                        aria-label="youtube"
                      >
                        <img
                          src="images/ri_facebook-fill.svg"
                          className="p-2 social-img"
                          alt=""
                        />
                      </a>
                    </li>
                    <li className="nav-item text-center">
                      <a
                        className="nav-link social-icon p-0"
                        href="#"
                        aria-label="facebook"
                      >
                        <img
                          src="images/prime_twitter.svg"
                          className="p-2 social-img"
                          alt=""
                        />
                      </a>
                    </li>
                    <li className="nav-item text-center">
                      <a
                        className="nav-link social-icon p-0"
                        href="#"
                        aria-label="twitter-x"
                      >
                        <img
                          src="images/ic_round-whatsapp.svg"
                          className="p-2 social-img"
                          alt=""
                        />
                      </a>
                    </li>
                    <li className="nav-item text-center">
                      <a
                        className="nav-link social-icon p-0"
                        href="#"
                        aria-label="twitter-x"
                      >
                        <img
                          src="images/ic_outline-tiktok.svg"
                          className="p-2 social-img"
                          alt=""
                        />
                      </a>
                    </li>
                    <li className="nav-item text-center">
                      <a
                        className="nav-link social-icon p-0"
                        href="#"
                        aria-label="twitter-x"
                      >
                        <img
                          src="images/mingcute_youtube-line.svg"
                          className="p-2 social-img"
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12 col-12">
                <h5 className="font-18 weight-700 mb-3">الحملات التسويقية</h5>
                <ul className="footer-list">
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      الواقع المعزز
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      الخدمات الأساسية
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      حساب التاجر
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      الشروط والأحكام
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12 col-12">
                <h4 className="font-18 weight-700 mb-3">الكل الرابح</h4>
                <ul className="footer-list">
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      نبذة عن المشروع
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      آلية العمل
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      اتصل بنا
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-16 weight-400 secondaryBlack-color d-block mb-2"
                    >
                      تسجيل الدخول
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-8 col-8 mx-auto">
                <h4 className="font-18 weight-700 mb-3">حمل تطبيق الكل رابح</h4>
                <div className="d-flex flex-column gap-2">
                  <a href="">
                    {' '}
                    <img
                      src="images/AppStore.svg"
                      alt=""
                    />
                  </a>
                  <a href="">
                    {' '}
                    <img
                      src="images/Google App.svg"
                      alt=""
                    />{' '}
                  </a>
                  <a href="">
                    {' '}
                    <img
                      src="images/AppGallery.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
