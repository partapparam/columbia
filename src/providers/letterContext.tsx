import React, { useState, createContext, ReactNode } from "react"

interface Props {
  children?: ReactNode
}

interface LetterContextType {
  updateLetter: (letterString: string) => void
  getLetter: () => string
  letter?: string
}

export const LetterContext = createContext({} as LetterContextType)

export const LetterProvider = ({ children }: Props) => {
  const [letter, setLetter] = useState("")

  const updateLetter = (letterString: string) => {
    setLetter(letterString)
  }
  const getLetter = () => letter
  return (
    <LetterContext.Provider value={{ updateLetter, getLetter }}>
      {children}
    </LetterContext.Provider>
  )
}
