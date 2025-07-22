import { useState } from "react";
import { iptvSources } from "../config/iptv";

export default function Home() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  const correctPassword = process.env.NEXT_PUBLIC_PASSWORD || "123456";

  const handleSubmit = () => {
    if (password === correctPassword) {
      setUnlocked(true);
    } else {
      alert("密码错误");
    }
  };

  if (!unlocked) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>请输入访问密码</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", margin: "1rem" }}
        />
        <button onClick={handleSubmit}>进入</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Hans IPTV 平台</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {iptvSources.map((src) => (
          <li key={src.url}>
            <button
              style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}
              onClick={() => setSelectedUrl(src.url)}
            >
              {src.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h2>正在播放：{selectedUrl}</h2>
          <video src={selectedUrl} controls style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
