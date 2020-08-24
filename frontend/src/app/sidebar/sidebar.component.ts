import {Component} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, of} from 'rxjs';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Shop Floor', icon: 'nc-bank', class: ''},
  {path: '/icons', title: 'Maintenance RTD', icon: 'nc-settings-gear-65', class: ''},
  {path: '/Employes', title: 'Notifications', icon: 'nc-bell-55', class: ''},
  {path: '/user', title: 'User Profile', icon: 'nc-single-02', class: ''},
  {path: '/ordre', title: 'Table List', icon: 'nc-tile-56', class: ''},
  {path: '/machines', title: 'liste Machines', icon: 'nc-caps-small', class: ''},
  {path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', class: 'active-pro'},
  {path: '/users', title: 'liste user', icon: 'nc-single-02', class: ''},
  {path: '/box', title: 'liste box', icon: 'nc-single-02', class: ''}
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})

export class SidebarComponent {
  public menuItems: any[];
  nestedTreeControl: NestedTreeControl<RouteInfo>;
  nestedDataSource: MatTreeNestedDataSource<RouteInfo>;
  dataChange: BehaviorSubject<RouteInfo[]> = new BehaviorSubject<RouteInfo[]>([]);

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<RouteInfo>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);
    this.dataChange.next([
      {
        path: '',
        title: 'Shoop Floor',
        icon: 'nc-bank',
        class: '',
        children: [
          {
            path: '/seqlist',
            title: 'KPIS',
            icon: 'nc-bank',
            class: '',
            children: [],
          }, {
            path: '/box',
            title: 'Box',
            icon: 'widgets',
            class: '',
            children: [],
          },
          {
            path: '',
            title: 'Staff',
            icon: 'nc-bank',
            class: '',
            children: [{
              path: '/art-oprt',
              title: 'Attendence',
              icon: 'nc-bank',
              class: '',
              children: [],
            },
              {
                path: '/allemploye',
                title: 'Staff',
                icon: 'nc-bank',
                class: 'supervisor_account',
                children: [],
              }, {
                path: '/cust-site-user',
                title: 'Customer',
                icon: 'nc-bank',
                class: 'store',
                children: [],
              },
            ],
          },
        ],
      },
      {
        path: '',
        title: 'SETUP',
        icon: 'nc-bank',
        class: '',
        children: [
          {
            path: '/line-mach',
            title: 'Lines/Machines',
            icon: 'nc-bank',
            class: 'settings_brightness',
            children: [],
          },
          {
            path: '/ordre',
            title: 'Ordres',
            icon: 'chrome_reader_mode',
            class: '',
            children: [],
          },
          {
            path: '/ordrelist',
            title: 'List Ordre',
            icon: 'nc-bank',
            class: 'event',
            children: [],
          },
        ],
      },
    ]);
  }

  private _getChildren = (node: RouteInfo) => of(node.children);
  hasNestedChild = (_: number, nodeData: RouteInfo) => !(nodeData.path);

}
