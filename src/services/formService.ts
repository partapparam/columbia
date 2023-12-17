import Airtable from "airtable"

type NewContactData = {
  firstName: string
  lastName: string
  email: string
  permission: boolean
  futureContact: boolean
  letter?: string
}

export const postForm = async (data: NewContactData) => {
  // example
  // https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_ID_OR_NAME
  const URL = `${import.meta.env.VITE_AIRTABLE_URL}${
    import.meta.env.VITE_AIRTABLE_BASE
  }/${import.meta.env.VITE_AIRTABLE_TABLE}`
  const body = {
    fields: data,
  }
  console.log(data)
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

export const getTableData = async () => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    const allCases = []

    base("columbia")
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allCases.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            })
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(allCases)
          }
        }
      )
  })
}

export const getLetterContent = async () => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    base(import.meta.env.VITE_AIRTABLE_NAME_EDITOR).find(
      import.meta.env.VITE_AIRTABLE_EDITOR_LETTER_ID,
      function (err, record) {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        console.log("Retrieved", record.fields)
        resolve(record.fields)
      }
    )
  })
}

export const getHeaderContent = async () => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    base(import.meta.env.VITE_AIRTABLE_NAME_EDITOR).find(
      import.meta.env.VITE_AIRTABLE_EDITOR_HEADER_ID,
      function (err, record) {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        console.log("Retrieved", record.fields)
        resolve(record.fields)
      }
    )
  })
}

export default { postForm, getTableData, getLetterContent }
