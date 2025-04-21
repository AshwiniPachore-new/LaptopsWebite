import { useNavigate } from "react-router-dom";
import "./Home.css";

const brands = ["HP", "Dell", "Lenovo", "Asus", "Acer"];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <h2>Select a Brand</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center"}}>
        {brands.map((brand) => (
          <div className="brand"
            key={brand}
            onClick={() => navigate(`/brands/${brand.toLowerCase()}`)}
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
