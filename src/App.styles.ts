import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4dabf5',
      },
      '& .MuiOutlinedInput-input': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
        color: '#4dabf5',
      },
      '& .MuiInputLabel-outlined': {
        color: 'white',
      },
      '& .MuiInputLabel-outlined.Mui-focused': {
        color: '#4dabf5',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    selectControl: {
      minWidth: 320,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);
