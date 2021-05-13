import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SaveDatosService } from '../services/save-datos.service';

@Component({
  selector: 'view',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  @Output() active_relacion = new EventEmitter();

  constructor(private api: SaveDatosService) { }

  ngOnInit(): void {
  }

  enviarDatos(event){
    this.active_relacion.emit(event);
    // this.api.obtainQuestion().subscribe(data=>{
    //   console.log(data);
    // })
  }
}
