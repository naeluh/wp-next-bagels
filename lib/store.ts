import { createStore } from 'little-state-machine';
import type { BrunchBagDay } from './processBrunchBags';
import type { Option } from './types';

export type BagelValue = { key: string; value: number };
export type BagelSet = {
  id: number;
  bagelSetType: string;
  bagels: BagelValue[];
};
export type BrunchBag = { id: number; type: string; bagels: BagelValue[] };

declare module 'little-state-machine' {
  interface GlobalState {
    data: {
      bagelSelections: BagelSet[];
      bagelChips: Record<string, number>;
      bagelChipData: unknown[];
      location: Option | '';
      time: Option | '';
      totalCost: number;
      formattedDate: string;
      formattedLocation: string;
      dozenName?: string; // from the dozen_name ACF field, saved when a bagel set is added
      brunchBagData: { dates?: Option[]; bb?: BrunchBagDay[] } | [];
      brunchBag: {
        bags: BrunchBag[];
        deliveryDate: string | null;
        address: {
          addressOne: string | null;
          addressTwo: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
        };
      };
    };
  }
}

// Order state, persisted to sessionStorage by little-state-machine.
createStore({
  data: {
    bagelSelections: [],
    bagelChips: {},
    bagelChipData: [],
    location: '',
    time: '',
    totalCost: 0.0,
    formattedDate: '',
    formattedLocation: '',
    brunchBagData: [],
    brunchBag: {
      bags: [],
      deliveryDate: null,
      address: {
        addressOne: null,
        addressTwo: null,
        city: null,
        state: null,
        zip: null,
      },
    },
  },
});
