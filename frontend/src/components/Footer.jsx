import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear(); // تحديث السنة تلقائياً

  return (
    <footer className="pt-4 navbar-custom text-light">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md={6} className="mt-md-0 mt-3">
            <h5 className="text-uppercase">
              <img src="/img/mycoffee.png" width="40" height="40" className="img-brand" alt="My Coffee" />
              My Coffee
            </h5>
            <p>Order your favorite coffee, and get it wherever you are.</p>
          </Col>
          <Col md={3} className="mb-md-0 mb-3">
            <h5 className="text-uppercase">Delivery Service</h5>
            <ul className="list-unstyled">
              <li><a href="tel:333333333">333-333-333</a></li>
              <li><a href="tel:444333332">444-333-332</a></li>
              <li><a href="tel:555333331">555-333-331</a></li>
              <li><a href="tel:666333333">666-333-333</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-md-0 mb-3">
            <h5 className="text-uppercase">Join Us</h5>
            <ul className="list-unstyled">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        Copyright &copy; {currentYear} My Coffee. Powered By Hassouna Academy
      </div>
    </footer>
  );
}

export default Footer;