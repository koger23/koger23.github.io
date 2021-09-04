import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}

export class Skill {
  gauge = {
    type: 'semi',
    size: '150',
    thickness: 15,
    foreColor: 'rgba(0, 128, 255, 1)',
    suffix: '%',
    duration: 700,
    cap: "round",
  };
  
  constructor(
    public name: string,
    public type: SkillType,
    public value: number = -1,
  ) {}
}

export enum SkillType {
  SOFT,
  HARD,
  LANG,
  GENERAL,
}
