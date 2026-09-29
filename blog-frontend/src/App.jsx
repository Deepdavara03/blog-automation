import { useEffect, useState } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch blogs from Node.js API
  useEffect(() => {
    fetch("http://192.168.1.9:4000/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center">Loading blogs...</h2>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>📚 Blog List</h1>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            margin: "16px 0",
            borderRadius: "12px",
            background: "#fff",
          }}
        >
          {/* Blog Main Info */}
          <h2>{blog.title}</h2>
          <p>
            <strong>Category:</strong> {blog.category}
          </p>

          {/* Blog Description */}
          {blog.description && <p>{blog.description}</p>}

          {/* Blog Image */}
          {blog.imageurl && (
            <img
              src={blog.imageurl}
              alt={blog.title}
              width="100%"
              style={{ borderRadius: "8px", marginTop: "8px" }}
            />
          )}

          {/* --- AUTHOR CARD --- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f4f8ff",
              borderRadius: "12px",
              padding: "16px",
              marginTop: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            {/* Author Image */}
            {blog.authorImage && (
              <img
                src={blog.authorImage}
                alt={blog.authorname}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "16px",
                  border: "2px solid #ddd",
                }}
              />
            )}
            

            {/* Author Info */}
<div>
  <h3 style={{ margin: "0", fontSize: "18px" }}>{blog.authorname}</h3>
  {blog.authortitle && (
    <p style={{ margin: "4px 0", fontWeight: "500", color: "#444" }}>
      {blog.authortitle}
    </p>
  )}
  {blog.authorBio && (
    <p style={{ margin: "4px 0", color: "#666", fontSize: "14px" }}>
      {blog.authorBio}
    </p>
  )}
</div>

          </div>

          {/* Blog Sections */}
          <h3 style={{ marginTop: "20px" }}>Sections:</h3>
          {blog.sections && blog.sections.length > 0 ? (
            blog.sections.map((section, index) => (
              <div
                key={section.id || index}
                style={{
                  marginBottom: "16px",
                  padding: "12px",
                  background: "#f9f9f9",
                  borderRadius: "6px",
                }}
              >
                <h4>{section.title}</h4>
                {section.content && section.content.length > 0 ? (
                  section.content.map((para, i) => (
                    <div
                      key={i}
                      style={{ margin: "6px 0" }}
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))
                ) : (
                  <p>No content available.</p>
                )}
              </div>
            ))
          ) : (
            <p>No sections available.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
