import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavBarComponent {
  @Input() showFiller: boolean = false;
  @ViewChild('drawer') drawer: ElementRef | undefined;

  constructor() {
  }
}
