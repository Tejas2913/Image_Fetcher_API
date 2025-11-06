import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "Python", "React", "JavaScript", "Web Development", "Data Science",
    "AI", "Machine Learning", "Backend", "Frontend"
  ];

  const searchCourses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        "https://api.pexels.com/v1/search", {
          params: { query: keyword, per_page: 12 },
          headers: {
            Authorization: `Bearer GnWrJAkTvjkLnMMR89xr4MOfnsbOVrRJCuHZsVLqVE47DzToOMqk4iIL`
          }
        });

      const filtered = res.data.photos.map((photo) => ({
        title: photo.photographer,
        image: photo.src.medium,
        url: photo.url
      }));

      setCourses(filtered);
    } catch (err) {
      console.error(err);
      alert("Error fetching courses");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">

        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

          {/* Dark Mode */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — Course Finder (Pexels API)
          </h1>

          {/* Search */}
          <form onSubmit={searchCourses} className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Search courses — e.g., Python, React"
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
                onClick={() => { setKeyword(s); searchCourses({ preventDefault: () => {} }); }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-blue-500">Searching...</p>
          )}

          {/* Results */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((c, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                <img src={c.image} className="w-full h-36 object-cover rounded mb-2" />
                <h2 className="font-bold dark:text-white">{c.title}</h2>
                <a
                  href={c.url}
                  target="_blank"
                  className="block text-center bg-blue-600 text-white py-1 rounded-md mt-2"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>

          {!loading && courses.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Try: **Python**, **React**, **Web Development**, **Machine Learning**
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
