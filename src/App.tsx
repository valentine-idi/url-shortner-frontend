import { Routes, Route } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import styles from "./App.module.scss";
import NavBar from "./components/navbar";

function App() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
