import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SaveDatosService } from '../services/save-datos.service';

@Component({
  selector: 'add-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.css']
})
export class AdminQuestionComponent implements OnInit {

  @Input() relacion_enviada:string;
  @Output() mensaje_status = new EventEmitter();
  form = new FormGroup({
    descripcion:new FormControl(),
  })

  constructor(private api: SaveDatosService) { }
  
  ngOnInit(): void {
  }

  printData():void{
    var datos: any = this.form.value;
    datos.relacion = this.relacion_enviada;
    this.api.saveQuestion(datos).subscribe(data=>{
      console.log(data);
    })
  }

}
