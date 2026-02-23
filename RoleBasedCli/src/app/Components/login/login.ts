import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  model:any = {};
constructor(private router : Router, private auth : AuthService ){}

login(){
  this.auth.login(this.model).subscribe(res=>{
    this.auth.saveToken(res.token)
    const role = this.auth.getRole();
    this.router.navigate(['/dashboard']);
     alert('Log-In successfully');
   });
 }

}