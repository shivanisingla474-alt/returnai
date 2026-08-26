import axios from "axios";
import { useState } from "react";

export default function App() {
  const [issue, setIssue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!issue) return;

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze-return", {
        issue: issue,
      });

      setResponse(res.data.result);
    } catch (err) {
      setResponse("Error connecting to server");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🧠 AI Return Assistant
        </h1>

        <textarea
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
          placeholder="Describe your issue (e.g., received damaged product)"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80"
        >
          {loading ? "Analyzing..." : "Analyze Return"}
        </button>

        {response && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h2 className="font-semibold mb-2">Result:</h2>
            <pre className="whitespace-pre-wrap text-sm">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
