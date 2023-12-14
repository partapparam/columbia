import { useEffect, useState, useRef } from "react"
import { getTableData } from "../services/formService"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import parse from "html-react-parser"
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer"

const Admin = () => {
  const [data, setData] = useState([])
  const currentRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTableData()
      console.log(response)
      setData(response)
    }
    fetchData()
  }, [])

  const MyDocument = (record) => (
    <Document>
      <Page size="A4">
        <View>
          <Text>{record}</Text>
        </View>
      </Page>
    </Document>
  )

  const handleDownload = async (record) => {
    // const element = record.letter
    // const canvas = await html2canvas(element)
    // const data = canvas.toDataURL("image/png")
    // console.log(record.letter)
    const document = MyDocument(record.letter)
    // const html = parse(record.letter)
    // console.log(html)
    // const doc = new jsPDF({
    //   orientation: "landscape",
    //   unit: "in",
    //   format: [4, 2],
    // })

    ReactPDF.renderToFile(document, `$../assets/example.pdf`)
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
