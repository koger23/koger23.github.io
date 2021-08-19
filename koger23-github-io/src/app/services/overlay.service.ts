import { Injectable } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayComponent: OverlayComponent;

  constructor() { }

  setComponent(overlayComponent: OverlayComponent) {
    this.overlayComponent = overlayComponent;
  }

  public show(): void {
    this.overlayComponent.show();
  }

  public hide(): void {
    this.overlayComponent.hide();
  }
}
