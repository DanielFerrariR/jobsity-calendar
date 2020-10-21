import React from 'react'
import { Box, Typography, Image } from 'src/components/atoms'
import { useSelector } from 'src/store'
import { isSameDay } from 'src/utils'
import { getContrastRatio } from '@material-ui/core'

interface Props {
  date: Date
  testId: string
}

const ReminderCard: React.FC<Props> = ({ date, testId }) => {
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
          sortedReminders.map((each, index) => (
            <Box
              key={each.id}
              bgcolor={each.color}
              mb={1}
              borderRadius={4}
              px={1}
              display="flex"
              alignItems="center"
              height={32}
              data-testid={`${testId}-${index}`}
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
              {each.weather && (
                <Image src={each.weather.icon} height={24} width={24} />
              )}
            </Box>
          ))
        ) : (
          <>
            <Box
              bgcolor={sortedReminders[0].color}
              mb={1}
              borderRadius={4}
              px={1}
              display="flex"
              alignItems="center"
              height={32}
              data-testid={`${testId}-0`}
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
              {sortedReminders[0].weather && (
                <Image
                  src={sortedReminders[0].weather.icon}
                  height={24}
                  width={24}
                />
              )}
            </Box>
            <Typography variant="caption" data-testid={`${testId}-extra`}>
              + {sortedReminders?.length - 1} more
            </Typography>
          </>
        ))}
    </>
  )
}

export default ReminderCard
