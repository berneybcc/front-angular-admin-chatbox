import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveDatosService } from '../services/save-datos.service';

@Component({
  selector: 'add-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.css']
})
export class AdminQuestionComponent implements OnInit {

  @Input() relacion_enviada:any;
  @Output() mensaje_status = new EventEmitter();

  form = new FormGroup({
    descripcion:new FormControl('',[Validators.required]),
  })

  constructor(private api: SaveDatosService) { }
  
  ngOnInit(): void {
  }

  get f(){
    return this.form.controls;
  }

  printData():void{
    var datos: any = this.form.value;
    datos.relacion = this.relacion_enviada.uid;
    console.log(datos);
    this.api.saveQuestion(datos).subscribe(data=>{
      console.log(data);
      this.mensaje_status.emit(data);
      this.form.reset();
      this.relacion_enviada='';
    })
  }

}
