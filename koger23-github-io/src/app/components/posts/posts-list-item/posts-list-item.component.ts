import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-list-item',
  templateUrl: './posts-list-item.component.html',
  styleUrls: ['./posts-list-item.component.css'],
})
export class PostsListItemComponent implements OnInit {
  @Input() post: Project;
  faCalendarAlt = faCalendarAlt;
  faHashtag = faHashtag;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  public onSelectPost() {
    this.postService.selectedPost = this.post;

    this.router.navigate(['/posts', this.post.name]);
  }
}
