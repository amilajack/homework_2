import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
