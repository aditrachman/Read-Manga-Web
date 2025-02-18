"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig"; // Pastikan sudah setup firestore
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Star } from "lucide-react"; // Pakai icon bintang untuk rating

export default function Trending() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "manga"), // Ganti 'manga' dengan nama collection di Firestore
          orderBy("popularity", "desc"), // Urutkan berdasarkan popularity (semakin tinggi semakin populer)
          limit(5) // Ambil 5 data terpopuler
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnimeList(data); // Simpan data di state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-1 rounded-lg">
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id} className="flex items-center gap-4 py-3">
            <span className="text-gray-400 text-lg font-bold">
              {anime.rank}
            </span>
            <img
              alt={anime.title}
              src={anime.image || "/cover.png"} // Ambil gambar dari Firestore atau fallback ke default
              className="w-12 h-16 rounded-sm object-cover"
            />
            <div className="flex flex-col w-full">
              <p
                className="text-white text-sm font-semibold truncate"
                style={{ maxWidth: "150px" }}
              >
                {anime.title}
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span className="flex items-center">
                  <Star size={14} className="mr-1" />
                  {anime.rating} {/* Menampilkan rating dari Firestore */}
                </span>
                <span className="text-white">{anime.rank}</span>{" "}
                {/* Menampilkan rank */}
                {anime.chapters && (
                  <span className="text-white text-xs">
                    - Ch. {anime.chapters} {/* Menampilkan chapter terakhir */}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
