import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OverlayService } from 'src/app/services/overlay.service';


@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  constructor(private overlayService: OverlayService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.overlayService.setComponent(this);
  }

  show(): void {
    this.spinner.show();
  }

  hide(): void {
    this.spinner.hide();
  }

}
