import PDFMerger from "pdf-merger-js/browser"

const Merger = async (files: [Blob]) => {
  const render = async () => {
    const merger = new PDFMerger()
    // iterate through files, create a new Blob for each Blob
    for (const file of files) {
      const b = new Blob([file])
      await merger.add(b)
    }

    // await merger.saveAsBlob()
    await merger.save("881.pdf")
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
