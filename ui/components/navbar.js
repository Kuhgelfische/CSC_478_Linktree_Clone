import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'

export default function LTC_Navbar() {
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
          <Nav>
            <Link href="/account/createAccount" passHref><Nav.Link>Sign up</Nav.Link></Link>
            <Link href="/account/login" passHref><Nav.Link>Log in</Nav.Link></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}