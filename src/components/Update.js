"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function Update() {
  const [mangaList, setMangaList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "manga"),
          orderBy("updatedAt", "desc"),
          limit(5)
        ); // 🔥 Hanya 5 terbaru
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMangaList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    initialSlide: 0,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default desktop
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } }, // Laptop
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // Tablet Landscape
      { breakpoint: 768, settings: { slidesToShow: 2 } }, // Tablet
      { breakpoint: 640, settings: { slidesToShow: 2 } }, // HP kecil (DARI 1 JADI 2)
    ],
  };

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Update Terbaru</h2>
        <a
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 transition"
        >
          View All
        </a>
      </div>

      <Slider {...settings}>
        {mangaList.map((manga, index) => (
          <div key={manga.id || index} className="">
            <div className="relative bg-gray-800 p-2 rounded-lg shadow-lg">
              <Image
                src={manga.image || "/cover.png"}
                alt={manga.title}
                width={300}
                height={300}
                className="w-full h-[180px] object-cover rounded-md"
              />

              <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                {manga.country || "JP"}
              </span>
              <div className="mt-2 text-center">
                <h3 className="text-white font-semibold text-xs truncate">
                  {manga.title}
                </h3>
                <div className="text-xs text-blue-400">
                  {typeof manga.chapters === "number" ? (
                    <a href="#" className="hover:underline block">
                      Ch. {manga.chapters}
                    </a>
                  ) : (
                    <a href="#" className="hover:underline block">
                      Ch. N/A
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="relative w-full h-1 bg-gray-700 mt-4 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / mangaList.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
