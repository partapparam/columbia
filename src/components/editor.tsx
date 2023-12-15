import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useContext, useState } from "react"
import { LetterHeader } from "./letterHeader"
import { LetterFooter } from "./letterFooter"
import { LETTERHTML } from "../constants/letter"
import { LetterContext } from "../providers/letterContext"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState(LETTERHTML)
  const { updateLetter } = useContext(LetterContext)

  const editorModules = {
    toolbar: false,
  }

  const handleChange = async (content, delta, source, editor) => {
    // setEditorHtml(editor.getContents())
    // console.log(editor)
    // console.log(delta)
    // console.log(JSON.stringify(editor.getHTML()))
    // const blob = await pdfExporter.generatePdf(delta)
    // console.log(blob)
    const j = JSON.stringify(delta)
    updateLetter(j)
    // console.log(html)
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
