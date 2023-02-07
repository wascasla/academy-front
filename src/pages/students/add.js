import { students } from '@/api'
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const Add = () => {
  const router = useRouter()
 
  const [formEnabled, setFormEnabled] = useState(true);
  const [formValues, setFormValues] = useState({
    name: ""
  });
  const [gender, setGender] = useState();

  const onInputchange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    formValues.gender = gender;
    try {
      const response = await students.createStudent(formValues);
      if (response.status === 201) {
        toast.success(response.data.message)
        router.push("/students")
      } else {
        toast.error("Something is wrong, try again")
      }
      
    } catch (error) {
      toast.error("Error: "+error.response.data.message.errors[0].message)
      
    }
  }

  const cleanForm = () => {
    setFormValues({
      name: ""
    });
    setGender();
  }

  const handleChangeSelectGender = (event) => {
    setGender(event.target.value);
  }; 

  return ( <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant='h4' mb={2} >Add Student</Typography>
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
          <div>
            <TextField
              style={{ marginBottom: "1em", width: "50%" }}
              type="text"
              id="surename"
              name="surename"
              label="Surename"
              variant="outlined"
              size="small"
              onChange={onInputchange}
              disabled={!formEnabled}
            />
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1em", width: "50%" }}
              id="birthday"
              name="birthday"
              label="Birthday"
              variant="outlined"
              size="small"
              type="date"
              placeholder=""
              InputLabelProps={{ shrink: true, required: true }}
              fullWidth
              onChange={onInputchange}
              disabled={!formEnabled}
            />
          </div>          
          <div>
            <TextField
              style={{ marginBottom: "1em", width: "50%" }}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              id="dni"
              name="dni"
              label="Dni"
              variant="outlined"
              size="small"
              onChange={onInputchange}
              required
            />
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1em", width: "50%" }}
              type="text"
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              size="small"
              onChange={onInputchange}
              disabled={!formEnabled}
            />
          </div>
          <div>
          <FormControl
          variant="outlined"
          style={{ width: "50%", marginBottom: "1em" }}
          size='small'
        >
            <InputLabel id="label-gender">Gender</InputLabel>
            <Select
              labelId="label-gender"
              id="gender"
              name='gender'
              value={gender}
              onChange={handleChangeSelectGender}
              label="Gender"
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            </FormControl>
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
                Add
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => cleanForm()}
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

export default Add