import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      minWidth: 360,
      [theme.breakpoints.up('sm')]: {
        minWidth: 480
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    }
  })
);

export default useStyles;
