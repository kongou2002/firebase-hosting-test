import React from "react";
import { useEffect, useState, useRef } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";


function MyForm() {
    const myRef = useRef(null);
    const [dataList, setDataList] = useState([{ name: 'Chấn', age: 21 }]);
    const [averageAge, setAverageAge] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [id, setId] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dataList'));
        if (data) {
            setDataList(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('dataList', JSON.stringify(dataList));
    }, [dataList]);
    const calculateAverage = (dataList) => {
        let sum = 0;
        for (let i = 0; i < dataList.length; i++) {
            sum += Number(dataList[i].age);
        }
        return Math.round(sum / dataList.length);
    }
    useEffect(() => {
        setAverageAge(calculateAverage(dataList));
    }, [dataList]);
    const formik = useFormik({
        isInitialValid: false,
        initialValues: {
            name: "",
            age: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            age: Yup.number().required("Required.").positive('Must be a positive number').integer('Must be an integer')
        })
    });
    const handleDelete = (index) => {
        const newDataList = [...dataList];
        newDataList.splice(index, 1);
        setDataList(newDataList);
    };

    const handleUpdate = (index) => {
        const data = dataList[index];
        formik.setValues({ name: data.name, age: data.age });
        setId(index);
        setIsUpdate(true);
        myRef.current.scrollIntoView();
    };

    const handleUpdateSubmit = () => {
        const newDataList = [...dataList];
        const data = formik.values;
        newDataList[id] = { ...newDataList[id], ...data };
        setDataList(newDataList);
        setIsUpdate(false);
        formik.resetForm();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, age } = formik.values;
        const data = { name, age };
        setDataList([...dataList, data]);
        formik.resetForm();
        formik.setFieldTouched('Name', false, false);
        formik.setFieldTouched('Age', false, false);
    }

    return (
        <div>
            <form>
                <Grid container rowSpacing={4} sx={{ padding: "10px" }}>
                    <Grid item xs={12} ref={myRef}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            {...formik.getFieldProps('name')}
                        />
                        {(formik.errors.name && formik.touched.name) ? (<Typography variant="caption" color="red">{formik.errors.name}</Typography>) : null}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Age"
                            variant="outlined"
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            {...formik.getFieldProps('age')}
                        />
                        {formik.errors.age && formik.touched.age ? (<Typography variant="caption" color="red">{formik.errors.age}</Typography>) : null}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Average age: {averageAge}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ marginRight: "2rem" }}>
                        <Button
                            fullWidth
                            type='submit'
                            disabled={!formik.isValid || isUpdate}
                            variant='contained'
                            onClick={handleSubmit}
                        >Add</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            type='submit'
                            disabled={!formik.isValid || !isUpdate}
                            variant='contained'
                            onClick={handleUpdateSubmit}
                        >Update</Button>
                    </Grid>
                </Grid>
            </form>
            Search by name: <br /> <br />
            <TextField sx={{ maxWidth: "300px" }}
                label="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {dataList.length > 0 && (
                <List>
                    {dataList
                        .filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((data, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Name: ${data.name}`}
                                    secondary={`Age: ${data.age}`}
                                />
                                <Button onClick={() => handleUpdate(index)}>Update</Button>
                                <Button onClick={() => handleDelete(index)}>Delete</Button>
                            </ListItem>
                        ))}
                </List>
            )}
        </div>
    )
}

export default MyForm;