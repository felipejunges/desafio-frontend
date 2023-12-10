import { useForm, useFieldArray } from 'react-hook-form';
import { Modal, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { axiosPrivate } from '../api/axios';
import InputMask from 'react-input-mask';

const ClienteInclusao = (props) => {

    const form = useForm({
        defaultValues: {
            id: '0',
            nome: '',
            email: '',
            enderecos: [
                {
                    cep: '',
                    logradouro: ''
                }
            ]
        },
        values: props.data,
        mode: 'onTouched'
    });

    const { register, control, handleSubmit, formState, reset } = form;
    const { errors, isDirty, isValid, isSubmitted, isSubmitting } = formState;

    const { fields, append, remove } = useFieldArray({
        name: 'enderecos',
        control
    });

    const onSubmit = (data) => {
        const id = data['id'];

        try {
            if (id == '0') {
                const response = axiosPrivate.post('/api/Clientes', data);

                console.log(response.data);
            } else {
                const response = axiosPrivate.put(`/api/Clientes/${id}`, data);

                console.log(response.data);
            }
            props.onHide();
        } catch {
        }
    }

    const onError = (errors) => {
        console.log("error when submitting", errors);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cadastro do cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Form id='formCliente' onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                        <input type='hidden' {...register('id')} />

                        <Form.Group as={Row} className="mb-3" controlId="formNome">
                            <Form.Label column sm="2">
                                Nome
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder='Nome do cliente' isInvalid={!!errors.nome} {...register('nome', {
                                    required: {
                                        value: true,
                                        message: 'O nome é obrigatório'
                                    }
                                })} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome?.message}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm="2">
                                E-mail
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder='email@email.com' isInvalid={!!errors.email} {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'O e-mail é obrigatório'
                                    },
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'O e-mail deve ser informado corretamente'
                                    }
                                })} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {
                            fields.map((field, ix) => {
                                return <Row className="mb-3" key={field.id}>
                                    <Form.Group as={Col} sm="4" controlId="formCep">
                                        <Row>
                                            <Col sm="6"><Form.Label column sm="2">CEP</Form.Label></Col>
                                            <Col sm="6">
                                                <Form.Control type="text" as={InputMask} mask="99999-999" placeholder='CEP do endereço do cliente' isInvalid={!!errors.endereco?.cep} {...register(`enderecos.${ix}.cep`, {
                                                    required: {
                                                        value: true,
                                                        message: 'O CEP é obrigatório'
                                                    },
                                                    pattern: {
                                                        value: /^[\d]{5}-[\d]{3}$/,
                                                        message: 'O CEP deve ser informado corretamente'
                                                    }
                                                })} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.endereco?.cep?.message}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formLogradouro">
                                        <Row>
                                            <Col sm="3"><Form.Label column sm="2">Logradouro</Form.Label></Col>
                                            <Col sm="8">
                                                <Form.Control type="text" placeholder='Logradouro do endereço do cliente' isInvalid={!!errors.endereco?.logradouro} {...register(`enderecos.${ix}.logradouro`, {
                                                    required: {
                                                        value: true,
                                                        message: 'O logradouro é obrigatório'
                                                    }
                                                })} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.endereco?.logradouro?.message}
                                                </Form.Control.Feedback>
                                            </Col>
                                            {ix > 0 && (
                                                <Col sm="1">
                                                    <Button onClick={() => remove(ix)}>-</Button>
                                                </Col>
                                            )}
                                        </Row>
                                    </Form.Group>
                                </Row>
                            })
                        }

                        <Form.Group as={Row} className="mb-3">
                            <Col sm="10">
                                <Button onClick={() => append({ cep: '', logradouro: '' })}>Add</Button>
                            </Col>
                        </Form.Group>
                    </Form >
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" form="formCliente" disabled={isSubmitting || (isSubmitted && (!isDirty || !isValid))}>
                    Gravar
                </Button>
                <Button variant='secondary' onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ClienteInclusao;