function csvJSON() {
    const csvFilePath = '../../../00_data/schedule_sample.csv'
    const jsonFilePath = '../../../00_data/schedule_sample.json'
    
    const csv = require('csvtojson')
    const moment = require('moment')
    const fs = require('fs')
    
    alert("正常動作中")
    
    csv()
    .fromFile(csvFilePath)
    .then((rows)=>{
      rows = rows.map((row) => {
        row.id = new Number(row.id)
        row.success = new Boolean(row.success)
        row.registrationDate = moment(row.registrationDate).format("YYYY-MM-DD")
        return row
      })
      fs.writeFile(jsonFilePath, JSON.stringify(rows, null, 2), (err) => {
        if (err) {
          throw err;
        }
        console.log("JSON generated.");
      })
    })

  }