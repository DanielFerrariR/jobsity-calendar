import React from 'react'
import {
  Accordion as MuiAccordion,
  AccordionProps,
  styled
} from '@material-ui/core'

const StyledAccordion = styled(MuiAccordion)({})

const Accordion: React.FC<AccordionProps> = (props) => {
  return <StyledAccordion {...props} />
}

StyledAccordion.propTypes = {}

export default Accordion
