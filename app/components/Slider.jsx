'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';

export default function Slider(data) {
  return (
    <section className="slider-section mb-12">
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        className="  container mx-auto px-4"
      >
        {data.data.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a
              href={slide.link}
              className="block"
              style={{
                position: 'relative',
                width: '100%',
                height: '50vh',
                borderRadius: 'none',
              }}
            >
              {' '}
              <Image
                src={slide._image}
                alt={slide.id}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                priority={slide.id === 1}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
