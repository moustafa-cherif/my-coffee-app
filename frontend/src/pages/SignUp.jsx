//useState: لإدارة حالة المنتجات، التحميل، الأخطاء، قيم النماذج، إلخ
//useNavigate: للتوجيه البرمجي بعد تسجيل الدخول أو الخروج.  
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // نرسل فقط username, email, password إلى API التسجيل
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
    axios.post('/accounts/register/', userData)
      .then(response => {
        setMessage('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.');
        setError('');
        // بعد 2 ثانية، ننتقل إلى صفحة تسجيل الدخول
        setTimeout(() => navigate('/signin'), 2000);
      })
      .catch(err => {
        console.error(err);
        setError('حدث خطأ في التسجيل. تأكد من أن اسم المستخدم غير مستخدم.');
        setMessage('');
      });
  };

  return (
    <Container className="my-form p-5 my-5 rounded border border-warning">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center">Sign Up</h2>
        <hr />
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address 2</Form.Label>
          <Form.Control type="text" name="address2" placeholder="Apartment, studio, or floor" value={formData.address2} onChange={handleChange} />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" name="zip" placeholder="11111" value={formData.zip} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <div className="pretty p-svg p-curve p-jelly">
            <input type="checkbox" id="inputTerms" required />
            <div className="state p-warning">
              <svg className="svg svg-icon" viewBox="0 0 20 20">
                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{ stroke: 'white', fill: 'white' }}></path>
              </svg>
              <label>I agree to the terms of use and privacy policy</label>
            </div>
          </div>
        </Form.Group>
        <Button variant="warning" type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}

export default SignUp;