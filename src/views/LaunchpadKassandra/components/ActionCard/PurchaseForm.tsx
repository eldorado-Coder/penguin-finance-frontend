import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useState } from 'react'
import { Button, Flex, Text } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import {
  useKassandraBoosterRocketPayToken,
  useKassandraBoosterRocket as useKassandraBoosterRocketContract,
} from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import roundDown from 'utils/roundDown'
import { getKassandraBoosterRocketAddress, getKassandraAddress } from 'utils/addressHelpers'
import { addTokenToMetamask } from 'utils/token'
import { useKassandraBoosterRocket as useKassandraBoosterRocketStore } from 'state/hooks'
import SvgIcon from 'components/SvgIcon'
import UnlockButton from 'components/UnlockButton'
import { PANGOLIN_USDC_LINK } from 'config'
import TokenInput from './TokenInput'
import { useKassandraLaunchpadBoosterRocket } from '../../hooks'

interface PurchaseFormProps {
  tokenName?: string
  onConfirm?: (amount: string) => void
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ tokenName = 'KACY' }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [payTokenCost, setPayTokenCost] = useState(0)
  const [buyTokenAmount, setBuyTokenAmount] = useState('')
  const { account } = useWeb3React()
  const payTokenContract = useKassandraBoosterRocketPayToken()
  const boosterRocketContract = useKassandraBoosterRocketContract()
  const {
    payTokenBalance,
    buyTokenBalance,
    tokensLeftToDistribute,
    eventOngoing,
    canPurchaseAmount,
  } = useKassandraBoosterRocketStore(account)
  const { onPurchase } = useKassandraLaunchpadBoosterRocket()

  const purchaseTokenMaxBalance = String(canPurchaseAmount)
  const canPurchase =
    account &&
    !pendingTx &&
    eventOngoing &&
    Number(buyTokenAmount) > 0 &&
    Number(buyTokenAmount) <= Number(canPurchaseAmount) &&
    Number(buyTokenAmount) <= Number(tokensLeftToDistribute)

  const updatePayTokenCost = async (value) => {
    if (Number(value) > 0) {
      const amount = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
      const findAmountToPay = await boosterRocketContract.methods.findAmountToPay(amount, account).call()
      setPayTokenCost(getBalanceNumber(new BigNumber(findAmountToPay), 6))
    } else {
      setPayTokenCost(0)
    }
  }

  const handleChangePayTokenAmount = () => {
    return null
  }

  const handleChangeBuyTokenAmount = useCallback(
    async (e: React.FormEvent<HTMLInputElement>) => {
      if (!account) return

      const { value } = e.currentTarget
      setBuyTokenAmount(value)
      updatePayTokenCost(value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setBuyTokenAmount, account],
  )

  const handleSelectMax = useCallback(() => {
    if (!account) return
    setBuyTokenAmount(purchaseTokenMaxBalance)
    updatePayTokenCost(purchaseTokenMaxBalance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, purchaseTokenMaxBalance, setBuyTokenAmount])

  const handlePurchaseToken = async () => {
    if (!canPurchase) return
    setPendingTx(true)
    try {
      const allowanceBalance =
        (await payTokenContract.methods.allowance(account, getKassandraBoosterRocketAddress()).call()) / 1e06
      if (allowanceBalance === 0) {
        // call approve function
        const approveAmount = '1000000000000000000000000000'
        await payTokenContract.methods.approve(getKassandraBoosterRocketAddress(), approveAmount).send({ from: account })
      }

      await onPurchase(buyTokenAmount)
      setPendingTx(false)
      setBuyTokenAmount('')
    } catch (error) {
      setPendingTx(false)
      setBuyTokenAmount('')
    }
  }

  const renderText = () => {
    if (pendingTx) return 'Pending Confirmation'
    if (Number(payTokenBalance) < Number(payTokenCost)) return 'GET USDC.e'
    if (payTokenCost) return 'GET KACY'
    return 'Enter Amount'
  }

  const handleGetUsdc = () => {
    window.open('https://app.platypus.finance/swap', '_blank')
  }

  const handleAddKittyToken = async () => {
    await addTokenToMetamask(getKassandraAddress(), 'KACY', 18)
  }

  return (
    <>
      <Flex flexDirection="column">
        <TokenInput
          disabled
          value={roundDown(payTokenCost, 2)}
          hasMaxBtn={false}
          tokenSymbol="USDC.e"
          onChange={handleChangePayTokenAmount}
        />
        <Flex justifyContent="space-between">
          <InfoText> </InfoText>
          <InfoText>{`Balance: ${payTokenBalance.toFixed(2)} USDC.e `}</InfoText>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <SvgIconWrapper>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/arrow_down.svg`}
            width="100%"
            height="10px"
          />
        </SvgIconWrapper>
      </Flex>
      <Flex flexDirection="column">
        <TokenInput
          value={buyTokenAmount}
          tokenSymbol="KACY"
          onSelectMax={handleSelectMax}
          onChange={handleChangeBuyTokenAmount}
        />
        <Flex justifyContent="space-between">
          <InfoText>{`Balance: ${Number(buyTokenBalance).toFixed(2)} ${tokenName}  `}</InfoText>
          <InfoText>{`LIMIT: ${Number(canPurchaseAmount).toFixed(2)} ${tokenName} `}</InfoText>
        </Flex>
      </Flex>

      <Flex mt="14px">
        {!account && <StyledUnlockButton />}
        {account && (
          <>
            {Number(payTokenBalance) >= Number(payTokenCost) && Number(payTokenBalance) > 0 ? (
              <StyledButton scale="md" disabled={!canPurchase} onClick={handlePurchaseToken}>
                {renderText()}
              </StyledButton>
            ) : (
              <StyledButton scale="md" disabled={pendingTx} onClick={handleGetUsdc}>
                {renderText()}
              </StyledButton>
            )}
          </>
        )}
      </Flex>
      <Flex mt="14px">
        <StyledButton scale="md" onClick={handleAddKittyToken}>
          Add KACY to Metamask
        </StyledButton>
      </Flex>
      <Flex>
        <NoteText>{`NOTE: You can only acquire KACY if you have USDC.e `}</NoteText>
      </Flex>
    </>
  )
}

const InfoText = styled(Text)`
  font-weight: normal;
  /* font-size: 9.4449px; */
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.360836px;
  color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#292929')};
`

const SvgIconWrapper = styled(Flex)`
  margin-top: 0px;
  margin-bottom: 15px;
  background: ${({ theme }) => (theme.isDark ? '#6A5A9B' : '#ffffff')};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  > div {
    margin-top: -4px;
  }
  svg {
    path {
      stroke: ${({ theme }) => (theme.isDark ? '#ffffff' : '#6A5A9B')};
    }
  }
`

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  color: white;
  background-color: #7405aa;
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  background-color: #7405aa;
`

const NoteText = styled(Text)`
  font-weight: normal;
  /* font-size: 9.4449px; */
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.360836px;
  color: #7f7f7f;
  margin-top: 7px;
`

export default PurchaseForm
