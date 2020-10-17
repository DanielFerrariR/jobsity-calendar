import React from 'react'
import { Stepper as MuiStepper, StepperProps, styled } from '@material-ui/core'

const StyledStepper = styled(MuiStepper)({})

const Stepper: React.FC<StepperProps> = (props) => {
  return <StyledStepper {...props} />
}

StyledStepper.propTypes = {}

export default Stepper
