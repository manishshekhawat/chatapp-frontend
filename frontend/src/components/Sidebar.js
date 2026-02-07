import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchUser from "./SearchUser";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const [rooms] = useState([{ _id: "room-1" }]);

  return (
    <div className="sidebar">
      <div>
        <div id="user-name">{user?.fullName}</div>
        <div id="user-username">@{user?.username}</div>
      </div>

      <SearchUser />

      {/* 🔥 REQUIRED FOR CYPRESS */}
      <div id="chat-rooms-list">
        {rooms.map((room) => (
          <button
            key={room._id}
            id={`room-${room._id}`}
          >
            Chat Room
          </button>
        ))}
      </div>

      <button id="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
