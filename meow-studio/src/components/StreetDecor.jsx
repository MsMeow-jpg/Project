
import { useState } from "react";

const initialStickers = [
  {
    id: 1,
    image: "/stickers/smile.png",
    name: "SMILE",
    x: 70,
    y: 12,
    animation: "floatTag1 4s ease-in-out infinite"
  },
  {
    id: 2,
    image: "/stickers/good-vibes.png",
    name: "GOOD VIBES",
    x: 6,
    y: 30,
    animation: "floatTag2 5s ease-in-out infinite"
  },
  {
    id: 3,
    image: "/stickers/believe.png",
    name: "BELIEVE",
    x: 68,
    y: 48,
    animation: "floatTag3 4.5s ease-in-out infinite"
  },
  {
    id: 4,
    image: "/stickers/truth.png",
    name: "TRUTH",
    x: 8,
    y: 65,
    animation: "floatTag4 5.5s ease-in-out infinite"
  }
];

function StreetDecor() {
  const [stickers, setStickers] = useState(initialStickers);
  const [showStickers, setShowStickers] = useState(true);

  function moveSticker(id) {
    setStickers((previous) =>
      previous.map((sticker) => {
        if (sticker.id !== id) return sticker;

        let newX;
        let newY;

        do {
          newX = Math.random() * 60 + 5;
          newY = Math.random() * 65 + 5;
        } while (
          Math.abs(newX - sticker.x) < 15 &&
          Math.abs(newY - sticker.y) < 15
        );

        return {
          ...sticker,
          x: newX,
          y: newY
        };
      })
    );
  }

  return (
    <>
      <button
        type="button"
        className="stickers-toggle"
        onClick={() => setShowStickers((prev) => !prev)}
        aria-label={
          showStickers
            ? "Скрыть граффити-стикеры"
            : "Показать граффити-стикеры"
        }
        aria-pressed={showStickers}
        title={
          showStickers
            ? "Скрыть стикеры"
            : "Показать стикеры"
        }
      >
        {showStickers ? (
          <>
            <span className="toggle-icon">◉</span>
            <span className="toggle-text">HIDE ART</span>
          </>
        ) : (
          <>
            <span className="toggle-icon">◎</span>
            <span className="toggle-text">SHOW ART</span>
          </>
        )}
      </button>

      <div
        className={`street-decor ${
          showStickers ? "" : "street-decor-hidden"
        }`}
        aria-hidden={!showStickers}
        inert={!showStickers}
      >
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            type="button"
            className={`street-sticker sticker-${sticker.id}`}
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`
            }}
            onClick={() => moveSticker(sticker.id)}
            aria-label={`Переместить стикер ${sticker.name}`}
            tabIndex={showStickers ? 0 : -1}
          >
            <img
              src={sticker.image}
              alt=""
              draggable={false}
              style={{
                animation: sticker.animation
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default StreetDecor;
