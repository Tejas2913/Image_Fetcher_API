import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "Machine Learning", "Deep Learning", "Neural Networks",
    "Data Science", "AI", "NLP", "Computer Vision"
  ];

  const searchML = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/Ananya2002-creator/ai-ml-course-dataset/main/ml_courses.json"
      );

      const term = keyword.toLowerCase();
      const filtered = res.data.filter(
        c =>
          c.title.toLowerCase().includes(term) ||
          c.category.toLowerCase().includes(term)
      );

      setCourses(filtered);
    } catch (err) {
      console.error(err);
      alert("API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
        <div className="max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">

          {/* Dark Toggle */}
          <div className="flex justify-end mb-3">
            <button onClick={()=>setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm dark:text-white">
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-blue-300">
            🤖 EduSnap — ML Course Finder
          </h1>

          <form onSubmit={searchML} className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-white"
              placeholder="Search ML topics… e.g., CNN, NLP, Regression"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
              required
            />
            <button className="bg-blue-600 text-white px-5 rounded">
              {loading ? "..." : "Search"}
            </button>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>{setKeyword(s); searchML();}}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm dark:text-white">
                {s}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-blue-500">Searching ML courses…</p>
          )}

          {/* Results */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((c, i)=>(
              <div key={i} className="bg-gray-100 dark:bg-gray-700 p-3 rounded shadow">
                <img src={c.thumbnail} className="w-full h-36 object-cover rounded mb-2" />
                <h2 className="font-bold text-sm dark:text-white">{c.title}</h2>
                <p className="text-xs text-gray-600 dark:text-gray-300">{c.provider}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{c.category}</p>
                <a href={c.link} target="_blank"
                  className="block text-center bg-blue-600 text-white py-1 rounded text-sm">
                  View Course
                </a>
              </div>
            ))}
          </div>

          {!loading && courses.length === 0 && (
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
              Try keywords like: CNN, Regression, Transformers, NLP
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
