import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Markdown } from './markdwon.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './site-layout/header/header.component';

@NgModule({
  declarations: [AppComponent, Markdown, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
