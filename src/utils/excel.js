import { read, utils, writeFile } from 'xlsx'
import dayjs from "dayjs"

const excel = {
  importFunc,
  excelDate,
  exportFunc
}

// import excel
async function importFunc (file, tableHeaderMap) {
  
  // sheet to json
  const fileBuffer = await file.arrayBuffer()
  const workbook = read(fileBuffer)

  const sheet1 = workbook.Sheets[workbook.SheetNames[0]]
  const sheet1Json = utils.sheet_to_json(sheet1, { header: 1 })


  if(sheet1Json.length) {
    // generate SQL data
    return generateSQLData(sheet1Json, tableHeaderMap)
  } else {
    return sheet1Json
  }
}


// export excel
function exportFunc(rows, filename, sheetHeaders ) {
  
  const headers = Object.keys(rows[0]).map(el => sheetHeaders[el])

  const worksheet = utils.json_to_sheet(rows)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet)
  utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1'})
  writeFile(workbook, `${filename}.xlsx`, { compression: true })

}


// generate SQL data
function generateSQLData (sheet, tableHeaderMap) {
  const headerKeys = Object.keys(tableHeaderMap)
  const headerValues = Object.values(tableHeaderMap)
  const sheetData = []
  const headerIndex = []

  sheet.forEach((row, rowIndex) => {
    const item = {}
    row.forEach((col, colIndex) => {
      if(rowIndex === 0){
        headerValues.forEach((el, elIndex) => {
          if(el === col) {
            headerIndex.push(elIndex)
          }
        })
      } else {
        item[headerKeys[headerIndex[colIndex]]] = col
      }
    })
    if(rowIndex !== 0) {
      sheetData.push(item)
    }
  })
  return sheetData
}


// excel date format
function excelDate (days) {

  let res = days

  if(typeof days === 'number') {

    let duration = days > 60 ? (days - 2) : (days - 1)
    res = dayjs('1900/01/01').add(duration, 'day').format('YYYY-MM-DD')
    
  }
  
  return res

}


export default excel