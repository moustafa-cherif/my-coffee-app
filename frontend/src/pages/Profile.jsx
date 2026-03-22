import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Profile() {
  return (
    <Container className="my-form p-5 my-5 rounded border border-warning">
      <Form>
        <h2 className="text-center">Profile</h2>
        <hr />
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="1234 Main St" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address 2</Form.Label>
          <Form.Control type="text" placeholder="Apartment, studio, or floor" required />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="11111" required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" readOnly plaintext className="border border-warning rounded" placeholder="name@example.com" />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" readOnly plaintext className="border border-warning rounded" placeholder="ahmed" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="warning" type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
}

export default Profile;