import { Input, Output, Component, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: 'propertyBookDetails.component.html',
  selector: 'app-propertyBookDetails'
})

export class PropertyBookDetailsComponent {

  @Input() editControl: boolean = false;

  @Input() propertyKey: string;

  @Input() propertyValue: string = undefined;
  @Output() propertyValueChange = new EventEmitter<string>();

  @Input() propertyValueArray: string[] = undefined;
  @Output() propertyValueArrayChange = new EventEmitter<string[]>();

  editActive: boolean = false;
  editString: string;
  editStringArray: string;

  editProperty() {
    this.editActive = true;
    this.editString = this.propertyValue;
    if ( this.propertyValueArray !== undefined ){
      this.editStringArray = this.propertyValueArray.join(", ")
    }
  }

  editPropertyActive() {
    return this.editActive;
  }

  cancelProperty(){
    this.editActive = false;
    this.propertyValue = this.editString;
  }

  saveProperty(event){
    this.editActive = false;
    this.propertyValueChange.emit( this.propertyValue );
    if ( this.propertyValueArray !== undefined ){
      this.propertyValueArray = this.editStringArray.split(", ");
      this.propertyValueArrayChange.emit( this.propertyValueArray );
    }
  }

  queryParams( property: string ){
    return { [this.propertyKey]: property };
  }
  
}

