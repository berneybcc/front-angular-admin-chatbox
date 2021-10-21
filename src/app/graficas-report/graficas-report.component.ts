import { Component, OnInit } from '@angular/core';
import { SaveDatosService } from '../services/save-datos.service';
import * as XLSX from 'xlsx';

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
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.info); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "report");
    });		
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

}
