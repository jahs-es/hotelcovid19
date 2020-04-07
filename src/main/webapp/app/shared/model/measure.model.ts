import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IMeasure {
  id?: number;
  date?: Moment;
  temperatureAt8?: number;
  temperatureAt20?: number;
  cought?: boolean;
  troubleToBreathe?: boolean;
  sputum?: boolean;
  soreThroat?: boolean;
  ostTaste?: boolean;
  flutter?: boolean;
  diarrhea?: boolean;
  headache?: boolean;
  musclePain?: boolean;
  notes?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IMeasure> = {
  cought: false,
  troubleToBreathe: false,
  sputum: false,
  soreThroat: false,
  ostTaste: false,
  flutter: false,
  diarrhea: false,
  headache: false,
  musclePain: false
};
