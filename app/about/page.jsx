import Header from '../components/Header';

export default async function about() {
  const dataOfAbout = await fetch(
    'https://italent.me/aw-admin/api/v1/website/frontend/1st-block-about-us'
  );
  const about = await dataOfAbout.json();
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
        <div className=" grid   grid-cols-1 md:grid-cols-2">
          <div className=" align-content-center">
            <h2 className="lh-lg">{about.data._title}</h2>
            <p className="paragraph-color">{about.data._content}</p>
          </div>
          <div className="  justify-content-center d-flex ">
            <img src={about.data.image} />
          </div>
        </div>
      </section>

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
            {allContent.data.number_success.items.map((ele, key) => {
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
                      <span className="state-unit">{ele.value_unit_text}</span>
                    </div>
                    <span className="state-highlight"> {ele._title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="success-partner mb-5">
        <div className="container">
          <div className="mx-5">
            <div className="text-center">
              <h2 className="weight-700 font-48 mb-2">
                {allContent.data['employee']._title}
              </h2>
              <p className="weight-400 paragraph-color mb-5">
                {allContent.data['employee']._description}{' '}
              </p>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
              {allContent.data['employee'].items.map((ele, key) => {
                return (
                  <div key={key}>
                    <div className=" rounded-circle d-flex align-items-center justify-content-center px-4 flex-col gap-2">
                      <img
                        src={ele.image ? ele.image : 'images/user.svg'}
                        alt=""
                        className=""
                      />
                      <div className="font-bold">{ele._name}</div>
                      <div className="">{ele._job_title}</div>
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
