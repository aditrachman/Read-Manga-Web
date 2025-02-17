"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "My Hero Academia",
    episode: "Chapter 100",
    description:
      "The appearance of 'quirks,' newly discovered super powers, has been steadily increasing over the years...",
    image: "/1.png",
    rank: "#1 Popular",
    genre: ["Action", "Superhero"],
  },
  {
    title: "Attack on Titan",
    episode: "Chapter 139",
    description: "Humanity fights for survival against the Titans...",
    image: "/1.png",
    rank: "#2 Popular",
    genre: ["Action", "Drama", "Fantasy"],
  },
];

export default function Hero() {
  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto geser
        pagination={{ clickable: true }} // Titik navigasi
        loop={true} // Loop terus
        navigation={{ nextEl: ".nextBtn", prevEl: ".prevBtn" }} // Pakai tombol manual
        className="relative h-[400px] sm:h-[400px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center rounded-lg"
            />

            {/* Rank di Pojok Kanan Atas */}
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              {slide.rank}
            </div>

            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex flex-col justify-end p-6">
              {/* Judul + Episode */}
              <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
              <p className="text-gray-300 text-sm">{slide.episode}</p>

              {/* Genre */}
              <div className="flex flex-wrap gap-2 mt-2">
                {slide.genre.map((g, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-600 transition"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Deskripsi */}
              <p className="text-white text-xs mt-2 line-clamp-2">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tombol Navigasi Manual */}
      <button className="prevBtn absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <ChevronLeft size={24} />
      </button>
      <button className="nextBtn absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
