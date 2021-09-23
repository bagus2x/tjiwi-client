import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
        },
        action: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        footer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        buttonWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonFetchMore: {
            alignSelf: 'center',
            margin: theme.spacing(2)
        },
        infoMessage: {
            alignSelf: 'center',
            margin: theme.spacing(1)
        }
    })
);

export default useStyles;
