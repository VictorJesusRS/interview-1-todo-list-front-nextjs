"use client";

import React from 'react'
import styles from './page.module.css'
import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()
  const defaultData = {
    title: "",
    description: "",
    due_date: null,
    status: "p"
  }

  const [form, setForm] = React.useState(defaultData)
  const [errors, setErrors] = React.useState({
    title: {
      error: false,
      message: "El título es necesario"
    },
  })

  async function onSubmit(event) {
    event.preventDefault()
    let newErrors = errors;
    
    console.log("errors", newErrors)
    if (form.title == "") {
      newErrors.title.error = true;
      setErrors({...newErrors})
      return;
    }else{
      newErrors.title.error = false;
      setErrors({...newErrors})
    }

    console.log("after", newErrors)



    console.log("currentTarget", event.currentTarget)
    console.log("form", form)
    const response = await fetch("http://localhost:8080/tasks", {
      method: 'POST',
      body: JSON.stringify(form),
      headers: 
        {
          "Content-Type": "application/json",
        }
    })
 
    // Handle response if necessary
    const data = await response.json()

    router.push("/")
    
  }

  const goBack = () => {
    router.push("/")
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <main className={styles.main}>
      <div>
        <div>
          <h1>
            Añadir Tarea 
          </h1>
        </div>
        <form>
          <Card className='form-card' sx={{padding: "2rem"}} >
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  error={errors.title.error}
                  required
                  name="title"
                  label="Título"
                  defaultValue=""
                  variant={"outlined"}
                  helperText={errors.title.error ? errors.title.message : "" }
                  onChange={(e) => {
                    console.log("title", e.currentTarget.value)
                    setForm({...form, ...{title: e.currentTarget.value}})
                  }}
                />
                <TextField
                  name="description"
                  label="Descripción"
                  defaultValue=""
                  variant={"outlined"}
                  helperText=""
                  onChange={(e) => {
                    console.log("description", e.currentTarget.value)
                    setForm({...form, ...{description: e.currentTarget.value}})
                  }}
                />
                <DateTimePicker
                  name="due_date"
                  label="Fecha"
                  variant={"standard"}
                  onChange={(value) => {
                    console.log("due_date", new Date(value).toISOString())
                    setForm({...form, ...{due_date: new Date(value).toISOString()}})
                  }}
                />
              </div>
            </Box>
            <Box sx={{padding: "1rem"}}>
              <Button variant="contained" onClick={onSubmit}>
                Guardar
              </Button>
              <Button variant="contained" onClick={goBack} sx={{marginLeft: "1rem"}} color='warning'>
                Cancelar
              </Button>
            </Box>

          </Card>
        </form>
      </div>
    </main>
    </LocalizationProvider>
  )
}
