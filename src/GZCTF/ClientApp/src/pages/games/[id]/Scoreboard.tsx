import { Stack } from '@mantine/core'
import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { MobileScoreboardTable } from '@Components/MobileScoreboardTable'
import { ScoreboardTable } from '@Components/ScoreboardTable'
import { TeamRank } from '@Components/TeamRank'
import { TimeLine } from '@Components/TimeLine'
import { WithGameTab } from '@Components/WithGameTab'
import { WithNavBar } from '@Components/WithNavbar'
import { useIsMobile } from '@Utils/ThemeOverride'
import { useGameTeamInfo } from '@Hooks/useGame'

const Scoreboard: FC = () => {
  const { id } = useParams()
  const numId = parseInt(id ?? '-1')
  const { teamInfo, error } = useGameTeamInfo(numId)

  const [division, setDivision] = useState<string | null>('all')
  const isMobile = useIsMobile(1080)
  const isVertical = useIsMobile()

  return (
    <WithNavBar width="90%" minWidth={0}>
      {isMobile ? (
        <Stack pt="md">
          {teamInfo && !error && <TeamRank />}
          {isVertical ? (
            <MobileScoreboardTable division={division ?? 'all'} setDivision={setDivision} />
          ) : (
            <ScoreboardTable division={division ?? 'all'} setDivision={setDivision} />
          )}
        </Stack>
      ) : (
        <WithGameTab>
          <Stack pb="2rem">
            <TimeLine division={division ?? 'all'} />
            <ScoreboardTable division={division ?? 'all'} setDivision={setDivision} />
          </Stack>
        </WithGameTab>
      )}
    </WithNavBar>
  )
}

export default Scoreboard
