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

    const [isValidTitle, setIsValidTitle] = useState('');
    const [isValidMeeting, setIsValidMeeting] = useState('');

    const changeTitle = (evt) => {
        const val = evt.target.value;
        setTitle(val);
        setIsValidTitle(/(^\w\w)/.test(val));
    }

    const changeMeeting = (evt) => {
        const val = evt.target.value;
        setMeetingTimes(val);
        const validDays = ['M', 'Tu', 'W', 'Th', 'F'];
        const [days, times] = val.split(" ");
      
        var correct = (days.split(/(?=[A-Z])/)).every(d => validDays.includes(d));
        
        try {
            const [startTime, endTime] = times.split('-');
            const [startHr, startMin] = startTime.split(':');
            const [endHr, endMin] = endTime.split(':');
            correct &= (([...startHr, ...startMin, ...endHr, ...endMin]).every(t => !isNaN(t)));
        }
        catch {
            console.log('bad');
            correct &= false;
        }
        (correct) ? setIsValidMeeting(true) : setIsValidMeeting(false);
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Course Information</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control
                        type="text"
                        isValid={isValidTitle === true}
                        isInvalid={isValidTitle === false}
                        placeholder="course title"
                        value={title}
                        onChange={changeTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                        the course title must be at least two characters
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Meeting Times</Form.Label>
                    <Form.Control
                        type="text"
                        isValid={isValidMeeting=== true}
                        isInvalid={isValidMeeting === false}
                        placeholder="meeting times"
                        value={meetingTimes}
                        onChange={changeMeeting}
                    />
                    <Form.Control.Feedback type="invalid">
                    must contain days and start-end, e.g., MWF 12:00-13:20
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="danger" onClick={() => {navigate('/')}}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}
export default EditForm