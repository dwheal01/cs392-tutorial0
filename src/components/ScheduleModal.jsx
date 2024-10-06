import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ScheduleModal = ({show, handleClose, selected, termCourses}) => {
    console.log(selected);
    const selectedCourses = termCourses.filter(([id, course]) => selected.includes(id));
    console.log(selectedCourses);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Course Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (selectedCourses == "")?
                        <div>
                            <p>No courses selected.</p>
                            <p>To show courses, please close, click on the courses you want to select
                                and click course plan again.
                            </p>
                        </div>
                        :
                        selectedCourses.map(([id, course]) => 
                            <div>
                                <h1>{course.term} CS {course.number}</h1>
                                <p>{course.title}</p>
                                <p>{course.meets}</p>
                            </div>
                        )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ScheduleModal