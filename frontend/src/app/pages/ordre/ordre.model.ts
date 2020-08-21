import {Bundle} from '../bundle/bundle.model';

export class Ordre {
  ordre_id: string;
  label: string;
  code: string;
  description: string;
  ordrequantity: string;
  bundles: Bundle [];
  articless: [];
}
