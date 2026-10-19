import styles from "./App.module.scss";
import NavBar from "./components/navbar";
import Home from "./pages/home";

function App() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Home />
      </div>
    </>
  );
}

export default App;
