import logo from "../assets/logo-green-ivory-black.webp"
import Editor from "./editor"
import { LetterForm } from "./letterForm"
import hotelRender from "../assets/hotel-render.png"
import { Footer } from "./footer"

const Letter = () => {
  return (
    <div className="flex flex-col bg-[#f9f5ef]">
      {/* #f5eee5 is the image background hex */}
      <div className="w-5/6 sm:w-2/3 m-auto">
        <div className="min-h-48 mb-6 pt-16">
          <img src={logo} alt="" className="h-auto img-logo" />
        </div>
        <div className="mb-7 text-[#2385A3]">
          <h1 className="text-5xl sm:text-6xl">
            <span className="font-extrabold">Send </span>the letter
          </h1>
        </div>
        <div className="container form ">
          <p className="text-justify whitespace-normal leading-">
            Below you’ll find the complete text of the support letter. You can
            sign by entering your name below and then use the submit button.
          </p>
        </div>
        <div className="">
          <Editor />
          <LetterForm />
        </div>
      </div>
      <div className="">
        <img
          src={hotelRender}
          alt="abbot kinney hotel render"
          className="object-fill w-full"
        />
      </div>
      <Footer />
    </div>
  )
}

export default Letter
