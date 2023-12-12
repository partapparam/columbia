import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useState } from "react"
import LETTER from "../constants/letter"
const Editor = () => {
  const [editorHtml, setEditorHtml] = useState(LETTER)

  const handleChange = (html: string) => {
    setEditorHtml(html)
  }

  return (
    <div className="text-editor bg-white m-10">
      <ReactQuill value={editorHtml} onChange={handleChange} />
    </div>
  )
}

export default Editor
