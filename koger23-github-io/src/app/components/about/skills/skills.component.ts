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

  selectedSkillGroup: SkillGroup = this.skillGroups[0];

  constructor(private gitHubService: GithubService) {}

  ngOnInit(): void {
    let softSkills = this.gitHubService.getSoftSkills();
    let hardSkills = this.gitHubService.getHardSkills();
    let langSkills = this.gitHubService.getLanguageSkills();
    let others = this.gitHubService.getOtherSkills();

    this.skillGroups.push(softSkills);
    this.skillGroups.push(hardSkills);
    this.skillGroups.push(langSkills);
    this.skillGroups = [...this.skillGroups, ...others];
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
