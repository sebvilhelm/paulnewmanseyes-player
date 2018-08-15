import React from 'react'
import { css, keyframes } from 'react-emotion'
import { FaSpinner } from 'react-icons/fa'

const spinning = keyframes`
  from {
    transform: rotate(0deg);
    }
  to {
    transform: rotate(360deg);
    }
`

const spinnerStyle = css`
  animation: ${spinning} 1s linear infinite;
`

const Spinner = () => {
  return <FaSpinner className={spinnerStyle} />
}

export default Spinner
