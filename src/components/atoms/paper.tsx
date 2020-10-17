import React from 'react'
import {
  Paper as MuiPaper,
  PaperProps as OldPaperProps,
  styled
} from '@material-ui/core'
import {
  borders,
  display,
  flexbox,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  BordersProps,
  DisplayProps,
  FlexboxProps,
  PaletteProps,
  PositionsProps,
  ShadowsProps,
  SizingProps,
  SpacingProps,
  TypographyProps,
  compose
} from '@material-ui/system'
import { Link } from 'react-router-dom'

type PaperProps = Omit<OldPaperProps, 'component'> &
  BordersProps &
  DisplayProps &
  FlexboxProps &
  PaletteProps &
  PositionsProps &
  ShadowsProps &
  SizingProps &
  SpacingProps &
  TypographyProps &
  ExtraProps

interface ExtraProps {
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledPaper = styled(({ newRef, newComponent, ...props }) => (
  <MuiPaper ref={newRef} component={newComponent} {...props} />
))(
  compose(
    borders,
    display,
    flexbox,
    palette,
    positions,
    shadows,
    sizing,
    spacing,
    typography
  )
)

const Paper: React.FC<PaperProps> = React.forwardRef(
  ({ children, component, ...props }, ref) => {
    return (
      <StyledPaper newRef={ref} newComponent={component} {...props}>
        {children}
      </StyledPaper>
    )
  }
)

StyledPaper.propTypes = {}

export default Paper
