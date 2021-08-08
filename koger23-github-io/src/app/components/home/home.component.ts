import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content = "Hi, \n\nthe site is under development, content can be missing or being ugly, or the site can be unusable at all."

  constructor() { }

  ngOnInit(): void {
  }

}
