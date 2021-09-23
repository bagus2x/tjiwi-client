import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { TextFieldNumberRHF as TextFieldNumber } from '../../component/TextFieldNumber/TextFieldNumber';
import useAddBasePaper from '../../hooks/query/add-base-paper';
import { isWebApiError } from '../../services/web-api';
import ConfirmDialog from './components/ConfirmDialog';
import useStyles from './styles';

interface BasePaperField {
  gsm: number;
  width: number;
  materialNumber: number;
  io: number;
  quantity: number;
}

function Penerimaan() {
  const classes = useStyles();
  const [basePaper, setBasePaper] = useState<BasePaperField | null>(null);
  const { storageID } = useParams<{ storageID: string }>();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<BasePaperField>();
  const addBasePaper = useAddBasePaper();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleCancel = () => {
    setBasePaper(null);
  };

  const handleSubmitForm = handleSubmit((data) => {
    setBasePaper(data);
  });

  const handleSave = () => {
    if (!basePaper) return;
    addBasePaper.mutate(
      { ...basePaper, storageID: parseInt(storageID) },
      {
        onSuccess: () => {
          enqueueSnackbar('Base paper telah ditambahkan ke buffer area');
          history.push(`/storage/${storageID}/buffer-area`);
        },
        onError: (error: any) => {
          if (!(isWebApiError(error) && error.response)) return;
          for (let err of error.response.data.error.messages) {
            enqueueSnackbar(err, {
              variant: 'error'
            });
          }
        }
      }
    );

    setBasePaper(null);
  };

  // const isLessThan = (num: number) => {
  //   return ({ floatValue, formattedValue }: NumberFormatValues) => {
  //     return formattedValue === '' || (floatValue as number) <= num;
  //   };
  // };

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" component="form" className={classes.container} onSubmit={handleSubmitForm}>
        <div className={classes.column}>
          <TextFieldNumber
            control={control}
            size="small"
            fullWidth
            variant="outlined"
            label="gsm"
            error={!!errors.gsm}
            helperText={errors.gsm?.message || ' '}
            name="gsm"
          />
          <Typography variant="h4" color="textSecondary" className={classes.slash} children="/" />
          <TextFieldNumber
            control={control}
            size="small"
            fullWidth
            variant="outlined"
            label="Width"
            error={!!errors.width}
            helperText={errors.width?.message || ' '}
            name="width"
          />
        </div>
        <TextFieldNumber
          control={control}
          size="small"
          fullWidth
          variant="outlined"
          name="io"
          label="I / O"
          error={!!errors.io}
          helperText={errors.io?.message || ' '}
        />
        <TextFieldNumber
          control={control}
          size="small"
          fullWidth
          variant="outlined"
          label="No. Material"
          error={!!errors.materialNumber}
          helperText={errors.materialNumber?.message || ' '}
          name="materialNumber"
        />
        <TextFieldNumber
          control={control}
          size="small"
          fullWidth
          variant="outlined"
          label="Quantity"
          error={!!errors.quantity}
          helperText={errors.quantity?.message || ' '}
          name="quantity"
        />
        <Button type="submit" variant="contained" color="secondary" size="small" disableElevation>
          SIMPAN
        </Button>
        {basePaper && (
          <ConfirmDialog basePaper={basePaper} open={!!basePaper} onCancel={handleCancel} onSave={handleSave} />
        )}
      </Container>
    </div>
  );
}

export default Penerimaan;
