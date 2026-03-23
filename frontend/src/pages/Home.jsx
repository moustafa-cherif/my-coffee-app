//useState: لإدارة حالة المنتجات، التحميل، الأخطاء، قيم النماذج، إلخ
//useEffect: لجلب البيانات عند تحميل المكون ولتطبيق الفلاتر

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import ProductSkeleton from '../components/ProductSkeleton';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/products/products/')
      .then(response => {
        
        const sorted = response.data.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
        setLatestProducts(sorted.slice(0, 5));//هنا اعرض احدث خمس منتجات في المحل
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="jumbotron jumbotron-fluid p-3 m-0 text-center">
        <div className="d-inline-block align-top">
          <h1 className="display-4">My Coffee</h1>
          <p className="lead">Coffee world in your hands.</p>
        </div>
        <div className="d-inline-block">
          <img src="/img/coffee.svg" className="mycoffee-svg" alt="coffee" />
        </div>
      </div>

      {/* Carousel */}
      <Carousel fade interval={1500}>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/img1.jpg" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/img2.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/img3.jpg" alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/img4.jpg" alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/img5.jpg" alt="Fifth slide" />
        </Carousel.Item>
      </Carousel>

      {/* Jumbotron 2 */}
      <div className="jumbotron rounded-bottom">
        <h1 className="display-4">Coffee is my world</h1>
        <p className="lead">Many good health reasons to drink coffee.</p>
        <hr className="my-4" />
        <p>Caffeine stimulates your nervous system, signaling fat cells to break down body fat.</p>
        <p>Coffee appears to be protective against two types of cancer: liver and colorectal cancer.</p>
        <Button variant="warning" size="lg" href="#">Learn more</Button>
      </div>

      <hr />

      {/* Latest products */}
      <h1 className="text-center">Latest products</h1>
      <Container fluid>
        <Row className="g-0 justify-content-center" style={{ gap: '5px' }}>
          {loading ? (
            // عرض 5 Skeletons أثناء التحميل
            Array(5).fill().map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))
          ) : (
            latestProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant="top"
                    src={product.photo || '/img/default.jpg'}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text
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
                    <Link to={`/product/${product.id}`}>
                      <Button variant="warning">Show Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Additional note */}
      <div className="jumbotron">
        <p className="h1">
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">...</svg>
          An additional note
        </p>
        <p className="lead">
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">...</svg>
          When people think of coffee, they usually think of its ability to provide an energy boost...
        </p>
      </div>
    </>
  );
}

export default Home;