import React from 'react'
import {
  AccordionDetails as MuiAccordionDetails,
  AccordionDetailsProps,
  styled
} from '@material-ui/core'

const StyledAccordionDetails = styled(MuiAccordionDetails)({})

const AccordionDetails: React.FC<AccordionDetailsProps> = (props) => {
  return <StyledAccordionDetails {...props} />
}

StyledAccordionDetails.propTypes = {}

export default AccordionDetails
