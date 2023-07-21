import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetModelDTO } from 'src/app/models/car/GetModelDTO';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent {
  @Input() options: { id: number; name: string; models: GetModelDTO[] }[] = [];
  @Input() options2: { id: number; name: string }[] = [];

  @Input() placeholder: string = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  selectedValue: any;
  showDropdown: boolean = false;

  onValueChange(): void {
    this.valueChange.emit(this.selectedValue);
  }
}
