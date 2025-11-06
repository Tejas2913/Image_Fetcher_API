import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "India", "Engineering", "Technology", "Medical", "Canada", "United States"
  ];

  const searchUniversities = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://universities.hipolabs.com/search?name=${keyword}`
      );
      setUniversities(res.data);
    } catch (err) {
      console.error("Error fetching universities:", err);
      alert("Error fetching universities");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start p-4">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

          {/* Dark Mode */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-white"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — University Finder
          </h1>

          {/* Search Form */}
          <form onSubmit={searchUniversities} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search universities — e.g., India, Engineering"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 p-3 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setKeyword(s);
                  searchUniversities({ preventDefault: () => {} });
                }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-blue-500 mb-4">Loading universities...</p>
          )}

          {/* Results */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {universities.map((u, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                <h3 className="font-semibold dark:text-white">{u.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Country: {u.country}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Domain: {u.domains?.[0]}</p>
                <a
                  href={u.web_pages?.[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-center bg-blue-600 text-white py-1 rounded-md"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>

          {!loading && universities.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Try searching: **India**, **Engineering**, **Technology**
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
