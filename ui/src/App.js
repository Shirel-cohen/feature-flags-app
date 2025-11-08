import { useState } from "react";
import axios from "axios";

function App() {
  const [feature, setFeture] = useState("");
  const [userId, setUserId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [result, setResult] = useState("");

  const API = "/api/flags";

  const toggleFeature = async () => {
    await axios.post(API, { feature, userId, enabled });
    alert("Saved!");
  };

  const checkFeature = async () => {
    const res = await axios.get(API, { params: { feature, userId } });
    setResult(`Enabled: ${res.data.enabled}, Reason: ${res.data.reason}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: 30,
          backgroundColor: "white",
          borderRadius: 10,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          width: "350px"
        }}
      >
        <h1 style={{ marginBottom: 20 }}>Feature Flags</h1>

        <input
          placeholder="Feature"
          value={feature}
          onChange={(e) => setFeture(e.target.value)}
          style={{
            width: "90%",
            padding: 12,
            marginBottom: 10,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #aaa",
          }}
        />

        <input
          placeholder="User ID (optional)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: "90%",
            padding: 12,
            marginBottom: 10,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #aaa",
          }}
        />

        <label style={{ fontSize: 16 }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            style={{ marginRight: 5 }}
          />
          Enabled
        </label>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={toggleFeature}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              borderRadius: 5,
              backgroundColor: "#5c9ded",
              color: "white",
              border: "none",
              marginRight: 10,
              cursor: "pointer",
            }}
          >
            Save
          </button>

          <button
            onClick={checkFeature}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              borderRadius: 5,
              backgroundColor: "#7aba78",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Check
          </button>
        </div>

        <p style={{ marginTop: 20, fontSize: 16 }}>{result}</p>
      </div>
    </div>
  );
}

export default App;
