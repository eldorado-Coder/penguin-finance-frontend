import { Nft } from './types'

const Nfts: Nft[] = [
  // sherpa launchpad
  {
    name: 'Astronaut',
    description: `Awarded for staking +300 xPEFI in the Penguin Launchpad's Offering of Sherpa Cash.`,
    images: {
      lg: 'penguin_astronaut.png',
      md: 'penguin_astronaut.png',
      sm: 'penguin_astronaut.png',
    },
    sortOrder: 999,
    bunnyId: 3,
    rarity: 0,
    collection: 'Sherpa Launchpad',
    address: '0x617D5019334ccb99F9a2AF752f8Af629CE21D8f3',
  },
  {
    name: 'Penguineer',
    description: `Awarded for staking +1500 xPEFI in the Penguin Launchpad's Offering of Sherpa Cash.`,
    images: {
      lg: 'penguin_penguineer.png',
      md: 'penguin_penguineer.png',
      sm: 'penguin_penguineer.png',
    },
    sortOrder: 999,
    bunnyId: 4,
    rarity: 0,
    collection: 'Sherpa Launchpad',
    address: '0xbE2199322B992D19B18D9F36DCa5521b6ad773F1',
  },
  {
    name: 'Spacelord',
    description: `Awarded for staking 15000 xPEFI or more, in the Penguin Launchpad for Sherpa Cash. This holder of this NFT will be entitled to a beautiful gift.`,
    images: {
      lg: 'penguin_spacelord.png',
      md: 'penguin_spacelord.png',
      sm: 'penguin_spacelord.png',
    },
    sortOrder: 999,
    bunnyId: 5,
    rarity: 0,
    collection: 'Sherpa Launchpad',
    address: '0x79f1DdE49cdB17fE388D2dbC0db0fd9798810f59',
  },

  // boofi launchpad
  {
    name: 'Ghoul',
    description: `Unlocked by staking +500 iPEFI in the Penguin Launchpad for BooFinance.`,
    images: {
      lg: 'penguin_boofi_ghoul.jpg',
      md: 'penguin_boofi_ghoul.jpg',
      sm: 'penguin_boofi_ghoul.jpg',
    },
    sortOrder: 999,
    bunnyId: 7,
    rarity: 0,
    collection: 'BooFinance Launchpad',
    address: '0x02B2fFB0034405183e9741DC0124ce27B90C65E9',
  },
  {
    name: 'Reaper',
    description: `Unlocked for staking +10,000 iPEFI in the Penguin Launchpad for BooFinance.`,
    images: {
      lg: 'penguin_boofi_reaper.jpg',
      md: 'penguin_boofi_reaper.jpg',
      sm: 'penguin_boofi_reaper.jpg',
    },
    sortOrder: 999,
    bunnyId: 8,
    rarity: 0,
    collection: 'BooFinance Launchpad',
    address: '0xaF7CB6Bf00ea3457965CB05dbA034C762d6492A0',
  },
  {
    name: 'Demonlord',
    description: `Unlocked for staking 50,000 iPEFI or more, in the Penguin Launchpad for BooFinance. The holder of this NFT is destined to a pleasantly spooky surprise. A smart Penguin should keep it handy.`,
    images: {
      lg: 'penguin_boofi_demonlord.jpg',
      md: 'penguin_boofi_demonlord.jpg',
      sm: 'penguin_boofi_demonlord.jpg',
    },
    sortOrder: 999,
    bunnyId: 9,
    rarity: 0,
    collection: 'BooFinance Launchpad',
    address: '0x623fFc678b756eadBC15A66f1d79C2Fc3d436ced',
  },

  // penguin without borders
  {
    name: 'Doctor Cubiz',
    description: `A reward to very charitable Penguins who contributed either: 100 AVAX, 2300 PEFI or more to the Penguins Without Borders campaign. Donations raised were then sent to India's Covid Crypto Relief Fund.`,
    images: {
      lg: 'penguin_aukee.png',
      md: 'penguin_aukee.png',
      sm: 'penguin_aukee.png',
      // ipfs: 'https://gateway.pinata.cloud/ipfs/QmNS1A5HsRW1JvFWtGkm4o9TgZVe2P7kA8TB4yxvS6A7ms/bullish.png',
    },
    sortOrder: 999,
    bunnyId: 1,
    rarity: 2,
    collection: 'Penguins without Borders',
    address: '0x42F80C76c0f19cbEEea24eAAAf351E077Aa80781',
  },
  {
    name: 'Aukee the Nurse',
    description: `A reward to very charitable Penguins who contributed either: 5 AVAX, 115 PEFI or more to the Penguins Without Borders campaign. Donations raised were then sent to India's Covid Crypto Relief Fund.`,
    images: {
      lg: 'penguin_nurse.png',
      md: 'penguin_nurse.png',
      sm: 'penguin_nurse.png',
    },
    sortOrder: 999,
    bunnyId: 2,
    rarity: 37,
    collection: 'Penguins without Borders',
    address: '0x3A96c8976697335B3c3cD073eF2739A0Ea47420C',
  },
]

export default Nfts
