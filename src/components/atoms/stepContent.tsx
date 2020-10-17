import React from 'react'
import {
  StepContent as MuiStepContent,
  StepContentProps,
  styled
} from '@material-ui/core'

const StyledStepContent = styled(MuiStepContent)({})

const StepContent: React.FC<StepContentProps> = (props) => {
  return <StyledStepContent {...props} />
}

StyledStepContent.propTypes = {}

export default StepContent
