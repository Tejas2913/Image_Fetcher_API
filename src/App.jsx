import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "India", "United States", "United Kingdom", "Canada", "Australia",
    "Technology", "Engineering", "Medical", "Business", "Law"
  ];

  const searchUniversities = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://universities.hipolabs.com/search?name=${keyword}`
});

      setUniversities(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching universities");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:opacity-80 transition"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎓 Edu Snap — University Finder
          </h1>

          {/* Search Form */}
          <form onSubmit={searchUniversities} className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
            <input
              type="text"
              className="border p-3 rounded-md w-full sm:w-64 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              placeholder="Search by name / country — e.g., India, Engineering"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold shadow transition">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setKeyword(s);
                  searchUniversities({preventDefault: () => {}});
                }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
              >
                {s}
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
            {universities.map((u, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-bold text-lg dark:text-white truncate">{u.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Country: {u.country}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Domain: {u.domains?.[0]}</p>
                <a
                  href={u.web_pages?.[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-center bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>

          {!loading && universities.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm md:text-base">
              🔍 Try: <b>India</b>, <b>United States</b>, <b>Engineering</b>, <b>Business</b>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
