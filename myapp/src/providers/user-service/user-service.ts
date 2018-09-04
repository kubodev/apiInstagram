import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public http: Http) {
  }    
  //Below Instagrm API is taken from  https://www.instagram.com/developer/endpoints/

  getInstagramUserInfo(response) {
    //GET USER PHOTOS
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=8528241598.2389e5e.5309ba575f954a92944b3084ea937462' + response.access_token + '&count=5')
    .map((res:Response) => res.json());
  }  


  obtenerDatos(){
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=8528241598.2389e5e.5309ba575f954a92944b3084ea937462');
  }
}