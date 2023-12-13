import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

type LetterFormValues = {
  firstName: string
  lastName: string
  email: string
  permission: string
  futureContact: string
}

export const LetterForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .required("An email is required")
      .email("Email is invalid"),
    permission: Yup.string().required(),
    futureContact: Yup.string().required(),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LetterFormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: LetterFormValues) => {
    console.log(JSON.stringify(data, null, 2))
    reset()
  }

  return (
    <div>
      <div className="flex flex-col pt-8 pb-3 text-center">
        <p className="text-xl text-[#2385A3]">You're ready to send.</p>
        <p>To send the above letter, please enter info below:</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-black flex flex-col p-6 sm:p-8 gap-y-4 w-full"
      >
        <div>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className={`w-full border-b py-4 px-2 border-green-950 bg-transparent ${
              errors.firstName ? "is-invalid border-red-500" : ""
            }`}
            placeholder="First Name"
          />
          <div className="text-red-500 font-mono">
            {errors.firstName?.message}
          </div>
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className={`w-full border-b py-4 px-2 border-green-950 bg-transparent ${
              errors.lastName ? "is-invalid border-red-500" : ""
            }`}
            placeholder="Last Name"
          />
          <div className="text-red-500 font-mono">
            {errors.lastName?.message}
          </div>
        </div>
        <div>
          <input
            type="text"
            id="email"
            {...register("email")}
            className={`rounded-none w-full border-b py-4 px-2 border-green-950 bg-transparent ${
              errors.lastName ? "is-invalid border-red-500" : ""
            }`}
            placeholder="Email"
          />
          <div className="text-red-500 font-mono">{errors.email?.message}</div>
        </div>
        <div className="py-4">
          <input
            type="checkbox"
            {...register("permission")}
            className="mr-2"
            name="permission"
          />
          <label htmlFor="permission" className="text-sm">
            <b>Yes,</b> I give 881 Abbot Kinney Project permission to send this
            letter on you behalf.
          </label>
        </div>
        <div className="flex flex-row gap-x-1">
          <input
            type="checkbox"
            {...register("futureContact")}
            className="w-12 h-12 border-black rounded-none"
            name="future-contact"
          />
          <label className="text-sm" htmlFor="future-contact">
            <b>Yes,</b> I would like to be contacted in the future about
            upcoming hearings, alerts, events, and more about the 881 Abbot
            Kinney Project via email and/or SMS.
          </label>
        </div>
        <div className="flex justify-center py-4 items-center gap-4">
          <input
            className="bg-[#2385A3] hover:shadow-xl hover:cursor-pointer shadow-lg text-white !px-10 !py-4"
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}
