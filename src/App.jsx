import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const suggestions = [
    "AI", "Python", "Machine Learning", "Web Development", 
    "Data Science", "Cloud Computing", "Algorithms", 
    "Java", "React", "Database"
  ];

  const searchBooks = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${keyword}`
      );

      const results = res.data.docs.slice(0, 12); // first 12 books
      setBooks(results);
    } catch (err) {
      console.log(err);
      alert("Error fetching books");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">

          {/* Dark mode toggle */}
          <div className="flex justify-end mb-4">
            <button 
              onClick={()=>setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white shadow"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            📚 Edu Snap — Book Finder
          </h1>

          {/* Search */}
          <form onSubmit={searchBooks} className="flex flex-col sm:flex-row gap-3 mb-4 justify-center">
            <input 
              type="text"
              placeholder="Search books — e.g., Python, AI"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
              className="border p-3 rounded-md w-full sm:w-64 bg-white dark:bg-gray-700 dark:text-white"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Suggested tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {suggestions.map((tag,i)=>(
              <button 
                key={i}
                onClick={()=>{
                  setKeyword(tag);
                  searchBooks({preventDefault:()=>{}});
                }}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-blue-600 hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center my-6">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Book results */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book,i)=>(
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <img 
                  src={
                    book.cover_i 
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150?text=No+Cover"
                  }
                  className="w-full h-40 object-cover rounded mb-2"
                  alt=""
                />
                <h2 className="font-bold text-lg dark:text-white truncate">{book.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {book.author_name?.[0] || "Unknown author"}
                </p>
              </div>
            ))}
          </div>

          {!loading && books.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
              Try: Python, AI, Machine Learning, Web Development...
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
