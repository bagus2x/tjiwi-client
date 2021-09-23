import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      gap: theme.spacing(4),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(2)
      }
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    avatar: {
      width: 150,
      height: 150,
      [theme.breakpoints.down('sm')]: {
        width: 80,
        height: 80
      }
    },
    headerAction: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      marginTop: theme.spacing(2),
      gap: theme.spacing(1)
    }
  })
);

export default useStyles;
