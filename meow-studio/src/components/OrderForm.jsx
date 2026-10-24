
import { useState } from "react";

const initialForm = {
  name: "",
  contact: "",
  type: "custom",
  description: "",
  budget: ""
};

function OrderForm({ selectedArtwork, onOrderCreated }) {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const isArtworkOrder = Boolean(selectedArtwork);
  const isAvailable = selectedArtwork?.available;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const contact = form.contact.trim();
    const description = form.description.trim();

    if (!name || !contact) {
      setMessage("Заполни имя и контакт.");
      return;
    }

    if (!isArtworkOrder && !description) {
      setMessage("Расскажи немного о своей идее.");
      return;
    }

    const order = {
      id: crypto.randomUUID(),
      name,
      contact,
      type: isArtworkOrder
        ? isAvailable
          ? "ready"
          : "similar"
        : form.type,
      artworkId: selectedArtwork?.id ?? null,
      artworkTitle: selectedArtwork?.title ?? null,
      description,
      budget: form.budget,
      price: isArtworkOrder && isAvailable
        ? selectedArtwork.price
        : null,
      status: "new",
      createdAt: new Date().toISOString()
    };

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("meow-orders") || "[]"
      );

      if (!Array.isArray(savedOrders)) {
        throw new Error("Некорректные данные заказов");
      }

      localStorage.setItem(
        "meow-orders",
        JSON.stringify([...savedOrders, order])
      );

      setForm(initialForm);
      setMessage("Заявка успешно сохранена!");
      onOrderCreated?.();
    } catch (error) {
      console.error(error);
      setMessage("Не удалось сохранить заявку.");
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>NEW REQUEST / 001</span>
        <h3>LET'S CREATE SOMETHING.</h3>
      </div>

      {selectedArtwork ? (
        <div className="order-selected">
          <img
            src={selectedArtwork.image}
            alt={selectedArtwork.title}
          />

          <div>
            <span>SELECTED ARTWORK</span>
            <h4>{selectedArtwork.title}</h4>
            <p>
              {selectedArtwork.available
                ? `${selectedArtwork.price.toLocaleString("uk-UA")} ₴`
                : "Заказать похожую работу"}
            </p>
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="order-type">ТИП ЗАКАЗА</label>
          <select
            id="order-type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="custom">Картина на заказ</option>
            <option value="graffiti">Граффити</option>
            <option value="clothing">Кастом одежды</option>
            <option value="other">Другое</option>
          </select>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="order-name">ТВОЁ ИМЯ *</label>
          <input
            id="order-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Как тебя зовут?"
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="order-contact">TELEGRAM / EMAIL *</label>
          <input
            id="order-contact"
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="@username или email"
            maxLength={150}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="order-description">
          ОПИШИ СВОЮ ИДЕЮ
        </label>
        <textarea
          id="order-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Размеры, цвета, персонажи, настроение..."
          rows={5}
          maxLength={3000}
          required={!isArtworkOrder}
        />
      </div>

      {!isAvailable && (
        <div className="form-group">
          <label htmlFor="order-budget">
            ПРИМЕРНЫЙ БЮДЖЕТ (₴)
          </label>
          <input
            id="order-budget"
            type="number"
            min="0"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Например, 3000"
          />
        </div>
      )}

      <button type="submit" className="submit-order">
        ОТПРАВИТЬ ЗАЯВКУ ↗
      </button>

      {message && (
        <p className="form-message" role="status">
          {message}
        </p>
      )}

      <p className="form-note">
        Отправка заявки не означает оплату.
        Детали и стоимость согласовываются отдельно.
      </p>
    </form>
  );
}

export default OrderForm;
