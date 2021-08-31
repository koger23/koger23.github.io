import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Markdown } from './pipes/markdwon.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxGaugeModule } from 'ngx-gauge';

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
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
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

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}