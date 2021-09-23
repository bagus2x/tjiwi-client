import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
      minHeight: '100vh',
      background: theme.palette.primary.main,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1)
      }
    },
    signInOption: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: theme.spacing(3)
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      borderRadius: theme.spacing(0.5),
      background: theme.palette.background.paper,
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
      },
      '& > *': {
        userSelect: 'none'
      },
      // Button element
      '& > *:last-child': {
        marginTop: theme.spacing(3)
      }
    }
  })
);

export default useStyles;
