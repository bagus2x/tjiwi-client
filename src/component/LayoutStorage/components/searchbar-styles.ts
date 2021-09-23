import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        top: 0,
        left: 0,
        width: '100vw',
        background: theme.palette.common.white,
        padding: theme.spacing(2),
        position: 'fixed',
        flexDirection: 'column',
        boxShadow: theme.shadows[4]
      }
    },
    hidden: {
      display: 'none',
      visibility: 'hidden'
    },
    inputWrapper: {
      display: 'flex',
      minWidth: 300,
      width: '100%',
      maxWidth: 600,
      '& > *': {
        marginRight: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '& > *': {
          marginRight: 0,
          marginBottom: theme.spacing(2)
        }
      }
    },
    buttonActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& > *:first-child': {
        marginRight: theme.spacing(1)
      }
    }
  })
);

export default useStyles;
