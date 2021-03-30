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
  styleUrls: ['./table.component.css'],
  selector: 'app-zero-config',
  // templateUrl: 'zero-config.component.html'
})
export class TableComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  posts;
  public datases = [];

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




}