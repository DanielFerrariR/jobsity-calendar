import React from 'react'
import {
  Grid as MuiGrid,
  GridProps as OldGridProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  flexbox,
  FlexboxProps,
  palette,
  PaletteProps,
  borders,
  BordersProps,
  sizing,
  SizingProps,
  compose
} from '@material-ui/system'

type GridProps = Omit<OldGridProps, 'alignContent' | 'alignItems'> &
  SpacingProps &
  FlexboxProps &
  PaletteProps &
  BordersProps &
  SizingProps

const StyledGrid = styled(MuiGrid)(
  compose(spacing, flexbox, palette, borders, sizing)
)

const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>
}

StyledGrid.propTypes = {}

export default Grid
