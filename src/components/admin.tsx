import { Outlet } from "react-router-dom"

const Admin = () => {
  return (
    <div className="p-10">
      <div className="nav bg-gray-800 text-white px-4 py-2">
        <Link to></Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Admin
