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
import Input from "../../components/Input";
import SignupSuccess from "../../components/SignupSuccess";
import resources from "../../data/resources.json";
import styles from "./Signup.module.scss";

interface Inputs {
  type: "name" | "email" | "password";
  placeholder: string;
}

export default function Signup() {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeToRedirect, setTimeToRedirect] = useState(5);
  const navigate = useNavigate();
  const inputs = resources.inputs as Inputs[];

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
  } = useForm<RegisterPostData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterPostData) => {
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
          <SignupSuccess styles={styles} redirectTimer={timeToRedirect} />
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
              {inputs.map(({ type, placeholder }, index) => (
                <div className={styles.field} key={index}>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    register={register}
                    errors={errors}
                    className={styles.error}
                  />
                </div>
              ))}

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
