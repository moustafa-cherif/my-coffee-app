//useState: لإدارة حالة المنتجات، التحميل، الأخطاء، قيم النماذج، إلخ
//useEffect: لجلب البيانات عند تحميل المكون ولتطبيق الفلاتر
//useParams: للحصول على id المنتج من الرابط الديناميكي
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import ProductSkeleton from '../components/ProductSkeleton';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  // جلب جميع المنتجات
  useEffect(() => {
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

  // تطبيق الفلاتر (البحث + السعر + حساسية الحروف)
  useEffect(() => {
    if (products.length === 0) return;

    let filteredProducts = [...products];

    // فلترة حسب النص (اسم أو وصف)
    if (query) {
      filteredProducts = filteredProducts.filter(product => {
        const name = caseSensitive ? product.name : product.name.toLowerCase();
        const desc = caseSensitive ? product.description : product.description.toLowerCase();
        const search = caseSensitive ? query : query.toLowerCase();
        return name.includes(search) || desc.includes(search);
      });
    }

    // فلترة حسب السعر
    if (priceMin) {
      filteredProducts = filteredProducts.filter(p => parseFloat(p.price) >= parseFloat(priceMin));
    }
    if (priceMax) {
      filteredProducts = filteredProducts.filter(p => parseFloat(p.price) <= parseFloat(priceMax));
    }

    setFiltered(filteredProducts);
  }, [products, query, priceMin, priceMax, caseSensitive]);

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    // لا حاجة لإعادة توجيه، لأن الفلتر يتم تطبيقه تلقائياً
    // لكن يمكن تحديث URL إذا أردت
  };

  if (loading) {
    return (
      <Container className="my-form p-5 my-5 rounded border border-warning" style={{ overflow: 'auto' }}>
        <h2 className="text-center">Advanced Search</h2>
        <hr />
        <Row className="p-5">
          {Array(6).fill().map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </Row>
      </Container>
    );
  }

  if (error) return <Container className="my-5 text-center text-danger"><h3>{error}</h3></Container>;

  return (
    <Container className="my-form p-5 my-5 rounded border border-warning">
      <h2 className="text-center">Advanced Search</h2>
      <hr />
      <Form onSubmit={handleAdvancedSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name Contains</Form.Label>
          <Form.Control
            type="text"
            placeholder="espresso"
            value={query}
            onChange={(e) => {
              // تحديث URL مع تغيير النص (اختياري)
              // سنستخدم useSearchParams لإعادة تعيين URL
              const newUrl = `/search?q=${encodeURIComponent(e.target.value)}`;
              window.history.pushState({}, '', newUrl);
              // سنقوم بتحديث البحث عبر إعادة تحميل المكون (بسيط)
              window.location.reload(); // طريقة بسيطة لكن ليست مثالية
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Description Contains</Form.Label>
          <Form.Control type="text" placeholder="coffee" disabled />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price Between</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>And</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
       
        <Button variant="warning" type="submit">Search for All</Button>
      </Form>

      <hr />
      <h3 className="mt-4">Search Results ({filtered.length})</h3>
      {filtered.length === 0 && !loading && <p>No products found.</p>}
      <Row className="mt-3">
        {filtered.map(product => (
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
  );
}

export default Search;