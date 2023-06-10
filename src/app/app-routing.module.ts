import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustmerComponent } from './custmer/custmer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'customer', component: CustmerComponent},
  {path: 'tasks', component: TaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
