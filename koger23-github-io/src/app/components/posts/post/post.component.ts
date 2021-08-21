import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { GithubService } from 'src/app/services/github.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PostService } from 'src/app/services/post.service';

type NewType = Subscription;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  routeSub: NewType;
  post: Project;
  faCalendarAlt = faCalendarAlt;

  constructor(
    private postService: PostService,
    private githubService: GithubService,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}
  private postName: string;

  ngOnInit(): void {
    if (this.postService.selectedPost) {
      this.post = this.postService.selectedPost;
    } else {
      this.routeSub = this.route.params.subscribe((params) => {
        this.postName = params['id'];
        this.post = this.postService.getPostWithDetails(this.postName);
        this.postService.selectedPost = this.post;
      });
    }
  }
}
