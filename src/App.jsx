import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "John", "Ryan", "Emma", "Sophia", "Sam", "Olivia"
  ];

  const fetchStudents = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("https://dummyjson.com/users");
      const data = res.data.users;

      const filtered = data.filter(
        (u) =>
          u.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
          u.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
          u.university?.toLowerCase().includes(keyword.toLowerCase())
      );

      setStudents(filtered);
    } catch (err) {
      alert("API Fetch Failed");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">

        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

          {/* Theme */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm dark:text-white"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-blue-300">
            🎓 EduSnap — Student Finder
          </h1>

          {/* Search */}
          <form onSubmit={fetchStudents} className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Search student — e.g., John, Emma"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
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
                  fetchStudents();
                }}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm dark:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-blue-500">Searching…</p>
          )}

          {/* Students Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {students.map((u) => (
              <div key={u.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
                <img
                  src={u.image}
                  className="w-24 h-24 rounded-full mx-auto mb-2 border"
                  alt=""
                />
                <h2 className="font-bold text-center dark:text-white">
                  {u.firstName} {u.lastName}
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">{u.email}</p>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                  {u.university || "Student"}
                </p>
              </div>
            ))}
          </div>

          {!loading && students.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Try searching: **John**, **Emma**, **Olivia**
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
