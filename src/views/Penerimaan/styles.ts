import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3)
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: theme.spacing(2),
      background: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[5],
      '& > *': {
        marginBottom: theme.spacing(2)
      },
      '& input': {
        fontSize: theme.typography.h4.fontSize,
        padding: theme.spacing(1, 1.5)
      }
    },
    column: {
      position: 'relative',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: theme.spacing(3),
      alignItems: 'center'
    },
    slash: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -25%)'
    }
  })
);

export default useStyles;
