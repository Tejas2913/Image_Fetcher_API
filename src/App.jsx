import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "JavaScript", "Python", "Backend", "Frontend", "DevOps",
    "Cloud", "Database", "AI", "React", "Cybersecurity"
  ];

  const filters = [
    "JavaScript", "Python", "Fullstack", "Backend",
    "Frontend", "Cloud", "Database", "DevOps", "AI"
  ];

  const placeholderImg =
    "https://via.placeholder.com/150/2563eb/ffffff?text=Course";

  const searchCourses = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        "https://api.sampleapis.com/codingresources/codingResources"
      );

      const term = keyword.toLowerCase();

      const filtered = res.data.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.categories.join(" ").toLowerCase().includes(term)
      );

      const formatted = filtered.map((c) => ({
        title: c.title,
        description: c.description,
        link: c.url,
        category: c.categories.join(", "),
        free: c.free,
        image: placeholderImg
      }));

      setCourses(formatted);
    } catch (err) {
      alert("Error fetching courses");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">

        <div className="max-w-5xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

          {/* Dark mode */}
          <div className="flex justify-end mb-2">
            <button
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — All Tech Courses Finder
          </h1>

          {/* Search */}
          <form onSubmit={searchCourses} className="flex gap-2 mb-4">
            <input
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Search — e.g., Python, React, Cloud"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-5 rounded">
              {loading ? "..." : "Search"}
            </button>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setKeyword(s);
                  searchCourses();
                }}
                className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-blue-500">Loading...</p>
          )}

          {/* Results */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((c, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
                <img src={c.image} className="w-full h-36 object-cover rounded mb-2" />
                <h2 className="font-bold dark:text-white">{c.title}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-2">{c.description}</p>
                <p className="text-xs text-gray-400">
                  <b>Category:</b> {c.category}
                </p>
                <p className="text-xs mb-1">
                  {c.free ? "✅ Free" : "💲 Paid"}
                </p>
                <a
                  href={c.link}
                  target="_blank"
                  className="block text-center bg-blue-600 text-white py-1 rounded text-sm"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>

          {!loading && courses.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Try: **Python**, **React**, **DevOps**, **Cloud**
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
