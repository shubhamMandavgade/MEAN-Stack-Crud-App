import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CustomPreLoadService } from './shared/custom-pre-load.service';



const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch:"full"},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path : 'employees', data : {preload: true}, loadChildren: () => import('./employee/employeeModule/employee.module').then(m => m.EmployeeModule)}
  //Lazy Loading
  //{ path: 'employees', loadChildren: () => import('./employee/employeeModule/employee.module').then(m => m.EmployeeModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Pre Loading to load all modules after app module
    //preloadingStrategy : PreloadAllModules 
    preloadingStrategy : CustomPreLoadService
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
