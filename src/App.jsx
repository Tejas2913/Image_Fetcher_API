import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);   // books/courses-like
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "AI", "Machine Learning", "Data Science", "Web Development",
    "Cloud Computing", "Cyber Security", "Algorithms", "Python", "React", "Database"
  ];

  const filters = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Web Development",
    "Cyber Security",
    "Cloud Computing",
    "Programming",
    "Education"
  ];

  const searchGoogleBooks = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      // Google Books — no API key needed for small usage
      // We bias towards education by adding subject:education
      const q = `${keyword} subject:education`;
      const { data } = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q,
          maxResults: 12,
          printType: "books",
        },
      });

      const results = (data.items || []).map((it) => {
        const v = it.volumeInfo || {};
        return {
          id: it.id,
          title: v.title || "Untitled",
          authors: (v.authors || []).join(", "),
          thumb:
            v.imageLinks?.thumbnail ||
            v.imageLinks?.smallThumbnail ||
            "https://via.placeholder.com/128x180?text=No+Image",
          desc: v.description || "No description available.",
          link: v.previewLink || v.infoLink || "#",
          categories: (v.categories || []).join(", "),
          source: "Google Books"
        };
      });

      setItems(results);
    } catch (err) {
      console.error(err);
      alert("Error fetching from Google Books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border dark:border-gray-700 transition">

          {/* Dark Mode */}
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
            🎓 Edu Snap — Education Finder (Google Books)
          </h1>

          {/* Search */}
          <form onSubmit={searchGoogleBooks} className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
            <input
              type="text"
              className="border p-3 rounded-md w-full sm:w-96 focus:ring-2
              focus:ring-blue-400 outline-none shadow-sm bg-white dark:bg-gray-700 
              border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              placeholder="Search topics — e.g., AI, Data Science, Web Development"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold shadow transition">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {suggestions.map((word, idx) => (
              <button
                key={idx}
                onClick={() => { setKeyword(word); searchGoogleBooks(); }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 
                hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {filters.map((word, idx) => (
              <button
                key={idx}
                onClick={() => { setKeyword(word); searchGoogleBooks(); }}
                className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-800 
                text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-600 
                hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 transition"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center my-5">
              <div className="border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}

          {/* Results */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((b) => (
              <div key={b.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
                <img src={b.thumb} alt={b.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2">{b.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{b.authors || "Unknown author"}</p>
                {b.categories && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{b.categories}</p>
                )}
                <a
                  href={b.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block w-full text-center bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Preview
                </a>
                <p className="text-[10px] text-gray-400 mt-1">{b.source}</p>
              </div>
            ))}
          </div>

          {!loading && items.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm md:text-base">
              🎯 Try: <b>AI</b>, <b>Machine Learning</b>, <b>Web Development</b>, <b>Data Science</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
