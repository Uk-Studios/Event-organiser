import { useState } from 'react'

import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap'

import {
  LinkContainer,
} from 'react-router-bootstrap'

import '../styles/header.css'

const Header = () => {

  const [expanded, setExpanded] = useState(false)

  const closeMenu = () => {
    setExpanded(false)
  }

  return (
    <header className="custom-header">

      <Navbar
        expand="lg"
        expanded={expanded}
        className="navbar-custom"
      >

        <Container>

          <LinkContainer to="/">
            <Navbar.Brand
              className="brand-logo"
              onClick={closeMenu}
            >
              Uk Studios
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="navbar"
            className="navbar-dark"
            onClick={() =>
              setExpanded(expanded ? false : "expanded")
            }
          />

          <Navbar.Collapse id="navbar">

            <Nav className="ms-auto nav-links">

              <LinkContainer to="/">
                <Nav.Link onClick={closeMenu}>
                  Home
                </Nav.Link>
              </LinkContainer>

              <Nav.Link
                href="/#services"
                onClick={closeMenu}
              >
                Services
              </Nav.Link>

              <Nav.Link
                href="/#portfolio"
                onClick={closeMenu}
              >
                Gallery
              </Nav.Link>

              <LinkContainer to="/contact">
                <Nav.Link onClick={closeMenu}>
                  Contact
                </Nav.Link>
              </LinkContainer>

            </Nav>

          </Navbar.Collapse>

        </Container>

      </Navbar>

    </header>
  )
}

export default Header
