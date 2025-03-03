import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card1 = () => {
  const [productGroups, setProductGroups] = useState([]);

  const cardTitles = [
    "Most Loved Product",
    "Product on Offers",
    "Best Seller",
    "Trending Now",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Filter products with id >= 9
        let filteredProducts = data.filter((product) => product.id >= 9);

        // Duplicate products if there are less than 16
        while (filteredProducts.length < 16) {
          filteredProducts = [...filteredProducts, ...filteredProducts].slice(0, 16);
        }

        // Group into sets of 4 products per card
        const groupedProducts = [];
        for (let i = 0; i < filteredProducts.length; i += 4) {
          groupedProducts.push(filteredProducts.slice(i, i + 4));
        }

        setProductGroups(groupedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="custom-card mt-4 my-2">
      <div className="row gx-4 my-4">
        {productGroups.map((group, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 my-2" key={index}>
            <div className="custom-card bg-light p-3 shadow-sm">
              <h5 className="fw-bold mb-3">{cardTitles[index % cardTitles.length]}</h5>
              <div className="row g-2">
                {group.map((product) => (
                  <div className="col-6" key={product.id}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid rounded"
                      />
                    </Link>
                    <p className="small text-muted mt-1">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </p>
                  </div>
                ))}
              </div>
              <Link 
                to={`/categoryproducts?category=${encodeURIComponent(group[0].category)}`} 
                className="text-primary fw-bold mt-3 d-block"
              >
                See more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card1;
