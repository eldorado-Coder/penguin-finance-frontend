import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, ChevronUpIcon } from 'penguinfinance-uikit2'
import { FarmCardProps } from '../types';
import Row from './Row'

export interface ITableProps {
  data: FarmCardProps[]
  sortColumn?: string,
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
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

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
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
          <StyledTable>
            <TableBody>
              {data.map((row) => {
                return <Row {...row} key={`table-row-${row.farm.type}-${row.farm.pid}`} />
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            To Top
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
