import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './constants';

interface StylesProps {
  screenHeight: number | '100vh';
  toolbarHeight: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      marginTop: (props) => props.toolbarHeight,
      height: ({ screenHeight, toolbarHeight }: StylesProps) =>
        `calc(${typeof screenHeight === 'number' ? `${screenHeight}px` : `$${screenHeight}`} - ${toolbarHeight}px)`,
      overflowY: 'auto',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH
    }
  })
);

export default useStyles;
