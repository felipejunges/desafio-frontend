import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Table, Row, Col, Button, Stack } from 'react-bootstrap';
import ClienteInclusao from "./ClienteInclusao";

const Clientes = () => {
    const [clientes, setClientes] = useState();
    const [clienteDados, setClienteDados] = useState({});
    const [modalIncluirShow, setModalIncluirShow] = useState(false);
    const [modalEdicaoShow, setModalEdicaoShow] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            console.log('getUsers');

            try {
                const response = await axiosPrivate.get('/api/Clientes', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setClientes(response.data);
            } catch (err) {
                if (!controller.signal.aborted) {
                    navigate('/login', { state: { from: location }, replace: true });
                }
                console.error(err);
            }
        }

        getUsers();

        return () => {
            console.log('cleanup');
            isMounted = false;
            controller.abort();
        };
    }, []);

    const getUser = async (id) => {
        const response = await axiosPrivate.get(`/api/Clientes/${id}`);

        console.log(response.data);

        setClienteDados(response.data);
        setModalIncluirShow(true);
    }

    return (
        <>
            <Container>
                <Stack direction="horizontal">
                    <h2>Clientes</h2>
                    <Button className="p-2 ms-auto" size='sm' onClick={() => { setClienteDados({}); setModalIncluirShow(true); }}>Incluir</Button>
                </Stack>
                <Row>
                    <Col>
                        {clientes?.length
                            ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>Ix</td>
                                            <td>Id</td>
                                            <td>Nome</td>
                                            <td>E-mail</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clientes.map((cliente, i) =>
                                                <tr key={cliente.id} onDoubleClick={() => getUser(cliente.id)}>
                                                    <td>{i}</td>
                                                    <td>{cliente.id}</td>
                                                    <td>{cliente.nome}</td>
                                                    <td>{cliente.email}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            ) : <p>Nenhum cliente cadastrado</p>
                        }
                    </Col>
                </Row>
            </Container >

            <ClienteInclusao show={modalIncluirShow} onHide={() => setModalIncluirShow(false)} data={clienteDados} />
        </>
    );
};

export default Clientes;