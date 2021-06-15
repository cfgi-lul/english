import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavBarComponent implements OnInit {
  @Output() toggleSideBar: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  constructor() {
  }

  ngOnInit(): void {
  }
}
