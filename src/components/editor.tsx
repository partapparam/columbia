import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useState } from "react"
import LETTER from "../constants/letter"
import { LetterHeader } from "./letterHeader"
import { LetterFooter } from "./letterFooter"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState(LETTER)
  const [name, setName] = useState("Your Name")

  const editorModules = {
    toolbar: false,
  }

  const handleChange = (html: string) => {
    setEditorHtml(html)
    // console.log(editorHtml)
  }

  return (
    <div className="flex flex-col bg-white border-4 border-[#f5eee5]">
      <LetterHeader />
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={editorModules}
        theme="bubble"
      />
      <LetterFooter name={name} />
    </div>
  )
}

export default Editor
