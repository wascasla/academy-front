import { students } from "@/api";
import DataTable from "@/components/dataTable/DataTable";
import Title from "@/components/Title";
import { Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from 'next/router'
import Link from "next/link";
import SearchCustom from "@/components/searchCustom";

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
    { field: "surename", headerName: "Surename", width: 80 },
    { field: "dni", headerName: "DNI", width: 80 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "gender", headerName: "Gender", width: 80 },
    {
      field: "birthday",
      headerName: "birthday",
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
          <Link key={params.id} href={{
            pathname: '/students/[studentId]',
            query: { studentId: params.id },
          }}>Detail</Link>
      ],
    },
  ];

  const getStudents = async () => {
    const response = await students.getAllStudents({
      "name": ""
    });
    setCoursesList(response.data.data)
  }

  useEffect(() => {
    getStudents()
  }, [])

  const goToAdd = () => {
    router.push("students/add")
  }

  const onSearchStudent = async () => {
    const response = await students.getAllStudents({
      "name": searchInput
    });
    setCoursesList(response.data.data)
  }

  const [searchInput, setSearchInput] = useState();
  const onInputSearchchange = (event) => {
    setSearchInput(event.target.value );
  };
  

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Students</Title>
        <Grid item xs={12}>
          <Button style={{marginBottom:"1em"}} onClick={goToAdd} variant="contained">Add</Button>
        </Grid>
        <Grid item xs={12} sx={{mb: 2}}>
          <SearchCustom onSearch={onSearchStudent} onChangeSearch={onInputSearchchange} searchValue={searchInput}  />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            columns={columnsStudents}
            loading={false}
            rows={coursesList || []}
            getRowIdData={(row) => row.id}
            onPagination={false}
            title={""}
            checkboxSelection={false}
          />
        </Grid>
      </Paper>
    </Grid>
  );
}