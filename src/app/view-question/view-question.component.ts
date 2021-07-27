import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { SaveDatosService } from '../services/save-datos.service';

@Component({
  selector: 'view',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  @Output() active_relacion = new EventEmitter();
  @Output() mensaje_status_view = new EventEmitter();
  info:any = [];

  constructor(private api: SaveDatosService) {
    localStorage.setItem('ElementActive','');
  }

  ngOnInit(): void {
    this.api.obtainQuestion(null).subscribe((data:any)=>{
      if(!data.error){
        for(var d of (data.data as any)){
          this.info.push({
            uid:d._id,
            descripcion:d.description
          })
        }
      }
    })
  }

  public enviarDatos(event){
    this.active_relacion.emit(event);
  }

  async solicitarPreguntas(uid:string){
    this.mensaje_status_view.emit("");
    var elementActive:string= localStorage.ElementActive;
    if(elementActive.length===0){
      localStorage.ElementActive=uid;
    }else{
      var elementOld=document.getElementById(elementActive);
      elementOld.removeAttribute('style');
      localStorage.ElementActive=uid;
    }
    var elementBtn = document.getElementById(`btn-${uid}`);
    var elementIcon= elementBtn.firstElementChild;
    var classNameIcon = (elementIcon.className === 'bi bi-plus')?'bi bi-dash':'bi bi-plus';
    var elementList = document.getElementById(uid);
    elementList.setAttribute('style','border: solid #398cf7');
    if(elementIcon.className ==='bi bi-dash'){
      elementList.removeAttribute('style');
      var childrenList = elementList.childElementCount;
      elementIcon.setAttribute('class',classNameIcon);
      for (let a = 1;a<childrenList;a++){
        if(elementList.lastElementChild.tagName==='UL'){
          elementList.removeChild(elementList.lastElementChild);
        }
      }
    }else{
      this.api.obtainQuestion(uid).subscribe((data:any)=>{
        if(!data.error){
          elementIcon.setAttribute('class',classNameIcon);
          for(var d of (data.data as any)){
            this.createHtmlPregunta(uid,d._id,d.description);
          }
        } else{
          this.mensaje_status_view.emit(data);
        }
      })
    }
  }

  createHtmlPregunta(uidPadre:any,uid:any,descripcion:string){
    var element = document.getElementById(uidPadre);
    var ulElement= document.createElement('ul');
    ulElement.setAttribute('class','list-group');
    var liElement = document.createElement('li'); 
    liElement.setAttribute('class','list-group-item');
    liElement.setAttribute('id',uid);

    var rowElement= document.createElement('div');
    rowElement.setAttribute('class','row');

    var colElement= document.createElement('div');
    colElement.setAttribute('class','col');
    var span = document.createElement('span');
    span.innerHTML=descripcion;
    colElement.appendChild(span);

    var colBtnElement= document.createElement('div');
    colBtnElement.setAttribute('class','col text-end');

    var btnDeleteElement=document.createElement('button');
    btnDeleteElement.setAttribute('class','btn btn-light');
    btnDeleteElement.setAttribute('style','padding: .1rem .3rem;margin-bottom:.1rem');
    var iDeleteElement= document.createElement('i');
    iDeleteElement.setAttribute('class','bi bi-trash');

    var btnEditElement=document.createElement('button');
    btnEditElement.setAttribute('class','btn btn-light');
    btnEditElement.setAttribute('style','padding: .1rem .3rem;margin-bottom:.1rem');
    var iEditElement= document.createElement('i');
    iEditElement.setAttribute('class','bi bi-pencil');

    var btnElement=document.createElement('button');
    btnElement.setAttribute('class','btn btn-light');
    btnElement.setAttribute('style','padding: .1rem .3rem;margin-bottom:.1rem');
    btnElement.setAttribute('id',`btn-${uid}`)
    btnElement.addEventListener('click',()=>{this.solicitarPreguntas(uid)});

    var iElement= document.createElement('i');
    iElement.setAttribute('class','bi bi-plus');
    btnDeleteElement.appendChild(iDeleteElement);
    btnEditElement.appendChild(iEditElement);
    btnElement.appendChild(iElement);

    colBtnElement.appendChild(btnDeleteElement);
    colBtnElement.appendChild(btnEditElement);
    colBtnElement.appendChild(btnElement);

    var colCheckElement= document.createElement('div');
    colCheckElement.setAttribute('class','col-1');
    var divCheck= document.createElement('div');
    divCheck.setAttribute('class','form-check');
    var radioElement= document.createElement('input');
    radioElement.setAttribute('class','form-check-input');
    radioElement.setAttribute('type','radio');
    radioElement.setAttribute('name','pregunta');
    radioElement.addEventListener('change',()=>{this.enviarDatos({descripcion:descripcion,uid:uid})});
    divCheck.appendChild(radioElement);
    colCheckElement.appendChild(divCheck);

    rowElement.appendChild(colElement);
    rowElement.appendChild(colBtnElement);
    rowElement.appendChild(colCheckElement);

    liElement.appendChild(rowElement);
    ulElement.appendChild(liElement);
    element.appendChild(ulElement);
  }
}
