import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchStudents = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("https://randomuser.me/api/?results=20");
      const data = res.data.results;

      const filtered = data.filter((user) =>
        user.name.first.toLowerCase().includes(keyword.toLowerCase()) ||
        user.name.last.toLowerCase().includes(keyword.toLowerCase())
      );

      setStudents(filtered);
    } catch (err) {
      console.log(err);
      alert("API fetch failed");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

          {/* Dark Mode */}
          <div className="flex justify-end mb-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-blue-300">
            🎓 Edu Snap — Student Finder
          </h1>

          {/* Search */}
          <form onSubmit={fetchStudents} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search student name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <button className="bg-blue-600 text-white px-4 rounded">
              {loading ? "..." : "Search"}
            </button>
          </form>

          {loading && (
            <p className="text-center text-blue-500 dark:text-blue-300">Loading...</p>
          )}

          {/* Students Grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {students.map((u, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                <img 
                  src={u.picture.large} 
                  alt=""
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <p className="font-bold text-center dark:text-white">
                  {u.name.first} {u.name.last}
                </p>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                  {u.email}
                </p>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                  {u.location.city}
                </p>
              </div>
            ))}
          </div>

          {!loading && students.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Try: **John**, **Emma**, **Alex**
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
