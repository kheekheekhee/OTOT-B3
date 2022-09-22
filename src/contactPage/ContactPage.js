import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap'

const ContactPage = () => {
    const [contactDetails, setContactDetails] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newGender, setNewGender] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const params = useParams();
    const contact_id = params.contactId
    const navigate = useNavigate()
    const [spawnModal, setSpawnModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://cs3219otot-env.eba-re2hmdzp.ap-southeast-1.elasticbeanstalk.com/api/contacts/" + contact_id)
                .then((res) => {
                    setContactDetails(res.data.data)
                })
                .catch(err => console.log(err))
            }
        fetchData()
    }, [contactDetails, contact_id])

    const handleIsEditClick = () => {
        setIsEdit(true);
    }

    const handleCancelClick = () => {
        setIsEdit(false)
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewEmail = (event) => {
        setNewEmail(event.target.value)
    }

    const handleNewGender = (event) => {
        setNewGender(event.target.value)
    }

    const handleNewPhone = (event) => {
        setNewPhone(event.target.value)
    }

    const handleSaveClick = async () => {
        await axios.put("http://cs3219otot-env.eba-re2hmdzp.ap-southeast-1.elasticbeanstalk.com/api/contacts/" + contact_id,
                    {
                        name: newName ? newName : contactDetails.name,
                        email: newEmail ? newEmail : contactDetails.email,
                        gender: newGender ? newGender : contactDetails.gender,
                        phone: newPhone ? newPhone : contactDetails.phone
                    })
                    .catch(err => console.log(err))
        setIsEdit(false)
    }

    const handleBackClick = (path) => {
        navigate(path)
    }

    const handleDeleteClick = () => {
        setSpawnModal(true)
    }

    const handleModalCloseClick = () => {
        setSpawnModal(false)
    }
    
    const handleOnConfirmDeleteClick = async () => {
        await axios.delete("http://cs3219otot-env.eba-re2hmdzp.ap-southeast-1.elasticbeanstalk.com/api/contacts/" + contact_id)
            .then((res) => {
                console.log(res)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                navigate("/")
            })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        Name: {contactDetails.name}
                        <br />
                        Email: {contactDetails.email}
                        <br />
                        Gender: {contactDetails.gender}
                        <br />
                        Phone: {contactDetails.phone}
                        <br />
                    </Col>
                    <Col>
                        <Button onClick={handleDeleteClick} variant='danger'>Delete</Button>
                        {
                            spawnModal ? (
                                <Modal show={spawnModal} onHide={handleModalCloseClick}>
                                <Modal.Header closeButton>
                                        <Modal.Title>Confirm Deletion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete
                                        <br/>
                                        Name: {contactDetails.name} <br/>
                                        Email: {contactDetails.email} <br/>
                                        Gender: {contactDetails.gender} <br/>
                                        Phone: {contactDetails.phone} <br/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleModalCloseClick}>
                                        Close
                                        </Button>
                                        <Button variant="danger" onClick={handleOnConfirmDeleteClick}>
                                        Confirm Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                             ) : (
                                <></>
                             )
                        }
                    </Col>
                </Row>
            </Container>
            {
                !isEdit ? (
                    <>
                        <Button onClick={() => handleBackClick("/")} variant="outline-danger">Back</Button>
                        <Button onClick={handleIsEditClick}>Edit</Button>
                    </>
                ) : (
                    <>
                        <Form>
                            <Form.Group onChange={handleNewName}>
                                <Form.Label>New name</Form.Label>
                                <Form.Control type="text" placeholder="Enter new name" />
                            </Form.Group>
                            <Form.Group onChange={handleNewEmail}>
                                <Form.Label>New email</Form.Label>
                                <Form.Control type="email" placeholder="Enter new email" />
                            </Form.Group>
                            <Form.Group onChange={handleNewGender}>
                                <Form.Label>New gender</Form.Label>
                                <Form.Control type="text" placeholder="Enter new gender" />
                            </Form.Group>
                            <Form.Group onChange={handleNewPhone}>
                                <Form.Label>New phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter new phone" />
                            </Form.Group>
                        </Form>
                        <Container>
                            <Row>
                                <Col xs='auto' md='auto' lg='auto'>
                                    <Button variant="outline-danger" onClick={handleCancelClick}>Cancel</Button>
                                </Col>
                                <Col xs='auto' md='auto' lg='auto'>
                                    <Button onClick={handleSaveClick}>Save</Button>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            }
        </>
    )
}

export default ContactPage