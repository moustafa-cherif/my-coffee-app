import { Container } from 'react-bootstrap';

function About() {
  const features = [
    { text: 'My Coffee company is a pioneer in the field of coffee for more than 50 years', img: 'coffee3.svg' },
    { text: 'My Coffee Owns coffee plantations in many countries for the most common types of coffee', img: 'farm.svg' },
    { text: 'My Coffee is one of the largest coffee suppliers in the world', img: 'supply.svg' },
    { text: 'My Coffee Company factories fill coffee to international standards', img: 'factory.svg' },
    { text: 'Quality of products is much more important to a My Coffee company', img: 'quality.svg' },
    { text: 'We offer you rare types of exquisite international coffee', img: 'coffee4.svg' },
    { text: 'The company\'s workers are experts and have high efficiency', img: 'employee.svg' },
    { text: 'My Coffee company have fast drinks stores everywhere', img: 'coffee5.svg' },
  ];

  return (
    <Container className="my-content p-5 my-5 rounded border border-warning">
      <h1 className="text-center">
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">...</svg>
        About My Coffee Company
        <div className="d-inline-block">
          <img src="/img/coffee2.svg" className="w-100" alt="" />
        </div>
      </h1>
      <hr />
      {features.map((item, index) => (
        <div key={index}>
          <div className="clearfix row">
            <p className="col-10 lead">{item.text}</p>
            <img src={`/img/${item.img}`} className="col-2 float-right about-img rounded-circle" alt="" />
          </div>
          <hr />
        </div>
      ))}
    </Container>
  );
}

export default About;