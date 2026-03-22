import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

  
function CustomNavbar() { 
   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
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
    if (error) {
      return (
        <Container className="my-5 text-center text-danger">
          <h3>{error}</h3>
        </Container>
      );
    }
      const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // إعادة تعيين الحقل (اختياري)
    }
  };
  return (
    <Navbar bg="custom" variant="dark" expand="lg" fixed="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
      
          <img src="/img/mycoffee.png" width="40" height="40" className="img-brand" alt="My Coffee" />
          My Coffee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Join us" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/signin">Sign in</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup">Sign up</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/coffee" id="coffee-nav-item">Coffee</Nav.Link>
        <NavDropdown title="Products" id="products-dropdown">
  {!loading && products.slice(0, 5).map(product => (
    <NavDropdown.Item key={product.id} as={Link} to={`/product/${product.id}`}>
      {product.name}
    </NavDropdown.Item>
  ))}
  <NavDropdown.Divider />
  <NavDropdown.Item as={Link} to="/products">All Products</NavDropdown.Item>
</NavDropdown>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
       <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="warning" type="submit">Search</Button>
     
    </Form>
          
        
        </Navbar.Collapse>
  
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;