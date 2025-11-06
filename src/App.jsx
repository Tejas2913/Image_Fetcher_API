import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  const domain = "Student Management System";

  // ✅ Allowed domain keywords (Student Management System)
  const allowedKeywords = [
    "student", "students", "school", "college", "university", "campus",
    "classroom", "lecture", "teacher", "professor", "faculty", "education",
    "books", "book", "library", "notebook", "study", "studying", "exam",
    "exams", "test", "timetable", "attendance", "assignment", "homework",
    "whiteboard", "classroom board", "bench", "desk", "hostel", "canteen",
    "computer lab", "lab", "playground", "graduation", "uniform", "school bag",
    "backpack", "id card", "student id", "digital learning", "e-learning",
    "smart classroom", "students group"
  ];

  const searchImages = async (e) => {
    e.preventDefault();
    
    // ✅ Check if the entered keyword is allowed
    const isAllowed = allowedKeywords.some((word) =>
      keyword.toLowerCase().includes(word)
    );

    if (!isAllowed) {
      setError("Please enter only student-related terms (e.g., classroom, exam, library).");
      setImages([]);
      return;
    }

    setLoading(true);
    setError("");  // Clear any previous errors

    const ACCESS_KEY = "4ciPhaaUBnQsEMOICaFsRAuBFyj8Jp0YAL6L7IvgKPk";  

    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: `${domain} ${keyword}`,
          per_page: 12,
        },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      });

      const imgs = res.data.results.map((img) => img.urls.small);
      setImages(imgs);
    } catch {
      setError("Error fetching images");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border dark:border-gray-700 transition">

          {/* Dark Mode Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 text-sm font-semibold rounded-md 
              bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
              shadow hover:opacity-80 transition"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r 
           from-blue-600 to-purple-600 dark:from-purple-400 dark:to-blue-300 
           bg-clip-text text-transparent">
            🎓 Student Management System Image Search
          </h1>

          {/* Search Form */}
          <form
            onSubmit={searchImages}
            className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
          >
            <input
              type="text"
              className="border p-3 rounded-md w-full sm:w-64 focus:ring-2
              focus:ring-blue-400 outline-none shadow-sm bg-white dark:bg-gray-700 
              border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              placeholder="Search — classroom, exam hall"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />

            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold shadow transition">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-center text-red-600">{error}</p>}

          {/* Loader */}
          {loading && (
            <div className="flex justify-center my-5">
              <div className="border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition">
                <img
                  src={img}
                  alt="result"
                  className="w-full h-36 sm:h-40 md:h-48 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && images.length === 0 && !error && (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm md:text-base">
              🔍 Try searching <b>classroom</b>, <b>library</b>, <b>exam hall</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
