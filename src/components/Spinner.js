import styled from '@emotion/styled/macro'
import { keyframes } from '@emotion/core'
import { FaSpinner } from 'react-icons/fa'

const spinning = keyframes`
  from {
    transform: rotate(0deg);
    }
  to {
    transform: rotate(360deg);
    }
`

const Spinner = styled(FaSpinner)`
  animation: ${spinning} 1s linear infinite;
`

export default Spinner
