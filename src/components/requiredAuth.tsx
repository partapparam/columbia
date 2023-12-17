// import { useEffect, useState } from "react"
// import { Navigate, useLocation } from "react-router-dom"

// export const RequiredAuth = ({ children }) => {
//   const location = useLocation()
//   let redirect = ""
//   const [loggedIn, setIsLoggedIn] = useState(False)
//   // get token from localstorage

//   useEffect(() => {
//     if (isLoggedIn === false) {
//       notification.open("You must be logged in.", "Error: ")
//     }
//   }, [isLoggedIn])
//   }

//   return isLoggedIn === true ? (
//     children
//   ) : (
//     <Navigate to="/login" replace state={{ path: redirect }} />
//   )
// }
