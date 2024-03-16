import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2), marginBottom: '30px', width: '90%' , 
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {

    padding: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '72vh', overflow: 'auto', width: '100%',  marginTop: theme.spacing(2), marginTop: '1px',
  },

  container: {
    width: '30%',
    padding: theme.spacing(2),
  },

  card: {
    padding: '20px',
    border: "2px solid #ccc",
    borderRadius: theme.spacing(1),
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
  },
  districtName: {
    fontWeight: "bold",
    paddingLeft: '10px',
    paddingTop: '5px',
  },
  tehsilName: {
    color: theme.palette.primary.main,
    paddingLeft: '10px',
  },
  siteName: {
    marginTop: theme.spacing(1),
    paddingLeft: '10px',
  },
  valueText: {
    marginTop: theme.spacing(1),
    paddingLeft: '10px',
  },
  cardSustainable: {
    backgroundColor: theme.palette.success.light,
  },
  cardNotSustainable: {
    backgroundColor: theme.palette.error.light,
  },cardInsufficientData: {
    backgroundColor: theme.palette.grey[400], // Adjust the shade of grey as needed
  },sustain: {
    fontWeight: "bold",
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '17px',
  }
}));