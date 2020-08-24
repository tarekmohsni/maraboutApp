import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';




@Component({
  selector: 'app-tab-line-machine',
  templateUrl: 'lines-machine.component.html',
  styleUrls: ['lines-machine.component.css'],
})
export class LinesMachineComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Line',
        link: 'line-mach/linelist',
        icon: 'link'
      }, {
        label: 'Machines',
        link: 'line-mach/machinlist',
        icon: 'settings'
      }, {
        label: 'Machines type',
        link: 'line-mach/machintyplist',
        icon: 'settings'
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
