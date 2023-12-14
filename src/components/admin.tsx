import { useEffect, useState } from "react"
import { getData } from "../services/formService"

const Admin = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData()
      console.log(response)
      setData(response)
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* {data &&
        data.map((record) => {
          ;<div>
            <p>record.firstName</p>
            <p>record.lastName</p>
          </div>
        })} */}
    </div>
  )
}

export default Admin
