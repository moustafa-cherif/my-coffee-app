import { Container } from 'react-bootstrap';

function Coffee() {
  const facts = [
    'Coffee Could Strengthen Your DNA',
    'Caffeine stimulates your nervous system, signaling fat cells to break down body fat.',
    'Coffee appears to be protective against two types of cancer: liver and colorectal cancer.',
    'Coffee Could Help Reduce Your Risk of Diabetes.',
    'Coffee Could Help Reverse Liver Damage from Drinking.',
    'Coffee Could Reduce Your Risk of Parkinson\'s Disease.',
    'Coffee Could Make Physical Activity Feel Easier.',
    'Coffee Could Reduce Your Risk of Digestive Diseases.',
    'Coffee Could Decrease Your Risk of Multiple Sclerosis.',
    'Coffee Could Help Lower Your Risk of Basal Cell Carcinoma.',
    'Coffee Could Help Protect Against Heart Failure.',
    'Coffee Could Help Reduce Your Risk of Alzheimer\'s.',
    'Coffee Could Help Reduce Post-Workout Muscle Pain.',
    'Coffee Gives You an Opportunity to Take a Break at Work.',
    'Coffee help you obtain numerous nutrients and antioxidants.',
    'Caffeine provides a short-term memory boost.',
  ];

  return (
    <Container className="my-content p-5 my-5 rounded border border-warning">
      <h2 className="text-center">Coffee is very important</h2>
      <hr />
      {facts.map((fact, idx) => (
        <p key={idx}>{fact}</p>
      ))}
    </Container>
  );
}

export default Coffee;