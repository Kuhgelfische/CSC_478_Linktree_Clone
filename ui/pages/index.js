import { useState } from 'react';

// This is where we import Bootstrap components
import {
  Alert,
  Button
} from 'react-bootstrap';

const LandingPage = () => {
  // This is how we track application state
  const [counter, setCounter] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  // This is our template
  return (
    <>

      {/* Logic for showing the initial alert */}
      {
        showAlert ?
          <Alert className='mx-auto w-75 my-2' onClose={() => setShowAlert(false)} dismissible>
            We're using React and Bootstrap!
          </Alert>
        :
          <div/>
      }

      {/* Heading */}
      <h1 className='fs-1 text-center fw-bold'>Linktree Clone</h1>

      {/* Render our button centered, basic counter */}
      <div className='text-center'>
        <Button
          onClick={() => setCounter(counter+1)}
        >
          {counter} clicks
        </Button>
      </div>
    </>
  )
};

// We need to export our page component
export default LandingPage;