import { useState } from 'react';
import Link from 'next/link'

// This is where we import Bootstrap components
import {
  Alert,
  Button,
  ListGroup
} from 'react-bootstrap';

const LandingPage = () => {

  // This is our template
  return (
    <>

      {/* Heading */}
      <h1 className='fs-1 text-center fw-bold'>Linktree Clone</h1>

      {/* Render our button centered, basic counter */}
      <div className='text-center'>
        <Link href="/account/createAccount"><a>Create Account</a></Link>
        <p>Linktree Clone (LTC) allows users to create a profile that shares various links to their social media.</p>
        <h2>Getting started</h2>
        <p>TODO: Here are some getting started steps</p>
        <p>Blah get started here with these steps</p>
        <p>Blah get started here with these steps</p>
        <p>Blah get started here with these steps</p>
        <h2>Supported features</h2>
        <ListGroup>
          <ListGroup.Item>User profiles</ListGroup.Item>
          <ListGroup.Item>View existing profiles</ListGroup.Item>
          <ListGroup.Item>Search for user profiles</ListGroup.Item>
          <ListGroup.Item>Customize your profile</ListGroup.Item>
        </ListGroup>
        <br/>
        <p>TODO: Create an account</p>
        <p>TODO: View an account</p>
      </div>
    </>
  )
};

// We need to export our page component
export default LandingPage;