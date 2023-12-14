import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useState } from "react"
import { LetterHeader } from "./letterHeader"
import { LetterFooter } from "./letterFooter"
import { LETTERHTML } from "../constants/letter"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState(LETTERHTML)

  const editorModules = {
    toolbar: false,
  }

  const handleChange = (html: string) => {
    setEditorHtml(html)
    // console.log(html)
  }

  return (
    <div className="flex flex-col bg-white border-8 border-[#f5eee5]">
      <LetterHeader />
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={editorModules}
        theme="bubble"
      />
      <LetterFooter />
    </div>
  )
}

export default Editor
