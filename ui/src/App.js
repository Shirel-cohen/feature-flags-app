import { useState } from "react";
import axios from "axios";


function App() {
  const [feature, setFeture] = useState("");
  const [userId, setUserId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [result, setResult] = useState("");

  const API="http://localhost:3000/api/flags";

  const toggleFeature = async () =>{
    await axios.post(API, { feature, userId, enabled});
    alert("Saved!");
  };

  const checkFeature = async () => {
    const res = await axios.get(API, { params: { feature, userId}});
    setResult(`Enabled: ${res.data.enabled}, Reason: ${res.data.reason}`);
  };

  return(
    <div style={{ padding: 20}}>
      <h1>Feature Flags</h1>
      <input placeholder="Feature" value={feature} onChange={(e) => setFeture(e.target.value)} /> <br />
      <input placeholder="User ID (optional)" value={userId} onChange={(e) => setUserId(e.target.value)} /> <br />
      <label>
        <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        Enabled
      </label>
      <br />
      <button onClick={toggleFeature}>Save</button>
      <button onClick={checkFeature}>Check</button>
      <p>{result}</p>
    </div>
  )
  
}

export default App;
