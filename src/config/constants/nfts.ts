import { Nft } from './types'

const Nfts: Nft[] = [
  // penguin without borders
  {
    name: 'Doctor Aukee',
    description: 'The cutest doctor in the whole wide world. Always ready to help their fellow Penguins.',
    images: {
      lg: 'penguin_aukee.png',
      md: 'penguin_aukee.png',
      sm: 'penguin_aukee.png',
      // ipfs: 'https://gateway.pinata.cloud/ipfs/QmNS1A5HsRW1JvFWtGkm4o9TgZVe2P7kA8TB4yxvS6A7ms/bullish.png',
    },
    sortOrder: 999,
    bunnyId: 1,
    rarity: 2,
    collection: 'doctor',
    address: '0x42F80C76c0f19cbEEea24eAAAf351E077Aa80781',
  },
  {
    name: 'Penguin Nurse',
    description: 'Whole hearted Penguins, willing to risk their life for others. Some of the bravest birds on Earth.',
    images: {
      lg: 'penguin_nurse.png',
      md: 'penguin_nurse.png',
      sm: 'penguin_nurse.png',
    },
    sortOrder: 999,
    bunnyId: 2,
    rarity: 37,
    collection: 'doctor',
    address: '0x3A96c8976697335B3c3cD073eF2739A0Ea47420C',
  },
  // sherpa launchpad
  {
    name: 'Astronaut',
    description: 'Penguin Sherpa Launchpad Collection',
    images: {
      lg: 'penguin_astronaut.png',
      md: 'penguin_astronaut.png',
      sm: 'penguin_astronaut.png',
    },
    sortOrder: 999,
    bunnyId: 3,
    rarity: 0,
    collection: 'sherpa',
    address: '0x617D5019334ccb99F9a2AF752f8Af629CE21D8f3',
  },
  {
    name: 'Spacelord',
    description: 'Penguin Sherpa Launchpad Collection',
    images: {
      lg: 'penguin_spacelord.png',
      md: 'penguin_spacelord.png',
      sm: 'penguin_spacelord.png',
    },
    sortOrder: 999,
    bunnyId: 5,
    rarity: 0,
    collection: 'sherpa',
    address: '0x79f1DdE49cdB17fE388D2dbC0db0fd9798810f59',
  },
  {
    name: 'Penguineer',
    description: 'Limited-edition Sherpa Cash Inspired NFT Collectible',
    images: {
      lg: 'penguin_penguineer.png',
      md: 'penguin_penguineer.png',
      sm: 'penguin_penguineer.png',
    },
    sortOrder: 999,
    bunnyId: 4,
    rarity: 0,
    collection: 'sherpa',
    address: '0xbE2199322B992D19B18D9F36DCa5521b6ad773F1',
  },

  // boofi launchpad
  {
    name: 'Ghoul',
    description: 'Penguin Boofi Launchpad Collection',
    images: {
      lg: 'penguin_boofi_ghoul.jpg',
      md: 'penguin_boofi_ghoul.jpg',
      sm: 'penguin_boofi_ghoul.jpg',
    },
    sortOrder: 999,
    bunnyId: 7,
    rarity: 0,
    collection: 'boofi',
    address: '0x02B2fFB0034405183e9741DC0124ce27B90C65E9',
  },
  {
    name: 'Reaper',
    description: 'Penguin Boofi Launchpad Collection',
    images: {
      lg: 'penguin_boofi_reaper.jpg',
      md: 'penguin_boofi_reaper.jpg',
      sm: 'penguin_boofi_reaper.jpg',
    },
    sortOrder: 999,
    bunnyId: 8,
    rarity: 0,
    collection: 'boofi',
    address: '0xaF7CB6Bf00ea3457965CB05dbA034C762d6492A0',
  },
  {
    name: 'Demonlord',
    description: 'Penguin Boofi Launchpad Collection',
    images: {
      lg: 'penguin_boofi_demonlord.jpg',
      md: 'penguin_boofi_demonlord.jpg',
      sm: 'penguin_boofi_demonlord.jpg',
    },
    sortOrder: 999,
    bunnyId: 9,
    rarity: 0,
    collection: 'boofi',
    address: '0x623fFc678b756eadBC15A66f1d79C2Fc3d436ced',
  },
]

export default Nfts
