import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductList.module.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=8&skip=${page * 8}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [page]);

  if (products.length == 0) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.thumbnail}
            />
            <div className={styles.details}>
              <h4 className={styles.title}>{product.title}</h4>
              <p className={styles.meta}>Category: {product.category}</p>
              <p className={styles.meta}>Brand: {product.brand}</p>
              <p className={styles.meta}>Rating: {product.rating} ★</p>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.discount}>
                Discount: {product.discountPercentage}%
              </p>
              <Link to={`/product/${product.id}`} className={styles.viewLink}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProductList;
