import { courses, students } from "@/api";
import DataTable from "@/components/dataTable/DataTable";
import Title from "@/components/Title";
import { Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from 'next/router'
import Link from "next/link";

export default function Courses() {

  const [coursesList, setCoursesList] = useState([]);
  const router = useRouter()

  const columnsStudents = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 140,
      valueGetter: ({ value }) =>
        value && moment.utc(value).format("DD/MM/yyyy"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Options",
      width: 100,
      getActions: (params) => [
          <Link href={{
            pathname: '/courses/[courseId]',
            query: { courseId: params.id },
          }}>Detail</Link>
      ],
    },
  ];

  const getCourses = async () => {
    const response = await courses.getAllCourses();
    setCoursesList(response.data.data)
  }

  useEffect(() => {
    getCourses()
  }, [])
  

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Courses</Title>
        <Grid item xs={12}>
          <Button style={{marginBottom:"1em"}} variant="contained">Add</Button>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            columns={columnsStudents}
            loading={false}
            rows={coursesList || []}
            getRowIdData={(row) => row.id}
            onPagination={"client"}
            title={""}
            checkboxSelection={false}
          />
        </Grid>
      </Paper>
    </Grid>
  );
}
