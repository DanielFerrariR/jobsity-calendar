import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as OldButtonProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  sizing,
  SizingProps,
  compose,
  css
} from '@material-ui/system'
import { Link } from 'react-router-dom'

type ButtonProps = OldButtonProps & SpacingProps & SizingProps & ExtraProps

interface ExtraProps {
  css?: React.CSSProperties
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledButton = styled(({ newComponent, newRef, ...props }) => (
  <MuiButton component={newComponent} ref={newRef} {...props} />
))(css(compose(spacing, sizing)))

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, component, css: newCss = {}, ...props }, ref) => {
    return (
      <StyledButton
        newRef={ref}
        newComponent={component}
        css={newCss}
        {...props}
      >
        {children}
      </StyledButton>
    )
  }
)

StyledButton.propTypes = {}

export default Button
