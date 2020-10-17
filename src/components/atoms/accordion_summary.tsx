import React from 'react'
import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  styled
} from '@material-ui/core'

const StyledAccordionSummary = styled(MuiAccordionSummary)({})

const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => {
  return <StyledAccordionSummary {...props} />
}

StyledAccordionSummary.propTypes = {}

export default AccordionSummary
