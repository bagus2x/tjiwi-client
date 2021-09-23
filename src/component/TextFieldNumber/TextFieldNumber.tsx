import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { KeyboardEventHandler, forwardRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

type TextFieldNumberRHFProps = TextFieldProps & UseControllerProps<any>;

const TextFieldNumber = forwardRef((props: TextFieldProps, ref) => {
  const numberOnly: KeyboardEventHandler = (ev) => {
    if (!/[0-9]/.test(ev.key)) ev.preventDefault();
  };

  return <TextField {...props} inputRef={ref} onKeyPress={numberOnly} />;
});

TextFieldNumber.defaultProps = {
  type: 'tel'
};

export const TextFieldNumberRHF = (props: TextFieldNumberRHFProps) => {
  const {
    field: { ref, onChange, value, ...field }
  } = useController(props);

  return (
    <TextField
      {...field}
      {...props}
      value={value || ''}
      inputRef={ref}
      onChange={(ev) => {
        const value = parseInt(ev.target.value, 10);
        onChange(value);
      }}
    />
  );
};

export default TextFieldNumber;
