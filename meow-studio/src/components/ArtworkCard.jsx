
function ArtworkCard({ artwork, onOrder }) {
  return (
    <article className="art-card">
      <div className="art-image">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
        />

        <span
          className={
            artwork.available
              ? "art-status available"
              : "art-status sold"
          }
        >
          {artwork.available ? "AVAILABLE" : "SOLD OUT"}
        </span>
      </div>

      <div className="art-info">
        <p className="art-category">
          {artwork.category.toUpperCase()}
        </p>

        <h3>{artwork.title}</h3>

        <p className="art-size">{artwork.size}</p>

        <div className="art-bottom">
          <span className="art-price">
            {artwork.price.toLocaleString("uk-UA")} ₴
          </span>

          <button
            className="art-buy"
            onClick={() => onOrder(artwork)}
          >
            {artwork.available ? "КУПИТЬ ↗" : "ПОД ЗАКАЗ ↗"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ArtworkCard;
