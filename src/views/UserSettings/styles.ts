import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      '& > *': {
        marginBottom: theme.spacing(3),
      }
    },
    formControl: {
      minWidth: 240
    }
  })
);

export default useStyles;
