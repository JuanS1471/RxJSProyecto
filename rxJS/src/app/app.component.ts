import { Component } from '@angular/core';
import { RxjsLabService } from './rxjs-lab.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxJS';
  constructor(
    public rxjsService: RxjsLabService
  ){

  }


  funcion(){
    this.rxjsService.source.subscribe()
  }

}
