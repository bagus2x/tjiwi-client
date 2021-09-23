import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';

interface StylesProps {
  screenHeight: number | '100vh';
  toolbarHeight: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0
      }
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: theme.palette.primary.main,
      '& *': {
        color: theme.palette.common.white
      }
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      height: (props: StylesProps) => props.toolbarHeight,
      justifyContent: 'flex-end'
    },
    selected: {
      backgroundColor: `${fade('#ffffff', 0.2)} !important`,
      '& svg': {
        color: `${theme.palette.secondary.main} !important`
      }
    }
  })
);

export default useStyles;
