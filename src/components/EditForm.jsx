import { Container, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditForm = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [meetingTimes, setMeetingTimes] = useState('');

    useEffect(() => {
        const { courseTitle, courseMeets } = location.state || {};
        if (courseTitle && courseMeets) {
            setTitle(courseTitle);
            setMeetingTimes(courseMeets);
        }
    }, [location.state]);
    const navigate = useNavigate();

     return (
        <Container className="mt-5">
            <h2 className="mb-4">Course Information</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="course title"
                        value={title}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Meeting Times</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="meeting times"
                        value={meetingTimes}
                    />
                </Form.Group>
                <Button variant="danger" onClick={() => {navigate('/')}}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}
export default EditForm