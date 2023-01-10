import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import parking_logo_source from "/public/parking.svg";
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import ListIcon from '@mui/icons-material/List';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context/global';
import parkingdashboard_image_source from "../public/Group 4427.png"
import QuestionModal from '../modals/QuestionModal';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import question_logo_source from "../public/question.svg";
import success_logo_source from "../public/success-svgrepo-com.svg";




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    color:
      theme.palette.mode === 'light' ? '#5BADFA' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: '#5BADFA',
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function ParkingDashboard() {

  const { parkingAreaName, parkingAreaAddress, parkingAreaFloor, parkingAreaSlots, parkingSlotNames, calendarRestriction, checkInOptions, earliestDateRestriction, cancellationRestriction, RTE, bookingStart, bookingEnd, paymentRestriction, setParkingStatus, parkingStatus,parkingAreaStatus, setParkingAreaStatus,rows,setRows } = useGlobalContext()
  const router = useRouter();
  const week = [1, 2, 3, 4, 5]
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openAreaStatus, setOpenAreaStatus] = React.useState(false);
  const [openCheckArea, setOpenCheckArea] = React.useState(false)

  // const [selected, setSelected] = React.useState(false);
  // const [selectedParking, setSelectedParking] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filterActive, setFilterActive] = React.useState();
  const handleChangeFilterActive = (event) => {
    setFilterActive(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    router.push("/AddParkingManually")
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#3D4E5D',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#EDF3F8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



  function createData(parkingAreaName, address, status, action) {
    return { parkingAreaName, address, status, action };
  }

  
  // const rows = [];
  // const [rows,setRows] = React.useState(Array.from(Array(parkingAreaName.length), (_,i) => createData(parkingAreaName[i], parkingAreaAddress[i], activeArray[i], 'pj')))
  const [activeArray, setActiveArray] = React.useState(Array.from(Array(parkingAreaName.length), () => "Active"));
  const [parkingSelected, setParkingSelected] = React.useState(Array.from(Array(parkingAreaName.length), () => false))
  // const [rows, setRows] = React.useState(Array.from(Array(parkingAreaName.length), (_, i) => createData(parkingAreaName[i], parkingAreaAddress[i], activeArray[i], 'pj')))
  // const rows = Array.from(Array(parkingAreaName.length), (_, i) => createData(parkingAreaName[i], parkingAreaAddress[i], activeArray[i], 'pj'))

  useEffect(()=>{setRows(Array.from(Array(parkingAreaName.length), (_, i) => createData(parkingAreaName[i], parkingAreaAddress[i], activeArray[i], 'pj')))},[])
  async function patchParkingStatus(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const changeToInactive = (e) => {
    // Map over the parkingSelected array and toggle the value at index `e`
    const newParkingAreaStatus = parkingSelected.map((status, index) =>
      index === e ? !status : status
    );
    // Update the parkingSelected state with the new array
    setParkingSelected(newParkingAreaStatus);

    // Map over the activeArray array and update the value at index `e` based on the value in newParkingAreaStatus
    const newStatusList = activeArray.map((status, index) =>
      newParkingAreaStatus[index] ? "Inactive" : "Active"
    );
    // Update the activeArray state with the new array
    setActiveArray(newStatusList);
    // setParkingAreaStatus(newStatusList)
    setParkingAreaStatus(newStatusList);


    (week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => 
      patchParkingStatus('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
        {
          "parkingArea": parkingAreaName[e],
          "calendarRestriction": day + week,
          "updateKey": "parkingAreaStatus",
          "updateValue": newStatusList[e]
        })
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        })))))
  }


  function redirectToServiceSetting() {
    router.push('/EditServiceSetting')
  }

  function redirectToReview() {
    router.push('/EditReview')
  }

  function routeToParkingArea(index) {
    router.push({
      pathname: '/parkingArea',
      query: {
        index
      }
    })
  }
  const array = []
  const timeArray = ['7:00AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',
    '12:00 AM',]
  for (let i = 0; i <= 47; i++) {
    // Add each number to the array
    array.push(i);
  }

  const obj = Object.assign({}, array, timeArray)
  let serviceSchedule = calendarRestriction.map((day, dayIndex) => (
    <Box key={day} sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ width: 100 }}>
        <Typography>{day}</Typography>
      </Box>
      <Typography sx={{ ml: 5 }}>{obj[bookingStart[dayIndex]]}</Typography>
      <Typography sx={{ ml: 1 }}>-</Typography>
      <Typography sx={{ ml: 1 }}>{obj[bookingEnd[dayIndex]]}</Typography>
    </Box>

  ))

  // useEffect(() => {
  //   {
  //     !parkingStatus ? (week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (
  //       patchParkingStatus('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
  //         {
  //           "parkingArea": parkingArea,
  //           "calendarRestriction": day + week,
  //           "updateKey": "parkingStatus",
  //           "updateValue": !parkingStatus
  //         })
  //         .then((data) => {
  //           console.log(data); // JSON data parsed by `data.json()` call
  //         })))))))) : null
  //   }
  // }, [parkingStatus])
  const clickToActivate = () => {
   parkingStatus === true ? (week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (
            patchParkingStatus('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
              {
                "parkingArea": parkingArea,
                "calendarRestriction": day + week,
                "updateKey": "parkingStatus",
                "updateValue": true
              })
              .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
              })))))))) : setParkingStatus(true)
  }

  async function deleteParking(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const deleteParkingArea = (area) => {

    (week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (
      deleteParking('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
        {
          "parkingArea": parkingAreaName[area],
          "calendarRestriction": day + week,
        })
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        }))))))

    parkingAreaName.splice(area, 1);
    parkingAreaAddress.splice(area, 1);
    parkingAreaFloor.splice(area, 1);
    parkingAreaSlots.splice(area, 1);
    parkingSlotNames.splice(area, 1);
    const newRows = [...rows]
    newRows.splice(area, 1);
    setRows(newRows)
  }
  // console.log(rows)


  let tableCells = rows.map((row, rowIndex) => (
    <StyledTableRow key={row.parkingAreaName}>
      <StyledTableCell component="th" scope="row" >
        {activeArray[rowIndex] === "Active" ?
          <Button style={{ textDecoration: 'none', color: 'black', fontSize: 16 }} onClick={() => routeToParkingArea(row.parkingAreaName)}>{row.parkingAreaName ? row.parkingAreaName : "Not Specified"}</Button>
          :
          <Typography sx={{ ml: 1.9, fontSize: 16, letterSpacing: 0.5 }}>{row.parkingAreaName ? row.parkingAreaName : "Not Specified"}</Typography>
        }

      </StyledTableCell>
      {row.address ?
        (<StyledTableCell align="left" sx={{ fontSize: 16 }}>{row.address}</StyledTableCell>) :
        (<StyledTableCell sx={{ fontStyle: 'italic' }}>Not specified</StyledTableCell>)}
      {/* <StyledTableCell align="left" sx={{ fontSize: 16 }}>{row.address ? row.address : "Not specified"}</StyledTableCell> */}
      <StyledTableCell align="left">
        <Box sx={{ width: 100 }}>
          {!parkingStatus ? (parkingAreaStatus[rowIndex] === "Inactive" ? (<CircleIcon sx={{ fontSize: 10, color: '#FF0000', mt: 1 }} />) : (<CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />)) : (<CircleIcon sx={{ fontSize: 10, color: '#FF0000', mt: 1 }} />)}
          <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5, color: 'grey' }} gutterBottom>
            {/* {!parkingStatus?(selectedParking ? "Inactive" : "Active"):"Inactive"} */}
            {!parkingStatus ? parkingAreaStatus[rowIndex] : "Inactive"}
            {/* {activeArray[rowIndex]} */}
            {/* {selectedParking ? "Inactive" : "Active"} */}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">
        <ToggleButton
          value="check"
          // selected={selectedParking}
          selected={parkingSelected[rowIndex]}
          // onChange={() => {
          //   // setSelectedParking(!selectedParking);
          //   changeToInactive(rowIndex)
          // }}
          onClick={() => { changeToInactive(rowIndex) }}
          sx={{ borderWidth: 0 }}
        >
          <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to inactive</Typography>
        </ToggleButton>
        {/* <Button style={{color: 'black', fontSize: 16 }} onClick={() => routeToParkingArea(row.parkingAreaName)}>Switch to inactive</Button> */}
        <Button
          sx={{ borderWidth: 0 }}
          onClick={() => deleteParkingArea(rowIndex)}
        >
          <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Delete</Typography>
        </Button>
        {/* <Button style={{color: 'black', fontSize: 16 }} onClick={() => routeToParkingArea(row.parkingAreaName)}>Delete</Button> */}
      </StyledTableCell>
    </StyledTableRow>
  ))


  return (
    <React.Fragment>
      <Box sx={{ width: "90%", height: "5%", ml: '5%', mr: '5%', mt: '8%', borderRadius: '50%' }}>
        <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
          <Image src={parking_logo_source} alt="company_logo" width={175} height={65} style={{ position: 'absolute', marginTop: 30, width: '105px', marginLeft: 30 }} />
          <Box sx={{ display: 'flex', flexDireciton: 'row' }}>
            <Typography component="h3" variant="h3" align="left" sx={{ ml: 19.5, color: 'black', fontWeight: 'bold' }}>
              Parking
            </Typography>
            <ToggleButton
              value="check"
              selected={parkingStatus}
              onChange={() => {
                // setSelected(!parkingStatus);
                setParkingStatus(!parkingStatus);
              }}
              onClick={()=>{clickToActivate()}}
              sx={{ ml: 'auto', borderColor: '#61B6EC' }}
            >
              {parkingStatus ? (<Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to active</Typography>) : (<Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to inactive</Typography>)}
            </ToggleButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 20 }}>
            <Typography component="h6" variant="h6" sx={{ color: 'black' }} >
              Status
            </Typography>
            <Typography component="h6" variant="h6" sx={{ ml: 10, color: 'black' }} >
              Company site
            </Typography>
            <Typography component="h6" variant="h6" sx={{ ml: 10, color: 'black' }} >
              Description
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 20 }}>
            <Box sx={{ width: 100 }}>
              {parkingStatus ? (<CircleIcon sx={{ fontSize: 10, color: '#FF0000', mt: 1 }} />) : (<CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />)}
              <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5, color: 'grey' }} gutterBottom>
                {parkingStatus ? "Inactive" : "Active"}
              </Typography>
            </Box>
            <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 5, color: 'grey' }} gutterBottom>
              The Globe Tower
            </Typography>
            <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 10, color: 'grey' }} gutterBottom>
              Fixed rate car parking slots for our Ka-globe
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '90%', margin: 'auto' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Parking areas" {...a11yProps(0)} sx={{ fontSize: '21px' }} />
          <Tab label="Service settings" {...a11yProps(1)} sx={{ fontSize: '21px' }} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: '5%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div></div>
          <Box sx={{ ml: 'auto', mr: '4%' }}>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ width: 250, height: 50, backgroundColor: '#5BADFA', fontSize: 17 }}
            >
              Add new parking area
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <ListIcon />
                List manually
              </MenuItem>
              {/* <MenuItem onClick={handleClose} disableRipple>
                <UploadIcon />
                Bulk upload
              </MenuItem> */}
            </StyledMenu>
          </Box>
        </Box>
        <TableContainer sx={{ width: '93%', margin: 'auto', mt: 2 }} component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow >
                <StyledTableCell sx={{ fontSize: 17 }}>Parking area name</StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 17 }}>Address</StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 17 }}>Status</StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 17 }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableCells}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper variant="outlined" sx={{ ml: '4%', my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA', width: '55%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 17 }}>Service details</Typography>
            <Button variant="text" sx={{ ml: '80%', textDecoration: 'underline' }} onClick={redirectToServiceSetting}>Edit</Button>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>Service schedule</Typography>
            <div>{serviceSchedule}</div>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Check-in options</Typography>
            {/* <div>{serviceFee}</div> */}
            <div>{checkInOptions}</div>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ ml: '4%', my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA', width: '55%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 17 }}>Rules & guidelines</Typography>
            <Button variant="text" sx={{ ml: '77%', textDecoration: 'underline' }} onClick={redirectToReview}>Edit</Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Cost of service booking</Typography>
            <Typography>{paymentRestriction}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Earliest date employees can book</Typography>
            <Typography>{earliestDateRestriction} days before the booking</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Cancellation deadline</Typography>
            <Typography>{cancellationRestriction} minutes before the booking</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Policies</Typography>
            <Typography>{RTE}</Typography>
          </Box>
        </Paper>
      </TabPanel>

      <Image src={parkingdashboard_image_source} alt="success_logo" width={500} style={{ position: 'relative', marginLeft: "74%", paddingTop: '3%', backgroundColor: 'transparent' }} />
      {parkingStatus ? ((<QuestionModal
        title="Switch Parking service to inactive?"
        body="Making this service inactive will automatically disable all parking areas"
        status={parkingStatus}
        successTitle='Service set up complete!'
        successBody='You may now start managing the service you just finished setting up'
      />)) : null}






    </React.Fragment>

  )
}