import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BundleService} from '../bundle.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';

const intersects = (startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date) =>
  (startTime1 < startTime2 && endTime1 > endTime2) ||
  (startTime2 <= startTime1 && startTime1 < endTime2) ||
  (startTime2 < endTime1 && endTime1 <= endTime2);

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-planif-bundle',
  template: `
        <kendo-scheduler
            [kendoSchedulerBinding]="events"
            [kendoSchedulerReactiveEditing]="createFormGroup"
            [selectedDate]="selectedDate"
            (add)="onAdd($event)"
            (edit)="onEdit($event)"
            (remove)="onRemove($event)"
            (dragStart)="onDragStart($event)"
            (drag)="onDrag($event)"
            (dragEnd)="onDragEnd($event)"
            (resizeStart)="onResizeStart($event)"
            (resize)="onResize($event)"
            (resizeEnd)="onResizeEnd($event)"
            style="height: 600px;"
        >
            <kendo-scheduler-week-view startTime="07:00">
            </kendo-scheduler-week-view>
        </kendo-scheduler>
    `,
  styles: [`
        .invalid {
            background: blue !important;
        }
    `]
})
// tslint:disable-next-line:class-name
export class planifComponent implements OnInit {

  public selectedDate: Date = new Date('2018-10-22T00:00:00');
  public events: any[] = [{
    id: 1,
    title: 'bundle1',
    start: new Date('2018-10-22T09:00:00'),
    end: new Date('2018-10-22T09:30:00'),
    readonly: true
  }, {
    id: 2,
    title: 'bundle2',
    start: new Date('2018-10-22T10:00:00'),
    end: new Date('2018-10-22T10:30:00')
  }];
  public formGroup: FormGroup;
  private ordreId: string;
  private dataupd: Subscription;
  datalist: any[];

  constructor(private formBuilder: FormBuilder, private service: BundleService, private router: ActivatedRoute) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }
  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.ordreId = paramMap.get('id');
        console.log(this.ordreId);
        this.service.getbundel(this.ordreId);
        this.dataupd = this.service.bdlUpdt().subscribe((list: any[]) => {
          this.datalist = list;
          console.log(this.datalist);
        });
      };


    });

  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;

    this.formGroup = this.formBuilder.group({
      'id': args.isNew ? this.getNextId() : dataItem.id,
      'start': [dataItem.start, Validators.required],
      'end': [dataItem.end, Validators.required],
      'startTimezone': [dataItem.startTimezone],
      'endTimezone': [dataItem.endTimezone],
      'isAllDay': dataItem.isAllDay,
      'title': dataItem.title,
      'description': dataItem.description,
      'recurrenceRule': dataItem.recurrenceRule,
      'recurrenceId': dataItem.recurrenceId
    });

    return this.formGroup;
  }

  public onDragStart(args: any): void {
    this.preventReadonly(args);
  }

  public onDrag(args: any): void {
    if (this.occupiedSlot(args)) {
      args.setHintClass('invalid');
    }
  }

  public onDragEnd(args: any): void {
    if (this.occupiedSlot(args)) {
      args.preventDefault();
    }
  }

  public onResizeStart(args: any): void {
    this.preventReadonly(args);
  }

  public onResize(args: any): void {
    if (this.occupiedSlot(args)) {
      args.setHintClass('invalid');
    }
  }

  public onResizeEnd(args: any): void {
    if (this.occupiedSlot(args)) {
      args.preventDefault();
    }
  }

  public onRemove(args: any): void {
    this.preventReadonly(args);
  }

  public onEdit(args: any): void {
    this.preventReadonly(args);
  }

  public onAdd(args: any): void {
    if (this.occupiedSlot(args.dataItem)) {
      alert('This time period is occupied.');
      args.preventDefault();
    }
  }

  private preventReadonly(args: any): void {
    if (args.dataItem.readonly) {
      alert('The event cannot be changed.');
      args.preventDefault();
    }
  }

  private occupiedSlot(args: any): boolean {
    let occupied = false;

    this.events.find(e => {
      if (e !== args.dataItem && intersects(args.start, args.end, e.start, e.end)) {
        occupied = true;
        return true;
      }
    });

    return occupied;
  }

  private getNextId(): number {
    const len = this.events.length;

    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  }
}
