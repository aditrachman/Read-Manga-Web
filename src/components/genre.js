"use client";
import Image from "next/image";
import { useState } from "react";

const genreList = [
  {
    genre: "Action",
    mangas: [
      {
        title: "Solo Leveling",
        chapters: ["Ch. 180", "Ch. 179"],
        image: "/1.png",
        country: "🇰🇷",
      },
    ],
  },
  {
    genre: "Fantasy",
    mangas: [
      {
        title: "Omniscient Reader",
        chapters: ["Ch. 150", "Ch. 149"],
        image: "/1.png",
        country: "🇰🇷",
      },
    ],
  },
  {
    genre: "Mystery",
    mangas: [
      {
        title: "Juvenile Law",
        chapters: ["Ch. 10", "Ch. 8"],
        image: "/1.png",
        country: "🇰🇷",
      },
    ],
  },
  {
    genre: "Isekai",
    mangas: [
      {
        title: "The Novel Extra",
        chapters: ["Ch. 83", "Ch. 79"],
        image: "/1.png",
        country: "🇰🇷",
      },
    ],
  },
  {
    genre: "Adventure",
    mangas: [
      {
        title: "I'm Trapped in...",
        chapters: ["Ch. 112", "Ch. 111"],
        image: "/1.png",
        country: "🇰🇷",
      },
    ],
  },
];

export default function Genre() {
  const [selectedGenre, setSelectedGenre] = useState("Action");

  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">📚 Pilih Genre</h2>
      </div>

      {/* Genre Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {genreList.map((genre) => (
          <button
            key={genre.genre}
            onClick={() => setSelectedGenre(genre.genre)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              selectedGenre === genre.genre
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-blue-600"
            }`}
          >
            {genre.genre}
          </button>
        ))}
      </div>

      {/* Manga List per Genre */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {genreList
          .find((g) => g.genre === selectedGenre)
          ?.mangas.map((manga, index) => (
            <div
              key={index}
              className="bg-gray-800 p-3 rounded-lg shadow-lg relative group"
            >
              {/* Cover Image */}
              <Image
                src={manga.image}
                alt={manga.title}
                width={300}
                height={400}
                className="w-full h-40 object-cover rounded-md group-hover:scale-105 transition-transform"
              />

              {/* Negara Badge */}
              <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                {manga.country}
              </span>

              {/* Manga Info */}
              <div className="mt-2">
                <h3 className="text-white font-semibold text-sm truncate">
                  {manga.title}
                </h3>
                <div className="mt-1">
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
          ))}
      </div>
    </div>
  );
}
