import { Pipe, PipeTransform } from '@angular/core';
import { SkillType } from '../components/about/skills/skill/skill.component';

@Pipe({
  name: 'leveling'
})
export class SkillLevelPipe implements PipeTransform {

  transform(value: number, type: number): string {
    if (type === SkillType.HARD) {
      if (value == 1) {
        return value.toString() + " year";
      }
      return value.toString() + " years";
    } else if (type === SkillType.SOFT) {
      let result = "";
      for (let i = 0; i < value; i++) {
        result += "★";
      }
      for (let i = 0; i < 5 - value; i++) {
        result += "☆";
      }
      return result;
    } else {
      return value.toString() + " ASD";
    }
  }

}
