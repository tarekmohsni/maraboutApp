import {Routes} from '@angular/router';


import {UserComponent} from '../../pages/user/user.component';





import {UsersListComponent} from '../../pages/users/users.list.component';
import {BoxListComponent} from '../../pages/box/list-box/box-list.component';
import {BoxAddComponent} from '../../pages/box/add-box/box-add.component';
import {EmployeListComponent} from '../../pages/Employes/Operators/list-employe/employe-list.component';
import {EmployeComponent} from '../../pages/Employes/Operators/add-employe/employe-add.component';
import {SequenceListComponent} from '../../pages/sequences/sequence-list/sequence-list.component';
import {OperationlistComponent} from '../../pages/operations template/operation_t list/operation_list.component';
import {OperationComponent} from '../../pages/operations template/operation_t add/operation_t_add.component';
import {SequenceComponent} from '../../pages/sequences/sequence-add/sequence_add.component';
import {LinesMachineComponent} from '../../pages/lines-machines-machines type/lines-machine.component';
import {ArticleOprtComponent} from '../../pages/article-operation/article-oprt.component';
import {ArticlelistComponent} from '../../pages/article-operation/article/article-list/article-list.component';
import {ArticleComponent} from '../../pages/article-operation/article/article-add/article-add.component';
import {OrdreaddComponent} from '../../pages/ordre/add-ordre/ordre-add.component';
import {OrdreListComponent} from '../../pages/ordre/list-ordre/ordre-list.component';
import {BundleComponent} from '../../pages/bundle/add-bundle/bundle-add.component';
import {OrdreUpdateComponent} from '../../pages/ordre/update-ordre/ordre-update.component';
import {planifComponent} from '../../pages/bundle/planif-bundle/planif-bundle.component';
import {MachineTypeListComponent} from '../../pages/lines-machines-machines type/machines type/machine type list/machine-type-list.component';
import {MachineTypeAddComponent} from '../../pages/lines-machines-machines type/machines type/machine type add/machine-type-add.component';
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
import {SupervisorsListComponent} from '../../pages/Employes/Supervisors/list-supervisors/supervisors-list.component';
import {LineListComponent} from '../../pages/lines-machines-machines type/lines/lines list/line-list.component';
import {LineAddComponent} from '../../pages/lines-machines-machines type/lines/lines add/line-add.component';
import {ProfileListComponent} from '../../pages/Employes/profile/profile list/profile-list.component';


export const AdminLayoutRoutes: Routes = [
    {path: 'user', component: UserComponent},
    {path: 'users', component: UsersListComponent},
    {path: 'box', component: BoxListComponent},
    {path: 'box-add', component: BoxAddComponent},

    {path: 'employe-add', component: EmployeComponent},
    {path: 'seqlist/:id', component: SequenceListComponent},
    {path: 'ordre', component: OrdreaddComponent},

    {path: 'opcreat', component: OperationComponent},
    {path: 'seqadd', component: SequenceComponent},
    {
      path: 'line-mach', component: LinesMachineComponent, children: [
        {path: 'line-mach/oplist', component: OperationlistComponent},
        {path: 'line-mach/machintyplist', component: MachineTypeListComponent},
        {path: 'line-mach/machinlist', component: MachineListComponent},
        {path: 'line-mach/linelist', component: LineListComponent}]
    },
    {
      path: 'art-oprt', component: ArticleOprtComponent, children: [
        {path: 'art-oprt/artlist', component: ArticlelistComponent},
        {path: 'art-oprt/oplist', component: OperationlistComponent},
      ]
    },
    {path: 'art-add', component: ArticleComponent},
    {path: 'ordrelist', component: OrdreListComponent},
    {path: 'bundle-add', component: BundleComponent},
    {path: 'updordre/:id', component: OrdreUpdateComponent},
    {path: 'planif/:id', component: planifComponent},
    {path: 'machtype-creat', component: MachineTypeAddComponent},
    {path: 'machtype-updt', component: MachineTypeEditComponent},
    {path: 'mach-creat', component: MachineAddComponent},
    {path: 'cust-site-user', component: CustomerSiteUserComponent, children: [
        {path: 'cust-site-user/custmlist', component: CustomerListComponent},
        {path: 'cust-site-user/sitelist', component: SiteListComponent}

      ]},
  {path: 'custmoer-edit', component: CustomerEditComponent},
  {path: 'customer-add', component: CustomerAddComponent},
  {path: 'site-add', component: SiteAddComponent},
  {path: 'site-edit', component: SiteEditComponent},
  {path : 'dashboard', component: AllEmployeComponent, children: [
      {path: 'dashboard/eleclist', component: ElectronicListComponent},
      {path: 'dashboard/mechalist', component: MechanicListComponent},
      {path: 'dashboard/superlist' , component: SupervisorsListComponent},
      {path: 'dashboard/employe', component: EmployeListComponent},
      {path: 'dashboard/profile', component: ProfileListComponent}

    ]},
  {path: 'addelec', component: ElectronicAddComponent},
  {path: 'lineadd', component: LineAddComponent}


  ]
;
