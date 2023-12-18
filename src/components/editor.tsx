import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useContext, useEffect, useState } from "react"
import { LetterHeader } from "./letterHeader"
import { LetterFooter } from "./letterFooter"
import { LetterContext } from "../providers/letterContext"
import { getContent } from "../services/formService"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState()
  const { updateLetter } = useContext(LetterContext)
  const [header, setHeader] = useState()

  const editorModules = {
    toolbar: false,
  }

  useEffect(() => {
    const fetch = async () => {
      const results = await getContent()
      // console.log(results)
      const letter = results[0].content
      const header = results[1].content
      setEditorHtml(JSON.parse(letter))
      setHeader(JSON.parse(header))
    }
    fetch().catch((err) => console.log(err))
  }, [])

  const handleChange = async (content, delta, source, editor) => {
    setEditorHtml(content)
    const text = editor.getText()
    const jsonText = JSON.stringify(text)
    updateLetter(jsonText)
  }

  return (
    <div className="flex flex-col bg-white border-8 border-[#f5eee5]">
      <LetterHeader header={header} />
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
