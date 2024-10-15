import { Container, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDbUpdate } from '../utilities/firebase';


const EditForm = () => {
    // const [updateData, result] = useDbUpdate(`/courses/`);
    const location = useLocation();
    const [id, setId] = useState('');
    const [course, setCourse] = useState('');
    const [title, setTitle] = useState('');
    const [meetingTimes, setMeetingTimes] = useState('');

    useEffect(() => {
        const { id, course, courseTitle, courseMeets } = location.state || {};
        if (id && course && courseTitle && courseMeets) {
            setId(id);
            setCourse(course);
            setTitle(course.title);
            setMeetingTimes(course.meets);
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
            correct &= false;
        }
        (correct) ? setIsValidMeeting(true) : setIsValidMeeting(false);
    }

    const [updateData, result] = useDbUpdate(`/courses/${id}`);
    const changeCourse = async(evt) => {
        const updatedData = { ...(course), title: title, meets : meetingTimes };

        if(isValidTitle !== false && isValidMeeting !== false && 
            (course.title !== title || course.meets !== meetingTimes))
            {
                evt.preventDefault();
                try{
                    await(updateData(updatedData));
                    navigate('/');
                } 
                catch (error) {
                    console.error("Error occurred:", error.message);
                }
                return;
            }
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
                <Button variant="primary" onClick={changeCourse}>
                    Submit
                </Button>
                <Button variant="danger" onClick={() => {navigate('/')}}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}
export default EditForm