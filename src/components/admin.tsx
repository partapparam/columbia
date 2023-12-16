import { Outlet, Link } from "react-router-dom"

const LINKS = [
  { link: "/", title: "Submissions" },
  { link: "editor/letter", title: "Edit Letter" },
  { link: "editor/header", title: "Edit Header" },
]

const Admin = () => {
  return (
    <div className="p-10">
      <div className="nav bg-gray-800 text-white px-4 py-2 my-5 flex flex-row">
        <button className="text-lg px-4">
          <Link to="">Submissions</Link>
        </button>
        <button className="text-lg px-4">
          <Link to="editor/letter">Edit Letter</Link>
        </button>
        <button className="text-lg px-4">
          <Link to="editor/letter">Edit Header</Link>
        </button>
      </div>
      <Outlet />
    </div>
  )
}

export default Admin
