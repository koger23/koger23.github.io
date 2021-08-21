import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
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
  content: string;
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
      this.content = this.postService.selectedPost.content;
      this.post = this.postService.selectedPost;
    } else {
      this.routeSub = this.route.params.subscribe((params) => {
        this.postName = params['id'];
        console.log(this.postName);
        this.getPostContent();
      });
    }
  }

  private getPostContent() {
    this.postService.getPostContent(this.postName).subscribe({
      next: (resp) => {
        if (resp) {
          // replace ./ for image paths in markdown files
          this.content = Utils.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.githubService.USERNAME}/main/img/`,
            resp
          );
        }
      },
      complete: () => {
        this.overlayService.hide();
      },
    });
  }
}
