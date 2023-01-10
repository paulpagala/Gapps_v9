import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { Button, Link } from '@mui/material';
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import copy_logo from "/public/clone,-copy,-document,-file.svg";
import Image from 'next/image'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
//
import useLocalStorage from '../hooks/useLocalStorage';
import Router, { useRouter } from 'next/router';
import { useGlobalContext } from '../context/global';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';




export default function PolicyDetails() {
  const { setParkingAreaName, setParkingAreaAddress, setParkingAreaFloor, setParkingAreaSlots, setParkingSlotNames, parkingAreaName, parkingAreaAddress, parkingAreaFloor, parkingAreaSlots, parkingSlotNames,parkingAreaStatus,setParkingAreaStatus} = useGlobalContext();
  // const [addParking, setAddParking] = React.useState('');

  // const handleChangeAddParking = (event) => {
  //   setAddParking(event.target.value);
  //   addParkingArea(),
  //     addParkingFloor()
  // };

  const [parkingArea, setParkingArea] = React.useState([]);
  const handleChangeParkingArea = (index, event) => {
    const newParkingAreaArray = [...parkingArea]
    newParkingAreaArray[index] = event.target.value
    setParkingArea(newParkingAreaArray);
    setParkingAreaName(newParkingAreaArray)
  };

  const [changeAddress, setChangeAddress] = React.useState([]);
  const handleChangeAddress = (index, event) => {
    const newParkingAreaAddressArray = [...changeAddress]
    newParkingAreaAddressArray[index] = event.target.value
    setChangeAddress(newParkingAreaAddressArray);
    setParkingAreaAddress(newParkingAreaAddressArray)
  };


  const [areaFloorField, setAreaFloorField] = React.useState([]);
  const [arrayParkingAreaFloor, setArrayParkingAreaFloor] = React.useState([])
  // const [arrayParkingAreaF]


  const handleChangeAreaFloor = (indexParkingArea, indexParkingFloor, event) => {
    const newFloor = [...areaFloorField]
    newFloor[indexParkingFloor] = event.target.value
    setAreaFloorField(newFloor);


    const newArrayFloor = [...arrayParkingAreaFloor];
    newArrayFloor[indexParkingArea] = newFloor;
    setArrayParkingAreaFloor(newArrayFloor);
    setParkingAreaFloor(newArrayFloor);

  };

  const [numberOfSlots, setNumberOfSlots] = React.useState([]);
  const [arrayParkingSlots, setArrayParkingSlots] = React.useState([])

  const handleChangeNumberOfSlots = (indexParkingArea, indexParkingFloor, event) => {
    // setNumberOfSlots(event.target.value);
    // setParkingAreaSlots(event.target.value)
    const newSlots = [...numberOfSlots]
    newSlots[indexParkingFloor] = event.target.value
    setNumberOfSlots(newSlots);


    const newArraySlots = [...arrayParkingSlots];
    newArraySlots[indexParkingArea] = newSlots;
    setArrayParkingSlots(newArraySlots);
    setParkingAreaSlots(newArraySlots);
  };

  // const arrayParkingFields = arrayParkingSlots.map((x) =>
  //   x.map((element) => Array.from({ length: element }, (_, i) => i + 1))
  // );

  //  [[2,1],[3,2]] to [[[1,2],[1]],[[1,2,3],[1,2]]]
  const arrayParkingFields = arrayParkingSlots.map(subarray => {
    return subarray.map(value => [[value], subarray]);
  });

  const arrayParking = arrayParkingFields.map((x) =>
    x.map((y) =>
      y.map((element) => Array.from({ length: element }, (_, i) => i + 1))
    )
  );

  //To add name to slots
  // const [state, setState] = React.useState({
  //   slots: false,
  // });

  // const handleChangeSlots = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  // const { slots } = state;

  const [slots, setSlotsChecked] = React.useState(false);

  const handleChangeSlots = (event) => {
    setSlotsChecked(event.target.checked);
  };


  const array = [];
  for (let i = 1; i <= numberOfSlots; i++) {
    // Add each number to the array
    array.push(i);
  }

  // const [fieldValues, setFieldValues] = React.useState([]);


  // // Function to handle changes to the text field values
  // const handleFieldValuesChange = (index, event) => {
  //   // Create a copy of the field values array
  //   const newFieldValues = [...fieldValues];

  //   // Update the value at the specified index
  //   newFieldValues[index] = event.target.value;

  //   // Update the state variable with the new field values array
  //   setFieldValues(newFieldValues);
  //   setParkingSlotNames(newFieldValues);
  // };
  const [fieldValues, setFieldValues] = React.useState([]);
  const [arrayFields, setArrayFields] = React.useState([]);
  const [parkingAreaFields, setparkingAreaFields] = React.useState([]);

  // Function to handle changes to the text field values
  const handleFieldValuesChange = (
    indexParkingArea,
    indexParkingFloor,
    indexFields,
    event
  ) => {
    // Create a copy of the field values array

    const newFieldValues = [...fieldValues];

    // Update the value at the specified index
    newFieldValues[indexFields] = event.target.value;

    // Update the state variable with the new field values array
    setFieldValues(newFieldValues);

    const newArray = [...arrayFields];
    newArray[indexParkingFloor] = newFieldValues;
    setArrayFields(newArray);

    const newParking = [...parkingAreaFields];
    newParking[indexParkingArea] = newArray;
    setparkingAreaFields(newParking);
    setParkingSlotNames(newParking)
  };
  // Use the map method to create TextField components
  // let textFields = arrayParkingFields[indexParkingFloor].map((value, index) => (
  //   <Box key={index} sx={{ mb: 3, display: 'flex', flexDirection: "column", alignItems: 'left', alignContent: 'stretch', ml: 2 }}>
  //     <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Slot name {index + 1}</Typography>
  //     <TextField
  //       key={index + 1}
  //       onChange={(event) => handleFieldValuesChange(index, event)}
  //       variant="outlined"
  //       sx={{ backgroundColor: 'white', width: 326 }}
  //       placeholder="Enter Slot Name"
  //     />
  //   </Box>
  // ));

  // let textFields = arrayParkingFields[indexParkingFloor].map((indexFields) => (
  //   <Box key={index} sx={{ mb: 3, display: 'flex', flexDirection: "column", alignItems: 'left', alignContent: 'stretch', ml: 2 }}>
  //     <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Slot name {indexFields + 1}</Typography>
  //     <TextField
  //       key={index + 1}
  //       onChange={(event) => handleFieldValuesChange( 
  //         indexParkingArea,
  //         indexParkingFloor,
  //         indexFields, event)}
  //       variant="outlined"
  //       sx={{ backgroundColor: 'white', width: 326 }}
  //       placeholder="Enter Slot Name"
  //     />
  //   </Box>
  // ));







  // FOR DUPLICATES
  const duplicates = fieldValues.filter((value, index) => fieldValues.indexOf(value) !== index);

  const seenValues = {};

  // Create an array to store the indexes of duplicate elements and their original index
  const duplicateIndexes = [];

  // Loop over array elements
  for (let i = 0; i < fieldValues.length; i++) {
    const element = fieldValues[i];

    // If the element has already been seen, add the index and the original index to the array
    if (seenValues[element]) {
      duplicateIndexes.push([i, seenValues[element]]);
    } else {
      // Otherwise, add the element to the object so we know it has been seen
      seenValues[element] = i;
    }
  }
  // FOR DUPLICATES

  // FOR BULK
  // const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
  //   // Disable click and keydown behavior
  //   noClick: true,
  //   noKeyboard: true,
  //   accept: {
  //     'excel': ['.xlsx', '.xls'],
  //     'csv': ['.csv'],
  //   }
  // });

  // const files = acceptedFiles.map(file => (

  //   <li key={file.path} style={{ borderStyle: 'solid', borderRadius: 7, borderColor: '#C8D7E2', backgroundColor: '#EFF9FF', color: 'black', fontSize: 18, padding: 12, display: 'block', maxWidth: '45%' }}>
  //     <Image src={copy_logo} alt="copy_logo" width={'15%'} height={'15%'} /> {file.path} <span class="close" style={{ marginLeft: '30%', cursor: 'pointer' }}>&times;</span>
  //   </li>

  // ));

  // var closebtns = document.getElementsByClassName("close");
  // var i;

  // for (i = 0; i < closebtns.length; i++) {
  //   closebtns[i].addEventListener("click", function () {
  //     this.parentElement.style.display = 'none';
  //   });
  // }
  //FOR BULK


  const [newParkingArea, setNewParkingArea] = React.useState([])
  const addParkingArea = () => {
    setNewParkingArea([...newParkingArea, newParkingArea.length + 1])
    // parkingAreaStatus.push("Active")
    setParkingAreaStatus(Array.from(Array(newParkingArea.length+1), () => "Active"))
  }

  const [newParkingFloor, setNewParkingFloor] = React.useState([])
  const addParkingFloor = () => {
    setNewParkingFloor([...newParkingFloor, newParkingFloor.length + 1])
  }
  const deleteFloor = (floor) => {
    arrayFields.splice(floor - 1, 1)
    numberOfSlots.splice(floor - 1, 1)
    areaFloorField.splice(floor - 1, 1)
    // newParkingFloor.splice(floor-1,1)
    setNewParkingFloor(newParkingFloor.filter(floorparking => floorparking !== floor))
  }

  const deleteParkingArea = (area) => {
    parkingArea.splice(area - 1, 1)
    changeAddress.splice(area - 1, 1)

    parkingAreaFields.splice(area - 1, 1)
    arrayParkingSlots.splice(area - 1, 1)
    arrayParkingAreaFloor.splice(area - 1, 1)

    parkingAreaName.splice(area - 1, 1)
    parkingAreaAddress.splice(area - 1, 1)
    parkingAreaFloor.splice(area - 1, 1)
    parkingAreaSlots.splice(area - 1, 1)
    parkingSlotNames.splice(area - 1, 1)
    parkingAreaStatus.splice(area - 1, 1)


    setNewParkingArea(newParkingArea.filter(areaparking => areaparking !== area))
  }

  // console.log(numberOfSlots)

  // console.log(newParkingFloor)

  // const dictionary = {};
  // for (let i = 0; i < parkingArea.length; i++) {
  //   dictionary[parkingArea[i]] = arrayParkingAreaFloor[i];
  // }


  // const deleteFloor = (floor) =>
  //   const indexofparkingfloor = newParkingFloor.indexOf(floor)
  //   console.log(newParkingFloor.splice(indexofparkingfloor+1,1))
  //   // console.log(indexofparkingfloor)
  //   console.log(newParkingFloor.indexOf(floor))
  //   console.log(newParkingFloor)
  // }

  let createParkingAreas = newParkingArea.map((indexParkingArea) => (
    <Box sx={{ mb: "4%", mt: 2 }} key={indexParkingArea - 1} >
      <Paper variant="outlined" sx={{ my: { md: 0, lg: 0 }, p: { md: 2, lg: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {indexParkingArea === 1 ? <Typography sx={{ ml: 3, fontWeight: 'bold' }}>Parking areas & slots</Typography> : <div></div>}
          {indexParkingArea > 1 ? (<IconButton sx={{ color: '#6F8191' }} onClick={() => deleteParkingArea(indexParkingArea)}><CloseIcon /></IconButton>) : null}
        </Box>
        <Box sx={{ ml: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom> Parking area name </Typography>
          <TextField
            id="outlined-address"
            // label="Address (optional)"
            // value={parkingArea}
            onChange={(event) => handleChangeParkingArea(indexParkingArea - 1, event)}
            variant="outlined"
            sx={{ width: 500 }}
            placeholder="Enter parking area name"
          />
        </Box>
        <Box sx={{ ml: 3, mt: 2 }}>
          <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom> Address <em>(optional)</em></Typography>
          <TextField
            id="outlined-parkingarea"
            // label="Address (optional)"
            // value={changeAddress}
            onChange={(event) => handleChangeAddress(indexParkingArea - 1, event)}
            variant="outlined"
            sx={{ width: 900 }}
            placeholder="Enter address"
          />
        </Box>
        <Box >
          {newParkingFloor.map((indexParkingFloor) => (
            <Paper variant="outlined" sx={{ mr: 3, ml: 3, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }} key={indexParkingFloor}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Area floor</Typography>
                {indexParkingFloor > 1 ? (<IconButton sx={{ color: '#6F8191' }} onClick={() => deleteFloor(indexParkingFloor)}><CloseIcon /></IconButton>) : null}
                {/* <Button sx={{color:'#6F8191'}} onClick={()=>deleteFloor(indexParkingFloor)}>X</Button> */}
              </Box>
              <TextField
                id="outlined-AreaFloor"
                label="Area floor"
                // value={areaFloor}
                // onChange={handleChangeAreaFloor}
                onChange={(event) =>
                  handleChangeAreaFloor(
                    indexParkingArea - 1,
                    indexParkingFloor - 1,
                    // indexParkingFloorField-1,
                    event
                  )
                }
                variant="outlined"
                placeholder="E.g. P1"
                sx={{ backgroundColor: '#FFFFFF' }}

              />
              <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Number of slots</Typography>
              <TextField
                id="outlined-number"
                // label="Number of Slots"
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                // value={numberOfSlot}
                onChange={(event) =>
                  handleChangeNumberOfSlots(
                    indexParkingArea - 1,
                    indexParkingFloor - 1,
                    // indexParkingFloorField-1,
                    event
                  )
                }


                sx={{ backgroundColor: '#FFFFFF' }}
                inputProps={{ min: 0 }}
                placeholder="0"
              />
              <br />
              {/* {typeof (arrayParkingSlots[indexParkingArea-1]) !== "undefined" ?  (typeof (arrayParkingSlots[indexParkingArea-1][indexParkingFloor-1]) !== "undefined" ?

                <FormControlLabel
                  control={

                    <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                    // <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                  }
                  label="Add name to slots"
                /> : <FormControlLabel
                control={

                  <Checkbox disabled />
                  // <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                }
                label="Add name to slots"
              />)
                : <FormControlLabel
                  control={

                    <Checkbox disabled />
                    // <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                  }
                  label="Add name to slots"
                />} */}
                <FormControlLabel
                  control={

                    <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                    // <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                  }
                  label="Add name to slots"
                /> 


              {slots ? (
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#333E5D' }}
                  >
                    {/* <Typography sx={{ color: 'white' }}>{arrayParkingAreaFloor[indexParkingArea-1][indexParkingFloor-1]} slot names</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper variant="outlined" sx={{ mr: 5, ml: 5, my: { md: 1, lg: 3 }, p: { md: 2, lg: 3 }, backgroundColor: '#EFEFEF' }}>
                      {/* {textFields} */}
                     {typeof (arrayParking[indexParkingArea -1])!== "undefined" ? (typeof (arrayParking[indexParkingArea -1][indexParkingFloor-1]) !== "undefined" ? (arrayParking[indexParkingArea - 1][indexParkingFloor - 1][0].map((indexFields) => (
                        <Box key={indexFields} sx={{ mb: 3, display: 'flex', flexDirection: "column", alignItems: 'left', alignContent: 'stretch', ml: 2 }}>
                          <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Slot name {indexFields}</Typography>
                          <TextField
                            key={indexFields}
                            onChange={(event) => handleFieldValuesChange(
                              indexParkingArea - 1,
                              indexParkingFloor - 1,
                              indexFields - 1, event)}
                            variant="outlined"
                            sx={{ backgroundColor: 'white', width: 326 }}
                            placeholder="Enter Slot Name"
                          />
                        </Box>
                      ))):null):null}
                      {/* {arrayParking[indexParkingArea - 1][indexParkingFloor - 1][0].map((indexFields) => (
                        <Box key={indexFields} sx={{ mb: 3, display: 'flex', flexDirection: "column", alignItems: 'left', alignContent: 'stretch', ml: 2 }}>
                          <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Slot name {indexFields}</Typography>
                          <TextField
                            key={indexFields}
                            onChange={(event) => handleFieldValuesChange(
                              indexParkingArea - 1,
                              indexParkingFloor - 1,
                              indexFields - 1, event)}
                            variant="outlined"
                            sx={{ backgroundColor: 'white', width: 326 }}
                            placeholder="Enter Slot Name"
                          />
                        </Box>
                      ))} */}

                      <Box sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}>



                        {/* {duplicates.length > 0 && <Typography>There are duplicate values in the slot names!</Typography>} */}
                        {/* {duplicateIndexes} */}
                        {/* {duplicates} */}
                      </Box>
                    </Paper>
                  </AccordionDetails>
                </Accordion>)
                :
                null}
            </Paper>
          ))}
        </Box>

        {/* </Box> */}
        <Button variant='text' sx={{ textDecoration: 'underline', ml: '2%' }} onClick={addParkingFloor}>
          + Add another area floor
        </Button>
      </Paper>


    </Box>
  ))
  // console.log(newParkingArea)
  // console.log(parkingArea)
  // console.log(changeAddress)
  // console.log(arrayParkingAreaFloor)

  // const dictionary = {};
  // for (let i = 0; i < parkingArea.length; i++) {
  //   dictionary[parkingArea[i]] = arrayParkingAreaFloor[i];
  // }
  // // console.log(arrayParkingAreaFloor)
  // console.log(dictionary)
  // console.log(arrayParkingSlots)
  // console.log(arrayParking)
  // console.log(arrayParkingAreaFloor)
  // console.log(indexParkingArea)
  // console.log(parkingAreaFields)
  // console.log(newParkingArea)
  useEffect(() => {
    addParkingArea(),
      addParkingFloor()
  }, []);

console.log(fieldValues,arrayFields,parkingAreaFields)


  // console.log(arrayParkingAreaFloor,arrayParkingSlots,parkingAreaFields)

  return (
    <React.Fragment>
      {createParkingAreas}
      {/* <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
        <Box>
          <Typography sx={{ ml: 3, fontWeight: 'bold' }}>Parking areas & slots</Typography>
          <Typography sx={{ ml: 3, mt: 2 }}>Select how you will add your parking areas</Typography>
        </Box>
        <FormControl sx={{ ml: 3, display: 'block' }}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={addParking}
            onChange={handleChangeAddParking}
          >
            <FormControlLabel value="list" control={<Radio />} label="List manually" />
            <FormControlLabel value="bulk" control={<Radio />} label="Upload bulk list" />
          </RadioGroup>
        </FormControl>
      </Paper> */}


      {/* {addParking === "list" ?
        (
          <Box>
            {createParkingAreas}
          </Box>
        )
        : null
      } */}



      {/* {addParking === 'bulk' ?
        (
          <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
            <Typography component="b1" variant="b1" sx={{ color: 'black' }} gutterBottom>
              Upload list of available parking areas
            </Typography>
            <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'grey', display: 'block' }} gutterBottom>
              Missed the parking areas list template we shared?
            </Typography>
            <Link href='google.com'>Download template</Link>
            <Paper variant="outlined" sx={{ mr: 10, ml: 10, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>
              <Paper variant="outlined" sx={{ mr: 10, ml: 10, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA', borderStyle: 'dashed', borderRadius: 1, borderColor: 'darkgray' }}>
                <center>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drop your file here to upload or</p>
                    <button type="button" onClick={open} style={{ borderStyle: 'solid', borderRadius: 6, borderColor: '#5BADFA', backgroundColor: 'white', color: 'black', fontSize: 15, padding: 12, color: '#5BADFA' }}>
                      Select file from computer
                    </button>
                  </div>
                </center>
              </Paper>
            </Paper>

            <aside>
              <Typography sx={{ ml: 5, mt: 2 }}>File uploaded</Typography>
              <ul>{files}</ul>
            </aside>

          </Paper>)
        : null
      } */}
      {/* {addParking === "list" ? (<Button variant='text' sx={{ textDecoration: 'underline' }} onClick={addParkingArea}>
        + Add another parking area
      </Button>) : null} */}
      <Button variant='text' sx={{ textDecoration: 'underline' }} onClick={addParkingArea}>
        + Add another parking area
      </Button>


    </React.Fragment>
  );
}


