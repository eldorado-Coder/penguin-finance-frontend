import random from 'lodash/random'

// Array of available nodes to connect to
// const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]
export const nodes = [
  // 'https://api.avax.network/ext/bc/C/rpc',
  // 'https://api.avax.network/ext/bc/C/rpc',
  // 'https://api.avax.network/ext/bc/C/rpc',
  'https://speedy-nodes-nyc.moralis.io/388bacd61e435c59bff1b6c5/avalanche/mainnet',
  'https://speedy-nodes-nyc.moralis.io/388bacd61e435c59bff1b6c5/avalanche/mainnet',
  'https://speedy-nodes-nyc.moralis.io/388bacd61e435c59bff1b6c5/avalanche/mainnet',
]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
