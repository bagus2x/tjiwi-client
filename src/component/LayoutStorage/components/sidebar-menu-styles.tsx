import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      backgroundColor: `${fade('#ffffff', 0.2)} !important`,
      '& svg': {
        color: `${theme.palette.secondary.main} !important`
      }
    }
  })
);

export default useStyles;
