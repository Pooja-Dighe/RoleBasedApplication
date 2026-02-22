import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   model:any = {};

constructor(private auth:AuthService, private router:Router){}

register(){
  this.auth.register(this.model).subscribe(()=>{
    alert('Registered successfully');
    this.router.navigate(['/login']);
  });
}
}
