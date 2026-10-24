import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import { useState } from "react";
import Gallery from "./components/Gallery";
import OrderForm from "./components/OrderForm";
import StreetDecor from "./components/StreetDecor";


function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [ordersVersion, setOrdersVersion] = useState(0);

  function handleOrder(artwork) {
    setSelectedArtwork(artwork);

    document.getElementById("orders")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  function handleOrderCreated() {
    setOrdersVersion((prev) => prev + 1);
  }

  return (
    <div className="app">
      <StreetDecor />
      <header className="header">
        <a href="#" className="logo">
          MEOW<span>STUDIO.</span>
        </a>

        <nav className="navigation">
          <a href="#gallery">Галерея</a>
          <a href="#about">О художнике</a>
          <a href="#orders">Заказать работу</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-label">
            INDEPENDENT ART STUDIO / EST. 2026
          </div>

          <h1>
            ART WITH
            <br />
            <span>ATTITUDE.</span>
          </h1>

          <p>
            Авторские картины, граффити,
            кастомные работы и немного
            творческого безумия.
          </p>

          <a href="#gallery" className="hero-button">
            СМОТРЕТЬ РАБОТЫ ↗
          </a>
        </section>

        <Gallery onOrder={handleOrder} />

        <section id="about" className="section about-section">
          <p className="section-label">WHO'S BEHIND THIS?</p>
          <h2>BEHIND THE ART</h2>
          <p>
            Искусство без скучных правил.
            Авторские работы, эксперименты
            с цветом и уличная эстетика.
          </p>
        </section>

        <section id="orders" className="section orders-section">
          <div className="orders-intro">
            <p className="section-label">
              HAVE SOMETHING IN MIND?
            </p>

            <h2>MAKE IT REAL.</h2>

            <p>
              Есть идея для картины, граффити
              или кастомной вещи? Расскажи мне!
            </p>

            {selectedArtwork && (
              <button
                type="button"
                className="reset-order"
                onClick={() => setSelectedArtwork(null)}
              >
                + СОЗДАТЬ ИНДИВИДУАЛЬНЫЙ ЗАКАЗ
              </button>
            )}
          </div>

          <OrderForm
            key={selectedArtwork?.id ?? "custom"}
            selectedArtwork={selectedArtwork}
            onOrderCreated={handleOrderCreated}
          />
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 MEOW STUDIO</span>
        <span>ART IS NOT A CRIME.</span>
      </footer>
    </div>
  );
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
