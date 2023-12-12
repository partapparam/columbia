interface LetterFooterProps {
  name: string
}

export const LetterFooter = ({ name }: LetterFooterProps) => {
  return (
    <div className="bg-[#e8e8e8] p-5 sm:p-8 text-md font-serif">
      Sincerely, <br />
      <br />
      <span className="font-serif italic tracking-tighter">{name}</span>
    </div>
  )
}
