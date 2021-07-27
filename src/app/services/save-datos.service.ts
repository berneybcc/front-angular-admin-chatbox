import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const url_server = "http://localhost:3000/chatbox/";

@Injectable({
  providedIn: 'root'
})
export class SaveDatosService {

  constructor(private http: HttpClient) { }

  saveQuestion(datos:any){
    var body:any ={
      inputDescripcion:datos.descripcion,
      checkQuestions:datos.relacion
    }
    console.log(body);
    return this.http.post(url_server+"questions/save",body);
  }

  obtainQuestion(uid:string){
    console.log('Service Obtain Question');
    var param= "";
    if(uid){
      param="/"+uid;
    }
    return this.http.get(url_server+'/questions/obtain'+param);
  }
}
