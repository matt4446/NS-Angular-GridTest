import { AutoGridColumns,AutoGridRows } from "./controls/grid.directive";
import { Component} from "@angular/core";
import { Observable, Subscription, Subject } from 'rxjs/Rx';
@Component({
  selector: "my-app",
  template: `
    <StackLayout>
      <TextField [(ngModel)]="colsInput" hint="Enter cols"></TextField>
      <TextField [(ngModel)]="rowInput" hint="Enter rows"></TextField>
      <Button text="Build Grid" (tap)="update()"></Button>
      <!-- columns ="*,*,* ... n" effectively --> 
      <GridLayout [auto-grid-columns]="autoCreateColumns" 
                  [auto-grid-rows]="autoCreateRows">
          <template ngFor let-row [ngForOf]="rows" let-y="index">
            <template ngFor let-col [ngForOf]="cols" let-x="index"> 
              <Label [col]="col" [row]="row" text="x"></Label>
            </template>
          </template>
      </GridLayout>
    </StackLayout>
  `,
  directives: [AutoGridColumns,AutoGridRows]
})
export class AppComponent {
  
  public rows;
  public cols; 
  
  private autoCreateColumns = 5;
  private autoCreateRows = 5;
  
  private _colsInput = 5;
  private _rowInput = 5; 
  
  constructor(){
    this.rows = this.createIndexArray(this.rowInput);
    this.cols = this.createIndexArray(this.colsInput);
  }
  
  public update(): void {
    this.autoCreateColumns = this.colsInput;
    this.autoCreateRows = this.autoCreateRows;
    
    this.rows = this.createIndexArray(this.rowInput);
    this.cols = this.createIndexArray(this.colsInput);
    this.autoCreateRows = this.rowInput;
    this.autoCreateColumns = this.colsInput;
    
  }
  
  public get rowInput(){
    return this._rowInput;
  }
  public set rowInput(value: number){    
    this._rowInput = value;
  }

  public get colsInput(){
    return this._colsInput;
  }
  public set colsInput(value: number){        
    this._colsInput = value;
  }

  private createIndexArray(value: number){
    let arr = [];
    for(let i = 0; i<value; i++){
      arr.push(i);
    }
    return arr;
  }
}