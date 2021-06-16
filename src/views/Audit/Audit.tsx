import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'

const Audit: React.FC = () => {
  return (
    <Page>
      <AuditBgContainer width="100%" height="100%" />
    </Page>
  )
}

const AuditBgContainer = styled.video`
  object-fit: fill;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;
`

export default Audit
