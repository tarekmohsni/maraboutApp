import {Component} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, of} from 'rxjs';
import {AuthService} from '../auth/auth.service';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
  permissions?: any[];
  active?: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Shoop Floor',
    icon: 'nc-bank',
    class: '',
    permissions: ['Shoop Floor'],
    active: true,
    children: [
      {
        path: '/seqlist',
        title: 'KPIS',
        icon: 'nc-bank',
        class: '',
        active: true,
        children: [],
      }, {
        path: '/box',
        title: 'Box',
        icon: 'widgets',
        class: '',
        active: true,
        children: [],
      },
      {
        path: '',
        title: 'Staff',
        icon: 'nc-bank',
        class: '',
        active: true,
        children: [{
          path: '/art-oprt',
          title: 'Attendence',
          icon: 'nc-bank',
          class: '',
          active: true,
          children: [],
        },
          {
            path: '/allemploye',
            title: 'Staff',
            icon: 'nc-bank',
            class: 'supervisor_account',
            active: true,
            children: [],
          }, {
            path: '/cust-site-user',
            title: 'Customer',
            icon: 'nc-bank',
            class: 'store',
            active: true,
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
    active: true,
    permissions: ['SETUP'],
    children: [
      {
        path: '/line-mach',
        title: 'Lines/Machines',
        icon: 'nc-bank',
        active: true,
        class: 'settings_brightness',
        children: [],
      },
      {
        path: '/ordre',
        title: 'Ordres',
        icon: 'chrome_reader_mode',
        class: '',
        active: true,
        children: [],
      },
      {
        path: '/ordrelist',
        title: 'List Ordre',
        icon: 'nc-bank',
        class: 'event',
        active: true,
        children: [],
      },
    ],
  },
  /*{path: '/dashboard', title: 'Shop Floor', icon: 'nc-bank', class: ''},
  {path: '/icons', title: 'Maintenance RTD', icon: 'nc-settings-gear-65', class: ''},
  {path: '/Employes', title: 'Notifications', icon: 'nc-bell-55', class: ''},
  {path: '/user', title: 'User Profile', icon: 'nc-single-02', class: ''},
  {path: '/ordre', title: 'Table List', icon: 'nc-tile-56', class: ''},
  {path: '/machines', title: 'liste Machines', icon: 'nc-caps-small', class: ''},
  {path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', class: 'active-pro'},
  {path: '/users', title: 'liste user', icon: 'nc-single-02', class: ''},
  {path: '/box', title: 'liste box', icon: 'nc-single-02', class: ''}*/
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})

export class SidebarComponent {
  nestedTreeControl: NestedTreeControl<RouteInfo>;
  nestedDataSource: MatTreeNestedDataSource<RouteInfo>;
  dataChange: BehaviorSubject<RouteInfo[]> = new BehaviorSubject<RouteInfo[]>([]);

  permissions: any;
  UserProfile: any;
  userFromStorage: any;
  public menuItems: any[];
  constructor(private authService: AuthService) {
  this.userFromStorage = this.authService.getToken();
  const tokenInfo = this.authService.getDecodedAccessToken(this.userFromStorage);
  this.UserProfile = tokenInfo.permissions;
    console.log('Userprofileeeeeeeee', tokenInfo);
    if (this.UserProfile ) {

      this.menuItems = ROUTES.filter(menuItem => {
        if (menuItem.permissions && this.UserProfile.indexOf(menuItem.permissions[0]) === -1) {

          return null
        } else {
          if (menuItem.children && menuItem.children.length) {
            let i = 0;

            let menuItemSize = 0;
            menuItem.children.forEach(submenu => {

              if (submenu.permissions && this.UserProfile.indexOf
              (submenu.permissions[0]) === -1) {
                menuItem.children[i].active = false;
                menuItemSize++;
              } else {
                menuItem.children[i].active = true;

              }
              i++;

            })

            // menuItem.badge = String(menuItem.submenu.length - menuItemSize);
          }
          return menuItem
        }
      });
    } else {
      console.log('not permissions')
    }
    this.nestedTreeControl = new NestedTreeControl<RouteInfo>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);
    this.dataChange.next(this.menuItems)
  }

  private _getChildren = (node: RouteInfo) => of(node.children);
  hasNestedChild = (_: number, nodeData: RouteInfo) => !(nodeData.path);

}
