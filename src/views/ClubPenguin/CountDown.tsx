import React from 'react'
import Countdown from 'react-countdown'

const convertTime = (time) => {
  return time < 10 ? `0${time}` : time
}

const countdownRender = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Started</span>
  }
  return (
    <span>
      {convertTime(days * 24 + hours)}:{convertTime(minutes)}:{convertTime(seconds)}
    </span>
  )
}

const CountDown = ({ date }) => {
  return <Countdown renderer={countdownRender} date={date} />
}

export default React.memo(CountDown)
