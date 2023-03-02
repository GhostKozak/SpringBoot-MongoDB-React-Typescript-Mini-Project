import { Container, Col, Row } from 'react-bootstrap';
import "./NotFound.css"

const NotFound = () => {
    return (
        <Container fluid className='section-404'>
            <Container>
                <Row>
                    <Col>
                        <h2>404 Not Found</h2>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default NotFound