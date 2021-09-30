import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { ACCOUNTS_SEARCH } from 'subgraph/queries'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const claimXPefi = async (strategyContract, account) => {
  return strategyContract.methods.claimXPEFI().send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const compounderStake = async (strategyContract, amount, account) => {
  return strategyContract.methods
    .deposit(amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const launchpadStake = async (launchpadContract, amount, account) => {
  return launchpadContract.methods
    .stake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// boosterRocket
export const boosterRocketAgreeTerms = async (boosterRocketContract, account) => {
  return boosterRocketContract.methods
    .agreeToTermsAndConditions()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const boosterRocketPurchaseTokens = async (boosterRocketContract, amount, account) => {
  return boosterRocketContract.methods
    .purchaseTokens(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({
      from: account,
      value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const compounderUnstake = async (strategyContract, amount, account) => {
  return strategyContract.methods
    .withdraw(amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const launchpadUnstake = async (launchpadContract, amount, account) => {
  return launchpadContract.methods
    .unstake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return sousChefContract.methods
    .leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: ACCOUNTS_SEARCH })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// normal emperor events
export const registerEmperor = async (emperorContract, { nickName, color, style }, account) => {
  return emperorContract.methods
    .registerYourPenguin(nickName, color, style.toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const changeEmperorStyle = async (emperorContract, style, account) => {
  return emperorContract.methods
    .changeStyle(style)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const changeEmperorColor = async (emperorContract, color, account) => {
  return emperorContract.methods
    .changeColor(color)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stealCrown = async (emperorContract, amount, account) => {
  return emperorContract.methods
    .stealCrown(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stealCrownAndPoison = async (emperorContract, amount, account) => {
  return emperorContract.methods
    .stealCrownAndPoison(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const approveXPefi = async (xPefiContract, account, address) => {
  const approveAmount = '1000000000000000000000000000'
  return xPefiContract.methods
    .approve(address, new BigNumber(approveAmount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const approveIPefi = async (iPefiContract, account, address) => {
  const approveAmount = '1000000000000000000000000000'
  return iPefiContract.methods
    .approve(address, new BigNumber(approveAmount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gas: 200000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const approvePefi = async (pefiContract, account, address) => {
  const approveAmount = '1000000000000000000000000000'
  return pefiContract.methods
    .approve(address, new BigNumber(approveAmount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// charity events
export const registerCharityEmperor = async (donationContract, { nickName, color, style }, account) => {
  return donationContract.methods
    .registerYourPenguin(nickName, color, style.toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const changeCharityEmperorStyle = async (donationContract, style, account) => {
  return donationContract.methods
    .changeStyle(style)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const changeCharityEmperorColor = async (donationContract, color, account) => {
  return donationContract.methods
    .changeColor(color)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const donateAvax = async (donationContract, amount, account) => {
  return donationContract.methods
    .donateAvax()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const donatePefi = async (donationContract, amount, account) => {
  return donationContract.methods
    .donatePefi(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// v2
export const migrateNest = async (nestMigrateContract, account) => {
  return nestMigrateContract.methods
    .migrateXPEFI()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const v2FarmStake = async (masterChefContract, pid, amount, to, account) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), to || account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const v2FarmUnstake = async (masterChefContract, pid, amount, to, account) => {
  return masterChefContract.methods
    .withdrawAndHarvest(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), to || account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const v2FarmHarvest = async (masterChefContract, pid, to, account) => {
  return masterChefContract.methods
    .harvest(pid, to || account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const v2FarmSetAutoNestAllocation = async (masterChefContract, amount, account) => {
  return masterChefContract.methods
    .setIpefiDistributionBips(amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// launchpad - boofi
export const boofiBoosterRocketAgreeTerms = async (boosterRocketContract, account) => {
  return boosterRocketContract.methods
    .agreeToTermsAndConditions()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const boofiBoosterRocketPurchaseTokens = async (boosterRocketContract, amount, account) => {
  return boosterRocketContract.methods
    .purchaseTokens(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
