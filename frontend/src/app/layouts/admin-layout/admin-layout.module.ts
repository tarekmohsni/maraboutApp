import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';


import {UserComponent} from '../../pages/user/user.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UsersListComponent} from '../../pages/users/users.list.component';
import {BoxListComponent} from '../../pages/box/list-box/box-list.component';
import {BoxAddComponent} from '../../pages/box/add-box/box-add.component';
import {EmployeListComponent} from '../../pages/Employes/Operators/list-employe/employe-list.component';
import {EmployeComponent} from '../../pages/Employes/Operators/add-employe/employe-add.component';
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
import {planifComponent} from '../../pages/bundle/planif-bundle/planif-bundle.component';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
// tslint:disable-next-line:max-line-length
import {MachineTypeListComponent} from '../../pages/lines-machines-machines type/machines type/machine type list/machine-type-list.component';
import {MachineTypeAddComponent} from '../../pages/lines-machines-machines type/machines type/machine type add/machine-type-add.component';
// tslint:disable-next-line:max-line-length
import {MachineTypeEditComponent} from '../../pages/lines-machines-machines type/machines type/machine type edit/machine-type-edit.component';
import {MachineListComponent} from '../../pages/lines-machines-machines type/machines/machine list/machine-list.component';
import {MachineAddComponent} from '../../pages/lines-machines-machines type/machines/machine add/machine-add.component';
import {CustomerSiteUserComponent} from '../../pages/customer-site-user/customer-site-user.component';
import {CustomerListComponent} from '../../pages/customer-site-user/customer/customer list/customer-list.component';
import {CustomerEditComponent} from '../../pages/customer-site-user/customer/customer edit/customer-edit.component';
import {CustomerAddComponent} from '../../pages/customer-site-user/customer/customer add/customer-add.component';
import {SiteListComponent} from '../../pages/customer-site-user/site/site list/site-list.component';
import {SiteAddComponent} from '../../pages/customer-site-user/site/site add/site-add.component';
import {SiteEditComponent} from '../../pages/customer-site-user/site/site edit/site-edit.component';
import {AllEmployeComponent} from '../../pages/Employes/employe..component';
import {ElectronicListComponent} from '../../pages/Employes/electronics/list-electronic/electronic-list.component';
import {ElectronicAddComponent} from '../../pages/Employes/electronics/add-electronic/electronic-add.component';
import {MechanicListComponent} from '../../pages/Employes/mechanics/list-mechanic/mechanic-list.component';
import {MechanicAddComponent} from '../../pages/Employes/mechanics/add-mechanic/mechanic-add.component';
import {SupervisorsListComponent} from '../../pages/Employes/Supervisors/list-supervisors/supervisors-list.component';
import {SupervisorsAddComponent} from '../../pages/Employes/Supervisors/add-supervisors/supervisors-add.component';
import {LineListComponent} from '../../pages/lines-machines-machines type/lines/lines list/line-list.component';
import {LineEditComponent} from '../../pages/lines-machines-machines type/lines/lines edit/line-edit.component';
import {LineAddComponent} from '../../pages/lines-machines-machines type/lines/lines add/line-add.component';
import {MachineEditComponent} from '../../pages/lines-machines-machines type/machines/machine edit/machine-edit.component';
import {BoxEditComponent} from '../../pages/box/edit-box/box-edit.component';
import {EmployeEditComponent} from '../../pages/Employes/Operators/edit-employe/employe-edit.component';
import {
  SupervisorseditComponent
} from '../../pages/Employes/Supervisors/edit-supervisors/supervisors-edit.component';
import {MechanicEditComponent} from '../../pages/Employes/mechanics/edit-mechanic/mechanic-edit.component';
import {ElectroniceditComponent} from '../../pages/Employes/electronics/edit-electronic/electronic-edit.component';

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

    UserComponent,
    UsersListComponent,
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
    MachineTypeAddComponent,
    MachineTypeEditComponent,
    MachineListComponent,
    MachineAddComponent,
    CustomerSiteUserComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerAddComponent,
    SiteListComponent,
    SiteAddComponent,
    SiteEditComponent,
    AllEmployeComponent,
    ElectronicListComponent,
    ElectronicAddComponent,
    MechanicListComponent,
    MechanicAddComponent,
    SupervisorsListComponent,
    SupervisorsAddComponent,
    LineListComponent,
    LineEditComponent,
    LineAddComponent,
    MachineEditComponent,
    BoxEditComponent,
    EmployeEditComponent,
    SupervisorseditComponent,
    MechanicEditComponent,
    ElectroniceditComponent

  ],
  entryComponents: [
    OperationComponent,
    SequenceComponent,
    EmployeComponent,
    ArticleComponent,
    BundleComponent,
    MachineTypeAddComponent,
    MachineTypeEditComponent,
    MachineAddComponent,
    CustomerEditComponent,
    CustomerAddComponent,
    SiteAddComponent,
    SiteEditComponent,
    ElectronicAddComponent,
    MechanicAddComponent,
    SupervisorsAddComponent,
    LineEditComponent,
    LineAddComponent,
    MachineEditComponent,
    BoxAddComponent,
    BoxEditComponent,
    EmployeEditComponent,
    SupervisorseditComponent,
    MechanicEditComponent,
    ElectroniceditComponent
  ]
})

export class AdminLayoutModule {
}
