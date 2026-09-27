"use client";

import { useState } from "react";

type OrderStatus = "รอดำเนินการ" | "กำลังซัก" | "เสร็จแล้ว";

type Order = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  price: number;
  status: OrderStatus;
  date: string;
};

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customer: "สมชาย ใจดี",
      phone: "0812345678",
      service: "ซัก-อบ-รีด",
      price: 150,
      status: "กำลังซัก",
      date: "27/09/2026",
    },
    {
      id: "ORD002",
      customer: "สมหญิง ใจงาม",
      phone: "0823456789",
      service: "ซัก-อบ",
      price: 100,
      status: "รอดำเนินการ",
      date: "27/09/2026",
    },
    {
      id: "ORD003",
      customer: "มานะ มีสุข",
      phone: "0834567890",
      service: "ซัก-รีด",
      price: 120,
      status: "เสร็จแล้ว",
      date: "27/09/2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [newCustomer, setNewCustomer] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newService, setNewService] = useState("ซัก-อบ-รีด");
  const [newPrice, setNewPrice] = useState("");

  const addOrder = () => {
    if (
      newCustomer.trim() === "" ||
      newPhone.trim() === "" ||
      newPrice.trim() === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const newOrder: Order = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      customer: newCustomer,
      phone: newPhone,
      service: newService,
      price: Number(newPrice),
      status: "รอดำเนินการ",
      date: "27/09/2026",
    };

    setOrders([...orders, newOrder]);
    setNewCustomer("");
    setNewPhone("");
    setNewService("ซัก-อบ-รีด");
    setNewPrice("");
    setShowAddForm(false);
  };

  const changeStatus = (id: string) => {
    setOrders(
      orders.map((order) => {
        if (order.id !== id) return order;

        if (order.status === "รอดำเนินการ") {
          return { ...order, status: "กำลังซัก" };
        }

        if (order.status === "กำลังซัก") {
          return { ...order, status: "เสร็จแล้ว" };
        }

        return order;
      })
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder(null);
    }
  };

  const deleteOrder = (id: string) => {
    if (!confirm("ต้องการลบรายการนี้หรือไม่?")) return;

    setOrders(orders.filter((order) => order.id !== id));
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase();

    return (
      order.id.toLowerCase().includes(keyword) ||
      order.customer.toLowerCase().includes(keyword) ||
      order.phone.includes(keyword) ||
      order.service.toLowerCase().includes(keyword)
    );
  });

  const waitingCount = orders.filter(
    (order) => order.status === "รอดำเนินการ"
  ).length;

  const washingCount = orders.filter(
    (order) => order.status === "กำลังซัก"
  ).length;

  const completedCount = orders.filter(
    (order) => order.status === "เสร็จแล้ว"
  ).length;

  const totalIncome = orders.reduce(
    (total, order) => total + order.price,
    0
  );

  return (
    <main className="dashboard">
      {/* Header */}
      <header className="header">
        <div>
          <p className="subtitle">ระบบบริหารจัดการร้านซักอบรีด</p>
          <h1>🧺 ร้านซักอบรีด</h1>
        </div>

        <div className="user">
          👤 เจ้าของร้าน
        </div>
      </header>

      {/* Dashboard */}
      <h2 className="dashboardTitle">Dashboard</h2>

      <section className="stats">
        <div className="statCard">
          <div className="statIcon">📦</div>
          <div>
            <p>รายการทั้งหมด</p>
            <h2>{orders.length}</h2>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon yellow">⏳</div>
          <div>
            <p>รอดำเนินการ</p>
            <h2>{waitingCount}</h2>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon blue">🫧</div>
          <div>
            <p>กำลังซัก</p>
            <h2>{washingCount}</h2>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon green">✓</div>
          <div>
            <p>เสร็จแล้ว</p>
            <h2>{completedCount}</h2>
          </div>
        </div>

        <div className="statCard">
          <div className="statIcon purple">💰</div>
          <div>
            <p>รายได้ทั้งหมด</p>
            <h2>฿{totalIncome.toLocaleString()}</h2>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="tableCard">
        <div className="tableHeader">
          <div>
            <h2>รายการซักอบรีด</h2>
            <p>จัดการรายการและสถานะการซักของลูกค้า</p>
          </div>

          <button
            className="primaryButton"
            onClick={() => setShowAddForm(true)}
          >
            + เพิ่มรายการ
          </button>
        </div>

        <input
          className="searchBox"
          type="text"
          placeholder="ค้นหาเลขที่รายการ ชื่อลูกค้า หรือเบอร์โทร..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>เลขที่</th>
                <th>ลูกค้า</th>
                <th>บริการ</th>
                <th>ราคา</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty">
                    ไม่พบรายการ
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>

                    <td>
                      <strong>{order.customer}</strong>
                      <small>{order.phone}</small>
                    </td>

                    <td>{order.service}</td>

                    <td>
                      ฿{order.price.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`orderStatus ${
                          order.status === "กำลังซัก"
                            ? "washing"
                            : order.status === "เสร็จแล้ว"
                            ? "done"
                            : ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="viewButton"
                          onClick={() => setSelectedOrder(order)}
                        >
                          ดู
                        </button>

                        {order.status !== "เสร็จแล้ว" && (
                          <button
                            className="statusButton"
                            onClick={() => changeStatus(order.id)}
                          >
                            เปลี่ยนสถานะ
                          </button>
                        )}

                        <button
                          className="deleteButton"
                          onClick={() => deleteOrder(order.id)}
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Modal */}
      {showAddForm && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h2>เพิ่มรายการซักอบรีด</h2>

              <button
                className="closeButton"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>

            <label>ชื่อลูกค้า</label>
            <input
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              placeholder="กรอกชื่อลูกค้า"
            />

            <label>เบอร์โทรศัพท์</label>
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="กรอกเบอร์โทรศัพท์"
            />

            <label>ประเภทบริการ</label>
            <select
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            >
              <option>ซัก-อบ-รีด</option>
              <option>ซัก-อบ</option>
              <option>ซัก-รีด</option>
              <option>ซักอย่างเดียว</option>
            </select>

            <label>ราคา</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="กรอกราคา"
            />

            <div className="modalActions">
              <button
                className="cancelButton"
                onClick={() => setShowAddForm(false)}
              >
                ยกเลิก
              </button>

              <button className="primaryButton" onClick={addOrder}>
                บันทึกรายการ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h2>รายละเอียดรายการ</h2>

              <button
                className="closeButton"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="detailList">
              <p>
                <b>เลขที่:</b> {selectedOrder.id}
              </p>
              <p>
                <b>ลูกค้า:</b> {selectedOrder.customer}
              </p>
              <p>
                <b>เบอร์โทร:</b> {selectedOrder.phone}
              </p>
              <p>
                <b>บริการ:</b> {selectedOrder.service}
              </p>
              <p>
                <b>ราคา:</b> ฿{selectedOrder.price.toLocaleString()}
              </p>
              <p>
                <b>วันที่:</b> {selectedOrder.date}
              </p>
              <p>
                <b>สถานะ:</b> {selectedOrder.status}
              </p>
            </div>

            <div className="modalActions">
              {selectedOrder.status !== "เสร็จแล้ว" && (
                <button
                  className="primaryButton"
                  onClick={() => changeStatus(selectedOrder.id)}
                >
                  เปลี่ยนสถานะ
                </button>
              )}

              <button
                className="cancelButton"
                onClick={() => setSelectedOrder(null)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}