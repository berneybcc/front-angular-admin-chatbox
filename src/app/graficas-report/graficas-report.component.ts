import { Component, OnInit } from '@angular/core';
import { SaveDatosService } from '../services/save-datos.service';
import { Workbook } from 'exceljs';
import  Swal  from 'sweetalert2';
import * as fs from 'file-saver';

@Component({
  selector: 'app-graficas-report',
  templateUrl: './graficas-report.component.html',
  styleUrls: ['./graficas-report.component.css']
})
export class GraficasReportComponent implements OnInit {

  fileName="Informe.xlsx";
  title = 'Consultas realizadas';
  type = 'ColumnChart';
  data= [];
  info:any=[];
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

  constructor(private api: SaveDatosService) {
   }

  ngOnInit(): void {
    if(this.data.length==0){
      this.infoCharts();
    }
  }

  infoCharts(){
      this.api.obtainCharts().subscribe((data:any)=>{
        if(!data.error){
          
          for(var d of (data.data as any)){    
            var arrayInfo = [d.description_question,d.total];
            this.info.push({descripction:d.description_question,consultas:d.total});
            this.data.push(arrayInfo);
          }    
        }
      })
  }

  exportexcel(): void 
    {
      if(this.info.length>0){
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Report");
        let header=[
          {header:"Description",width:20},
          {header:"Consultas",width:15}
        ]
        // let headerRow = worksheet.addRow(header);
        worksheet.columns=header;
        worksheet.getRow(1).font={ name: 'Calibri', family: 4, size: 14, bold: true };

        var sizeOld=0;
        for (let x1 of this.info)
        {
          let x2=Object.keys(x1);
          let temp=[]
          for(let y of x2)
          {
            temp.push(x1[y])
            if(sizeOld==0){
              sizeOld = x1[y].length;
            }
            if(x1[y].length > sizeOld){
              sizeOld = x1[y].length;
            }
          }
          worksheet.addRow(temp)
        }
        worksheet.getColumn(1).width=sizeOld;
        let fname=`Report`;
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
        });		
      }else{
        Swal.fire(
          'Error',
          'No hay informacion para exportar ;(',
          'error'
        )
      }
  }

}
