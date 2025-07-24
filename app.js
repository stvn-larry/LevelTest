const { useState, useEffect } = React;

function App() {
  const [theme, setTheme] = useState("light");
  const [location, setLocation] = useState("");
  const [view, setView] = useState("home");
  const [properties, setProperties] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [showAuth, setShowAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [showPayment, setShowPayment] = useState(false);
  const [activeTab, setActiveTab] = useState("payment");

  const locations = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"];

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
    document.body.style.color = theme === "dark" ? "#ecf0f1" : "#2c3e50";
  }, [theme]);

  const handleSearch = () => {
    const valid = locations.some(loc =>
      loc.toLowerCase().includes(location.toLowerCase())
    );
    if (!location) return triggerModal("Input Required", "Please enter a location.");
    if (!valid) return triggerModal("Invalid Location", "Enter a valid Nigerian location.");
    setView("results");
    setTimeout(() => setProperties(generateMock()), 1000);
  };

  const generateMock = () => {
    const types = {
      apartment: "Modern Apartment",
      shop: "Commercial Space",
      property: "Luxury Property",
      studio: "Studio",
      hostel: "Student Hostel"
    };
    const keys = selectedType === "all" ? Object.keys(types) : [selectedType];
    return keys.flatMap(type =>
      Array.from({ length: 3 }, (_, i) => ({
        title: `${types[type]} ${i + 1}`,
        price: Math.floor(Math.random() * 40000000) + 10000000,
        location,
        bedrooms: Math.floor(Math.random() * 4) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        area: Math.floor(Math.random() * 200) + 50,
        icon: type.toUpperCase().slice(0, 3)
      }))
    );
  };

  const triggerModal = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <style>{`
        button { padding: 0.5rem; margin: 0.25rem; border: none; cursor: pointer; }
        input { padding: 0.5rem; margin-bottom: 0.5rem; width: 100%; }
        .floating { position: fixed; top: 50%; right: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .floating button { width: 40px; height: 40px; }
        .modal, .auth, .payment { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; }
        .modal-content { background: white; padding: 2rem; border-radius: 8px; text-align: center; max-width: 90%; }
        [data-theme="dark"] .modal-content { background: #2c3e50; color: white; }
      `}</style>

      {view === "home" && (
        <>
          <h1>Iman-Homes</h1>
          <p style={{ color: "#888" }}>Discover premium real estate across Nigeria</p>

          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter location"
          />
          <button onClick={handleSearch} style={{ width: "100%" }}>Search</button>

          <div style={{ marginTop: "1rem" }}>
            {["all", "apartment", "shop", "property", "studio", "hostel"].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  backgroundColor: selectedType === type ? "#3498db" : "#eee",
                  color: selectedType === type ? "white" : "black"
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </>
      )}

      {view === "results" && (
        <>
          <button onClick={() => setView("home")}>← Back</button>
          <h2>Results in {location}</h2>
          {properties.length === 0 ? (
            <p>Loading...</p>
          ) : (
            properties.map((p, i) => (
              <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0", borderRadius: "6px" }}>
                <div><strong>{p.title}</strong> – ₦{p.price.toLocaleString()}</div>
                <div>{p.location}</div>
                <small>{p.bedrooms} beds • {p.bathrooms} baths • {p.area} sqm</small>
              </div>
            ))
          )}
        </>
      )}

      {/* Floating Buttons */}
      <div className="floating">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
        <button onClick={() => triggerModal("About Nigeria", "Property info")}>NG</button>
        <button onClick={() => setShowPayment(true)}>₦</button>
        <button onClick={() => setShowAuth(true)}>?</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <h3>{modalContent.title}</h3>
            <p>{modalContent.message}</p>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="auth" onClick={() => setShowAuth(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Sign In</h3>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={() => triggerModal("Coming Soon", "Login feature is under development")}>Login</button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="payment" onClick={() => setShowPayment(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Financial Services</h3>
            <div>
              {["payment", "stocks", "installment"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ fontWeight: activeTab === tab ? "bold" : "normal" }}>
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              {activeTab === "payment" && <p>Bank transfer, Card, Crypto</p>}
              {activeTab === "stocks" && <p>REITs and investment returns</p>}
              {activeTab === "installment" && <p>Pay over 3–60 months</p>}
            </div>
          </div>
        </div>
      )}

      {/* Theme Toggle */}
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <button onClick={() => setTheme("light")} style={{ marginRight: 5, background: theme === "light" ? "#3498db" : "#ccc" }}>☀</button>
        <button onClick={() => setTheme("dark")} style={{ background: theme === "dark" ? "#3498db" : "#ccc" }}>☾</button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
