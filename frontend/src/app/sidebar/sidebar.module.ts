import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { TreeModule } from 'angular-tree-component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [RouterModule, CommonModule, TreeModule.forRoot(), MatTreeModule, MatIconModule, MatToolbarModule],
  declarations: [ SidebarComponent ],
  exports: [ SidebarComponent ]
})

export class SidebarModule {}

