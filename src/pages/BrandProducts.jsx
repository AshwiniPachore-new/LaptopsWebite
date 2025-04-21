import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BrandProducts = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/laptops").then((res) => {
      const filtered = res.data.filter((l) => l.brand.toLowerCase() === brand);
      setProducts(filtered);
    });
  }, [brand]);

  return (
    <div style={{ padding: "20px", backgroundColor: "gray" }}>
      <h2>{brand.toUpperCase()} Laptops</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((lap) => (
          <div
            key={lap.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
          

            <img
              src={lap.image.startsWith('/') ? lap.image : `/${lap.image}`}
              alt={lap.model}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            

            <h4>{lap.model}</h4>
            <p>₹ {lap.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandProducts;
