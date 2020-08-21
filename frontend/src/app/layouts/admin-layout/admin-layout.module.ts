import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UsersListComponent} from '../../pages/users/users.list.component';
import {MachineListComponent} from '../../pages/Machines/list-machine/machine-list.component';
import {MachineAddComponent} from '../../pages/Machines/add-machine/machine-add.component';
import {BoxListComponent} from '../../pages/box/list-box/box-list.component';
import {BoxAddComponent} from '../../pages/box/add-box/box-add.component';
import {EmployeListComponent} from '../../pages/Employes/list-employe/employe-list.component';
import {EmployeComponent} from '../../pages/Employes/add-employe/employe-add.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {SequenceListComponent} from '../../pages/sequences/sequence-list/sequence-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {OperationlistComponent} from '../../pages/operations template/operation_t list/operation_list.component';
import {MatButtonModule} from '@angular/material/button';
import {OperationComponent} from '../../pages/operations template/operation_t add/operation_t_add.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {SequenceComponent} from '../../pages/sequences/sequence-add/sequence_add.component';
import {LinesMachineComponent} from '../../pages/lines-machines-machines type/lines-machine.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ArticlelistComponent} from '../../pages/article-operation/article/article-list/article-list.component';
import {ArticleOprtComponent} from '../../pages/article-operation/article-oprt.component';
import {ArticleComponent} from '../../pages/article-operation/article/article-add/article-add.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {OrdreaddComponent} from '../../pages/ordre/add-ordre/ordre-add.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {OrdreListComponent} from '../../pages/ordre/list-ordre/ordre-list.component';
import {MatSortModule} from '@angular/material/sort';
import {BundleComponent} from '../../pages/bundle/add-bundle/bundle-add.component';
import {OrdreUpdateComponent} from '../../pages/ordre/update-ordre/ordre-update.component';
import { planifComponent} from '../../pages/bundle/planif-bundle/planif-bundle.component';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {MachineTypeListComponent} from '../../pages/lines-machines-machines type/machines type/machine type list/machine-type-list.component';
import {MachineTypeAddComponent} from '../../pages/lines-machines-machines type/machines type/machine type add/machine-type-add.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    NgSelectModule,
    MatStepperModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSortModule,
    SchedulerModule

  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    UpgradeComponent,
    IconsComponent,
    UsersListComponent,
    MachineListComponent,
    MachineAddComponent,
    BoxListComponent,
    BoxAddComponent,
    EmployeListComponent,
    SequenceListComponent,
    OperationlistComponent,
    OperationComponent,
    SequenceComponent,
    EmployeComponent,
    LinesMachineComponent,
    ArticlelistComponent,
    ArticleOprtComponent,
    ArticleComponent,
    OrdreaddComponent,
    OrdreListComponent,
    BundleComponent,
    OrdreUpdateComponent,
    planifComponent,
    MachineTypeListComponent,
    MachineTypeAddComponent

  ],
  entryComponents: [
    OperationComponent,
    SequenceComponent,
    EmployeComponent,
    ArticleComponent,
    BundleComponent,
    MachineTypeAddComponent
  ]
})

export class AdminLayoutModule {
}
