//useState: لإدارة حالة المنتجات، التحميل، الأخطاء، قيم النماذج، إلخ
//useEffect: لجلب البيانات عند تحميل المكون ولتطبيق الفلاتر
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import { Link } from 'react-router-dom';
import ProductSkeleton from '../components/ProductSkeleton';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { //دوال لجلب البيانات  
    axios.get('/products/products/')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('فشل في تحميل المنتجات');
        setLoading(false);
      });
  }, []);

  //  Skeleton هنا يتم عرض نموذج لهياكل بطاقات المنتجات عن طريق
  if (loading) {
    return (
      <Container className="my-form p-5 my-5 rounded border border-warning" style={{ overflow: 'auto' }}>
        <h2 className="text-center">All Products</h2>
        <hr />
        <Container fluid>
          <Row className="p-5">
            {Array(6).fill().map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </Row>
        </Container>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center text-danger">
        <h3>{error}</h3>
      </Container>
    );
  }

  return (
    <Container className="my-form p-5 my-5 rounded border border-warning" style={{ overflow: 'auto' }}>
      <h2 className="text-center">All Products</h2>
      <hr />
      <Container fluid>
        <Row className="p-5">
          {products.map(product => (
            <Col key={product.id} md={4} lg={3} className="mb-4 d-flex align-items-stretch">
              <Card className="w-100 d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={product.photo || '/img/default.jpg'}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column flex-grow-1">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text
                    className="flex-grow-1"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.description}
                  </Card.Text>
                  <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                  <div className="mt-auto">
                    <Link to={`/product/${product.id}`}>
                      <Button variant="warning">Show Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Products;