export type NewContactData = {
  firstName: string
  lastName: string
  email: string
  permission: boolean
  futureContact: boolean
}
export type SavedContactData = {
  id: number
}
// example
// https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_ID_OR_NAME
const URL = `${import.meta.env.VITE_AIRTABLE_URL}${
  import.meta.env.VITE_AIRTABLE_BASE
}/${import.meta.env.VITE_AIRTABLE_TABLE}`

const postForm = async (data: NewContactData) => {
  const body = {
    fields: data,
  }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
    },
    body: JSON.stringify(body),
  }
  try {
    const response = await fetch(URL, requestOptions)
    console.log(response)
    return response.status
  } catch (error) {
    console.log(error)
  }
}

export default postForm