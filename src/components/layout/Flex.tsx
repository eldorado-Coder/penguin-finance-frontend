import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin: 0 8px;
    margin-bottom: 32px;
    width: 100%;

    @media (min-width: 640px) {
      min-width: 320px;
      max-width: 50%;
      width: unset;
    }
    @media (min-width: 768px) {
      min-width: 320px;
      max-width: 31.5%;
      width: 100%;
    }
  } */
`

export default FlexLayout
