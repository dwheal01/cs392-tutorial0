import './CourseList.css'

const CourseList = ({courses}) => (
    <div className="class-list">
        { Object.entries(courses).map(([id, course]) => 
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
export default CourseList;