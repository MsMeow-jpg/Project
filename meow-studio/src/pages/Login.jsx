
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (authError) {
        throw authError;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError("Неверный email или пароль.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <Link to="/" className="login-logo">
        MEOW<span>STUDIO.</span>
      </Link>

      <div className="login-box">
        <p className="login-label">
          PRIVATE ACCESS / 001
        </p>

        <h1>
          NO ENTRY
          <span> WITHOUT ACCESS.</span>
        </h1>

        <p className="login-description">
          Панель управления творческим хаосом.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email">
            EMAIL
          </label>

          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            autoComplete="username"
            required
          />

          <label htmlFor="admin-password">
            PASSWORD
          </label>

          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "ПРОВЕРЯЕМ..." : "ENTER THE STUDIO ↗"}
          </button>
        </form>
      </div>

      <span className="login-footer">
        © 2026 MEOW STUDIO / RESTRICTED AREA
      </span>
    </main>
  );
}

export default Login;
