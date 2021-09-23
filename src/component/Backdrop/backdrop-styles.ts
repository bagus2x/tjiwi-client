import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer * 2,
      background: fade(theme.palette.common.black, 0.2),
      color: theme.palette.secondary.main
    }
  })
);

export default useStyles;