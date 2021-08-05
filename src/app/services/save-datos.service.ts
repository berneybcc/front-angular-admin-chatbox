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
    return this.http.post(url_server+"questions/save",body);
  }

  updateQuestion(datos:any){
    var body:any ={
      inputDescripcion:datos.descripcion,
      uid:datos.uid
    }
    console.log(`datos enviados : ${body}`);
    return this.http.post(url_server+"questions/updata",body);
  }

  deleteQuestion(datos:any){
    var body:any ={
      uid:datos
    }
    console.log(`datos enviados : ${body}`);
    return this.http.post(url_server+"questions/delete",body);
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
