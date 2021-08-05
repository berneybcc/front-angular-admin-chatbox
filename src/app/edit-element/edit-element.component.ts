import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveDatosService } from '../services/save-datos.service';

@Component({
  selector: 'edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent implements OnInit {

  @Input() uid_element:any;
  @Output() cancel_edit = new EventEmitter;
  @Output() mensaje_status = new EventEmitter();

  uid:any;

  form: FormGroup;

  constructor(private api: SaveDatosService) { }

  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = new FormGroup ({
      descripcion:new FormControl(this.uid_element.descripcion,[Validators.required]),
    });
    console.log(this.uid_element);
  }

  editElemet(){
    var datos: any = this.form.value;
    datos.uid = this.uid_element.uid;
    console.log(datos);
    this.api.updateQuestion(datos).subscribe(data=>{
      console.log(data);
      this.mensaje_status.emit(data);
      this.form.reset();
      this.cancel_edit.emit("");
    })
  }

  cancelarEdit(){
    this.cancel_edit.emit("");
  }

}
