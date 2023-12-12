import { Link } from "react-router-dom"
import logo from "../assets/abbot-kinney-logo-olive-2x-white.webp"

const Home = () => {
  return (
    <div className=" flex min-h-screen bg-[#89A0B0] justify-center items-center">
      <Link to="/support-letter">
        <img src={logo} alt="company logo" />
      </Link>
    </div>
  )
}

export default Home
