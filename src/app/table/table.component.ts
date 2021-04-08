import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
declare var $ :any
import * as d3 from "d3";
import * as dc from "dc";
import * as crossfilter from 'crossfilter'


@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  selector: 'app-zero-config',
  // templateUrl: 'zero-config.component.html'
})
export class TableComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  posts;
  public datases = [];
  private collectlinkapi:any = "http://projectcronapi-dot-kea-analytics.appspot.com/"
  constructor(private http: HttpClient) {
   }


    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
    

      setTimeout(() => {
        this.getdataa()
      }, 500);
    }
    



async getdataa(){
    const res = await fetch('http://projectcronapi-dot-kea-analytics.appspot.com/getcrondata',{method:'POST' ,redirect:'follow'})
    var datareq = await res.json()
    datareq['data'].sort(function(a, b){return a.id - b.id});
    this.datases = datareq['data']

}

private listitem = {'item':null,'type':null}
    
comfirmstop(){
  var param = {'id':this.listitem.item.id,'enable':this.listitem.type}
  fetch(this.collectlinkapi+'updatestenable',
  {method:'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(param),
  redirect:'follow'}
  ).then(res => res.json()).then(data =>{
    location.reload()
  }
  )
  
}
openpopup(item,type){  
  this.listitem.item = item
  this.listitem.type = type
 $('#textCron').html(`<span>ยืนยันการหยุดคอน ${item.cronname}</span>`)
 $('#exampleModalCenter').modal('toggle')
}


}
