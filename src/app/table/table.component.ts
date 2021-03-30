import { Component, OnInit } from '@angular/core';
declare var $ :any

@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  selector: 'app-zero-config',
  // templateUrl: 'zero-config.component.html'
})
export class TableComponent implements OnInit {

  title = 'Angular Router';
  public datases:any = []

  constructor() {


   }



  ngOnInit(): void {

    this.getdataa()
    
}

getdataa(){
  fetch('http://projectcronapi-dot-kea-analytics.appspot.com/getcrondata',{method:'POST' ,redirect:'follow'}).then(datareq=>{
  return   datareq.json()
}).then(datareq => {console.log(datareq)
  datareq['data'].sort(function(a, b){return a.id - b.id});
  this.datases = datareq['data']
  // $('#tablecron').DataTable();
})
}












}