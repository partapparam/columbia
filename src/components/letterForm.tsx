import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

interface ContactFormProps {
  closeModal: () => void
}

type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
}

export const ContactForm = ({ closeModal }: ContactFormProps) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Full name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: ContactFormValues) => {
    console.log(JSON.stringify(data, null, 2))
    handleReset()
  }
  const handleReset = () => {
    reset()
    closeModal()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black flex flex-col gap-y-4 z-50"
    >
      <div className="text-black">
        <label>First Name</label>
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          className={`${errors.firstName ? "is-invalid" : ""}`}
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
      <div className="flex flex-row gap-4">
        <input className="btn-primary basis-1/2" type="submit" />
      </div>
    </form>
  )
}
