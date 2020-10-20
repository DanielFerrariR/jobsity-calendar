import React from 'react'
import { Box, Typography } from 'src/components/atoms'
import { useSelector } from 'src/store'
import { isSameDay } from 'src/utils'
import { getContrastRatio } from '@material-ui/core'

interface Props {
  date: Date
}

const ReminderCard: React.FC<Props> = ({ date }) => {
  const reminders = useSelector((state) => state.reminders)
  const filteredReminders = reminders?.filter((element) =>
    isSameDay(element.date, date)
  )
  const sortedReminders = filteredReminders?.sort((first, second) => {
    if (first.date < second.date) {
      return -1
    }

    if (first.date > second.date) {
      return 1
    }

    return 0
  })

  return (
    <>
      {sortedReminders &&
        (sortedReminders.length < 3 ? (
          sortedReminders.map((each) => (
            <Box
              key={each.id}
              bgcolor={each.color}
              mb={1}
              borderRadius={4}
              py={0.5}
              px={1}
            >
              <Typography
                variant="caption"
                width={128}
                color={
                  getContrastRatio('#fff', each.color) > 4.5 ? '#fff' : '#000'
                }
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {each.text}
              </Typography>
            </Box>
          ))
        ) : (
          <>
            <Box
              bgcolor={sortedReminders[0].color}
              mb={1}
              borderRadius={4}
              py={0.5}
              px={1}
            >
              <Typography
                variant="caption"
                width={128}
                color={
                  getContrastRatio('#fff', sortedReminders[0].color) > 4.5
                    ? '#fff'
                    : '#000'
                }
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {sortedReminders[0].text}
              </Typography>
            </Box>
            <Typography variant="caption">
              + {sortedReminders?.length - 1} more
            </Typography>
          </>
        ))}
    </>
  )
}

export default ReminderCard
