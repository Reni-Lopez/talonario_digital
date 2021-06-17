import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Numbers } from './core/model/numbers';
import { User } from './core/model/user.model';
import { AuthService } from './core/services/auth/auth.service';
import { NumbersService } from './core/services/numbers/numbers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'talonario-virtual';

  auth: FormGroup;
  isLoggin = true;
  authModel = new User();
  numbers = 99;
  numbersTemp = new Array<any>();
  descriptionNumber = new Array<any>();

  constructor(
    private _form: FormBuilder,
    private _authService : AuthService,
    private _numbersService : NumbersService

  ){
    this.loginForm();
  }

  ngOnInit(): void {
    this.generateNumbers();
    this.getAllNumbers();
  }

  onChangeEvent(description: any,selectedNumber:any){
    
    let number = new Numbers();
    number.id = selectedNumber.id;
    number.number = selectedNumber.number;
    number.description = description;
    if (description !== null) {
      this.descriptionNumber.push(number);
    }

  } 

  getAllNumbers(){
    this._numbersService.getAllNumbers()
    .subscribe(
      (response:any)=>{
        this.numbersTemp = response;
      }
    )
  }
  generateNumbers(){
    // let number = new Numbers();
    // for (let index = 0; index <= this.numbers; index++) {
    //   number.number = index;
    //   number.description = '';
      
    //   // this._numbersService.saveNumber(number)
    //   // .subscribe(
    //   //   (response:any)=>{
    //   //     console.log(response);
          
    //   //   }
    //   // )
    // }
    // // console.log(this.numbersTemp);
    
  }

  onSubmitSave(){
    
    
    this.descriptionNumber.forEach(element => {
      this._numbersService.saveNumber(element)
      .subscribe( )
    });
  }

  loggout(){
    localStorage.removeItem('token');
    this.isLoggin = false;
  }


  onSubmitLogin(){
    this.authModel.email = this.auth.get('email').value;
    this.authModel.password = this.auth.get('password').value;
    this._authService.login( this.authModel )
    .subscribe(
      ( response : any ) => {
        if (response.registered === true) 
          this.isLoggin = true;
          window.location.reload();
      }
    )
  }

  get InvalidEmailLogin() {
    return (
      this.auth.get('email').invalid && this.auth.get('email').touched
    );
  }
  get InvalidPassword() {
    return (
      this.auth.get('password').invalid && this.auth.get('password').touched
    );
  }

  loginForm(){
    this.auth = this._form.group({
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
    });
  }

}
