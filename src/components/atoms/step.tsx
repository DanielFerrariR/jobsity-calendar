import React from 'react'
import { Step as MuiStep, StepProps, styled } from '@material-ui/core'

const StyledStep = styled(MuiStep)({})

const Step: React.FC<StepProps> = (props) => {
  return <StyledStep {...props} />
}

StyledStep.propTypes = {}

export default Step
