import axios from "axios"
import { useState } from "react"
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const CreateContactPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [spawnAlert, setSpawnAlert] = useState(false)
    const navigate = useNavigate()

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleGender = (event) => {
        setGender(event.target.value)
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)
    }

    const handleCancel = () => {
        navigate("/")
    }

    const handleCreateClick = async () => {
        if (name && email) {
            await axios.post("http://cs3219otot-env.eba-re2hmdzp.ap-southeast-1.elasticbeanstalk.com/api/contacts/",
                        {
                            name: name,
                            email: email,
                            gender: gender,
                            phone: phone
                        })
                    .then(res => {
                        console.log(res.data)
                    })
            navigate("/")
        } else {
            setSpawnAlert(true)
        }
    }

    return (
        <>
            <Container>
                <Row>
                    {
                        spawnAlert ? (
                            <Alert variant="danger" onClose={() => setSpawnAlert(false)} dismissible>
                                <Alert.Heading>A necessary field isn't filed up</Alert.Heading>
                                <p>
                                Please fill up both Name and Email
                                </p>
                            </Alert>
                        ) : (
                            <></>
                        )
                    }
                    <Form>
                        <Form.Group onChange={handleName}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group onChange={handleEmail}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group onChange={handleGender}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" placeholder="Enter gender" />
                        </Form.Group>
                        <Form.Group onChange={handlePhone}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" />
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={handleCancel} variant="outline-danger">Cancel</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleCreateClick}>Create</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CreateContactPage