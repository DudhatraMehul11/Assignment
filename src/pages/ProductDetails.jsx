import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/ProductDetails.module.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.detailsSection}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.meta}><strong>Category:</strong> {product.category}</p>
        <p className={styles.meta}><strong>Brand:</strong> {product.brand}</p>
        <p className={styles.meta}><strong>Rating:</strong> {product.rating} ★</p>
        <p className={styles.meta}><strong>Stock:</strong> {product.stock}</p>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.discount}>Discount: {product.discountPercentage}%</p>
      </div>
    </div>
  );
}

export default ProductDetail;
