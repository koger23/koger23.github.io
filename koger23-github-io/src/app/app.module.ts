import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Markdown } from './pipes/markdwon.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './site-layout/header/header.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { FooterComponent } from './site-layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectCardComponent } from './components/projects/project-card/project-card.component';
import { ShortenContentPipe } from './pipes/shorten-content.pipe';
import { OverlayComponent } from './overlay/overlay.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/posts/post/post.component';
import { PostsListItemComponent } from './components/posts/posts-list-item/posts-list-item.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { SkillsComponent } from './components/about/skills/skills.component';
import { LanguageSkillComponent } from './components/about/skills/language-skill/language-skill.component';
import { SoftSkillComponent } from './components/about/skills/soft-skill/soft-skill.component';
import { HardSkillComponent } from './components/about/skills/hard-skill/hard-skill.component';
import { SkillComponent } from './components/about/skills/skill/skill.component';
import { SkillLevelPipe } from './pipes/skill-level.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Markdown,
    HeaderComponent,
    ProjectsComponent,
    ProjectComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ProjectCardComponent,
    ShortenContentPipe,
    OverlayComponent,
    PostsComponent,
    PostComponent,
    PostsListItemComponent,
    SkillsComponent,
    LanguageSkillComponent,
    SoftSkillComponent,
    HardSkillComponent,
    SkillComponent,
    SkillLevelPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    NgxGaugeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}