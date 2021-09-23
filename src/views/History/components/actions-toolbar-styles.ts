import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(3),
      '& > :first-child': {
        width: 120
      },
      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(1),
        '& > :first-child': {
          width: 200
        }
      }
    }
  })
);

export default useStyles;
