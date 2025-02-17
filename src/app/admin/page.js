"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
  const router = useRouter();
  const [mangaList, setMangaList] = useState([]);
  const [newManga, setNewManga] = useState({
    title: "",
    genre: [],
    chapters: [],
    image: "",
    rating: 0,
    description: "",
  });
  const [editManga, setEditManga] = useState({
    title: "",
    genre: [],
    chapters: [],
    image: "",
    rating: 0,
    description: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchManga = async () => {
      const querySnapshot = await getDocs(collection(db, "manga"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        chapters: doc.data().chapters || [],
        genre: doc.data().genre || [],
        rating: doc.data().rating || 0,
      }));
      setMangaList(data);
    };

    fetchManga();
  }, []);

  const handleAddManga = async () => {
    if (!newManga.title || !newManga.image) {
      alert("Judul dan gambar wajib diisi!");
      return;
    }

    if (newManga.rating > 10 || newManga.rating < 0) {
      alert("Rating harus antara 0 dan 10!");
      return;
    }

    try {
      await addDoc(collection(db, "manga"), {
        ...newManga,
        updatedAt: serverTimestamp(),
      });

      setNewManga({
        title: "",
        genre: [],
        chapters: [],
        image: "",
        rating: 0,
        description: "",
      });
      alert("Manga berhasil ditambahkan!");
      setIsAddModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding manga:", error);
    }
  };

  const handleUpdateManga = async () => {
    if (!editManga) return;

    if (editManga.rating > 10 || editManga.rating < 0) {
      alert("Rating harus antara 0 dan 10!");
      return;
    }

    try {
      const mangaRef = doc(db, "manga", editManga.id);
      await updateDoc(mangaRef, {
        ...editManga,
        updatedAt: serverTimestamp(),
      });

      setEditManga({
        title: "",
        genre: [],
        chapters: [],
        image: "",
        rating: 0,
        description: "",
      });
      alert("Manga berhasil diperbarui!");
      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating manga:", error);
    }
  };

  const handleDeleteManga = async (id) => {
    if (!confirm("Yakin mau hapus manga ini?")) return;

    try {
      await deleteDoc(doc(db, "manga", id));
      alert("Manga berhasil dihapus!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting manga:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleEditManga = (manga) => {
    setEditManga({
      ...manga,
      chapters: manga.chapters || [],
      genre: manga.genre || [],
      rating: manga.rating || 0,
    });
    setIsEditModalOpen(true);
  };

  const filteredMangaList = mangaList.filter((manga) =>
    manga.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTodaysMangaCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return mangaList.filter((manga) => {
      const mangaDate = manga.updatedAt?.toDate();
      if (mangaDate) {
        mangaDate.setHours(0, 0, 0, 0);
        return mangaDate.getTime() === today.getTime();
      }
      return false;
    }).length;
  };

  const shortenTitle = (title, maxLength = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return user ? (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full p-2 bg-blue-500 hover:bg-blue-400 rounded"
            >
              Tambah Manga
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-500 hover:bg-red-400 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Hero Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Hello, Admin!</h1>
          <p className="text-gray-400">Selamat datang di panel admin.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari manga..."
            className="w-full p-2 bg-gray-700 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Bagian Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-bold">Total Manga</h2>
            <p className="text-2xl">{mangaList.length}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-bold">Pending Manga</h2>
            <p className="text-2xl">0</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-bold">Today's Manga</h2>
            <p className="text-2xl">{getTodaysMangaCount()}</p>
          </div>
        </div>

        {/* Bagian Top Manga */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">Top Manga</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMangaList
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 10)
              .map((manga) => (
                <div
                  key={manga.id}
                  className="p-4 bg-gray-700 rounded-lg flex flex-col justify-between"
                >
                  <img
                    src={manga.image}
                    alt={manga.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold">
                    {shortenTitle(manga.title)}
                  </h3>
                  <p>Rating: {manga.rating}</p>
                  <p>Genre: {manga.genre.join(", ")}</p>
                  <p>Chapters: {manga.chapters.join(", ")}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditManga(manga)}
                      className="p-2 bg-yellow-500 hover:bg-yellow-400 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteManga(manga.id)}
                      className="p-2 bg-red-500 hover:bg-red-400 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal Tambah Manga */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Tambah Manga</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Judul</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={newManga.title}
                  onChange={(e) =>
                    setNewManga({ ...newManga, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Genre</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={newManga.genre.join(", ")}
                  onChange={(e) =>
                    setNewManga({
                      ...newManga,
                      genre: e.target.value.split(", "),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Chapters</label>
                <textarea
                  className="w-full p-2 bg-gray-700 rounded"
                  value={newManga.chapters.join(", ")}
                  onChange={(e) =>
                    setNewManga({
                      ...newManga,
                      chapters: e.target.value.split(", "),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={newManga.rating}
                  onChange={(e) =>
                    setNewManga({
                      ...newManga,
                      rating: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={newManga.image}
                  onChange={(e) =>
                    setNewManga({ ...newManga, image: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Deskripsi</label>
                <textarea
                  className="w-full p-2 bg-gray-700 rounded"
                  value={newManga.description}
                  onChange={(e) =>
                    setNewManga({ ...newManga, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 bg-gray-500 hover:bg-gray-400 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleAddManga}
                className="p-2 bg-blue-500 hover:bg-blue-400 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Manga */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Edit Manga</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Judul</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={editManga.title}
                  onChange={(e) =>
                    setEditManga({ ...editManga, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Genre</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={editManga.genre.join(", ")}
                  onChange={(e) =>
                    setEditManga({
                      ...editManga,
                      genre: e.target.value.split(", "),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Chapters</label>
                <textarea
                  className="w-full p-2 bg-gray-700 rounded"
                  value={editManga.chapters.join(", ")}
                  onChange={(e) =>
                    setEditManga({
                      ...editManga,
                      chapters: e.target.value.split(", "),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={editManga.rating}
                  onChange={(e) =>
                    setEditManga({
                      ...editManga,
                      rating: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={editManga.image}
                  onChange={(e) =>
                    setEditManga({ ...editManga, image: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Deskripsi</label>
                <textarea
                  className="w-full p-2 bg-gray-700 rounded"
                  value={editManga.description}
                  onChange={(e) =>
                    setEditManga({ ...editManga, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 bg-gray-500 hover:bg-gray-400 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateManga}
                className="p-2 bg-blue-500 hover:bg-blue-400 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
