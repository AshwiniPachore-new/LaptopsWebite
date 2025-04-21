import { useState, useEffect } from "react";
import axios from "axios";
import "./Brands.css";

const brands = ["HP", "Dell", "Lenovo", "Asus", "Acer"];

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/laptops").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setFormData({ ...formData, brand });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      price: formData.price,
      brand: formData.brand,
      image: formData.image,
    };

    try {
      if (editingId) {
        const res = await axios.put(`http://localhost:5000/api/laptops/${editingId}`, payload);
        setProducts(products.map(p => (p.id === editingId ? res.data : p)));
      } else {
        const res = await axios.post("http://localhost:5000/api/laptops", payload);
        setProducts([...products, res.data]);
      }

      setFormData({ name: "", price: "", brand: selectedBrand, image: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      brand: product.brand,
      image: product.image,
    });
    setEditingId(product.id);
    setSelectedBrand(product.brand);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/laptops/${id}`);
      setProducts(products.filter((p) => p.id !== id)); 
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };
  

  return (
    <div className="brands-page" style={{ padding: "100px" }}>
      <h2>Select a Brand to Add or Edit Product</h2>
      <div className="brand-cards">
        {brands.map((brand) => (
          <div
            key={brand}
            className="brand-card"
            onClick={() => handleBrandClick(brand)}
          >
            {brand}
          </div>
        ))}
      </div>

      {selectedBrand && (
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingId ? "Update" : "Add"} Product</button>
        </form>
      )}

      <div className="product-list">
        {products
          .filter((p) => p.brand === selectedBrand)
          .map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <p><strong>Brand:</strong> {p.brand}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ backgroundColor: "red", color: "white" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Brands;
