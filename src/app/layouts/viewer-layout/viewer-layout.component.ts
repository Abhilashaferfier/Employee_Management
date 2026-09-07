import {
  Component
} from '@angular/core';


@Component({
  selector: 'app-viewer-layout',

  templateUrl:
    './viewer-layout.component.html',

  styleUrls: [
    './viewer-layout.component.css'
  ]
})
export class ViewerLayoutComponent {


  // =====================================================
  // SIDEBAR STATE
  // =====================================================

  sidebarOpen = true;


  // =====================================================
  // TOGGLE SIDEBAR
  // =====================================================

  toggleSidebar(): void {

    this.sidebarOpen =
      !this.sidebarOpen;

  }

}