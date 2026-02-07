import { useState } from "react";
import api from "../api/axios";

export default function SearchUser() {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const search = async (value) => {
    if (!value) return;
    const res = await api.get(`/api/users/search?searchTerm=${value}`);
    setResults(res.data.data);
  };

  return (
    <>
      <button
        id="new-chat-button"
        onClick={() => setOpen(true)}
      >
        New Chat
      </button>

      {open && (
        <div className="search-modal">
          <button
            id="close-search"
            onClick={() => setOpen(false)}
          >
            Close
          </button>

          <input
            id="search-input"
            placeholder="Search users"
            onChange={(e) => search(e.target.value)}
          />

          {results.map((u) => (
            <div
              key={u._id}
              id={`user-result-${u._id}`}
              className="user-item"
            >
              {u.username}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
