import { useEffect, useState, useRef } from "react"
import { getTableData } from "../services/formService"
import { pdfExporter } from "quill-to-pdf"
import { saveAs } from "file-saver"
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer"

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
    const blob = await pdfExporter.generatePdf(delta)
    console.log(blob)
    saveAs(blob, "pdf-export.pdf") // downloads from the browser
  }

  return (
    <div>
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
