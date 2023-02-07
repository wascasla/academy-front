import { courses, students } from "@/api";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import CustomDialog from "@/components/dialog/customDialog";
import { toast } from "react-toastify";

const StudentDetail = () => {
  const router = useRouter();
  const { studentId } = router.query;

  const [student, setStudent] = useState();
  const [coursesList, setCoursesList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [showDialogEnrollment, setShowDialogEnrollment] = useState(false);
  const [showDialogParent, setShowDialogParent] = useState(false);


  const getStudent = async () => {
    const response = await students.getStudentById(studentId);
    if (response.data.data.id > 0) {
      setStudent(response.data.data);
    } else setStudent(undefined);
  };
  
  useEffect(() => {
    getStudent();
    getAllCourses();
    getAllStudents();
  }, [studentId]);

  const getAllCourses = async () => {
    const response = await courses.getAllCourses();
    if (response.data.data.length > 0) {
      setCoursesList(response.data.data);
    } else setCoursesList([]);
  };

  const getAllStudents = async () => {
    const response = await students.getAllStudents({
      name: "",
    });
    if (response.data.data.length > 0) {
      setStudentList(response.data.data);
    } else setStudentList([]);
  };

  const onHandleEnrollmentClick = async (courseId) => {
    const data = {
      studentId: parseInt(studentId),
      courseId,
    };
    try {
      const response = await students.addEnrollment(data);
      if (response.status === 201) {
        toast.success(response.data.message);
        getStudent();
        setShowDialogEnrollment(false);
      } else {
        toast.error("Something is wrong, try again");
      }
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
    }
  };

  const onHandleAddFamilyClick = async (parentId) => {
    const data = {
      studentId: parseInt(studentId),
      parentId,
    };
    try {
      const response = await students.addFamily(data);
      if (response.status === 201) {
        toast.success(response.data.message);
        getStudent();
        setShowDialogParent(false);
      } else {
        toast.error("Something is wrong, try again");
      }
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
    }
  };

  const onEdit = () => {
    router.push("/students/edit/"+studentId)
  }

  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "row" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <h2>Student</h2>
            </div>
          </Grid>
          {student !== undefined ? (
            <>
              <Grid item xs={4} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <Button style={{ marginBottom: "1em" }} onClick={() => onEdit()} variant="contained">
                  Edit
                </Button>
              </Grid>
              <Grid item xs={4} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <Button
                  style={{ marginBottom: "1em" }}
                  onClick={() => setShowDialogEnrollment(true)}
                  variant="contained"
                >
                  Add Enrollment
                </Button>
              </Grid>
              <Grid item xs={4} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <Button style={{ marginBottom: "1em" }} onClick={() => setShowDialogParent(true)} variant="contained">
                  Add Parent
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Name:</div>
                <div style={{ marginLeft: "1em" }}>{student.name}</div>
              </Grid>
              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Surename:</div>
                <div style={{ marginLeft: "1em" }}>{student.surename}</div>
              </Grid>
              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Gender:</div>
                <div style={{ marginLeft: "1em" }}>{student.gender}</div>
              </Grid>
              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Dni:</div>
                <div style={{ marginLeft: "1em" }}>{student.dni}</div>
              </Grid>
              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Birthday:</div>
                <div style={{ marginLeft: "1em" }}>{moment.utc(student.birthday).format("DD/MM/YYYY")}</div>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <div>
                <h5>Student Doesn´t Exist</h5>
              </div>
            </Grid>
          )}
        </Grid>
      </Paper>

      {student?.Enrollments?.length > 0 && (
        <Paper sx={{ p: 2, mt: 2, display: "flex", flexDirection: "row" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
                <h3>Enrollments</h3>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {student?.Enrollments.map((row) => (
                      <TableRow key={row.course.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.course.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      )}

      {student?.Parents?.length > 0 && (
        <Paper sx={{ p: 2, mt: 2, display: "flex", flexDirection: "row" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
                <h3>Parents</h3>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Surename</TableCell>
                      <TableCell>Dni</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {student?.Parents.map((row) => (
                      <TableRow key={row.parent.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.parent.name}
                        </TableCell>
                        <TableCell>{row.parent.surename}</TableCell>
                        <TableCell>{row.parent.dni}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      )}

      <CustomDialog open={showDialogEnrollment} setOpen={setShowDialogEnrollment} title="Enrollment to a course">
        {coursesList.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesList.map((row) => (
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => onHandleEnrollmentClick(row.id)}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CustomDialog>

      <CustomDialog open={showDialogParent} setOpen={setShowDialogParent} title="Add Family">
        {studentList.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Surename</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentList.map((row) => (
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.surename}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => onHandleAddFamilyClick(row.id)}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CustomDialog>
    </>
  );
};

export default StudentDetail;
