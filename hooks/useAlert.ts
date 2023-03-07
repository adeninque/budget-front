import { useState } from "react";

const useAlert = () => {
  const [hidden, setHidden] = useState(true)
  const toggleHidden = () => setHidden(prev => !prev)

  return {
    hidden,
    toggleHidden
  }
}

export default useAlert;