import { useRef, useState, useContext } from "react";
import { isAxiosError } from "../../services/apiClient";
import { NavLink } from "react-router";
import AuthContext from "../../contexts/AuthContext";
import {
  type UserPostData,
  type UserLoginResponse,
  userLoginService,
} from "../../services/services";
import { FiLink, FiLogIn, FiEye } from "react-icons/fi";
import Icon from "../../components/Icon";
import styles from "./Login.module.scss";

export default function Login() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiError: "",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const defaultErrors = { email: "", password: "", apiError: "" };

  const auth = useContext(AuthContext);

  const callBackend = async (userData: UserPostData) => {
    console.log("userData", userData);
    try {
      const { data } = await userLoginService.post<
        UserPostData,
        UserLoginResponse
      >(userData);
      auth?.setCurrentUser(data);

      sessionStorage.setItem("currentUser", JSON.stringify(data));
    } catch (error) {
      if (isAxiosError(error))
        setErrors({ ...defaultErrors, apiError: error.response?.data.message });
    }
  };

  const validateInput = (email: string, password: string) => {
    const newErrors = { ...defaultErrors };

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    const hasValue = Object.values(newErrors).some((value) => value !== "");

    return hasValue ? newErrors : null;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const inputErrors = validateInput(email, password);

    if (inputErrors) return setErrors(inputErrors);

    await callBackend({ email, password });
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-heading">
        <header className={styles.header}>
          <Icon label={FiLink} className={styles.logo} />
          <h1 id="login-heading">Welcome back</h1>
          <p>Log in to manage your shortened links.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="you@example.com"
              autoComplete="email"
              ref={emailRef}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
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
                ref={passwordRef}
              />

              <button
                className={styles.passwordToggle}
                type="button"
                aria-label="Show password"
              >
                <Icon label={FiEye} className={styles.eyeIcon} />
              </button>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <NavLink className={styles.forgotPassword} to="/forgot-password">
            Forgot password?
          </NavLink>

          {errors.apiError && <p className={styles.error}>{errors.apiError}</p>}

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
