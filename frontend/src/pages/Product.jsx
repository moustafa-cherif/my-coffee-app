//useState: لإدارة حالة المنتجات، التحميل، الأخطاء، قيم النماذج، إلخ
//useEffect: لجلب البيانات عند تحميل المكون ولتطبيق الفلاتر
//useParams: للحصول على id المنتج من الرابط الديناميكي
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import { useParams } from 'react-router-dom';
import ProductSkeleton from '../components/ProductSkeleton'; // استيراد الـ Skeleton

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { //دوال لجلب البيانات  
    axios.get(`/products/products/${id}/`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('فشل في تحميل المنتج');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    alert(`تمت إضافة ${product?.name} إلى السلة (الكمية: ${quantity})`);
  };

  //  Skeleton هنا يتم عرض نموذج لهيكل بطاقه المنتج عن طريق 
  if (loading) {
    return (
      <Container className="my-form p-5 my-5 rounded border border-warning" style={{ overflow: 'auto' }}>
        <h2 className="text-center">Product Details</h2>
        <hr />
        <Row className="p-5">
          {Array(1).fill().map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </Row>
      </Container>
    );
  }

  if (error) return <Container className="my-5 text-center text-danger"><h3>{error}</h3></Container>;

  return (
    <Container className="my-form p-5 my-5 rounded border border-warning">
      <Form onSubmit={handleAddToCart}>
        <h2 className="text-center">Product Details</h2>
        <hr />
        <section>
          <Row className="p-5">
            <Card className="mb-3 w-100">
              <Row className="no-gutters">
                <Col md={4}>
                  <Card.Img  src={product.photo || '/img/default.jpg'} alt={product.name} style={{ marginLeft: '-14px' }}/>
                </Col>
                <Col md={8}>
                  <Card.Body style={{ marginLeft: '-29px' }}>
                    <Card.Title id="productName" >{product.name}</Card.Title>
                    <hr />
                    <Card.Text id="description">{product.description}</Card.Text>
                    <hr />
                    <Card.Text>
                      Current Price: <span id="price" className="bg-dark text-light rounded-circle p-2">${product.price}</span>
                    </Card.Text>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ width: '80px', display: 'inline-block', marginLeft: '10px' }}
                      />
                    </Form.Group>
                    <hr />
                    <Button variant="warning" type="submit">Add To Cart</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Row>
        </section>
      </Form>
    </Container>
  );
}

export default Product;