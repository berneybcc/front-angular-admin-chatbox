import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'add-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.css']
})
export class AdminQuestionComponent implements OnInit {

  ngOnInit(): void {
  }

  relacion_enviada_view:string;
  mensage_estado:any;
  mensaje_estado_view:any;
  edit_status:any;
  info_preguntas:any;

}
