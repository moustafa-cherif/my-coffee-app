//useState: لإدارة حالة المنتجات، التحميل، الأخطاء، قيم النماذج، إلخ
//useNavigate: للتوجيه البرمجي بعد تسجيل الدخول أو الخروج.  
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/accounts/login/', { username, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);  // حفظ التوكن
        navigate('/products');                 // التوجيه إلى صفحة المنتجات
      })
      .catch(err => {
        console.error(err);
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      });
  };

  return (
    <Container className="my-form p-5 my-5 rounded border border-warning">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center">Sign In</h2>
        <hr />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="pretty p-svg p-curve p-jelly">
            <input type="checkbox" id="rememberMe" />
            <div className="state p-warning">
              <svg className="svg svg-icon" viewBox="0 0 20 20">
                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{ stroke: 'white', fill: 'white' }}></path>
              </svg>
              <label>Remember Me</label>
            </div>
          </div>
        </Form.Group>
        <Button variant="warning" type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default SignIn;