import {OperationGroupModel} from '../ordre/operation-group.model';

export class Bundle {
  bundle_id: string;
  num_bundle: string;
  size: string;
  quantity: string;
  operation_groupe: OperationGroupModel [];
}
