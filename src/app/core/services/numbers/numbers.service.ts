import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Numbers } from '../../model/numbers';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {

  constructor(
    private http : HttpClient
  ) { }

  saveNumber( number : Numbers ){
      const experienceTemp ={
        ...number
      };
      delete experienceTemp.id;
      return this.http.put(`${environment.url}/numbers/${number.id}.json`,experienceTemp);
  }

  getAllNumbers(){
    return this.http.get(`${environment.url}/numbers.json`)
    .pipe(
      map( this.createArray )
    );
  
  }
  createArray( numberObj : Object ){
    const numbers : Numbers[] = [];
    if( numberObj === null ){return [];}

    Object.keys( numberObj ).forEach( key => {
      const experience : Numbers = numberObj[key];
      
      experience.id = key;
      numbers.push(experience);
    })
    return numbers
  }

}
