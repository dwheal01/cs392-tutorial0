import './CourseList.css'
import { useState } from 'react';
import { Card } from 'react-bootstrap';

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
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
    { 
      Object.keys(terms).map(
        term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />
      )
    }
  </div>
);

const CourseList = ({courses}) => {
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    const termCourses = Object.entries(courses).filter(([id, course]) => (course.term === terms[selection]));    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => setSelected(
      selected.includes(item)
      ? selected.filter(x => x !== item)
      : [...selected, item]
    );

    return(
        <div>
            <div>
                <TermSelector selection={selection} setSelection={setSelection} />
            </div>
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
        </div>
       
    );
}
export default CourseList;