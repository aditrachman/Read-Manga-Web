"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Sesuaikan dengan path ke konfigurasi Firestore Anda
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Genre() {
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "manga")); // Ganti "manga" dengan nama koleksi Anda
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Data dari Firestore:", data); // Debugging

        // Ubah struktur data agar sesuai dengan tampilan yang diinginkan
        const formattedData = formatData(data);
        setGenreList(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format data dari Firestore ke struktur yang diinginkan
  const formatData = (data) => {
    const genres = {};

    data.forEach((manga) => {
      manga.genre.forEach((genre) => {
        if (!genres[genre]) {
          genres[genre] = {
            genre: genre,
            mangas: [],
          };
        }

        genres[genre].mangas.push({
          title: manga.title,
          chapters: [`Ch. ${manga.chapters}`], // Ubah chapters ke format array
          image: manga.image,
          country: "🇯🇵", // Default country, bisa disesuaikan
        });
      });
    });

    return Object.values(genres);
  };

  // Konfigurasi Slider untuk Genre
  const genreSliderSettings = {
    dots: false, // Tidak menampilkan dots
    infinite: false, // Tidak infinite loop
    speed: 300, // Kecepatan transisi
    slidesToShow: 5, // Jumlah tombol genre yang ditampilkan sekaligus
    slidesToScroll: 1, // Jumlah tombol genre yang digeser
    arrows: false, // Hilangkan tombol geser (prev/next)
    responsive: [
      {
        breakpoint: 1024, // Untuk layar laptop
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Untuk layar tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // Untuk layar HP
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Konfigurasi Slider untuk Manga
  const mangaSliderSettings = {
    dots: true, // Tampilkan dots navigasi
    infinite: true, // Infinite loop
    speed: 500, // Kecepatan transisi
    slidesToShow: 4.5, // Menampilkan 4.5 slide sekaligus
    slidesToScroll: 4, // Geser 4 slide sekaligus
    arrows: false, // Hilangkan tombol geser (prev/next)
    swipe: true, // Aktifkan swipe
    responsive: [
      {
        breakpoint: 1024, // Untuk layar laptop
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Untuk layar tablet
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // Untuk layar HP
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Tampilkan loading jika data masih diambil
  if (loading) {
    return <div className="text-white text-center py-4">Loading...</div>;
  }

  // Tampilkan pesan jika tidak ada data
  if (genreList.length === 0) {
    return (
      <div className="text-white text-center py-4">Tidak ada data genre.</div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Pilih Genre</h2>
      </div>

      {/* Genre Buttons */}
      <div className="mb-4">
        <Slider {...genreSliderSettings}>
          {genreList.map((genre) => (
            <div key={genre.genre} className="px-1">
              <button
                onClick={() => setSelectedGenre(genre.genre)}
                className={`w-full px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                  selectedGenre === genre.genre
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-blue-600"
                } truncate`} // Truncate untuk genre yang panjang
              >
                {genre.genre}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Manga List per Genre */}
      <div className="mt-4">
        <Slider {...mangaSliderSettings}>
          {genreList
            .find((g) => g.genre === selectedGenre)
            ?.mangas.map((manga, index) => (
              <div key={index} className="px-1">
                <div className="bg-gray-800 p-2 rounded-lg shadow-lg relative group transform transition-transform duration-300 hover:scale-105">
                  {/* Cover Image */}
                  <Image
                    src={manga.image}
                    alt={manga.title}
                    width={300}
                    height={400}
                    className="w-full h-40 object-cover rounded-md"
                  />

                  {/* Negara Badge */}
                  <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                    {manga.country}
                  </span>

                  {/* Manga Info */}
                  <div className="text-center">
                    <h3 className="text-white py-2 text-sm truncate">
                      {manga.title}
                    </h3>
                    <div className="-py-1">
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
      </div>
    </div>
  );
}
