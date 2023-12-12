import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useEffect } from "react"

type ContactFormValues = {
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
    futureContact: Yup.string(),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  const onSubmit = (data: ContactFormValues) => {
    console.log(JSON.stringify(data, null, 2))
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black flex flex-col gap-y-4 w-full"
    >
      <div className="text-black">
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          className={`w-full border-b py-4 px-2 border-green-950 bg-transparent ${
            errors.firstName ? "is-invalid border-red-500" : ""
          }`}
          placeholder="First Name"
          //   placeholder={`${
          //     touchedFields["firstName"] == true
          //       ? "First Name"
          //       : errors.firstName?.message
          //   }`}
        />
        <div className="invalid-feedback">{errors.firstName?.message}</div>
      </div>
      <div className="text-black">
        <label>Last Name</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          className={`${errors.lastName ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.lastName?.message}</div>
      </div>
      <div className="">
        <label>Email</label>
        <input
          type="text"
          {...register("email")}
          className={`${errors.email ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>
      <div>
        <input type="checkbox" {...register("permission")} className="mr-2" />
        <label className="text-sm">
          <b>Yes,</b> I give 881 Abbot Kinney Project permission to send this
          letter on you behalf.
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          {...register("futureContact")}
          className="mr-2"
        />
        <label className="text-sm">
          <b>Yes,</b> I would like to be contacted in the future about upcoming
          hearings, alerts, events, and more about the 881 Abbot Kinney Project
          via email and/or SMS.
        </label>
      </div>
      <div className="flex flex-row gap-4">
        <input className="btn-primary basis-1/2" type="submit" />
      </div>
    </form>
  )
}
