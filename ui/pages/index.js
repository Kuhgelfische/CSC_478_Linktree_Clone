import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import style from "./styles.module.css"
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
      <head>
        <title>OneLink</title>
      </head>
      <body className={style.background}>
        <h1 className='fs-1 text-center fw-bold'>OneLink</h1>
        {/* Render our button centered, basic counter */}
        <div className='text-center'>
          <p>OneLink allows users to create a profile that shares various links to their social media.</p>
          <h2 className='fw-bold mb-2 p-2'>Example</h2>
          <div className='shadow d-inline-block rounded-3'>
            <Image src="/example.png" width={524} height={617} />
          </div>
        </div>
      </body>
    </>
  )
};

// We need to export our page component 
export default LandingPage;