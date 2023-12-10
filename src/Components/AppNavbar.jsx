import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

export function AppNavbar() {
    const { auth, logout } = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Test</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/clientes">Clientes</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.ItemText href="#">{auth?.user}</NavDropdown.ItemText>
                            <NavDropdown.Item onClick={() => logout()}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}