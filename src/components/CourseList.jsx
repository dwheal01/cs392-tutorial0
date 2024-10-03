import './CourseList.css'
import { useState } from 'react';

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

const CourseSelection = ({selection, termCourses}) => (
    <div className="class-list">
        { termCourses.map(([id, course]) => 
            <div className="card m-1 p-2">
                <div className="card-body">
                    <h5 className="card-title">{course.term} CS {course.number}</h5>
                    <p className="card-text">{course.title}</p>
                    <p className="card-text">{course.meets}</p>
                </div>
            </div>
        )}
    </div>
);

const CourseList = ({courses}) => {
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    const termCourses = Object.entries(courses).filter(([id, course]) => (course.term === terms[selection]));
    return(
        <div>
            <div>
                <TermSelector selection={selection} setSelection={setSelection} />
            </div>
<<<<<<< HEAD
            {/* <div>
                <CourseSelection selection={selection} termCourses={
                    Object.entries(courses).filter(([id, course]) => (course.term === terms[selection]))
                }/>
            </div> */}
           
=======

>>>>>>> a6241ef (term filter)
            <div className="class-list">
                { termCourses.map(([id, course]) => 
                    <div className="card m-1 p-2">
                        <div className="card-body">
                            <h5 className="card-title">{course.term} CS {course.number}</h5>
                            <p className="card-text">{course.title}</p>
                            <p className="card-text">{course.meets}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
       
    );
}
export default CourseList;