import './CourseList.css'
import { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import ScheduleModal from './ScheduleModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from './SingIn';
import { useAuthState } from '../utilities/firebase';


const terms = {
    Fall: 'Fall',
    Winter: 'Winter',
    Spring: 'Spring'
};

const TermButton = ({term, selection, setSelection}) => {
    return(
        <div>
            <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
                onChange={() => setSelection(term)} />
                
            <label className="btn btn-success mb-1 p-2" htmlFor={term}>
                { term }
            </label>
        </div>
    )
}

const TermSelector = ({selection, setSelection}) => (
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
    { 
      Object.keys(terms).map(
        term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />
      )
    }
  </div>
);

const CourseList = ({courses}) => {
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    const termCourses = Object.entries(courses).filter(([id, course]) => (course.term === terms[selection]));    

    const [notAvailable, setNotAvailable] = useState([]);
    const checkDayOverlap = (course1days, course2days) => {
        return ([...course1days.match(/(M|Tu|W|Th|F)/g)].some(day => course2days.includes(day)));
    }
    const convertTime = (time) => {
        const [hour, minute] = time.split(":");
        return (hour + (minute/60));
    }
    const checkTimeOverlap = (course1time, course2time) => {
        var [start1, end1] = course1time.split("-");
        start1 = convertTime(start1);
        end1 = convertTime(end1);
        var [start2, end2] = course2time.split("-");
        start2 = convertTime(start2);
        end2 = convertTime(end2);
        return (start1 < end2 && start2 < end1);
    }
    const toggleAvailable = () => {
        var conflict = [];
        termCourses.map(([selected_id, selected_course]) => {
            // map through the cards that are currently being picked
            if( selected.includes(selected_id) && selected_course.meets !== "") {
                const [days, time] = (selected_course.meets).split(' ');
                termCourses.map(([id, course]) => {
                    const [d, t] = (course.meets).split(' ');
                    if( selected_course.number !== course.number && checkDayOverlap(days, d)
                        && checkTimeOverlap(time, t)){
                        conflict = [...conflict, id];
                    }
                });
            }
        });
        setNotAvailable([...notAvailable, ...conflict]);
    }

    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => {
      setNotAvailable([]);
      setSelected(
        selected.includes(item)
        ? selected.filter(x => x !== item)
        : [...selected, item]
        )
    }

    useEffect(() => {
        toggleAvailable();
    }, [selected, setNotAvailable]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [user] = useAuthState();
    
    return(
        <div>
            <Container className="d-flex justify-content-between">
                <TermSelector selection={selection} setSelection={setSelection} />
                <Button onClick={handleShow}>Course Plan</Button>
                <AuthButton/>
            </Container>
            <div className="class-list">
                { termCourses.map(([id, course]) => 
                    <Card 
                        className={`shadow ${selected.includes(id) ? 'bg-success text-white' : 'bg-light'}`} 
                        style={{ opacity: notAvailable.includes(id) ? 0.5 : 1, pointerEvents: notAvailable.includes(id) ? 'none' : 'auto', width: '18rem', cursor: 'pointer', gap: '20px' }}
                        onClick={() => {toggleSelected(id)}}
                    >
                        <Card.Body>
                            <Card.Title>{course.term} CS {course.number}</Card.Title>
                            <Card.Text>{course.title}</Card.Text>
                            <Card.Text>{course.meets}</Card.Text>
                            {user && <Button onClick={() => {
                                navigate('/course-form',
                                { 
                                    state: { 
                                        id: id, 
                                        course: course
                                    } 
                                }
                                )
                            }}
                            >Edit</Button>}
                        </Card.Body>    
                    </Card>
                )}
            </div>
            <ScheduleModal show={show} handleClose={handleClose} selected={selected} termCourses={termCourses}/>
        </div>
    );
}
export default CourseList;