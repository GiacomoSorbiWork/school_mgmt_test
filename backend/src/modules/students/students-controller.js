const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
	const { userId, className, section, roll } = req.query;
	const students = await getAllStudents({ userId, className, section, roll });
	res.json({ students });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const student = await getStudentDetail(id);
	res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
	const { id: userId } = req.params;  
	const { id: reviewerId, status } = req.user; 
	const message = await setStudentStatus({ userId, reviewerId, status });
	res.json(message);
});

const handleAddStudent = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const message = await addNewStudent({ email });
	res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
	const payload = req.body;
	const message = await updateStudent(payload);
	res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleStudentStatus,
    handleAddStudent,
    handleUpdateStudent
};
