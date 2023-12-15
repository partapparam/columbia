import { useEffect, useState } from "react"
import { getTableData } from "../services/formService"
import { pdfExporter } from "quill-to-pdf"
import { saveAs } from "file-saver"
import Delta from "quill-delta"
import { HEADERHTML } from "../constants/letter"

interface Config {
  styles: {
    normal?: {
      font?: string
      fontSize?: number // specified in points
      baseIndent?: number // specified in points w/ 72 ppi
      levelIndent?: number // only used for lists
      indent?: {
        left?: number
        right?: number
      }
    }
  }
}

const QUILLCONFIG: Config = {
  styles: {
    normal: {
      font: "Times-Roman",
      fontSize: 10,
    },
  },
}

const Admin = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTableData()
      console.log(response)
      setData(response)
    }
    fetchData()
  }, [])

  const handleDownload = async (record) => {
    const delta = JSON.parse(record.letter)
    const nameString = `${record.firstName} ${record.lastName}`
    const d = new Delta()
      .insert(HEADERHTML)
      .insert("\n")
      .insert(delta)
      .insert("\nSincerely,\n")
      .insert(nameString, { italic: true })
    const blob = await pdfExporter.generatePdf(d, QUILLCONFIG)
    // const reader = new FileReader()
    // reader.readAsDataURL(blob)
    // reader.onload = function () {
    //   console.log(reader.result)
    // }
    saveAs(blob, `${record.firstName}_${record.lastName}_letter.pdf`) // downloads from the browser
  }

  const saveAll = async () => {
    for (const record of data) {
      await handleDownload(record)
    }
  }

  return (
    <div>
      <div className="flex justify-right">
        <button onClick={saveAll}>Save All Pdfs</button>
      </div>
      <table className="table-auto p-10 ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Permission</th>
            <th>Future Contact</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((record) => {
              return (
                <tr key={record.id}>
                  <td>
                    {record?.firstName} {record?.lastName}
                  </td>
                  <td>{record.email}</td>
                  <td>{record.permission ? "Yes" : "No"}</td>
                  <td>{record.futureContact ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="p-4 bg-red-400"
                      onClick={() => handleDownload(record)}
                    >
                      Make Pdf
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
