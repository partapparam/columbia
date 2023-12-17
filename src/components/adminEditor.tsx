import { useEffect } from "react"
import { getLetterContent } from "../services/formService"

const AdminEditor = () => {
  useEffect(() => {
    const fetchContent = async () => {
      const results = await getLetterContent()
      console.log(results)
    }
    fetchContent().catch((err) => console.log(err))
  }, [])

  return <div className="p-20 bg-black">This si the admin editor.</div>
}

export default AdminEditor
