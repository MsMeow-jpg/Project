
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css"; 

const statusLabels = {
  new: "Новая",
  progress: "В работе",
  completed: "Завершена",
  cancelled: "Отменена"
};

const typeLabels = {
  ready: "Покупка готовой работы",
  similar: "Заказ похожей работы",
  custom: "Картина на заказ",
  graffiti: "Граффити",
  clothing: "Кастом одежды",
  other: "Другое"
};

function readOrders() {
  try {
    const data = JSON.parse(
      localStorage.getItem("meow-orders") || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function Admin() {
  const [orders, setOrders] = useState(readOrders);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "ADMIN / MEOW STUDIO";
  }, []);

  function saveOrders(updatedOrders) {
    try {
      localStorage.setItem(
        "meow-orders",
        JSON.stringify(updatedOrders)
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Не удалось сохранить изменения.");
    }
  }

  function changeStatus(id, status) {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    saveOrders(updatedOrders);
  }

  function deleteOrder(id) {
    const confirmed = window.confirm(
      "Ты уверена, что хочешь удалить эту заявку?"
    );

    if (!confirmed) return;

    saveOrders(orders.filter((order) => order.id !== id));
  }

  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  const stats = {
    total: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    progress: orders.filter((o) => o.status === "progress").length,
    completed: orders.filter((o) => o.status === "completed").length
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <Link to="/" className="logo">
          MEOW<span>STUDIO.</span>
        </Link>

        <span>ADMIN PANEL / 001</span>

        <Link to="/" className="admin-back">
          ← НА САЙТ
        </Link>
      </header>

      <main className="admin-content">
        <div className="admin-title">
          <p className="section-label">CONTROL THE CHAOS</p>
          <h1>ORDER DASHBOARD<span>.</span></h1>
          <p>Управление заявками на твои работы.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>ВСЕГО ЗАЯВОК</span>
            <strong>{stats.total}</strong>
          </div>

          <div className="stat-card">
            <span>НОВЫЕ</span>
            <strong>{stats.new}</strong>
          </div>

          <div className="stat-card">
            <span>В РАБОТЕ</span>
            <strong>{stats.progress}</strong>
          </div>

          <div className="stat-card">
            <span>ЗАВЕРШЕНЫ</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>

        <section className="admin-orders">
          <div className="admin-section-heading">
            <h2>INCOMING REQUESTS</h2>
            <span>{filteredOrders.length} ORDERS</span>
          </div>

          <div className="admin-filters">
            {[
              ["all", "Все"],
              ["new", "Новые"],
              ["progress", "В работе"],
              ["completed", "Завершённые"],
              ["cancelled", "Отменённые"]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={filter === value ? "active" : ""}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <div className="admin-empty">
              <h3>NO ORDERS HERE.</h3>
              <p>Заявок с таким статусом пока нет.</p>
            </div>
          ) : (
            <div className="orders-list">
              {[...filteredOrders].reverse().map((order) => (
                <article className="admin-order" key={order.id}>
                  <div className="order-top">
                    <div>
                      <span className="order-id">
                        ORDER / {String(order.id).slice(0, 8)}
                      </span>
                      <h3>{order.artworkTitle || "CUSTOM ART"}</h3>
                    </div>

                    <span className={`order-badge ${order.status}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>

                  <div className="order-details">
                    <p><b>Клиент:</b> {order.name}</p>
                    <p><b>Контакт:</b> {order.contact}</p>
                    <p><b>Тип:</b> {typeLabels[order.type] || order.type}</p>
                    <p>
                      <b>Дата:</b>{" "}
                      {new Date(order.createdAt).toLocaleString("ru-RU")}
                    </p>

                    {order.description && (
                      <p className="order-description">
                        <b>Пожелания:</b> {order.description}
                      </p>
                    )}

                    {order.budget && (
                      <p><b>Бюджет:</b> {order.budget} ₴</p>
                    )}

                    {order.price != null && (
                      <p><b>Цена:</b> {order.price} ₴</p>
                    )}
                  </div>

                  <div className="order-actions">
                    <select
                      aria-label="Статус заявки"
                      value={order.status}
                      onChange={(e) =>
                        changeStatus(order.id, e.target.value)
                      }
                    >
                      {Object.entries(statusLabels).map(
                        ([value, label]) => (
                          <option value={value} key={value}>
                            {label}
                          </option>
                        )
                      )}
                    </select>

                    <button
                      type="button"
                      className="delete-order"
                      onClick={() => deleteOrder(order.id)}
                    >
                      УДАЛИТЬ
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;
