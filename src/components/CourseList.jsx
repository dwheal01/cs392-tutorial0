const CourseList = ({courses}) => (
    <div>
        { Object.entries(courses).map(([id, course]) => 
        <body>
            {course.term} Term, CS {course.number} {course.title}, on {course.meets}
        </body>)}
    </div>
);
export default CourseList;