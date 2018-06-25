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
  editString: string;

  editProperty() {
    this.editBool = true;
    this.editString = this.propertyValue;
  }

  editPropertyActive() {
    return this.editBool;
  }

  cancelProperty(){
    this.editBool = false;
    this.propertyValue = this.editString;
  }

  saveProperty(event){
    this.editBool = false;
    this.propertyValueChange.emit( this.propertyValue );
  }
  
}

