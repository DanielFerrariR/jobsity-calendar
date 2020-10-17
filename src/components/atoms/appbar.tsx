import React from 'react'
import {
  AppBar as MuiAppBar,
  AppBarProps as OldAppBarProps,
  styled
} from '@material-ui/core'
import { palette, PaletteProps, compose, css } from '@material-ui/system'
import { Link } from 'react-router-dom'

type AppBarProps = Omit<OldAppBarProps, 'color'> & PaletteProps & ExtraProps

interface ExtraProps {
  css?: React.CSSProperties
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledAppBar = styled(({ newComponent, ...props }) => (
  <MuiAppBar component={newComponent} {...props} />
))(css(compose(palette)))

const AppBar: React.FC<AppBarProps> = ({
  children,
  component,
  css: newCss = {},
  ...props
}) => {
  return (
    <StyledAppBar newComponent={component} css={newCss} {...props}>
      {children}
    </StyledAppBar>
  )
}

StyledAppBar.propTypes = {}

export default AppBar
