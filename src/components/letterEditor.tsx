import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useState } from "react"
import LETTER from "../constants/letter"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState(LETTER)

  const editorModules = {
    toolbar: false,
  }

  const handleChange = (html: string) => {
    setEditorHtml(html)
    console.log(editorHtml)
  }

  return (
    <div className="text-editor bg-white m-10 text-lg ">
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={editorModules}
        theme="bubble"
      />
    </div>
  )
}

export default Editor
