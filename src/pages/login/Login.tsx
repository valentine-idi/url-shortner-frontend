import { NavLink } from "react-router";
import { FiLink, FiLogIn, FiEye } from "react-icons/fi";
import Icon from "../../components/Icon";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-heading">
        <header className={styles.header}>
          <Icon label={FiLink} className={styles.logo} />
          <h1 id="login-heading">Welcome back</h1>
          <p>Log in to manage your shortened links.</p>
        </header>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordField}>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <button
                className={styles.passwordToggle}
                type="button"
                aria-label="Show password"
              >
                <Icon label={FiEye} className={styles.eyeIcon} />
              </button>
            </div>
          </div>

          <NavLink className={styles.forgotPassword} to="/forgot-password">
            Forgot password?
          </NavLink>

          <button className={styles.submitButton} type="submit">
            <Icon label={FiLogIn} className={styles.loginIcon} />
            <span>Log in</span>
          </button>
        </form>

        <footer className={styles.footer}>
          Don’t have an account? <NavLink to="/signup">Sign up</NavLink>
        </footer>
      </section>
    </main>
  );
}
