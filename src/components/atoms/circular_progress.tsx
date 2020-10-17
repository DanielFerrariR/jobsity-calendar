import React from 'react'
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as OldCircularProgressProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  display,
  DisplayProps,
  positions,
  PositionsProps,
  palette,
  PaletteProps,
  compose
} from '@material-ui/system'

type CircularProgressProps = Omit<OldCircularProgressProps, 'color'> &
  SpacingProps &
  PositionsProps &
  DisplayProps &
  PaletteProps

const StyledCircularProgress = styled(MuiCircularProgress)(
  compose(spacing, positions, display, palette)
)

const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  return <StyledCircularProgress {...props} />
}

StyledCircularProgress.propTypes = {}

export default CircularProgress
