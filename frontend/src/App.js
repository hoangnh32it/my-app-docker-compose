import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [sum, setSum] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCalculate = async () => {
    const response = await fetch(`/api/caculator?a=${a}&b=${b}`);
    const result = await response.text(); // hoặc `.json()` nếu backend trả JSON
    setSum(result);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
      <hr />
      <h2>Máy tính cộng</h2>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="Số a"
      />
      +
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="Số b"
      />
      <button onClick={handleCalculate}>Tính</button>
      {sum !== null && (
        <div>
          <strong>Kết quả:</strong> {sum}
        </div>
      )}
    </div>
  );
}

export default App;
