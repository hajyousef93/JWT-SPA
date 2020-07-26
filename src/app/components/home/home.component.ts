import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
    this.service.getNameTest().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }

}
