import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { ConfigIniParser } from 'config-ini-parser';
import { ProjectDetails } from '../models/project-details.model';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../models/config.model';
import { SkillGroup } from '../components/about/skills/skills.component';
import { Skill, SkillType } from '../components/about/skills/skill/skill.component';

const DEFAULT_SECTION = 'DEFAULT';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private _GITHUB_RAW_URL: string = 'https://raw.githubusercontent.com';
  private devUserName: string = 'koger23';
  private fullname: string;
  config: BehaviorSubject<Config> = new BehaviorSubject<Config>(null);
  isParserLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  hasFullName: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  parser: ConfigIniParser;
  projectNames: string[];
  postNames: string[];

  public get GITHUB_RAW_URL(): string {
    return this._GITHUB_RAW_URL;
  }

  public get USERNAME(): string {
    if (window.location.hostname === 'localhost') {
      return this.devUserName;
    }
    return window.location.hostname.split('.')[0];
  }

  public get FULLNAME(): string {
    return this.fullname;
  }

  constructor(private http: HttpClient, private overlay: OverlayService) {}

  /**
   * Fetching the README.md content of the repository, which has the name as your username.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getAboutMe() {
    this.overlay.show();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/README.md`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  /**
   * Fetching the home post, which is the content of 'welcome.md'.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getHomePost() {
    this.overlay.show();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/posts/welcome.md`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  /**
   * Fetching the content of 'yourusername.github.io.md'.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getAboutPage() {
    this.overlay.show();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/${this.USERNAME}.github.io.md`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  public getConfig() {
    this.overlay.show();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/${this.USERNAME}.github.io.cfg`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  public readConfig(configContent: string): void {
    this.overlay.show();
    this.parser = new ConfigIniParser();
    this.isParserLoaded.next(true);
    this.parser.parse(configContent);
    let config = new Config();

    config.avatarUrl = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/img/avatar.jpg`;

    if (this.parser.isHaveSection(DEFAULT_SECTION)) {
      if (this.parser.isHaveOption(DEFAULT_SECTION, 'projects')) {
        this.projectNames = this.parser
          .get(DEFAULT_SECTION, 'projects')
          .split(',');
      }

      if (this.parser.isHaveOption(DEFAULT_SECTION, 'fullname')) {
        this.fullname = this.parser.get(DEFAULT_SECTION, 'fullname');

        config.fullname = this.parser.get(DEFAULT_SECTION, 'fullname');

        if (this.fullname.length > 0) {
          this.hasFullName.next(true);
        }
      }

      if (this.parser.isHaveOption(DEFAULT_SECTION, 'posts')) {
        this.postNames = this.parser.get(DEFAULT_SECTION, 'posts').split(',');
      }

      if (this.parser.isHaveOption(DEFAULT_SECTION, 'email')) {
        config.email = this.parser.get(DEFAULT_SECTION, 'email');
      }

      if (this.parser.isHaveOption(DEFAULT_SECTION, 'degrees')) {
        config.degrees = this.parser.get(DEFAULT_SECTION, 'degrees');
      }

      if (this.parser.isHaveOption(DEFAULT_SECTION, 'languages')) {
        config.languages = this.parser.get(DEFAULT_SECTION, 'languages');

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'location')) {
          config.location = this.parser.get(DEFAULT_SECTION, 'location');
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'stack')) {
          config.stack = this.parser.get(DEFAULT_SECTION, 'stack');
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'tools')) {
          config.tools = this.parser.get(DEFAULT_SECTION, 'tools');
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'profession')) {
          config.profession = this.parser.get(DEFAULT_SECTION, 'profession');
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'linkedinurl')) {
          config.linkedInUrl = this.parser.get(DEFAULT_SECTION, 'linkedinurl');
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'githuburl')) {
          config.githubUrl = this.parser.get(DEFAULT_SECTION, 'githuburl');
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'bages')) {
          this.parser
            .get(DEFAULT_SECTION, 'bages')
            .split(',')
            .forEach((href) => {
              config.bages.push(
                `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/img/bages/${href}`
              );
            });
        }

        if (this.parser.isHaveOption(DEFAULT_SECTION, 'other_skills')) {
          config.otherSkillsSections = this.parser
            .get(DEFAULT_SECTION, 'other_skills')
            .split(',');
        }
        this.loadSkillsFromSection(config, 'SOFT_SKILLS');
        this.loadSkillsFromSection(config, 'HARD_SKILLS');
        this.loadSkillsFromSection(config, 'LANGUAGE_SKILLS');

        config.otherSkillsSections.forEach((sectionName) => {
          this.loadSkillsFromSection(config, sectionName);
        });
      }
    }

    this.config.next(config);
    this.overlay.hide();
  }

  public getOtherSkills(): string[] {
    return this.config.getValue().otherSkillsSections;
  }

  public getCertifications(): string[] {
    if (
      this.isParserLoaded.value &&
      this.parser.isHaveOption('DEFAULT', 'bages')
    ) {
      return this.parser.get('DEFAULT', 'bages').split(',');
    }
  }

  public getDetailsFromConfig(projectName: string): ProjectDetails {
    this.overlay.show();
    let details = new ProjectDetails();

    if (this.parser.isHaveSection(projectName)) {
      let hasTags = this.parser.isHaveOption(projectName, 'tags');
      let hasPublishDate = this.parser.isHaveOption(projectName, 'date');
      let hasTitle = this.parser.isHaveOption(projectName, 'title');

      if (hasTags) {
        details.tags = this.parser.get(projectName, 'tags').split(',');
      }
      if (hasPublishDate) {
        details.publishedOn = this.parser.get(projectName, 'date');
      }
      if (hasTitle) {
        details.title = this.parser.get(projectName, 'title');
      }
    }
    this.overlay.hide();

    return details;
  }

  public getProjectNames() {
    if (this.projectNames && this.projectNames.length > 0) {
      return this.projectNames;
    }
    this.getConfig().subscribe({
      next: (resp) => {
        this.overlay.show();
        this.readConfig(resp);
      },
      complete: () => {
        this.overlay.hide();
      },
    });
    return this.projectNames;
  }

  public getSoftSkills() {
    let skills: Skill[] = [];

    if (this.config.getValue()) {
      const obj = this.config.getValue()["soft_skills"];
      for (const key in obj) {
        let newSkill = new Skill(key, SkillType.SOFT, obj[key]);
        skills.push(newSkill);
      }
    } else {
      console.warn("Soft skills are not loaded.");
    }

    return new SkillGroup(skills, SkillType.SOFT, 'Soft');
  }

  public getHardSkills() {
    let skills: Skill[] = [];

    if (this.config.getValue()) {
      const obj = this.config.getValue()["hard_skills"];
      for (const key in obj) {
        let newSkill = new Skill(key, SkillType.HARD, obj[key]);
        skills.push(newSkill);
      }
    } else {
      console.warn("Hard skills are not loaded.");
    }

    return new SkillGroup(skills, SkillType.HARD, 'Hard');
  }

  public getLanguageSkills() {
    let skills: Skill[] = [];

    if (this.config.getValue()) {
      const obj = this.config.getValue()["language_skills"];
      for (const key in obj) {
        let newSkill = new Skill(key, SkillType.LANG, obj[key]);
        skills.push(newSkill);
      }
    } else {
      console.warn("Language skills are not loaded.");
    }

    return new SkillGroup(skills, SkillType.LANG, 'Languages');
  }

  private loadSkillsFromSection(config: Config, sectionName: string) {
    let skillCollection = new Object();

    if (this.parser.isHaveSection(sectionName)) {
      this.parser.items(sectionName).forEach((item) => {
        skillCollection[item[0]] = item[1];
      });
    }
    config[sectionName.toLowerCase()] = skillCollection;
    console.log(config);
  }
}
