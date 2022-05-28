import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-layout-1',
  templateUrl: 'page-layout-1.component.html',
})
export class PageLayout1Component {
  @Input() isLoading: boolean = false;
}
