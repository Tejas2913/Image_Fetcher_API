import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "Python", "JavaScript", "Web Development", "Data Science", "AI",
    "Machine Learning", "React", "Backend", "Frontend"
  ];

  const searchCourses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("https://free-course-api.p.rapidapi.com/courses", {
        params: {
          keyword: keyword,
        },
        headers: {
          "X-RapidAPI-Host": "free-course-api.p.rapidapi.com",
          "X-RapidAPI-Key": "22b8c89450msh3966595213a7b04p180ddejsn705116aff63e",  // Replace with your key
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

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — Course Finder (RapidAPI)
          </h1>

          {/* Search Form */}
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

          {/* Loading */}
          {loading && (
            <p className="text-center text-blue-500">Searching...</p>
          )}

          {/* Results */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((c, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                <h3 className="font-bold dark:text-white">{c.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">{c.platform}</p>
                <a
                  href={c.link}
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
              Try: **Python**, **React**, **Data Science**
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
