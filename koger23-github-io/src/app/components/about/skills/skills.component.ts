import { Component, OnInit } from '@angular/core';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [new Skill('Languages', true), new Skill('Soft'), new Skill('Hard')];
  otherSkills: Skill[] = [new Skill('Power Platform')];
  isLanguageSkillSelected: boolean = true;
  isHardSkillSelected: boolean = false;
  isSoftSkillSelected: boolean = false;
  selectedSkill: Skill = this.skills[0];

  constructor() {}

  ngOnInit(): void {}

  onSelectSkill(skill: Skill) {
    this.selectedSkill = skill;

    if (this.selectedSkill.name === 'Languages') {
      this.isLanguageSkillSelected = true;
      this.isHardSkillSelected = false;
      this.isSoftSkillSelected = false;
    } else if (this.selectedSkill.name === 'Soft') {
      this.isLanguageSkillSelected = false;
      this.isHardSkillSelected = false;
      this.isSoftSkillSelected = true;
    } else if (this.selectedSkill.name === 'Hard') {
      this.isLanguageSkillSelected = false;
      this.isHardSkillSelected = true;
      this.isSoftSkillSelected = false;
    }
  }
}

export class Skill {
  constructor(public name: string, public isVisible: boolean = false) {}
}
