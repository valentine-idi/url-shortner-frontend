import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FiLink, FiUserPlus } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "../../services/apiClient";
import {
  type UserRegisterResponse,
  type RegisterPostData,
  userRegisterService,
} from "../../services/services";
import Icon from "../../components/Icon";
import styles from "./Signup.module.scss";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeToRedirect, setTimeToRedirect] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;

    if (timeToRedirect <= 0) {
      navigate("/login", { replace: true });
      return;
    }

    const timeOut = setTimeout(
      () => setTimeToRedirect((prev) => prev - 1),
      1000,
    );

    return () => clearTimeout(timeOut);
  }, [isSuccess, timeToRedirect, navigate]);

  const schema = yup.object({
    name: yup.string().min(2).max(255).trim().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(255).trim().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      await userRegisterService.post<RegisterPostData, UserRegisterResponse>(
        data,
      );

      reset();
      setIsSuccess(true);
    } catch (error) {
      if (isAxiosError(error)) setError(error.response?.data.message);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="signup-heading">
        {isSuccess ? (
          <>
            <div className={styles.successContent} role="status">
              <div className={styles.successIcon} aria-hidden="true">
                ✓
              </div>

              <h2>Your account is ready!</h2>

              <p>
                Account created successfully.
                <br />
                Redirecting you to log in…
              </p>
            </div>

            <p className={styles.redirectTimer} role="timer">
              Redirecting in <span>{timeToRedirect}</span> seconds…
            </p>

            <NavLink className={styles.loginButton} to="/login">
              Go to log in
            </NavLink>
          </>
        ) : (
          <>
            <header className={styles.header}>
              <Icon label={FiLink} className={styles.logo} />
              <h1 id="signup-heading">Create an account</h1>
              <p>Keep your links short and all in one place.</p>
            </header>

            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className={styles.error}>{errors.name.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className={styles.error}>{errors.password.message}</p>
                )}
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                className={`${styles.submitButton} ${isSubmitting && styles.disabled}`}
                type="submit"
                disabled={isSubmitting}
              >
                <Icon label={FiUserPlus} className={styles.buttonIcon} />
                <span>{isSubmitting ? "Creating Account" : "Sign up"}</span>
              </button>
            </form>

            <footer className={`${styles.footer}`}>
              Already have an account? <NavLink to="/login">Log in</NavLink>
            </footer>
          </>
        )}
      </section>
    </main>
  );
}
