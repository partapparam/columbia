import PDFMerger from "pdf-merger-js/browser"

const Merger = async (files: [Blob]) => {
  const render = async () => {
    // const merger: any = new PDFMerger()
    console.log(files)
    // for (const file in files) {
    //   const b = new Blob([file])
    //   const reader = new FileReader()
    //   if (file) {
    //     reader.readAsDataURL(b)
    //     reader.onload = () => {
    //       const base64String = reader.result
    //       console.log("Base64 String - ", base64String)
    //     }
    //   }
    // }

    const merger = new PDFMerger()

    for (const file of files) {
      const b = new Blob([file])
      await merger.add(b)
    }

    const mergedPdf = await merger.saveAsBlob()
    console.log(mergedPdf)
    const reader = new FileReader()
    reader.readAsDataURL(mergedPdf)
    reader.onload = function () {
      console.log(reader.result)
    }
    // console.log(merger)
    // const mergedPdf = await merger.saveAsBlob()
    // console.log(mergedPdf)
    // // const url = URL.createObjectURL(mergedPdf)
    // // console.log(url)
    // const reader = new FileReader()
    // reader.readAsDataURL(mergedPdf)
    // reader.onload = function () {
    //   console.log(reader.result)
    // }
  }
  const result = render().catch((err) => {
    console.log(err)
  })
  return result
}

export default Merger
