import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Heart,
  LockKeyhole,
  Mail,
  UsersRound,
} from "lucide-react";

type LoginProps = {
  onLogin?: (credentials: {
    identifier: string;
    password: string;
    remember: boolean;
  }) => void | Promise<void>;
};

function Login({ onLogin }: LoginProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const email = identifier.trim().toLowerCase();

    /* =========================================================
       BASIC VALIDATION
       ========================================================= */

    if (!email) {
      setError("Please enter your email or mobile number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      /* =========================================================
         STUDENT DEMO LOGIN
  
         student@gmail.com + ANY PASSWORD
         → Student Dashboard
         ========================================================= */

      if (email === "student@gmail.com") {
        await new Promise((resolve) => setTimeout(resolve, 900));

        if (remember) {
          localStorage.setItem(
            "snehasha_remember_identifier",
            email,
          );
        } else {
          localStorage.removeItem(
            "snehasha_remember_identifier",
          );
        }

        /*
          Save the logged-in role.
          Later Django / Keycloak will provide this.
        */
        localStorage.setItem(
          "snehasha_user_role",
          "student",
        );

        localStorage.setItem(
          "snehasha_authenticated",
          "true",
        );

        /*
          Redirect to Student Dashboard
        */
        window.location.href = "/dashboard";

        return;
      }

      /* =========================================================
         OTHER ACCOUNTS
         ========================================================= */

      setError(
        "Invalid account. For the Student demo, use student@gmail.com.",
      );
    } catch {
      setError(
        "Unable to sign in right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="snehasha-login">
      <section className="login-visual">
        {/* Your supplied reference image is used as the visual artwork.
        Put image(1).png inside:
        public/snehasha-login-reference.png
    */}
        <img
          className="visual-reference"
          src="/snehasha-login-reference.png"
          alt=""
          aria-hidden="true"
        />

        <div className="visual-fade" />

        {/* LEFT SIDE DECORATIVE IMAGE */}
        <img
          className="left-side-image"
          src="/images/L5.png"
          alt=""
          aria-hidden="true"
        />

        {/* TOP LEFT LOGO */}
        <img
          className="left-side-logo"
          src="/images/Logo.webp"
          alt="SnehAsha"
          aria-hidden="true"
        />

        {/* BOTTOM LEFT IMPACT FEATURES */}
        <div className="impact-features">

          {/* Education */}
          <div className="impact-feature">
            <div className="impact-icon">
              <UsersRound size={28} strokeWidth={2.2} />
            </div>

            <div className="impact-text">
              <strong>Education</strong>
              <span>Brighter futures</span>
            </div>
          </div>

          {/* Divider */}
          <div className="impact-divider" />

          {/* Opportunities */}
          <div className="impact-feature">
            <div className="impact-icon">
              <GraduationCap size={28} strokeWidth={2.2} />
            </div>

            <div className="impact-text">
              <strong>Opportunities</strong>
              <span>Stronger communities</span>
            </div>
          </div>

          {/* Divider */}
          <div className="impact-divider" />

          {/* Empowerment */}
          <div className="impact-feature">
            <div className="impact-icon">
              <Heart size={28} strokeWidth={2.2} />
            </div>

            <div className="impact-text">
              <strong>Empowerment</strong>
              <span>Lasting impact</span>
            </div>
          </div>

        </div>
      </section>

      <section className="login-area">

        {/* TOP RIGHT DECORATIVE IMAGE */}
        <img
          className="top-right-image"
          src="images/L1.png"
          alt=""
          aria-hidden="true"
        />

        {/* BOTTOM RIGHT DECORATIVE IMAGE */}
        <img
          className="bottom-right-image"
          src="images/L3.png"
          alt=""
          aria-hidden="true"
        />

        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <img
              className="login-logo-image"
              src="/images/Logo.webp"
              alt="SnehAsha"
            />
          </div>

          {/* Heading */}
          <div className="login-heading">
            <h1>Welcome Back</h1>
            <p>Sign in to your SnehAsha account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email / Mobile */}
            <div className="field">
              <label htmlFor="identifier">Email or Mobile Number</label>

              <div className="input-wrapper">
                <Mail size={20} strokeWidth={1.8} />

                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="Enter your email or mobile number"
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="field password-field">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <LockKeyhole size={20} strokeWidth={1.8} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.8} />
                  ) : (
                    <Eye size={20} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="login-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  disabled={loading}
                />

                <span className="custom-checkbox">
                  {remember && <span />}
                </span>

                <span>Keep me signed in</span>
              </label>

              <button
                type="button"
                className="forgot-button"
                onClick={() => {
                  setError("");
                  alert("Password recovery will be available soon.");
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            {/* Sign In */}
            <button
              className={`signin-button ${loading ? "loading" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={19} strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span />
            <strong>OR</strong>
            <span />
          </div>

          {/* SSO */}
          <button
            type="button"
            className="sso-button"
            onClick={() => {
              alert("SnehAsha SSO will be connected with Keycloak.");
            }}
          >
            <UsersRound size={20} strokeWidth={1.8} />
            <span>Sign in with SnehAsha SSO</span>
          </button>

          {/* Help */}
          <div className="login-help">
            <p>
              Need help? Contact your administrator or write to us at
            </p>

            <a href="mailto:support@snehasha.org">
              support@snehasha.org
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* =========================================================
           SNEHASHA LOGIN
           ========================================================= */

        * {
          box-sizing: border-box;
        }

.snehasha-login {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 53% 47%;

  /* SAME BACKGROUND ON BOTH SIDES */
  background: #f8f1e4;

  overflow: hidden;

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: #172033;
}

        /* =========================================================
           LEFT VISUAL
           ========================================================= */

        .login-visual {
          position: relative;
          min-width: 0;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: #f8f1e4;
        }

        /*
          The supplied PNG is 1672 × 940.

          By keeping its height at 100%, the left side of the
          reference image is preserved almost exactly.
        */
        .visual-reference {
          position: absolute;
          top: 0;
          left: 0;

          width: auto;
          height: 100%;

          max-width: none;
          min-width: auto;

          display: block;

          user-select: none;
          pointer-events: none;
        }

        .visual-fade {
          position: absolute;
          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 0%,
              rgba(255, 255, 255, 0) 70%
            );

          z-index: 2;
        }

/* =========================================================
   LEFT SIDE DECORATIVE IMAGE
   ========================================================= */

.left-side-image {
  position: absolute;

  left: 0;
  top: 0;

  width: 125%;
  height: 100%;

  object-fit: contain;
  object-position: left top;

  transform: none;

  -webkit-mask-image:
    linear-gradient(
      to top,
      #000 0%,
      #000 48%,
      transparent 50%
    ),
    linear-gradient(
      to right,
      #000 0%,
      #000 88%,
      rgba(0, 0, 0, 0.92) 92%,
      rgba(0, 0, 0, 0.65) 96%,
      transparent 100%
    );

  mask-image:
    linear-gradient(
      to top,
      #000 0%,
      #000 48%,
      transparent 50%
    ),
    linear-gradient(
      to right,
      #000 0%,
      #000 88%,
      rgba(0, 0, 0, 0.92) 92%,
      rgba(0, 0, 0, 0.65) 96%,
      transparent 100%
    );

  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  z-index: 3;

  pointer-events: none;
  user-select: none;
}

/* =========================================================
   TOP LEFT LOGO
   ========================================================= */

.left-side-logo {
  position: absolute;

  top: 50px;
  left: 150px;

  width: 180px;
  height: auto;

  object-fit: contain;
  object-position: left top;

  z-index: 4;

  pointer-events: none;
  user-select: none;

  display: block;
}

/* =========================================================
   BOTTOM LEFT IMPACT FEATURES
   ========================================================= */

.impact-features {
  position: absolute;

  left: 150px;
  bottom: 60px;

  display: flex;
  align-items: center;

  /* DON'T stretch each item equally */
  width: auto;

  z-index: 4;

  pointer-events: none;
  user-select: none;
}

.impact-feature {
  display: flex;
  align-items: center;

  gap: 8px;

  /* IMPORTANT: remove equal distribution */
  flex: 0 0 auto;
}

.impact-icon {
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(255, 239, 207, 0.94);

  color: #e5a329;

  box-shadow:
    0 6px 16px rgba(218, 158, 43, 0.10);

  backdrop-filter: blur(4px);
}

.impact-text {
  display: flex;
  flex-direction: column;

  gap: 3px;

  min-width: 0;
}

.impact-text strong {
  color: #172033;

  font-size: 17px;
  font-weight: 700;

  line-height: 1.15;

  white-space: nowrap;
}

.impact-text span {
  color: #667085;

  font-size: 13px;
  font-weight: 400;

  line-height: 1.2;

  white-space: nowrap;
}

.impact-divider {
  width: 1px;
  height: 52px;

  flex-shrink: 0;

  /* MUCH smaller space around divider */
  margin: 0 20px;

  background: rgba(110, 100, 82, 0.18);
}

        /* =========================================================
           RIGHT LOGIN AREA
           ========================================================= */

.login-area {
  position: relative;

  min-width: 0;
  min-height: 100vh;
  min-height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 48px 6.2vw 48px 0;

  background: #f8f1e4;
}

/* =========================================================
   TOP RIGHT DECORATIVE IMAGE
   ========================================================= */

.top-right-image {
  position: absolute;

  top: 0;
  right: 0;

  width: 300px;
  height: 300px;

  object-fit: contain;
  object-position: top right;

  z-index: 1;

  pointer-events: none;
  user-select: none;

  opacity: 0.95;
}

/* =========================================================
   BOTTOM RIGHT DECORATIVE IMAGE
   ========================================================= */

.bottom-right-image {
  position: absolute;

  right: 0;
  bottom: 180px;

width: 240px;
height: 240px;

  object-fit: contain;
  object-position: bottom right;

  z-index: 1;

  pointer-events: none;
  user-select: none;

  opacity: 0.95;
}

        .login-card {
          position: relative;

          width: min(100%, 650px);

          padding: 31px 54px 34px;

          border-radius: 15px;

          background: rgba(255, 255, 255, 0.98);

          box-shadow:
            0 24px 65px rgba(36, 44, 60, 0.08),
            0 5px 20px rgba(36, 44, 60, 0.035);

          border: 1px solid rgba(232, 232, 232, 0.8);

          z-index: 5;
        }

/* =========================================================
   LOGIN CARD LOGO
   ========================================================= */

.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 26px;

  user-select: none;
}

.login-logo-image {
  display: block;

  width: 180px;
  height: auto;

  object-fit: contain;
}

        /* =========================================================
           HEADING
           ========================================================= */

        .login-heading {
          text-align: center;

          margin-bottom: 36px;
        }

        .login-heading h1 {
          margin: 0;

          color: #101a32;

          font-size: clamp(27px, 2vw, 34px);
          font-weight: 700;

          letter-spacing: -0.8px;
          line-height: 1.15;
        }

        .login-heading p {
          margin: 9px 0 0;

          color: #667085;

          font-size: 16px;
          line-height: 1.5;
        }

        /* =========================================================
           FORM
           ========================================================= */

        .field {
          margin-bottom: 25px;
        }

        .field label {
          display: block;

          margin-bottom: 10px;

          color: #111827;

          font-size: 15px;
          font-weight: 600;
        }

        .input-wrapper {
          position: relative;

          height: 54px;

          display: flex;
          align-items: center;

          gap: 13px;

          padding: 0 16px;

          border: 1px solid #d7dce3;
          border-radius: 6px;

          background: #ffffff;

          color: #344054;

          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .input-wrapper:focus-within {
          border-color: #e8a52c;

          box-shadow:
            0 0 0 3px rgba(234, 166, 46, 0.13);
        }

        .input-wrapper input {
          width: 100%;
          min-width: 0;

          height: 100%;

          border: 0;
          outline: 0;

          padding: 0;

          color: #172033;

          background: transparent;

          font-size: 15px;
        }

        .input-wrapper input::placeholder {
          color: #98a0ac;
        }

        .input-wrapper input:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .password-field {
          margin-bottom: 18px;
        }

        .password-toggle {
          width: 28px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          padding: 0;

          border: 0;
          background: transparent;

          color: #667085;

          cursor: pointer;

          transition:
            color 160ms ease,
            transform 160ms ease;
        }

        .password-toggle:hover {
          color: #d9921d;
        }

        .password-toggle:active {
          transform: scale(0.92);
        }

        /* =========================================================
           OPTIONS
           ========================================================= */

        .login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          margin-bottom: 27px;
        }

        .remember {
          position: relative;

          display: flex;
          align-items: center;

          gap: 10px;

          color: #475467;

          font-size: 14px;

          cursor: pointer;

          user-select: none;
        }

        .remember input {
          position: absolute;

          width: 1px;
          height: 1px;

          opacity: 0;
          pointer-events: none;
        }

        .custom-checkbox {
          width: 21px;
          height: 21px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: 1.5px solid #aeb6c1;
          border-radius: 4px;

          background: #ffffff;

          transition:
            background 160ms ease,
            border-color 160ms ease;
        }

        .remember:hover .custom-checkbox {
          border-color: #e8a52c;
        }

        .remember input:checked + .custom-checkbox {
          border-color: #e9a52e;
          background: #e9a52e;
        }

        .custom-checkbox span {
          width: 9px;
          height: 5px;

          border-left: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;

          transform: rotate(-45deg) translate(1px, -1px);
        }

        .forgot-button {
          padding: 0;

          border: 0;

          background: transparent;

          color: #d58d16;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition:
            color 160ms ease,
            transform 160ms ease;
        }

        .forgot-button:hover {
          color: #b8750e;
          transform: translateX(-1px);
        }

        /* =========================================================
           ERROR
           ========================================================= */

        .error-message {
          margin: -6px 0 17px;

          padding: 10px 12px;

          border: 1px solid #f2c7c7;
          border-radius: 6px;

          background: #fff6f6;

          color: #b42318;

          font-size: 13px;
          line-height: 1.4;
        }

        /* =========================================================
           SIGN IN BUTTON
           ========================================================= */

        .signin-button {
          width: 100%;
          height: 54px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 12px;

          border: 0;
          border-radius: 28px;

          background:
            linear-gradient(
              90deg,
              #f6b83f 0%,
              #f0ad32 100%
            );

          color: #111111;

          font-size: 16px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 8px 18px rgba(236, 169, 45, 0.16);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease;
        }

        .signin-button:hover:not(:disabled) {
          transform: translateY(-1px);

          box-shadow:
            0 12px 25px rgba(236, 169, 45, 0.25);

          filter: brightness(1.02);
        }

        .signin-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .signin-button:disabled {
          cursor: not-allowed;
          opacity: 0.72;
        }

        .signin-button.loading {
          gap: 10px;
        }

        .spinner {
          width: 17px;
          height: 17px;

          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: #111111;

          border-radius: 50%;

          animation: spin 700ms linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* =========================================================
           DIVIDER
           ========================================================= */

        .divider {
          display: flex;
          align-items: center;

          gap: 14px;

          margin: 27px 0 25px;
        }

        .divider span {
          flex: 1;

          height: 1px;

          background: #e3e6ea;
        }

        .divider strong {
          color: #7a8493;

          font-size: 13px;
          font-weight: 500;
        }

        /* =========================================================
           SSO BUTTON
           ========================================================= */

        .sso-button {
          width: 100%;
          height: 51px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 13px;

          border: 1px solid #efb84e;
          border-radius: 6px;

          background: #ffffff;

          color: #1d1d1d;

          font-size: 15px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        .sso-button svg {
          color: #d9951e;
        }

        .sso-button:hover {
          background: #fffaf0;

          border-color: #e4a52e;

          box-shadow:
            0 5px 15px rgba(234, 166, 46, 0.12);

          transform: translateY(-1px);
        }

        .sso-button:active {
          transform: translateY(0);
        }

        /* =========================================================
           HELP
           ========================================================= */

        .login-help {
          margin-top: 27px;

          text-align: center;
        }

        .login-help p {
          margin: 0;

          color: #667085;

          font-size: 13px;
          line-height: 1.6;
        }

        .login-help a {
          display: inline-block;

          margin-top: 3px;

          color: #dc941c;

          font-size: 14px;
          font-weight: 500;

          transition: color 160ms ease;
        }

        .login-help a:hover {
          color: #b9760c;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* =========================================================
           TABLET
           ========================================================= */

        @media (max-width: 1100px) {
          .snehasha-login {
            grid-template-columns: 48% 52%;
          }

          .login-area {
            padding: 35px 28px;
          }

          .login-card {
            padding: 30px 36px 32px;
          }
        }

        /* =========================================================
           MOBILE
           ========================================================= */

        @media (max-width: 800px) {
.snehasha-login {
  display: block;

  min-height: 100dvh;

  /* SAME SNEHASHA CREAM BACKGROUND */
  background: #f8f1e4;
}

          .login-visual {
            display: none;
          }

          .login-area {
            width: 100%;
            min-height: 100dvh;

            padding: 24px 16px;

            align-items: center;
          }

          .login-card {
            width: min(100%, 520px);

            padding: 30px 24px 28px;

            border-radius: 14px;

            box-shadow:
              0 18px 50px rgba(36, 44, 60, 0.09);
          }

          .login-logo {
            margin-bottom: 23px;
          }

          .login-heading {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 430px) {
          .login-area {
            padding: 14px;
          }

          .login-card {
            padding: 27px 18px 24px;
          }

          .logo-name {
            font-size: 35px;
          }

          .login-heading h1 {
            font-size: 27px;
          }

          .login-heading p {
            font-size: 14px;
          }

          .login-options {
            align-items: flex-start;
          }

          .remember {
            font-size: 13px;
          }

          .forgot-button {
            font-size: 13px;
          }
        }

        /* =========================================================
           REDUCED MOTION
           =========================================    ================ */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

export default Login;