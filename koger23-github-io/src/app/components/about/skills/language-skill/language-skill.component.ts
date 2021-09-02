import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-skill',
  templateUrl: './language-skill.component.html',
  styleUrls: ['./language-skill.component.css']
})
export class LanguageSkillComponent implements OnInit {
  gauge = {
    type: 'semi',
    size: '150',
    thickness: 15,
    foreColor: 'rgba(0, 128, 255, 1)',
    suffix: '%',
    duration: 700,
    cap: "round",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
