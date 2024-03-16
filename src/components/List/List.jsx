import React from "react";
import{useState , createRef ,  useEffect } from "react";
import useStyles from './styles1';
import { CircularProgress,Grid,Typography,InputLabel, MenuItem,FormControl , Select, Card } from "@material-ui/core";
import useJsonData from '../useJsonData';


const List1 =({childClicked,markers, isLoading}) => {
    const classes=useStyles();
    const[type, setType] = useState('Delhi');

    console.log({childClicked});
    const[elRefs , setElRefs ]= useState([]);

    useEffect(()=>{
        const refs= Array(markers.length).fill().map((_,i)=> elRefs[i] || createRef());
        setElRefs(refs);
    },[markers])

    
   
    return(
        <div className={classes.container}>
            <Typography variant="h4">List Wise Data</Typography>
            
            <FormControl className={classes.formControl}>
            <InputLabel>State</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value="Delhi">Delhi</MenuItem>
                    <MenuItem value="state1">State1</MenuItem>
                    <MenuItem value="state2">State2</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
                {markers.length>0}
                {markers.map((marker,index)=>(
                    <Grid item key={index} xs={12} ref={elRefs[index]} >
                        <useJsonData marker={marker} selected={Number(childClicked) === index}  refProp={elRefs[index]}/>
                        <Card elevation={5}   className={
                isNaN(marker.nine_month_depletion_rate) ||
                isNaN(marker.value.value_Jan23) ||
                isNaN(marker.value.value_Nov22) ||
                isNaN(marker.value.value_Aug22) ||
                isNaN(marker.value.value_May22)
                  ? classes.cardInsufficientData
                  : marker.nine_month_depletion_rate > 0.06
                  ? classes.cardNotSustainable
                  : classes.cardSustainable
              } >

                        <Typography variant="h6" className={classes.districtName}>District Name: {marker.District_Name}</Typography>
                        <Typography variant="subtitle1" className={classes.tehsilName}>Tehsil Name: {marker.Tehsil_Name}</Typography>
                        <Typography variant="subtitle2" className={classes.siteName}>Site Name: {marker.title}</Typography>

                        {(isNaN(marker.pre_monsoon_depletion) || isNaN(marker.post_monsoon_depletion) || isNaN(marker.value.value_Jan23) || isNaN(marker.value.value_Nov22) ||isNaN(marker.value.value_Aug22) || isNaN(marker.value.value_May22)) ? (
                        <Typography variant="body1" className={classes.valueText}>Insufficient Data</Typography>
                         ) : (
                         <>
                        <Typography variant="body1" className={classes.valueText}>Jan-23: {marker.value.value_Jan23}</Typography>
                        <Typography variant="body1" className={classes.valueText}>Nov-22: {marker.value.value_Nov22}</Typography>
                        <Typography variant="body1" className={classes.valueText}>Aug-22: {marker.value.value_Aug22}</Typography>
                        <Typography variant="body1" className={classes.valueText}>May-22: {marker.value.value_May22}</Typography>
                        <Typography variant="body1" className={classes.valueText}>Pre-Monsoon-Depletion: {marker.pre_monsoon_depletion}</Typography>
                        <Typography variant="body1" className={classes.valueText}>Post-Monsoon-Depletion: {marker.post_monsoon_depletion}</Typography>
                        <Typography variant="body1" className={classes.valueText}>nine month depletion rate: {marker.nine_month_depletion_rate}
                        {marker.nine_month_depletion_rate > 0.20
                            ?                         <Typography variant="body1" className={classes.sustain}>Not sustainable</Typography>
                            :                         <Typography variant="body1" className={classes.sustain}>Sustainable </Typography>

                        }
                        </Typography>
                        </>
                        )}
                  </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default List1;