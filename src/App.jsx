import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // List of allowed student-related keywords
  const allowedKeywords = [
    "student", "students", "school", "college", "university", "campus",
    "classroom", "lecture", "teacher", "professor", "faculty", "education",
    "books", "library", "notebook", "study", "exam", "timetable", "attendance",
    "assignment", "homework", "whiteboard", "playground", "graduation", "uniform"
  ];

  const searchImages = async (e) => {
    e.preventDefault();

    // Check if the entered keyword is allowed
    const isAllowed = allowedKeywords.some((word) => 
      keyword.toLowerCase().includes(word)
    );

    if (!isAllowed) {
      setError("Please enter only student-related terms (e.g., classroom, exam, library).");
      setImages([]);
      return;
    }

    setLoading(true);
    setError("");  // Clear any previous errors

    const ACCESS_KEY = "4ciPhaaUBnQsEMOICaFsRAuBFyj8Jp0YAL6L7IvgKPk";  

    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: keyword,
          per_page: 12,
        },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      });

      const imgs = res.data.results.map((img) => img.urls.small);
      setImages(imgs);
    } catch (err) {
      setError("Error fetching images");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Student Management System - Image Search
      </h1>

      {/* Search Form */}
      <form onSubmit={searchImages} className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          className="border p-3 rounded-md w-64"
          placeholder="Search for student-related images"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={img}
              alt="Student-related"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Empty State Message */}
      {!loading && images.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-6">Try searching for terms like classroom, exam, or library.</p>
      )}
    </div>
  );
}

export default App;
