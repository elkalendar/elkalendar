import React from 'react'
import Confetti from 'react-confetti'
import {useViewportSize} from "@mantine/hooks";

export default () => {
  const { width, height } = useViewportSize()
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}
