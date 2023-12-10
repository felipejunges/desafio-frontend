import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useJwtToken from "../Hooks/useJwtToken";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { login } = useJwtToken();

    const [errMsg, setErrMsg] = useState('');
    const [apiRunning, setApiRunning] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            setApiRunning(true);

            await login(email, password);

            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        finally {
            setApiRunning(false);
        }
    }

    return (
        <Container>
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md>
                        <Form.Group controlId="formEmail">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control name='email' type='email' placeholder="examplo@email.com.br" />
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control name='password' type='password' />
                        </Form.Group>
                    </Col>
                </Row>

                {errMsg ?
                    <Row className="pt-2">
                        <Col>
                            <Alert variant='danger'>{errMsg}</Alert>
                        </Col>
                    </Row>
                    : ''
                }

                <Row className="pt-2">
                    <Col>
                        <Button variant="primary" type='submit' disabled={apiRunning} className="w-100">Login</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Login;