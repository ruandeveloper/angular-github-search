import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-counter-tag',
  templateUrl: './counter-tag.component.html',
  styleUrls: ['./counter-tag.component.scss'],
})
export class CounterTagComponent {
  @Input() icon?: IconDefinition;
  @Input() count = 0;
  @Input() description = '';
}
