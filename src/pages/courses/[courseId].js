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

const CourseDetail = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [course, setCourse] = useState();

  const getCourse = async () => {
    const response = await courses.getCourseById(courseId);
    if (response.data.data.id > 0) {
      setCourse(response.data.data);
    } else setCourse(undefined);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  const onEdit = () => {
    router.push("/courses/edit/" + courseId);
  };

  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "row" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <h2>Course</h2>
            </div>
          </Grid>
          {course !== undefined ? (
            <>
              <Grid item xs={4} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <Button style={{ marginBottom: "1em" }} onClick={() => onEdit()} variant="contained">
                  Edit
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Name:</div>
                <div style={{ marginLeft: "1em" }}>{course.name}</div>
              </Grid>
              <Grid item xs={12} sx={{ p: 1, display: "flex", flexDirection: "row" }}>
                <div>Date:</div>
                <div style={{ marginLeft: "1em" }}>{moment.utc(course.createdAt).format("DD/MM/yyyy")}</div>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <div>
                <h5>Course Doesn´t Exist</h5>
              </div>
            </Grid>
          )}
        </Grid>
      </Paper>

      {course?.Enrollments?.length > 0 && (
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
                      <TableCell>Surename</TableCell>
                      <TableCell>Dni</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {course?.Enrollments.map((row) => (
                      <TableRow key={row.student.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.student.name}
                        </TableCell>
                        <TableCell>{row.student.surename}</TableCell>
                        <TableCell>{row.student.dni}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default CourseDetail;
