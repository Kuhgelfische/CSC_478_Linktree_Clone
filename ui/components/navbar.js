import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'
import useSession from '../hooks/session'
import { useEffect } from 'react';

export default function LTC_Navbar() {
  const session = useSession();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand><Link href="/" passHref><Nav.Link>Link Tree Clone</Nav.Link></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
            {
              session
              ?
              <Nav>
                <p className="align-self-center mb-0 me-3">Hi, {session.email}</p>
                <Link href="/account/logout" passHref><Nav.Link>Log Out</Nav.Link></Link>
              </Nav>
              :
              <Nav>
                <Link href="/account/createAccount" passHref><Nav.Link>Sign up</Nav.Link></Link>
                <Link href="/account/login" passHref><Nav.Link>Log in</Nav.Link></Link>
              </Nav>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}