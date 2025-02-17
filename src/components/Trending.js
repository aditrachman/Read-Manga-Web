import { Eye, Heart } from "lucide-react"; // Pakai icon buat tampilan keren

const animeList = [
  {
    rank: "01",
    title: "Chainsaw Man",
    views: "200.200",
    likes: "200.200",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/id/9/99/Solo_Leveling_Webtoon.png",
  },
  {
    rank: "02",
    title: "Bleach: Thousand-year Blood War",
    views: "200.200",
    likes: "200.200",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/id/9/99/Solo_Leveling_Webtoon.png",
  },
  {
    rank: "03",
    title: "Spy x Family, Part 2",
    views: "200.200",
    likes: "200.200",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/id/9/99/Solo_Leveling_Webtoon.png",
  },
  {
    rank: "04",
    title: "One Piece",
    views: "200.200",
    likes: "200.200",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/id/9/99/Solo_Leveling_Webtoon.png",
  },
  {
    rank: "05",
    title: "Blue Lock",
    views: "200.200",
    likes: "200.200",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/id/9/99/Solo_Leveling_Webtoon.png",
  },
];

export default function Trending() {
  return (
    <div className="p-1 rounded-lg ">
      <ul>
        {animeList.map((anime) => (
          <li key={anime.rank} className="flex items-center gap-4 py-3">
            <span className="text-gray-400 text-lg font-bold">
              {anime.rank}
            </span>
            <img
              alt={anime.title}
              src={anime.imageUrl}
              className="w-12 h-16 rounded-sm object-cover"
            />
            <div className="flex flex-col">
              <p className="text-white text-sm font-semibold">{anime.title}</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Eye size={14} /> {anime.views}
                <Heart size={14} /> {anime.likes}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
