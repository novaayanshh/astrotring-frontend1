import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/account");
    }, 1200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, confirm } = regData;
    if (!name || !email || !password || !confirm) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/account");
    }, 1400);
  };

  const switchMode = (m) => {
    setMode(m);
    setError("");
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      {/* Animated stars */}
      <div className={styles.stars} aria-hidden="true">
        {[...Array(55)].map((_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${(i * 17.3 + 5) % 100}%`,
              top: `${(i * 13.7 + 8) % 100}%`,
              animationDelay: `${((i * 0.37) % 4).toFixed(2)}s`,
              width: i % 5 === 0 ? "3px" : "2px",
              height: i % 5 === 0 ? "3px" : "2px",
            }}
          />
        ))}
      </div>

      <div className={styles.card}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🔮</span>
          <span className={styles.logoText}>Astrotring</span>
        </Link>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === "login" ? styles.activeTab : ""}`}
            onClick={() => switchMode("login")}
          >
            Sign In
          </button>
          <button
            className={`${styles.tab} ${mode === "register" ? styles.activeTab : ""}`}
            onClick={() => switchMode("register")}
          >
            Create Account
          </button>
        </div>

        {/* ─── LOGIN ─── */}
        {mode === "login" && (
          <form className={styles.form} onSubmit={handleLogin}>
            <p className={styles.subtitle}>
              Welcome back — the stars are aligned for you ✨
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <label className={styles.label}>
              Email Address
              <input
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </label>

            <label className={styles.label}>
              Password
              <div className={styles.passWrap}>
                <input
                  type={showPass ? "text" : "password"}
                  className={styles.input}
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </label>

            <div className={styles.forgotRow}>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : "Sign In to Your Cosmos"}
            </button>

            <p className={styles.switchText}>
              New here?{" "}
              <button
                type="button"
                className={styles.switchLink}
                onClick={() => switchMode("register")}
              >
                Create your account
              </button>
            </p>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <div className={styles.socialRow}>
              <button type="button" className={styles.socialBtn}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.5 2.2 30 0 24 0 14.6 0 6.6 5.4 2.6 13.4l8 6.2C12.4 13.2 17.8 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.9 7.2l7.7 6c4.5-4.2 7-10.4 7-17.2z"/>
                  <path fill="#FBBC05" d="M10.6 28.4A14.4 14.4 0 0 1 9.5 24c0-1.5.3-3 .7-4.4l-8-6.2A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8-6.3z"/>
                  <path fill="#34A853" d="M24 48c6 0 11-2 14.7-5.4l-7.7-6c-2 1.4-4.6 2.2-7 2.2-6.2 0-11.5-4.1-13.4-9.8l-8 6.2C6.6 42.6 14.6 48 24 48z"/>
                </svg>
                Google
              </button>
              <button type="button" className={styles.socialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z"/>
                </svg>
                Facebook
              </button>
            </div>
          </form>
        )}

        {/* ─── REGISTER ─── */}
        {mode === "register" && (
          <form className={styles.form} onSubmit={handleRegister}>
            <p className={styles.subtitle}>
              Begin your cosmic journey — it's free 🌙
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <label className={styles.label}>
              Full Name <span className={styles.req}>*</span>
              <input
                type="text"
                className={styles.input}
                placeholder="Ayansh Pandey"
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
              />
            </label>

            <label className={styles.label}>
              Email Address <span className={styles.req}>*</span>
              <input
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
              />
            </label>

            <div className={styles.row2}>
              <label className={styles.label}>
                Password <span className={styles.req}>*</span>
                <div className={styles.passWrap}>
                  <input
                    type={showPass ? "text" : "password"}
                    className={styles.input}
                    placeholder="Min 6 characters"
                    value={regData.password}
                    onChange={(e) =>
                      setRegData({ ...regData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPass(!showPass)}
                    aria-label="Toggle password"
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </label>

              <label className={styles.label}>
                Confirm Password <span className={styles.req}>*</span>
                <input
                  type={showPass ? "text" : "password"}
                  className={styles.input}
                  placeholder="Re-enter password"
                  value={regData.confirm}
                  onChange={(e) =>
                    setRegData({ ...regData, confirm: e.target.value })
                  }
                />
              </label>
            </div>

            <div className={styles.sectionLabel}>
              ✦ Birth Details
              <span className={styles.optional}> (for your free Kundali)</span>
            </div>

            <div className={styles.row2}>
              <label className={styles.label}>
                Date of Birth
                <input
                  type="date"
                  className={styles.input}
                  value={regData.dob}
                  onChange={(e) => setRegData({ ...regData, dob: e.target.value })}
                />
              </label>
              <label className={styles.label}>
                Birth Time
                <input
                  type="time"
                  className={styles.input}
                  value={regData.birthTime}
                  onChange={(e) =>
                    setRegData({ ...regData, birthTime: e.target.value })
                  }
                />
              </label>
            </div>

            <label className={styles.label}>
              Birth Place
              <input
                type="text"
                className={styles.input}
                placeholder="City, State, Country"
                value={regData.birthPlace}
                onChange={(e) =>
                  setRegData({ ...regData, birthPlace: e.target.value })
                }
              />
            </label>

            <p className={styles.terms}>
              By creating an account you agree to our{" "}
              <a href="#" className={styles.forgotLink}>Terms of Service</a> &amp;{" "}
              <a href="#" className={styles.forgotLink}>Privacy Policy</a>.
            </p>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                "Create My Cosmic Account"
              )}
            </button>

            <p className={styles.switchText}>
              Already have an account?{" "}
              <button
                type="button"
                className={styles.switchLink}
                onClick={() => switchMode("login")}
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}