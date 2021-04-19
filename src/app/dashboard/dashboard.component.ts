import { Component, OnInit ,} from '@angular/core';
declare var $ :any
import * as d3 from "d3";
import * as dc from "dc";
import * as crossfilter from 'crossfilter'



// import * as d3 from 'node_modules/d3'
// import * as dc from 'node_modules/dc'


@Component({
  
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  title = 'Angular Router';

//----------------- variable Apis 8 -------------------------

  public datasets: any;            // 1 variable API All data cronjobdata                                         
  public anddocserver: any;
  public data: any;
  public salesChart: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public count:any={ }
  public count1:any={ }
  public colsum:any
  public datatable:any[]
  public datatablesever:any[]
  // public ctx:any;
  ngOnInit() {

    // --- table  ----
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    setTimeout(() => {
      this.getdatable()
    }, 500);
  // --- Dashbooard ---
  this.getcronjobdata()

}



private statusArray:any = []
private collectArray:any = []

private collectlinkapi:any = "http://projectcronapi-dot-kea-analytics.appspot.com/"




// ------------------------------------------------ Dhasboard Status and Sever  ----------------------------------------------------------------------

getcronjobdata(){
  var root = this   

  fetch(this.collectlinkapi+'getcrondata',{method:'POST' ,redirect:'follow'})
  .then(res=> res.json())
  .then(data => {

    var lengthList = data['data'].length
    data['data'].forEach((item:any) => {
      let status = item['statuscron']
      let collect = item['collect_ip']

      if(!this.statusArray.includes(status)){
          this.statusArray.push(status)
        }

      this.count[status] = (this.count[status]|0) + 1

      if(!this.collectArray.includes(collect)){
        this.collectArray.push(collect)
      }
      this.count1[collect] = (this.count1[collect]|0) + 1
    
    });

    console.log(this.count)

    this.statusArray.forEach((status:any,index:number)=> {
      console.log('index => ' ,  index , ' status => ' , status)
    
      $(document).ready(()=>{
        $('#circle'+index).circleProgress({
          value: this.count[status]/lengthList,
          size:80,
          fill:{
            gradient:["red","orange"]
          }
        });
      })


 
      this.colsum = data['data'].length
      $(document).ready(()=>{
        $('#circlesum').circleProgress({
          value: this.count[status]/lengthList,
          size:80,
          fill:{
            gradient:["red","orange"]
          }
        });
      })




      var lengthList1 = data['data'].length
  

    this.collectArray.forEach((collect:any,indexcon:number)=> {
      console.log('index => ' ,  indexcon, ' status => ' , collect)

      $(document).ready(()=>{
        $('#circle1'+indexcon).circleProgress({
          value: this.count1[collect]/lengthList1,
          size:80,
          fill:{
            gradient:["blue","orange"]
          }
        });
      })

  });

    })

this.chartpie(data['data'])
})

}


// ------------------------------------------------ CHARTPIE ----------------------------------------------------------------------



chartpie(data){
  var charts = new dc.BarChart('#barChart')
  
  
  var ndx            = crossfilter(data),
  fruitDimension = ndx.dimension(function(d) {return d.subject;}),
  sumGroup       = fruitDimension.group().reduceCount(function(d) {return d.value;});

  console.log('group => ' , sumGroup.all());

  charts
      .height(500)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .brushOn(false)
      .colors("#0597ff")
      .yAxisLabel('Subject')
      .dimension(fruitDimension)
      .barPadding(0.1)
      .outerPadding(0.05)
      .group(sumGroup)
      .clipPadding(10)
      .margins({left: 40, top: 10, right: 50, bottom: 90})
      // charts.margins.bottom = 50
      charts.render();
  
  }

  // ------------------------------------------------ Summary Table ----------------------------------------------------------------------

  async getdatable(){
    const res = await fetch(this.collectlinkapi+'getcrondata',{method:'POST' ,redirect:'follow'})
    var datatabledash = await res.json()
    datatabledash['data'].sort(function(a, b){return a.id - b.id});
    this.datatable = datatabledash['data']
  }
  
// ------------------------------------------------ Button ----------------------------------------------------------------------
public fillterdata:any = []
getfillter(type,mode){
  console.log(type,mode)
  if(mode=="statuscron"){
  this.fillterdata = []
  this.fillterdata = this.datatable.filter(b=>b.statuscron==type)
}
  else if (mode=="collect_ip"){
  this.fillterdata = this.datatable.filter(b=>b.collect_ip==type)
  }
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
 $('#textCron').html(`<span>ยืนยันการหยุดครอน ${item.cronname}</span>`)
 $('#exampleModalCenter').modal('toggle')
}
openpopup1(item,type){  
  this.listitem.item = item
  this.listitem.type = type
 $('#textCron').html(`<span>ยืนยันการทำงานครอน ${item.cronname}</span>`)
 $('#exampleModalCenter').modal('toggle')
}

public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
