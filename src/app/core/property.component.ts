import { Input, Output, Component, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: 'property.component.html',
  selector: 'app-property'
})

export class PropertyComponent {

  @Input() propertyKey: string;
  @Input() propertyValue: string;

  @Output() propertyValueChange = new EventEmitter<string>();

  editBool: boolean = false;

  editProperty() {
    this.editBool = true;
  }

  editPropertyActive() {
    return this.editBool;
  }

  cancelProperty(){
    this.editBool = false;
  }

  saveProperty(event){
    this.cancelProperty();
    this.propertyValueChange.emit( this.propertyValue );
  }
  
}

