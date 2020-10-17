import React from 'react'
import {
  LinearProgress as MuiLinearProgress,
  LinearProgressProps as OldLinearProgressProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  display,
  DisplayProps,
  positions,
  PositionsProps,
  compose
} from '@material-ui/system'

type LinearProgressProps = OldLinearProgressProps &
  SpacingProps &
  PositionsProps &
  DisplayProps

const StyledLinearProgress = styled(MuiLinearProgress)(
  compose(spacing, positions, display)
)

const LinearProgress: React.FC<LinearProgressProps> = (props) => {
  return <StyledLinearProgress {...props} />
}

StyledLinearProgress.propTypes = {}

export default LinearProgress
