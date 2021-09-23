import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(3),
      '& > *': {
        marginBottom: theme.spacing(2)
      }
    }
  })
);

export default useStyles;
