import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const universities = [
    "IIT Delhi", "IIT Bombay", "IIT Madras", "NIT Trichy",
    "BITS Pilani", "VIT Vellore", "RV University", "Manipal University",
    "Christ University", "Anna University"
  ];

  const majors = [
    "Computer Science", "AI & ML", "Electronics", "IT", "Cybersecurity",
    "Data Science", "Mechanical", "Civil", "Finance", "Business Analytics"
  ];

  const searchStudents = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");

      const filtered = res.data.filter(user =>
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.address.city.toLowerCase().includes(keyword.toLowerCase())
      );

      const result = filtered.map((s, i) => ({
        ...s,
        university: universities[i % universities.length],
        major: majors[i % majors.length],
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`
      }));

      setStudents(result);
    } catch (err) {
      alert("Error fetching student data");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">

          {/* Dark Mode */}
          <div className="flex justify-end">
            <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md dark:text-white">
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            🎓 Edu Snap — Student Directory
          </h1>

          {/* Search */}
          <form onSubmit={searchStudents} className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
            <input
              type="text"
              placeholder="Search student — e.g., John, Mumbai"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
              className="border p-3 rounded-md w-full sm:w-64 bg-white dark:bg-gray-700 dark:text-white"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center my-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Student Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {students.map((s, i)=>(
              <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow">
                <img src={s.avatar} className="w-20 h-20 rounded-full mx-auto" />
                <h2 className="text-lg font-bold text-center mt-2 dark:text-white">{s.name}</h2>
                <p className="text-sm text-center dark:text-gray-300">{s.major}</p>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">{s.university}</p>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">{s.email}</p>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">{s.address.city}</p>
              </div>
            ))}
          </div>

          {!loading && students.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-6">
              Try searching: <b>John</b>, <b>Delhi</b>, <b>Mumbai</b>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
