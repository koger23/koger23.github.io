import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { Skill, SkillType } from './skill/skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skillGroups: SkillGroup[] = [];

  skills: Skill[] = [
    new Skill('Hungarian', SkillType.LANG, 100),
    new Skill('English', SkillType.LANG, 79),
    new Skill('German', SkillType.LANG, 5),
    new Skill('Python', SkillType.HARD, 3),
    new Skill('JavaScript', SkillType.HARD, 2),
    new Skill('Dynamics 365 Sales', SkillType.GENERAL),
    new Skill('Dynamics 365 for Marketing', SkillType.GENERAL),
  ];
  selectedSkillGroup: SkillGroup = this.skillGroups[0];

  constructor(private gitHubService: GithubService) {}

  ngOnInit(): void {
    let softSkills = this.gitHubService.getSoftSkills();
    let hardSkills = this.gitHubService.getHardSkills();
    let langSkills = this.gitHubService.getLanguageSkills();
    this.gitHubService.getOtherSkills();
    let ms = new SkillGroup(
      [
        new Skill('Dynamics 365 Sales', SkillType.GENERAL),
        new Skill('Dynamics 365 Customer Service', SkillType.GENERAL),
        new Skill('Power Apps', SkillType.GENERAL),
        new Skill('Power Automate', SkillType.GENERAL),
      ],
      SkillType.GENERAL,
      'Power Platform'
    );
    this.skillGroups.push(softSkills);
    this.skillGroups.push(hardSkills);
    this.skillGroups.push(langSkills);
    this.skillGroups.push(ms);
    console.log(this.skillGroups);

    if (this.skillGroups.length > 0) {
      this.selectedSkillGroup = this.skillGroups[0];
      this.selectedSkillGroup.isVisible = true;
    }
  }

  onSelectSkill(skillGrp: SkillGroup) {
    this.selectedSkillGroup.isVisible = false;
    this.selectedSkillGroup = skillGrp;
    this.selectedSkillGroup.isVisible = true;
  }
}

export class SkillGroup {
  constructor(
    public skills: Skill[],
    public type: SkillType,
    public name: string,
    public isVisible: boolean = false
  ) {}
}
