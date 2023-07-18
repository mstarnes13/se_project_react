// import logo from './';
import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <section className="weather" id="weather">
          <div className="weather__info">75</div>
          <img
            src="./images/day/sunny.svg"
            alt="sunny"
            className="weather__image"
          ></img>
        </section>
        <section id="card-section">Card Section</section>
      </main>
    </div>
  );
}

export default App;
