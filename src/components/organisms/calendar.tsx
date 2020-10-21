import React, { useState } from 'react'
import {
  Tooltip,
  Paper,
  Typography,
  Button,
  IconButton,
  Box,
  TableContainer,
  Table,
  TableCell,
  TableRow
} from 'src/components/atoms'
import {
  CustomTableHead,
  CustomTableBody,
  ReminderCard
} from 'src/components/molecules'
import { ArrowForwardIos } from '@material-ui/icons'
import { useTheme, useMediaQuery } from '@material-ui/core'
import ListRemindersModal from './list_reminders_modal'
import CreateReminderModal from './create_reminder_modal'

const Calendar: React.FC = () => {
  const [openCreateReminderModal, setOpenCreateReminderModal] = useState(false)
  const [openListRemindersModal, setOpenListRemindersModal] = useState<
    false | Date
  >(false)
  const theme = useTheme()
  const xsAndDown = useMediaQuery(theme.breakpoints.down('xs'))
  const today =
    process.env.NODE_ENV === 'test' || window.Cypress
      ? new Date('2020/10/20')
      : new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const weekDaysNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const setToday = () => {
    setMonth(today.getMonth())
    setYear(today.getFullYear())
  }

  const setPreviousMonth = () => {
    if (month > 0) {
      setMonth(month - 1)
    } else {
      setYear(year - 1)
      setMonth(11)
    }
  }

  const setNextMonth = () => {
    if (month < 11) {
      setMonth(month + 1)
    } else {
      setYear(year + 1)
      setMonth(0)
    }
  }

  const createBodyLine = (current: number) => {
    const firstDay = new Date(year, month).getDay()
    const previousMonth = month === 0 ? 11 : month - 1
    const daysInPastMonth = 32 - new Date(year, previousMonth, 32).getDate()
    const daysInMonth = 32 - new Date(year, month, 32).getDate()
    const bodyLine = []

    for (let count = current * 7; count < current * 7 + 7; count += 1) {
      if (count < firstDay) {
        const newDay = daysInPastMonth + count - firstDay + 1
        const newMonth = month > 0 ? month - 1 : 11
        const newYear = month > 0 ? year : year - 1
        const newDate = new Date(newYear, newMonth, newDay)
        bodyLine.push(
          <TableCell
            key={count}
            onClick={() => setOpenListRemindersModal(newDate)}
            data-testid={`calendar-table-cell-past-${newDay}`}
          >
            <Typography fontWeight="500" color={theme.palette.grey[500]} mb={1}>
              {newDay}
            </Typography>
            <ReminderCard
              date={newDate}
              testId={`reminder-card-past-${newDay}`}
            />
          </TableCell>
        )
      } else if (count - firstDay + 1 > daysInMonth) {
        const newDay = count - daysInMonth - firstDay + 1
        const newMonth = month < 11 ? month + 1 : 0
        const newYear = month < 11 ? year : year + 1
        const newDate = new Date(newYear, newMonth, newDay)

        bodyLine.push(
          <TableCell
            key={count}
            onClick={() => setOpenListRemindersModal(newDate)}
            data-testid={`calendar-table-cell-future-${newDay}`}
          >
            <Typography fontWeight="500" color={theme.palette.grey[500]} mb={1}>
              {newDay}
            </Typography>
            <ReminderCard
              date={newDate}
              testId={`reminder-card-future-${newDay}`}
            />
          </TableCell>
        )
      } else {
        const newDay = count - firstDay + 1
        const isWeekend = count === current * 7 || count === current * 7 + 6
        const isToday =
          count - firstDay + 1 === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        let dayColor = ''
        const newDate = new Date(year, month, newDay)

        if (isToday) {
          dayColor = theme.palette.error.main
        } else if (isWeekend) {
          dayColor = theme.palette.primary.main
        }

        bodyLine.push(
          <TableCell
            key={count}
            onClick={() => setOpenListRemindersModal(newDate)}
            data-testid={`calendar-table-cell-current-${newDay}`}
          >
            <Typography fontWeight="500" color={dayColor} mb={1}>
              {newDay}
            </Typography>
            <ReminderCard
              date={newDate}
              testId={`reminder-card-current-${newDay}`}
            />
          </TableCell>
        )
      }
    }

    return bodyLine
  }

  const createBody = () => {
    const body = []

    for (let count = 0; count < 6; count += 1) {
      body.push(<TableRow key={count}>{createBodyLine(count)}</TableRow>)
    }

    return body
  }

  return (
    <>
      <Paper p={2}>
        <Box
          display="flex"
          alignItems="center"
          mb={4}
          flexDirection={xsAndDown && 'column'}
          position="relative"
        >
          <Box
            display="flex"
            alignItems="center"
            position={!xsAndDown && 'absolute'}
            mb={xsAndDown && 2}
            width={1}
            justifyContent="space-between"
            flexDirection={xsAndDown && 'column'}
          >
            <Box mb={xsAndDown && 2}>
              <Tooltip title="Back">
                <IconButton
                  aria-label="Back"
                  onClick={setPreviousMonth}
                  disabled={month === 0 && year === 1970}
                  data-testid="calendar-button-back"
                >
                  <ArrowForwardIos style={{ transform: 'rotate(180deg)' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Forward">
                <IconButton
                  aria-label="Forward"
                  onClick={setNextMonth}
                  mr={1}
                  disabled={month === 11 && year === 9999}
                  data-testid="calendar-button-forward"
                >
                  <ArrowForwardIos />
                </IconButton>
              </Tooltip>
              <Button
                onClick={setToday}
                data-testid="calendar-button-set-today"
              >
                Today
              </Button>
            </Box>
            <Button
              ml={1}
              onClick={() => setOpenCreateReminderModal(true)}
              data-testid="calendar-button-create-reminder"
            >
              Create reminder
            </Button>
          </Box>
          <Typography
            variant="h6"
            textAlign="center"
            width={1}
            ml={1}
            data-testid="calendar-typography-date"
          >
            {monthNames[month]} {year}
          </Typography>
        </Box>
        <TableContainer>
          <Table style={{ minWidth: 1200 }}>
            <CustomTableHead>
              <TableRow>
                {weekDaysNames.map((each, index) => {
                  return (
                    <TableCell key={index}>
                      <Typography textAlign="center" fontWeight="500">
                        {each}
                      </Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </CustomTableHead>
            <CustomTableBody>{createBody()}</CustomTableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ListRemindersModal
        open={openListRemindersModal}
        setOpen={setOpenListRemindersModal}
      />
      <CreateReminderModal
        open={openCreateReminderModal}
        setOpen={setOpenCreateReminderModal}
      />
    </>
  )
}

export default Calendar
