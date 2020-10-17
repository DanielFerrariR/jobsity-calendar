import React from 'react'
import {
  Link as MuiLink,
  LinkProps as OldLinkProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  palette,
  sizing,
  SpacingProps,
  PaletteProps,
  SizingProps,
  compose,
  css
} from '@material-ui/system'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = Omit<OldLinkProps, 'color' | 'ref'> &
  SpacingProps &
  SizingProps &
  PaletteProps &
  ExtraProps

interface ExtraProps {
  css?: React.CSSProperties
  component?: React.ReactElement | typeof RouterLink | string
  to?: string
}

const StyledLink = styled(({ newComponent, newRef, color, ...props }) => (
  <MuiLink ref={newRef} component={newComponent} {...props} />
))(css(compose(spacing, palette, sizing)))

const Link: React.FC<LinkProps> = React.forwardRef(
  ({ children, component, css: newCss = {}, ...props }, ref) => {
    return (
      <StyledLink newRef={ref} newComponent={component} css={newCss} {...props}>
        {children}
      </StyledLink>
    )
  }
)

StyledLink.propTypes = {}

export default Link
