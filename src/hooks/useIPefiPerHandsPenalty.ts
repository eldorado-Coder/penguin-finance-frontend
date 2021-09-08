import { useState, useEffect } from 'react';
import { useV2NestContract } from 'hooks/useContract'

const useIPefiPerHandsPenalty = () => {
  const [handsOnPenalty, setHandsOnPenalty] = useState(600)
  const iPefiContract = useV2NestContract()

  useEffect(() => {
    const fetchHandsOnPenalty = async () => {
      const perHandsPenalty = await iPefiContract.methods.paperHandsPenalty().call()
      setHandsOnPenalty(perHandsPenalty)
    }

    fetchHandsOnPenalty();
  }, [iPefiContract]);

  return handsOnPenalty;
};

export default useIPefiPerHandsPenalty;