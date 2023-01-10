import * as React from 'react';
import ServiceSetting from './ServiceSetting';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useGlobalContext } from '../context/global';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


export default function AddParkingManually() {
    const { 
        setParkingAreaName, 
        setParkingAreaAddress, 
        setParkingAreaFloor, 
        setParkingAreaSlots, 
        setParkingSlotNames, 
        parkingAreaName, 
        parkingAreaAddress, 
        parkingAreaFloor, 
        parkingAreaSlots, 
        parkingSlotNames, 
        parkingAreaStatus, 
        parkingStatus,
        paymentRestriction,
        cancellationRestriction,
        earliestDateRestriction,
        checkInOptions,
        checkInRestriction,
        checkInAndOutRestriction,
        dailyCheckInRestriction,
        dailyCheckInAndOutRestriction,
        paidAmount,
        gcashNumber,
        calendarRestriction,
        RTE } = useGlobalContext();
    const week = [1,2,3,4,5]
    const router = useRouter()
    const [parkingArea, setParkingArea] = React.useState([]);
    const handleChangeParkingArea = (index, event) => {
        const newParkingAreaArray = [...parkingArea]
        newParkingAreaArray[index] = event.target.value
        setParkingArea(newParkingAreaArray);
        // setParkingAreaName(newParkingAreaArray)
    };

    const [changeAddress, setChangeAddress] = React.useState([]);
    const handleChangeAddress = (index, event) => {
        const newParkingAreaAddressArray = [...changeAddress]
        newParkingAreaAddressArray[index] = event.target.value
        setChangeAddress(newParkingAreaAddressArray);
        // setParkingAreaAddress(newParkingAreaAddressArray)
    };


    const [areaFloorField, setAreaFloorField] = React.useState([]);
    const [arrayParkingAreaFloor, setArrayParkingAreaFloor] = React.useState([])
    const handleChangeAreaFloor = (indexParkingArea, indexParkingFloor, event) => {
        const newFloor = [...areaFloorField]
        newFloor[indexParkingFloor] = event.target.value
        setAreaFloorField(newFloor);

        const newArrayFloor = [...arrayParkingAreaFloor];
        newArrayFloor[indexParkingArea] = newFloor;
        setArrayParkingAreaFloor(newArrayFloor);
        // setParkingAreaFloor(newArrayFloor);

    };

    const [numberOfSlots, setNumberOfSlots] = React.useState([]);
    const [arrayParkingSlots, setArrayParkingSlots] = React.useState([])
    const handleChangeNumberOfSlots = (indexParkingArea, indexParkingFloor, event) => {
        const newSlots = [...numberOfSlots]
        newSlots[indexParkingFloor] = event.target.value
        setNumberOfSlots(newSlots);

        const newArraySlots = [...arrayParkingSlots];
        newArraySlots[indexParkingArea] = newSlots;
        setArrayParkingSlots(newArraySlots);
        // setParkingAreaSlots(newArraySlots);
    };

    const arrayParkingFields = arrayParkingSlots.map(subarray => {
        return subarray.map(value => [[value], subarray]);
    });

    const arrayParking = arrayParkingFields.map((x) =>
        x.map((y) =>
            y.map((element) => Array.from({ length: element }, (_, i) => i + 1))
        )
    );

    const [slots, setSlotsChecked] = React.useState(false);

    const handleChangeSlots = (event) => {
        setSlotsChecked(event.target.checked);
    };


    const array = [];
    for (let i = 1; i <= numberOfSlots; i++) {
        // Add each number to the array
        array.push(i);
    }

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
        // setParkingSlotNames(newParking)
    };


    const [newParkingArea, setNewParkingArea] = React.useState([])
    const addParkingArea = () => {
        setNewParkingArea([...newParkingArea, newParkingArea.length + 1])
    }

    const [newParkingFloor, setNewParkingFloor] = React.useState([])
    const addParkingFloor = () => {
        setNewParkingFloor([...newParkingFloor, newParkingFloor.length + 1])
    }


    const deleteFloor = (floor) => {
        arrayFields.splice(floor - 1, 1)
        numberOfSlots.splice(floor - 1, 1)
        areaFloorField.splice(floor - 1, 1)
        setNewParkingFloor(newParkingFloor.filter(floorparking => floorparking !== floor))
    }

    const deleteParkingArea = (area) => {
        parkingArea.splice(area - 1, 1)
        changeAddress.splice(area - 1, 1)
        parkingAreaFields.splice(area - 1, 1)
        arrayParkingSlots.splice(area - 1, 1)
        arrayParkingAreaFloor.splice(area - 1, 1)

        // parkingAreaName.splice(area - 1, 1)
        // parkingAreaAddress.splice(area - 1, 1)
        // parkingAreaFloor.splice(area - 1, 1)
        // parkingAreaSlots.splice(area - 1, 1)
        // parkingSlotNames.splice(area - 1, 1)
        setNewParkingArea(newParkingArea.filter(areaparking => areaparking !== area))
    }


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
                            </Box>
                            <TextField
                                id="outlined-AreaFloor"
                                label="Area floor"
                                onChange={(event) =>
                                    handleChangeAreaFloor(
                                        indexParkingArea - 1,
                                        indexParkingFloor - 1,
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
                                        event
                                    )
                                }
                                sx={{ backgroundColor: '#FFFFFF' }}
                                inputProps={{ min: 0 }}
                                placeholder="0"
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
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
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Paper variant="outlined" sx={{ mr: 5, ml: 5, my: { md: 1, lg: 3 }, p: { md: 2, lg: 3 }, backgroundColor: '#EFEFEF' }}>
                                            {typeof (arrayParking[indexParkingArea - 1]) !== "undefined" ? (typeof (arrayParking[indexParkingArea - 1][indexParkingFloor - 1]) !== "undefined" ? (arrayParking[indexParkingArea - 1][indexParkingFloor - 1][0].map((indexFields) => (
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
                                            ))) : null) : null}
                                            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
                                            </Box>
                                        </Paper>
                                    </AccordionDetails>
                                </Accordion>)
                                :
                                null}
                        </Paper>
                    ))}
                </Box>
                <Button variant='text' sx={{ textDecoration: 'underline', ml: '2%' }} onClick={addParkingFloor}>
                    + Add another area floor
                </Button>
            </Paper>
        </Box>
    ))

    async function postParkingArea(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

    const saveAddParkingManually = () => {
        parkingAreaName.push(...parkingArea);
        parkingAreaAddress.push(...changeAddress);
        parkingAreaFloor.push(...arrayParkingAreaFloor);
        parkingAreaSlots.push(...arrayParkingSlots);
        parkingSlotNames.push(...parkingAreaFields);
        parkingAreaStatus.push("Active")

        week.map((week,weekIndex)=>(calendarRestriction.map((day,dayIndex)=>(parkingAreaName.map((parkingArea,index)=>(
            postParkingArea('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
              {
                "parkingArea": parkingArea,
                "parkingAddress": parkingAreaAddress[index],
                "dedicateSlots":parseInt(parkingAreaSlots[index].reduce((accumulator,currentValue)=>accumulator + parseInt(currentValue, 10), 0)),
                "slots": parseInt(parkingAreaSlots[index].reduce((accumulator,currentValue)=>accumulator + parseInt(currentValue, 10), 0)),
                "paymentRestriction" : paymentRestriction,
                "paymentAmount": paidAmount,
                "public-key": gcashNumber,
                "cancellationRestriction" : cancellationRestriction,
                "earliestDateRestriction" : earliestDateRestriction,
                "checkInOptions": checkInOptions,
                "checkInHealthRestriction" : checkInRestriction,
                "checkInAndOutHealthRestriction" : checkInAndOutRestriction,
                "dailyCheckInRestriction" : dailyCheckInRestriction,
                "dailyCheckInAndOutRestriction" : dailyCheckInAndOutRestriction,
                "calendarRestriction":day+week,
                "week":week,
                "service":"Parking",
                "parkingStatus":parkingStatus,
                "parkingAreaStatus": parkingAreaStatus[index],
                "RTE":RTE
                // "public-key":"pk_a7b27edb128f36f1584fc5c8e4db8d8f"
              })
              .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
              })
          ))))))

        router.push("/parkingDashboard")
    }

    React.useEffect(()=>{
        addParkingArea()
        addParkingFloor()
    },[])


    return (
        //  <React.Fragment>
        <Container component="main" maxWidth="lg" sx={{ mb: 2, ml: 11, mt: '10%' }}>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs separator='>' aria-label="breadcrumb">
                    <Link href='/parkingDashboard' style={{ textDecoration: 'none', color: '#6F8191', fontSize: 19 }}>
                        Parking
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: 19 }}> List parking slots manually</Typography>
                </Breadcrumbs>
            </div>
            <Typography sx={{ mt: '1%', fontWeight: '1000', color: 'black', fontSize: '43px' }}>List parking slots manually</Typography>
            <Typography sx={{ mt: '1%', color: 'black', fontSize: '21px' }}>Fill out the fields below to add new parking areas</Typography>
            <div>{createParkingAreas}</div>
            <Box>
            <Button variant='text' sx={{ textDecoration: 'underline' }} onClick={addParkingArea}>
                + Add another parking area
            </Button>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
            <div></div>
            <Button variant='contained' sx={{width:180}} onClick={saveAddParkingManually}>Save</Button>
            </Box>
        </Container>
        // {/* </React.Fragment>    */}
    )
}