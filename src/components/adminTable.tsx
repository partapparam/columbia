import { useEffect, useState } from "react"
import { getTableData } from "../services/formService"
import { pdfExporter } from "quill-to-pdf"
import { saveAs } from "file-saver"
import Delta from "quill-delta"
import { HEADERHTML } from "../constants/letter"
import Merger from "../services/fileMergerService"

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

const AdminTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTableData()
      setData(response)
    }
    fetchData()
  }, [])

  const handleDownload = async (record: object) => {
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
    return blob
  }

  const saveOne = async (record) => {
    const blob = await handleDownload(record)
    saveAs(blob, `${record.firstName}_${record.lastName}_letter.pdf`)
  }

  const saveAll = async () => {
    const blobs = []
    for (const record of data) {
      const blob = await handleDownload(record)
      blobs.push(blob)
    }
    await Merger(blobs)
  }

  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 my-4 text-white shadow-md rounded-md "
          onClick={saveAll}
        >
          Download All
        </button>
      </div>
      <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-2 py-3">Name</th>
            <th className="px-2 py-3">Email</th>
            <th className="px-2 py-3 text-center">Permission</th>
            <th className="px-2 py-3 text-center">Future Contact</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((record) => {
              return (
                <tr key={record.id} className="border-b hover:bg-slate-50">
                  <td className="px-2 py-2 ">
                    {record?.firstName} {record?.lastName}
                  </td>
                  <td className="px-2 py-2 ">{record.email}</td>
                  <td className="px-2 py-2 text-center ">
                    {record.permission ? "Yes" : "No"}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {record.futureContact ? "Yes" : "No"}
                  </td>
                  <td className="px-2 py-2 ">
                    <button
                      className="px-4 py-2 bg-white hover:bg-slate-100 border-2 border-black rounded-md text-black"
                      onClick={() => saveOne(record)}
                    >
                      Download
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

export default AdminTable
