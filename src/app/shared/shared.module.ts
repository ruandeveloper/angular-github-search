import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule, MatTooltipModule, MatButtonModule],
})
export class SharedModule {}
