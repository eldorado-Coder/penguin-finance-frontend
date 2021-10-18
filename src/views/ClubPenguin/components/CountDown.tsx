import React from 'react'
import Countdown from 'react-countdown'

interface CutdownProps {
  date: number
  handleComplete?: () => void
}

const convertTime = (time) => {
  return time < 10 ? `0${time}` : time
}

const countdownRender = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>00:00:00</span>
  }
  return (
    <span>
      {convertTime(days * 24 + hours)}:{convertTime(minutes)}:{convertTime(seconds)}
    </span>
  )
}

const CountDown: React.FC<CutdownProps> = ({ date, handleComplete }) => {
  return <Countdown renderer={countdownRender} date={date} onComplete={handleComplete} />
}

export default React.memo(CountDown)
