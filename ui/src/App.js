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
          padding: 50,
          backgroundColor: "white",
          borderRadius: 15,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          width: "450px",
          maxWidth: "90%",
        }}
      >
        <h1 style={{ marginBottom: 30, fontSize:28 }}>Feature Flags</h1>

        <input
          placeholder="Feature"
          value={feature}
          onChange={(e) => setFeture(e.target.value)}
          style={{
            width: "95%",
            padding: 15,
            marginBottom: 15,
            fontSize: 18,
            borderRadius: 7,
            border: "1px solid #aaa",
          }}
        />

        <input
          placeholder="User ID (optional)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: "95%",
            padding: 15,
            marginBottom: 15,
            fontSize: 18,
            borderRadius: 7,
            border: "1px solid #aaa",
          }}
        />

        <label style={{ fontSize: 18 }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Enabled
        </label>

        <div style={{ marginTop: 25 }}>
          <button
            onClick={toggleFeature}
            style={{
              padding: "12px 25px",
              fontSize: 18,
              borderRadius: 7,
              backgroundColor: "#5c9ded",
              color: "white",
              border: "none",
              marginRight: 12,
              cursor: "pointer",
            }}
          >
            Save
          </button>

          <button
            onClick={checkFeature}
            style={{
              padding: "12px 25px",
              fontSize: 18,
              borderRadius: 7,
              backgroundColor: "#7aba78",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Check
          </button>
        </div>

        <p style={{ marginTop: 25, fontSize: 18 }}>{result}</p>
      </div>
    </div>
  );
}

export default App;
