import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  role:string | null = '';
  email:string | null = '';

  constructor(private auth:AuthService, private router:Router){}

  ngOnInit(){
    this.role = this.auth.getRole();
    this.email = this.auth.getEmail();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
