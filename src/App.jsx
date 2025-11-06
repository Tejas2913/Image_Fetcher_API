import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "Python", "JavaScript", "Web Development", "Data Science", "AI", "Machine Learning"
  ];

  const searchCourses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("https://www.open.edu.au/api/v1/courses", {
        params: {
          keyword: keyword,
        },
      });
      setCourses(res.data);
    } catch (err) {
      alert("Error fetching courses");
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
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — Course Finder (Open Learn)
          </h1>

          {/* Search Form */}
          <form onSubmit={searchCourses} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search courses — e.g., Python, React"
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
                  searchCourses({ preventDefault: () => {} });
                }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-blue-500 mb-4">Loading courses...</p>
          )}

          {/* Results */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((course, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                <h3 className="font-semibold dark:text-white">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{course.description}</p>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block w-full text-center bg-blue-600 text-white py-1 rounded-md"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>

          {!loading && courses.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Try searching: **Python**, **React**, **Web Development**
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
