import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';

interface StylesProps {
  toolbarHeight: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    toolbar: {
      minHeight: (props: StylesProps) => props.toolbarHeight
    }
  })
);

export default useStyles;
