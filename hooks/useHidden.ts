import { useState } from "react";

const useHidden = () => {
  const [hidden, setHidden] = useState(true)
  const toggleHidden = () => setHidden(prev => !prev)

  return {
    hidden,
    toggleHidden
  }
}

export default useHidden;