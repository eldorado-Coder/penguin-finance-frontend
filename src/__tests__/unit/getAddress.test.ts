import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    128: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    256: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
  }

  it(`get address for mainnet (chainId 128)`, () => {
    process.env.REACT_APP_CHAIN_ID = '128'
    const expected = address[128]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 256)`, () => {
    process.env.REACT_APP_CHAIN_ID = '256'
    const expected = address[256]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[56]
    expect(getAddress(address)).toEqual(expected)
  })
})
