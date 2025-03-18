import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100px',
    backgroundColor: 'white',
  },
  formControl: {
    margin: theme.spacing(1), marginBottom: '30px', width: '90%' ,
  },
  paperHover: {
    zIndex: '19',
    width: '100px',
    backgroundColor: 'white',
    padding: '8px',
    borderRadius: '4px',
    flexDirection: 'row',
  },
  mapContainer: {
    marginTop: '13px',
    height: '75vh',
    width: '100%',
  },
  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': {
      zIndex: 2,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  selected: {
    color: theme.palette.primary.main,
  },
}));
