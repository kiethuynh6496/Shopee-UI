import { Input, InputProps } from 'antd';
import React, { ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';

export interface PasswordInputFieldProps extends InputProps {
  name: string;
  control: Control<any>;
  handleOnChange?: any;
  formGroupClassName?: string;
  errorClassName?: string;
}

export const PasswordInputField: React.FunctionComponent<PasswordInputFieldProps> = ({
  name,
  control,
  handleOnChange,
  formGroupClassName,
  errorClassName,
  ...otherProps
}) => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <div className={`form__form-group-input-wrap ${formGroupClassName ? formGroupClassName : ''}`}>
      <Input.Password
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (handleOnChange) {
            handleOnChange(event);
          }
          onChange(event);
        }}
        onBlur={onBlur}
        {...otherProps}
      />
      {errors?.[name] && (
        <span className={`form__form-group-error ${errorClassName ? errorClassName : ''}`}>
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
