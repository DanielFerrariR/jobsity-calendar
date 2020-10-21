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
    ...rest
  } = props

  return (
    <StyledTextField
      InputLabelProps={{
        ['data-testid' as any]: dataTestId ? `${dataTestId}-label` : undefined,
        ...InputLabelProps
      }}
      inputProps={{
        maxLength: 100,
        'data-testid': dataTestId,
        ...inputProps
      }}
      FormHelperTextProps={{
        ['data-testid' as any]: dataTestId
          ? `${dataTestId}-helper-text`
          : undefined
      }}
      {...rest}
    />
  )
}

StyledTextField.propTypes = {}

export default TextField
