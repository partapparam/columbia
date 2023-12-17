import { useEffect, useState } from "react"
import { getLetterContent, updateLetterContent } from "../services/formService"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"

const AdminEditor = () => {
  const [letter, setLetter] = useState()
  const [type, setType] = useState()
  useEffect(() => {
    const fetchContent = async () => {
      const result = await getLetterContent()
      console.log(result)
      // setLetter(JSON.parse(result.content))
      setLetter(JSON.parse(result.content))
      setType(result.type)
    }
    fetchContent().catch((err) => console.log(err))
  }, [])

  const editorModules = {
    toolbar: false,
  }

  const handleChange = (content) => {
    setLetter(content)
    // const text = editor.getText()
    // console.log(text)
  }

  const submitChanges = async () => {
    console.log("save")
    const jsonText = JSON.stringify(letter)
    const data = [
      {
        id: "recHW8VySE2POJXFq",
        fields: {
          type: type,
          content: jsonText,
        },
      },
    ]

    await updateLetterContent(data)
  }

  return (
    <div className="mx-5 md:mx-15 my-5 flex flex-col bg-white">
      <p className="text-2xl font-extrabold py-4">Update {type}</p>
      {letter && (
        <div className="border-8 border-[#f5eee5]">
          <ReactQuill
            value={letter}
            defaultValue={letter}
            onChange={handleChange}
            modules={editorModules}
            theme="bubble"
          />
        </div>
      )}

      <button
        onClick={submitChanges}
        className="px-4 py-2 my-2 w-[96px] text-white bg-green-500 hover:bg-green-600 rounded-md"
      >
        Save
      </button>
    </div>
  )
}

export default AdminEditor
