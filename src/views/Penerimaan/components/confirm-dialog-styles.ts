import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 480
      }
    },
    table: {
      width: '100%',
      minHeight: 50,
      borderCollapse: 'collapse',
      '& td': {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(0, 1)
      }
    }
  })
);

export default useStyles;
