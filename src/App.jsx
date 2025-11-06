// App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = ["India", "Engineering", "Technology", "Medical", "Canada"];

  const searchUniversities = async (e) => {
    if (e.preventDefault) e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        "https://universities.hipolabs.com/search",
        { params: { name: keyword } }
      );
      setResults(response.data);
    } catch (err) {
      console.error("Error fetching:", err);
      alert("Error fetching universities");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100"
            >
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — University Finder
          </h1>

          <form onSubmit={searchUniversities} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search by university name…" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 p-3 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setKeyword(s);
                  searchUniversities({preventDefault:()=>{}});
                }}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full text-sm"
              >
                {s}
              </button>
            ))}
          </div>

          {loading && <p className="text-center text-blue-500 mb-4">Loading results…</p>}

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {results.map((uni, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold dark:text-white">{uni.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Country: {uni.country}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Domain: {uni.domains?.[0]}</p>
                <a 
                  href={uni.web_pages?.[0]} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block mt-2 w-full text-center bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>

          {!loading && results.length === 0 && (
            <p className="text-center mt-6 text-gray-500 dark:text-gray-300">
              Try searching: <b>India</b>, <b>Canada</b>, <b>Engineering Universities</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
