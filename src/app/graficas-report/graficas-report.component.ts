import { Component, OnInit } from '@angular/core';
import { SaveDatosService } from '../services/save-datos.service';

@Component({
  selector: 'app-graficas-report',
  templateUrl: './graficas-report.component.html',
  styleUrls: ['./graficas-report.component.css']
})
export class GraficasReportComponent implements OnInit {

  title = 'Consultas realizadas';
  type = 'ColumnChart';
  data = [];
  options = {   
    hAxis: {
        title: 'Descripcion'
    },
    vAxis:{
        title: 'Consultas'
    },
    color:'#000'
  };
  width = 'aut0';
  height = '600';

  constructor(private api: SaveDatosService) { }

  ngOnInit(): void {
    this.api.obtainCharts().subscribe((data:any)=>{
      if(!data.error){
        // console.log(data);
        for(var d of (data.data as any)){    
          var arrayInfo = [d.description_question,d.total];
          this.data.push(arrayInfo);
        }
      }
    })
  }

}
