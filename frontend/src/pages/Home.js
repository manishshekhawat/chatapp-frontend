import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
  return (
    <div id="chat-layout" className="app-container">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
