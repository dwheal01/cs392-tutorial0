import './CourseList.css'
import { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import ScheduleModal from './ScheduleModal';

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
    
    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => setSelected(
      selected.includes(item)
      ? selected.filter(x => x !== item)
      : [...selected, item]
    );

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <Container className="d-flex justify-content-between">
                <TermSelector selection={selection} setSelection={setSelection} />
                <Button onClick={handleShow}>Course Plan</Button>
            </Container>
            <div className="class-list">
                { termCourses.map(([id, course]) => 
                    <Card 
                        className={`shadow ${selected.includes(id) ? 'bg-success text-white' : 'bg-light'}`} 
                        style={{ width: '18rem', cursor: 'pointer', gap: '20px' }}
                        onClick={() => toggleSelected(id)}
                    >
                        <Card.Body>
                            <Card.Title>{course.term} CS {course.number}</Card.Title>
                            <Card.Text>{course.title}</Card.Text>
                            <Card.Text>{course.meets}</Card.Text>
                        </Card.Body>    
                    </Card>
                )}
            </div>
            <ScheduleModal show={show} handleClose={handleClose} selected={selected} termCourses={termCourses}/>
        </div>
       
    );
}
export default CourseList;