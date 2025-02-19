"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Feed() {
  return (
    <form>
      <div className="space-y-12  p-2 rounded-lg shadow-lg">
        {/* Form Input Manga */}
        <div className="border-b border-gray-700 pb-12">
          <h2 className="text-base font-semibold text-white">Input Manga</h2>
          <p className="mt-1 text-sm text-gray-400">
            Masukkan detail manga yang ingin Anda rekomendasikan.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Nama Manga */}
            <div className="sm:col-span-full">
              <label
                htmlFor="manga-name"
                className="block text-sm font-medium text-white"
              >
                Nama Manga
              </label>
              <div className="mt-2">
                <textarea
                  id="reason"
                  name="reason"
                  rows={2}
                  placeholder="Contoh: solo leveling"
                  className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Alasan */}
            <div className="col-span-full">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-white"
              >
                Alasan
              </label>
              <div className="mt-2">
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  placeholder="Contoh: Ceritanya seru dan karakter-karakternya menarik."
                  className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Jelaskan alasan Anda merekomendasikan manga ini.
              </p>
            </div>

            {/* Upload Gambar */}
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-white"
              >
                Cover Manga
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-700 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-500"
                  />
                  <div className="mt-4 flex text-sm text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-800 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload gambar</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF maksimal 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Centang R18 */}
            <div className="col-span-full">
              <div className="flex items-center gap-x-3">
                <input
                  id="r18"
                  name="r18"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="r18"
                  className="block text-sm font-medium text-white"
                >
                  Apakah manga ini R18?
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Kirim */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold text-gray-400 hover:text-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Kirim
          </button>
        </div>
      </div>
    </form>
  );
}
