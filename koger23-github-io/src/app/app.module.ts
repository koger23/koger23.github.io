import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Markdown } from './markdwon.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './site-layout/header/header.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { FooterComponent } from './site-layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectCardComponent } from './components/projects/project-card/project-card.component';
import { ShortenContentPipe } from './pipes/shorten-content.pipe';

@NgModule({
  declarations: [AppComponent, Markdown, HeaderComponent, ProjectsComponent, ProjectComponent, FooterComponent, HomeComponent, AboutComponent, ProjectCardComponent, ShortenContentPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
