import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "AI", "Python", "Machine Learning", "Web Development", "Data Science",
    "Cloud", "Cyber Security", "Database", "Java", "React"
  ];

  const filters = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Data Science",
    "Cyber Security",
    "Cloud Computing",
    "Python"
  ];
  
  const searchCourses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/theapache64/awesome-course-data/master/courses.json"
      );

      const filtered = res.data.filter(course =>
        course.title.toLowerCase().includes(keyword.toLowerCase()) ||
        course.platform.toLowerCase().includes(keyword.toLowerCase()) ||
        course.topic.toLowerCase().includes(keyword.toLowerCase())
      );

      setCourses(filtered);
    } catch (err) {
      console.log(err);
      alert("Error fetching courses");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border dark:border-gray-700 transition">

          {/* Dark Mode Toggle */}
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
            🎓 Edu Snap — Course Finder
          </h1>

          {/* Search Form */}
          <form onSubmit={searchCourses} className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
            <input
              type="text"
              className="border p-3 rounded-md w-full sm:w-64 focus:ring-2
              focus:ring-blue-400 outline-none shadow-sm bg-white dark:bg-gray-700 
              border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              placeholder="Search courses — e.g., AI, Python"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold shadow transition">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Suggested Keywords */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {suggestions.map((word, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setKeyword(word);
                  searchCourses({ preventDefault: () => {} });
                }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 
                hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {filters.map((word, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setKeyword(word);
                  searchCourses({ preventDefault: () => {} });
                }}
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

          {/* Courses Grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {courses.map((course, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
                <img src={course.image} className="w-full h-40 object-cover rounded-lg mb-2" />
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{course.platform}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{course.description}</p>
                <a
                  href={course.url}
                  target="_blank"
                  className="mt-2 inline-block w-full text-center bg-blue-600 text-white rounded-md py-1 hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>

          {!loading && courses.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm md:text-base">
              🎯 Try searching <b>AI</b>, <b>Python</b>, <b>Web Development</b>, <b>Cloud</b>, <b>Data Science</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
