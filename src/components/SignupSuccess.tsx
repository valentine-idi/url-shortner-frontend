import { NavLink } from "react-router";

interface Props {
  styles: CSSModuleClasses;
  redirectTimer: number;
}

function SignupSuccess({ styles, redirectTimer }: Props) {
  return (
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
        Redirecting in <span>{redirectTimer}</span> seconds…
      </p>

      <NavLink className={styles.loginButton} to="/login">
        Go to log in
      </NavLink>
    </>
  );
}

export default SignupSuccess;
