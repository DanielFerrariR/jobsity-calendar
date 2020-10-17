import React from 'react'
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as OldCheckboxProps,
  styled,
  fade,
  useTheme
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  compose,
  palette,
  PaletteProps
} from '@material-ui/system'

type CheckboxProps = Omit<OldCheckboxProps, 'color'> &
  PaletteProps &
  SpacingProps

const StyledCheckbox = styled(MuiCheckbox)(compose(spacing, palette))

const StyledCheckboxColor = styled(StyledCheckbox)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-checked': {
    color: (props: CheckboxProps): string => props.color
  },
  '&:hover': {
    backgroundColor: (props: CheckboxProps): string =>
      fade(props.color, theme.palette.action.hoverOpacity),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}))

const Checkbox: React.FC<CheckboxProps> = ({
  color = 'secondary.main',
  ...props
}) => {
  const theme = useTheme()
  const firstLine = color.split('.')[0]
  const secondLine = color.split('.')[1]
  const newColor = (theme.palette as any)[firstLine][secondLine]

  return <StyledCheckboxColor color={newColor} {...props} />
}

StyledCheckbox.propTypes = {}

export default Checkbox
