import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate()
    const normalApiCall = "http://cs3219otot-env.eba-re2hmdzp.ap-southeast-1.elasticbeanstalk.com/api/contacts";
    const serverlessApiCall = "https://hc0j0ivcp8.execute-api.ap-southeast-1.amazonaws.com/getAllContacts";

    const handleClick = async () => {
        await axios.get(serverlessApiCall)
            .then(res => {
                if (res.data) {
                    setContacts(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleClickCreateContact = () => {
        navigate("/create")
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={handleClick}>Get contacts</Button>
                        <ListGroup>
                            {contacts && 
                                contacts.map((contact) => {
                                    return (
                                            <ListGroup.Item key={contact._id}>
                                                Name: {contact.name}
                                                <br />
                                                Email: {contact.email} 
                                                <br />
                                                Gender: {contact.gender} 
                                                <br />
                                                Phone: {contact.phone} 
                                                <br />
                                                <Link to={`/contacts/${contact._id}`}>Details</Link>
                                            </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    </Col>
                    <Col>
                        <Button onClick={handleClickCreateContact}>Create new contact</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default LandingPage;