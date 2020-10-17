import React from 'react'
import {
  TextField as MuiTextField,
  TextFieldProps as OldTextFieldProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  sizing,
  SizingProps,
  compose
} from '@material-ui/system'

type TextFieldProps = OldTextFieldProps &
  SizingProps &
  SpacingProps &
  ExtraProps

interface ExtraProps {
  'data-testid'?: string
}

const StyledTextField = styled(MuiTextField)(compose(spacing, sizing))

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    InputLabelProps,
    inputProps,
    'data-testid': dataTestId,
    select,
    SelectProps,
    disabled,
    ...rest
  } = props

  return (
    <StyledTextField
      InputLabelProps={{
        shrink: true,
        ['data-testid' as any]: dataTestId ? `${dataTestId}-label` : undefined,
        ...InputLabelProps
      }}
      inputProps={{
        maxLength: 100,
        'data-testid': !select ? dataTestId : undefined,
        ...inputProps
      }}
      SelectProps={{
        SelectDisplayProps: {
          ['data-testid' as any]: select ? dataTestId : undefined,
          'aria-disabled': disabled
        },
        ...SelectProps
      }}
      FormHelperTextProps={{
        ['data-testid' as any]: dataTestId
          ? `${dataTestId}-helper-text`
          : undefined
      }}
      disabled={disabled}
      select={select}
      {...rest}
    />
  )
}

StyledTextField.propTypes = {}

export default TextField
