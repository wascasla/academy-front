import { courses, students } from '@/api'
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const CourseAdd = () => {
  const router = useRouter()
  
  const [loading, setLoading] = useState(false);
  const [formEnabled, setFormEnabled] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
  });

  const onInputchange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await courses.createCourse(formValues);
      if (response.status === 201) {
        toast.success(response.data.message)
        router.push("/courses")
      } else {
        toast.error("Something is wrong, try again")
      }
      
    } catch (error) {
      toast.error("Error: "+error.response.data.message.errors[0].message)
      
    }
  }

  const goToCourseDetail = () => {
    router.push("/courses")
  }
  

  return ( <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant='h4' mb={2} >Edit Course</Typography>
        <form onSubmit={handleSubmit}>
        <div>
            <TextField
              style={{ marginBottom: "1em", width: "50%" }}
              type="text"
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              size="small"
              onChange={onInputchange}
              disabled={!formEnabled}
              value={formValues.name}
              required
            />
          </div>    
                    
          <Grid
            container
            style={{
              marginUp: "2em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => goToCourseDetail()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
   </Grid>
  )
}

export default CourseAdd