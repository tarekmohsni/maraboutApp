import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Sequence} from '../sequence.model';
import {SequenceService} from '../sequence.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {SequenceComponent} from '../sequence-add/sequence_add.component';

@Component({
  selector: 'app-list-sequence',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent implements OnInit {
  // Important objects
  sequenceList: Sequence[];
  private sequpd: Subscription;
  private operationId: string;
  constructor(private service: SequenceService, private router: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.operationId = paramMap.get('id');
        console.log('idddddd', this.operationId);
        this.service.getSequence(this.operationId);
        this.sequpd = this.service.seqUpdt()
          .subscribe((sequences: Sequence[]) => {
            this.sequenceList = sequences;
            console.log('ftyjgch', this.sequenceList);
          });
      } else {
        this.operationId = null;
      }
    });
  }

  onCreat() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      opid : this.operationId
    }
    this.dialog.open(SequenceComponent, dialogConfig);

  }
  deleteseq(id) {
    this.service.Deleteseq(id);
  }
}

