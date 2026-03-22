/*
  الغرض: مكون يعرض بطاقات وهمية (Skeleton) أثناء تحميل المنتجات الحقيقية من API.
  يحسن تجربة المستخدم بتجنب ظهور شاشة بيضاء أو نص "جاري التحميل"، ويحافظ على هيكل الصفحة.
  يستخدم ProductSkeleton.css للحركة والتنسيق.
*/
import { Col, Card } from 'react-bootstrap';
import './ProductSkeleton.css'; // سنضيف بعض CSS للحركة

const ProductSkeleton = () => {
  return (
    <Col md={4} lg={3} className="mb-4 d-flex align-items-stretch">
      <Card className="w-100 d-flex flex-column skeleton-card">
        <div className="skeleton-image"></div>
        <Card.Body className="d-flex flex-column flex-grow-1">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-button mt-auto"></div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductSkeleton;