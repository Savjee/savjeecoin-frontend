import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent]
})
export class ThemeSwitcherModule { }
