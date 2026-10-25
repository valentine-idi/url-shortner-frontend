import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaLink } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogInOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { setAuthToken } from "../../services/apiClient";
import Icon from "../Icon";
import styles from "./NavBar.module.scss";

function NavBar() {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(undefined);

    navigate("/login", { replace: true });
  };
  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <ul className={`${styles.left} ${styles.navList}`}>
          <li className={`${styles.navItem} ${styles.navLogo}`}>
            <NavLink to="/" className={styles.navLink}>
              <span>
                <Icon className={styles.icon} label={FaLink} />
              </span>
              URL Shortener
            </NavLink>
          </li>
        </ul>

        <ul className={`${styles.right} ${styles.navList}`}>
          {currentUser ? (
            <>
              <li className={`${styles.navItem} ${styles.bigMenuItem}`}>
                <NavLink to="/links" className={styles.navLink}>
                  My links
                </NavLink>
              </li>

              <li
                className={`${styles.navItem} ${styles.bigMenuItem} ${styles.logout}`}
                onClick={handleLogout}
              >
                <NavLink to="/" className={styles.navLink}>
                  Log out
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.navItem} ${styles.bigMenuItem}`}>
                <NavLink to="/login" className={styles.navLink}>
                  <span className={styles.login}>Log in</span>
                  <Icon label={IoLogInOutline} className={styles.loginIcon} />
                </NavLink>
              </li>

              <li
                className={`${styles.navItem} ${styles.bigMenuItem} ${styles.signup}`}
              >
                <NavLink to="/signup" className={styles.navLink}>
                  <Icon label={FiUserPlus} className={styles.signupIcon} />
                  Sign up
                </NavLink>
              </li>
            </>
          )}

          <li
            className={styles.navItem}
            onClick={() => setShowSmallMenu(!showSmallMenu)}
          >
            <Icon
              label={showSmallMenu ? MdClose : GiHamburgerMenu}
              className={`${styles.hamburger} ${showSmallMenu && styles.close} `}
            />
          </li>
        </ul>
      </nav>

      <nav
        className={`${styles.navBarSmall} ${showSmallMenu && isSmallScreen && styles.showSmallMenu} `}
      >
        <ul className={`${styles.right} ${styles.navList}`}>
          {currentUser ? (
            <>
              <li className={`${styles.navItem}`}>
                <NavLink to="/links" className={styles.navLink}>
                  My links
                </NavLink>
              </li>

              <li
                className={`${styles.navItem} ${styles.bigMenuItem}`}
                onClick={handleLogout}
              >
                <div className={`${styles.logout}`}>Logout</div>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.navItem}`}>
                <NavLink to="/login" className={styles.navLink}>
                  <span className={styles.login}>Log in</span>
                  <Icon
                    label={IoLogInOutline}
                    className={`${styles.navIcon} ${styles.loginIcon}`}
                  />
                </NavLink>
              </li>
              <li className={`${styles.navItem} ${styles.bigMenuItem} `}>
                <NavLink to="/signup">
                  <div className={`${styles.signup}`}>
                    <Icon
                      label={FiUserPlus}
                      className={`${styles.navIcon} ${styles.signupIcon}`}
                    />
                    Sign up
                  </div>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
