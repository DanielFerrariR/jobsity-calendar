import React from 'react'
import {
  IconButton as MuiIconButton,
  IconButtonProps as OldIconButtonProps,
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
import { Link } from 'react-router-dom'

type IconButtonProps = Omit<OldIconButtonProps, 'color'> &
  SpacingProps &
  PaletteProps &
  ExtraProps

interface ExtraProps {
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledIconButton = styled(({ newComponent, newRef, ...props }) => (
  <MuiIconButton ref={newRef} component={newComponent} {...props} />
))(compose(spacing, palette))

const StyledIconButtonColor = styled(StyledIconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: (props: IconButtonProps): string =>
      fade(props.color, theme.palette.action.hoverOpacity),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}))

const IconButton: React.FC<IconButtonProps> = React.forwardRef(
  ({ children, component, color = 'text.primary', ...props }, ref) => {
    const theme = useTheme()
    const firstLine = color.split('.')[0]
    const secondLine = color.split('.')[1]
    const newColor = (theme.palette as any)[firstLine][secondLine]

    return (
      <StyledIconButtonColor
        newRef={ref}
        newComponent={component}
        color={newColor}
        {...props}
      >
        {children}
      </StyledIconButtonColor>
    )
  }
)

StyledIconButton.propTypes = {}

export default IconButton
