import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';

import {IconsComponent} from '../../pages/icons/icons.component';


import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';
import {UsersListComponent} from '../../pages/users/users.list.component';
import {MachineListComponent} from '../../pages/Machines/list-machine/machine-list.component';
import {MachineAddComponent} from '../../pages/Machines/add-machine/machine-add.component';
import {BoxListComponent} from '../../pages/box/list-box/box-list.component';
import {BoxAddComponent} from '../../pages/box/add-box/box-add.component';
import {EmployeListComponent} from '../../pages/Employes/list-employe/employe-list.component';
import {EmployeComponent} from '../../pages/Employes/add-employe/employe-add.component';
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


export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user', component: UserComponent},
    {path: 'machines', component: MachineListComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'upgrade', component: UpgradeComponent},
    {path: 'users', component: UsersListComponent},
    {path: 'machines-add', component: MachineAddComponent},
    {path: 'box', component: BoxListComponent},
    {path: 'box-add', component: BoxAddComponent},
    {path: 'employe', component: EmployeListComponent},
    {path: 'employe-add', component: EmployeComponent},
    {path: 'seqlist/:id', component: SequenceListComponent},
    {path: 'ordre', component: OrdreaddComponent},

    {path: 'opcreat', component: OperationComponent},
    {path: 'seqadd', component: SequenceComponent},
    {
      path: 'line-mach', component: LinesMachineComponent, children: [
        {path: 'line-mach/oplist', component: OperationlistComponent},
        {path: 'line-mach/machintyplist', component: MachineTypeListComponent}]
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
  {path: 'machtype-creat', component: MachineTypeAddComponent}


  ]
;
