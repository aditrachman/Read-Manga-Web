"use client";

import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const mangaList = [
  {
    title: "Juvenile Law",
    chapters: ["Ch. 10", "Ch. 8"],
    image: "/cover.png",
    country: "🇰🇷",
    color: true,
  },
  {
    title: "I'm Trapped in...",
    chapters: ["Ch. 112", "Ch. 111"],
    image: "/cover.png",
    country: "🇰🇷",
    color: true,
  },
  {
    title: "The Novel Extra...",
    chapters: ["Ch. 83", "Ch. 79"],
    image: "/cover.png",
    country: "🇰🇷",
    color: true,
  },
  {
    title: "Revenge of a Sword",
    chapters: ["Ch. 210", "Ch. 209"],
    image: "/cover.png",
    country: "🇰🇷",
    color: true,
  },
  {
    title: "Demon King's Diary",
    chapters: ["Ch. 55", "Ch. 54"],
    image: "/cover.png",
    country: "🇰🇷",
    color: true,
  },
];

export default function Update() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default tampilin 5 gambar
    slidesToScroll: 1,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } }, // Laptop
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // Tablet Landscape
      { breakpoint: 768, settings: { slidesToShow: 2 } }, // Tablet
      { breakpoint: 640, settings: { slidesToShow: 2 } }, // HP kecil
    ],
  };

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Update Terbaru</h2>
        <a
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 transition"
        >
          View All
        </a>
      </div>

      {/* Manga Slider */}
      <Slider {...settings}>
        {mangaList.map((manga, index) => (
          <div key={index} className="p-2">
            <div className="relative bg-gray-800 p-2 rounded-lg shadow-lg">
              <Image
                src={manga.image}
                alt={manga.title}
                width={250} // Ukuran gambar lebih kecil
                height={320}
                className="w-full h-40 object-cover rounded-md"
              />
              {/* Negara */}
              <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                {manga.country}
              </span>
              {/* Info */}
              <div className="mt-2 text-center">
                <h3 className="text-white font-semibold text-xs truncate">
                  {manga.title}
                </h3>
                <div className="mt-1 space-y-1">
                  {manga.chapters.map((chapter, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-xs text-blue-400 hover:underline block"
                    >
                      {chapter}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-gray-700 mt-4 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / mangaList.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
