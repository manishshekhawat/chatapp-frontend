import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.fullName || !form.email || !form.username || !form.password) {
      return;
    }

    try {
      await api.post("/api/users/register", form);
      navigate("/login");
    } catch (err) {
      setError("Email is already registered");
    }
  };

  return (
    <div id="register-page" className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          id="fullname-input"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <input
          id="email-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          id="username-input"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          id="password-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && (
          <div id="register-error">{error}</div>
        )}

        <button id="register-button" onClick={submit}>
          Register
        </button>
      </div>
    </div>
  );
}
