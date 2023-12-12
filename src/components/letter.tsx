import logo from "../assets/logo-green-ivory-black.webp"
import Editor from "./letterEditor"

const Letter = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f9f5ef]">
      <div className="container mx-8 sm:mx-10 md:mx-12  px-3">
        <div className="min-h-48 mb-6 pt-16">
          <img src={logo} alt="" className="h-auto max-w-xs" />
        </div>
        <div className="mb-7 text-[#2385A3]">
          <h1 className="text-5xl sm:text-6xl">
            <span className="font-extrabold">Send </span>the letter
          </h1>
        </div>
        <div className="container form w-3/4 ">
          <p className="text-justify whitespace-normal leading-1">
            Below you’ll find the complete text of the support letter. You can
            sign by entering your name below and then use the submit button.
          </p>
        </div>
        <div className="m-10">
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default Letter
