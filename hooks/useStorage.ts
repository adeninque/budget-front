import { useState } from "react"

const useStorage = <T>() => {
  const [store, setStore] = useState<T[] | null>(null)

  const add = (item: T) => {
    setStore(prev => {
      prev?.push(item)
      return prev
    })
  }

  return {
    store,
    add
  }
}

export default useStorage