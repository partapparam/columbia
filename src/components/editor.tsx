import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useContext, useState } from "react"
import { LetterHeader } from "./letterHeader"
import { LetterFooter } from "./letterFooter"
import { LETTERHTML, HEADERHTML } from "../constants/letter"
import { LetterContext } from "../providers/letterContext"
import Delta from "quill-delta"
import { useSearchParams } from "react-router-dom"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState(LETTERHTML)
  const { updateLetter } = useContext(LetterContext)
  const [searchParams] = useSearchParams()

  const editorModules = {
    toolbar: false,
  }

  const handleChange = async (content, delta, source, editor) => {
    setEditorHtml(content)
    const text = editor.getText()
    const jsonText = JSON.stringify(text)
    updateLetter(jsonText)
  }

  return (
    <div className="flex flex-col bg-white border-8 border-[#f5eee5]">
      <LetterHeader />
      <ReactQuill
        value={editorHtml}
        defaultValue={editorHtml}
        onChange={handleChange}
        modules={editorModules}
        theme="bubble"
      />
      <LetterFooter />
    </div>
  )
}

export default Editor
