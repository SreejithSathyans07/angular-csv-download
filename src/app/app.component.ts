import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  csvData: { name: string; age: number; contact: string; }[];
  Columns: { feild: string; header: string; }[];
  ngOnInit() {
    this.csvData = [
      { name: 'Amal', age: 24, contact: 'Tiruvannamalai' },
      { name: 'AR', age: 24, contact: 'Coimbatore' },
      { name: 'Honest', age: 24, contact: 'Salem' },
    ];
    this.Columns = [
      {feild: 'name',header: "Name"},
      {feild: 'age', header: "Age"},
      {feild: 'contact', header: "Contact"}
    ];
  }

  exportCsv(){
    const header = [];
    this.Columns.forEach(selectedColumn => {
      header.push(selectedColumn.feild);
    })
    this.downloadFile(this.csvData, 'CSVFILE', header);
  }
  downloadFile(data, fileName, header){
    const today = new Date();
    const date = today.getDate() +'-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const dateTime = date;

    const csvData = this.convertToCsv(data, header);
    const blob = new Blob(['\ufeff' + csvData], {type: 'text/csv;charset=utf-8;'});
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', fileName + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  convertToCsv(data: any, header: any) {
    const array = typeof data !== 'object' ? JSON.parse(data) : data;
    let str = '';
    let row = 'S.No,';
    for(const index in header){
      row += header[index] + ',';
    }
    row = row.slice(0,-1);
    str += row +'\r\n';
    for(let i=0; i<array.length; i++){
      let line = (i+1) + ''
      for(const index in header){
        const head = header[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    console.log(str);
    return str;
  }


  title = 'csv-demo';
}
