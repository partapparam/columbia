import Airtable from "airtable"

type NewContactData = {
  firstName: string
  lastName: string
  email: string
  permission: boolean
  futureContact: boolean
  letter?: string
}

// example
// https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_ID_OR_NAME
const URL = `${import.meta.env.VITE_AIRTABLE_URL}${
  import.meta.env.VITE_AIRTABLE_BASE
}/${import.meta.env.VITE_AIRTABLE_TABLE}`

export const postForm = async (data: NewContactData) => {
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

export const getData = async () => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base("appWVlUc592csqgLS")
  // const results = []
  // base("columbia")
  //   .select({
  //     // Selecting the first 3 records in Grid view:
  //     maxRecords: 3,
  //     view: "Grid view",
  //   })
  //   .eachPage(
  //     function page(records, fetchNextPage) {
  //       // This function (`page`) will get called for each page of records.
  //       // results.push(records)
  //       records.forEach(function (record) {
  //         results.push(record.fields)
  //       })

  //       // To fetch the next page of records, call `fetchNextPage`.
  //       // If there are more records, `page` will get called again.
  //       // If there are no more records, `done` will get called.
  //       fetchNextPage()
  //     },
  //     function done(err) {
  //       if (err) {
  //         console.error(err)
  //         return "there was an error"
  //       }
  //       console.log("done is being called")
  //       console.log(results)
  //       // console.log(records)
  //       return results
  //     }
  //   )
  // const results = await base("columbia").select().all()
  // return results

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

export default { postForm, getData }
