import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card1 = () => {
  const [products, setProducts] = useState([]);

  const cardTitles = [
    "Most Loved Product",
    "Product on Offers",
    "Best Seller",
    "Trending Now",
    "Exclusive Collection",
    "Hot Deals Today",
    "Limited Stock",
    "Top Rated Picks",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data.slice(0, 8)); // Fetch 8 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="custom-card mt-4 my-2">
      <div className="row gx-4 my-4">
        {products.map((product, i) => {
          const imgIndexes = [(i + 1) % 8, (i + 2) % 8, (i + 3) % 8, i];

          return (
            <div className="col-lg-3 col-md-6 col-sm-12 my-2 cardWidth" key={product.id}>
              <div className="custom-card bg-light p-3 shadow-sm">
                <h5 className="fw-bold mb-3">{cardTitles[i % cardTitles.length]}</h5>
                <div className="row g-2">
                  {imgIndexes.map((index, j) => (
                    <div className="col-6" key={j}>
                      <Link to={`/product/${products[index]?.id || product.id}`}>
                        <img
                          src={products[index]?.image || product.image}
                          alt={products[index]?.title || product.title}
                          className="img-fluid rounded"
                        />
                      </Link>
                      <p className="small text-muted mt-1">
                        {products[index]?.title.split(" ").slice(0, 3).join(" ") || product.title}
                      </p>
                    </div>
                  ))}
                </div>
                <Link 
                  to={`/categoryproducts?category=${encodeURIComponent(product.category)}`} 
                  className="text-primary fw-bold mt-3 d-block"
                >
                  See more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card1;
