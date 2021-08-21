import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/helpers/utils';
import { Project } from 'src/app/models/project.model';
import { GithubService } from 'src/app/services/github.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  public posts: Project[];

  constructor(
    private githubService: GithubService,
    private postService: PostService,
    private overlay: OverlayService
  ) {}

  ngOnInit(): void {
    if (!this.posts) {
      this.githubService.getConfig().subscribe({
        next: (resp) => {
          this.githubService.readConfig(resp);

          this.createPosts();
        },
      });
    }
  }

  private createPosts() {
    if (
      this.githubService.postNames &&
      this.githubService.postNames.length > 0
    ) {
      this.githubService.postNames.forEach((postName) => {
        let newPost = new Project();
        newPost.name = postName;

        this.postService.getPostContent(postName).subscribe({
          next: (resp) => {
            this.overlay.show();

            if (resp) {
              newPost.content = Utils.replaceAll(
                '(./',
                `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.githubService.USERNAME}/main/img/`,
                resp
              );
            }

            newPost.details = this.githubService.getDetailsFromConfig(postName);
          },
          complete: () => {
            this.overlay.hide();
          },
        });
        if (!this.posts) {
          this.posts = [];
        }
        console.log(newPost);
        this.posts.push(newPost);
      });
    }
  }
}
