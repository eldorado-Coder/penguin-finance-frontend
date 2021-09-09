import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip';
import { getContract } from 'utils/erc20'
import { getAddress } from 'utils/addressHelpers'
import { Button, Flex, Text, Heading } from 'penguinfinance-uikit2'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import useWeb3 from 'hooks/useWeb3'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance';
import { useHarvest } from 'hooks/useHarvest'
import useUnstake from 'hooks/useUnstake'

const Action = styled.div`
  padding-top: 16px;
`

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.isDark && 'rgb(154, 106, 255)'};
`

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, type } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid, type)
  const web3 = useWeb3()
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const { onReward } = useHarvest(pid)
  const { onUnstake } = useUnstake(pid)
  const [pendingTx, setPendingTx] = useState(false);

  const lpContract = useMemo(() => {
    return getContract(web3, lpAddress)
  }, [web3, lpAddress])

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const getMigrationTooltip = () => {
    return `
      <p>When you click on "Migrate", all of your LP (old bridge tokens) will be withdrawn and your rewards will be harvested automatically. You will then be taken to Pangolin to get the new LP (new bridge tokens). Finally, you can go to the Igloos v2 page (www.penguinfinance.org/farms) and deposit.</p>
    `
  }

  const handleMigrate = async () => {
    const fullBalance = getFullDisplayBalance(stakedBalance);
    setPendingTx(true);
    try {
      await onUnstake(fullBalance);
      await onReward();
      setPendingTx(false);
    } catch (error) {
      setPendingTx(false);
    }
  };

  const renderApprovalOrStakeButton = () => {
    const rawStakedBalance = getBalanceNumber(stakedBalance)  
    const displayBalance = rawStakedBalance.toLocaleString()

    return (
      <Flex justifyContent={isApproved ? 'space-between' : 'flex-end'} alignItems='center'>
        {isApproved && 
          <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
        }
        <div data-for='migration-tooltip' data-tip={getMigrationTooltip()}>
          <Button mt="8px" scale="md" disabled={rawStakedBalance === 0 || pendingTx} onClick={handleMigrate}>
            Migrate
          </Button>
        </div>
        {account && (
          <CustomToolTip
            id='migration-tooltip'
            wrapper="div"
            delayHide={0}
            effect="solid"
            multiline
            place="bottom"
            html
          />
        )}
      </Flex>
    );
  }

  return (
    <Action>
      <Flex>
        <StyledText bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </StyledText>
        <Text bold textTransform="uppercase" color="primary" fontSize="12px">
          {TranslateString(1074, 'Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

const CustomToolTip = styled(ReactTooltip)`
  width: 100% !important;
  max-width: 316px !important;
  background: ${({ theme }) => (theme.isDark ? '#383466!important' : '#fff!important')};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#fff!important' : '#2D2159!important')};
  opacity: 1 !important;
  padding: 12px 16px !important;
  font-size: 12px !important;
  border: 1px solid #D3464E !important;
  border-radius: 48px !important;
  margin-top: 0px !important;
  line-height: 16px !important;
  letter-spacing: 0.2px;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  &:before {
    border-top-color: #D3464E !important;
    border-bottom-color: #D3464E !important;
  }
  &:after {
    border-top-color: ${({ theme }) =>
      theme.isDark ? '#383466!important' : '#fff!important'};
    border-bottom-color: ${({ theme }) =>
      theme.isDark ? '#383466!important' : '#fff!important'};
  }
`

export default CardActions
