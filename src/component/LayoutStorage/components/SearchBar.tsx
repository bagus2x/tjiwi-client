import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/SearchRounded';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { matchPath, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import path from '../../../views/path';
import TextFieldNumber from '../../TextFieldNumber/TextFieldNumber';
import useStyles from './searchbar-styles';
import clsx from 'clsx';

type KeyField = 'gsmWidth' | 'io' | 'location';

interface BasePaperSearchField {
  gsmWidth: string;
  io: number;
  location?: string;
}

const gsmWidth = [path.bufferArea, path.list, path.delivery];
const io = [path.bufferArea, path.list, path.delivery];
const loc = [path.list, path.delivery];
function SearchBar() {
  const classes = useStyles();
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [openSearchbar, setOpenSearchbar] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const { register, handleSubmit } = useForm<BasePaperSearchField>();
  const inBufferArea = useRouteMatch(path.bufferArea);
  const inBasePaperList = useRouteMatch(path.list);
  const { storageID } = useParams<{ storageID: string }>();

  const currentPathInGsmWidth = !!matchPath(location.pathname, { path: gsmWidth });
  const currentPathInIo = !!matchPath(location.pathname, { path: io });
  const currentPathInLoc = !!matchPath(location.pathname, { path: loc });

  useEffect(() => {
    if (isMdUp) setOpenSearchbar(true);
    else setOpenSearchbar(false);
  }, [isMdUp]);

  const handleOpenSearchBar = () => {
    setOpenSearchbar(true);
  };

  const handleCloseSearchbar = () => {
    setOpenSearchbar(false);
  };

  const handleSearch = handleSubmit((data) => {
    console.log(data);
    const url = new URLSearchParams();
    for (let key in data) {
      if (data[key as KeyField]) {
        if (key === 'gsmWidth') {
          const value = `${data[key as KeyField]}`.replace(/ +/g, '').split('/');
          if (value[0]) url.append('gsm', value[0]);
          if (value.length === 2) value[1] && url.append('width', value[1]);
        } else {
          url.append(key, data[key as KeyField] as any);
        }
      }
    }

    if (inBufferArea) history.push(`/storage/${storageID}/buffer-area?` + url.toString());
    if (inBasePaperList) history.push(`/storage/${storageID}/list?` + url.toString());
  });

  if (!(currentPathInGsmWidth || currentPathInIo || currentPathInLoc)) {
    return <Box flexGrow={1} />;
  }

  return (
    <>
      {!isMdUp && (
        <>
          <IconButton color="primary" aria-label="open drawer" onClick={handleOpenSearchBar}>
            <SearchIcon />
          </IconButton>
          <Box flexGrow={1} />
        </>
      )}
      <div className={clsx(classes.root, { [classes.hidden]: !openSearchbar })}>
        <form className={classes.inputWrapper} onSubmit={handleSearch}>
          {currentPathInGsmWidth && (
            <TextField
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              fullWidth
              label="GSM / Width"
              type="tel"
              {...register('gsmWidth')}
            />
          )}
          {currentPathInIo && (
            <TextFieldNumber
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              fullWidth
              label="I / O"
              type="tel"
              {...register('io')}
            />
          )}
          {currentPathInLoc && (
            <TextField
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              fullWidth
              label="Location"
              type="tel"
              {...register('location')}
            />
          )}
          <div className={classes.buttonActions}>
            <Hidden mdUp>
              <Button variant="outlined" color="secondary" disableElevation size="small" onClick={handleCloseSearchbar}>
                Cancel
              </Button>
            </Hidden>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              size="small"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
