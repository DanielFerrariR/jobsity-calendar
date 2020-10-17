import React from 'react'
import {
  StepLabel as MuiStepLabel,
  StepLabelProps,
  styled
} from '@material-ui/core'

const StyledStepLabel = styled(MuiStepLabel)({})

const StepLabel: React.FC<StepLabelProps> = (props) => {
  return <StyledStepLabel {...props} />
}

StyledStepLabel.propTypes = {}

export default StepLabel
