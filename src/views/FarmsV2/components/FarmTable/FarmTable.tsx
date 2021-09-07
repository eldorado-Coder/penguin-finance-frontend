import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, ChevronUpIcon } from 'penguinfinance-uikit2'
import { FarmCardProps } from '../types'
import Row from './Row'

export interface ITableProps {
  data: FarmCardProps[]
  sortColumn?: string
}

const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollWrapper = styled.div`
  padding: 0 8px;
`;

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;

  box-shadow: 0px 1px 4px rgb(0 0 0 / 16%);
  border-radius: 0 0 16px 16px;
  background: ${({ theme }) => theme.card.background};
  
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { data } = props

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          {data.map((row, index) => {
            return (
              <Row {...row} index={index} key={`table-row-${row.farm.type}-${row.farm.pid}`} />  
            )
          })}
        </TableWrapper>
        <ScrollWrapper>
          <ScrollButtonContainer>
            <Button variant="text" onClick={scrollToTop}>
              To Top
              <ChevronUpIcon color="primary" />
            </Button>
          </ScrollButtonContainer>
        </ScrollWrapper>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
