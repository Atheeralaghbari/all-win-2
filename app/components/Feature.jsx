'use client';
import { useState, useEffect } from 'react';
const FEATURE_CHANGE_INTERVAL = 5000;

export default function Feature({ allContent }) {
  const features = allContent.data['feature'].items;
  const initialFeatureId = features.length > 0 ? features[0].id : null;
  const initialActiveFeature = initialFeatureId
    ? `image-${initialFeatureId}`
    : '';

  const [activeFeature, setActiveFeature] = useState(initialActiveFeature);
  useEffect(() => {
    if (!features || features.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveFeature((currentActive) => {
        const currentIdStr = currentActive.split('-')[1];
        const currentIndex = features.findIndex(
          (feature) => feature.id.toString() === currentIdStr
        );

        const nextIndex = (currentIndex + 1) % features.length;
        const nextFeatureId = features[nextIndex].id;
        return `image-${nextFeatureId}`;
      });
    }, FEATURE_CHANGE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [features]);
  const isFeatureActive = (featureId) => activeFeature === `image-${featureId}`;

  return (
    <section className="mb-12 features">
      <div className="container mx-auto px-4">
        <div className="mx-auto md:mx-12">
          <h2 className="text-5xl font-bold mb-2">
            {allContent.data['feature']._title}
          </h2>
          <p className="font-normal text-gray-700 mb-3">
            {allContent.data['feature']._description}{' '}
          </p>

          <div className="flex flex-col md:flex-row gap-6 mt-12">
            {' '}
            {/* Ensure flex direction is correct for mobile/desktop */}
            {/* List Column */}
            <div className="w-full md:w-5/12">
              <div className="list-container h-full">
                <ul className="space-y-2">
                  {features.map((ele) => {
                    // Use the features variable
                    const featureId = `image-${ele.id}`;
                    const isActive = isFeatureActive(ele.id);

                    return (
                      <li
                        className={
                          `list-group-item p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 ` +
                          (isActive ? 'active ' : '')
                        }
                        onClick={() => setActiveFeature(featureId)}
                        key={ele.id}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex-shrink-0 h-5 w-5">
                            {' '}
                            <img
                              src="images/tabler_checks.svg"
                              alt=""
                              className={`gray-check h-full w-full ${
                                isActive ? 'hidden' : 'block'
                              }`}
                            />
                            <img
                              src="images/tabler_checks_blue.svg"
                              alt=""
                              className={`blue-check h-full w-full ${
                                isActive ? 'block' : 'hidden'
                              }`}
                            />
                          </div>
                          <p
                            className={`list-title text-base font-semibold m-0 ${
                              isActive ? 'text-blue-700' : ''
                            }`}
                          >
                            {' '}
                            {ele._title}
                          </p>
                        </div>

                        <p
                          className={`list-p text-sm mt-2 text-gray-600 transition-all duration-300 ease-in-out ${
                            isActive
                              ? 'block max-h-40 opacity-100'
                              : 'hidden max-h-0 opacity-0'
                          }`}
                        >
                          {' '}
                          {ele._description}
                        </p>

                        <img
                          src={ele.mobileImage || ele.image || 'images/img.svg'}
                          alt={ele._title || ''}
                          className={`mobile-image rounded-xl mt-3 w-full md:hidden transition-all duration-300 ease-in-out ${
                            isActive
                              ? 'block max-h-60 opacity-100'
                              : 'hidden max-h-0 opacity-0'
                          }`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="w-full md:w-7/12 img-side hidden md:block">
              <div className="content-container p-0 rounded-2xl relative h-full min-h-[300px] overflow-hidden">
                {' '}
                {features.map((ele) => {
                  const featureId = `image-${ele.id}`;
                  const isActive = isFeatureActive(ele.id);
                  return (
                    <img
                      key={ele.id} //
                      id={featureId}
                      src={ele.image ? ele.image : 'images/img.svg'}
                      alt={ele._title || ''} //
                      className={
                        `rounded-2xl content-image absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ` + // Added transition for smooth fade
                        (isActive ? ' active ' : '')
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
