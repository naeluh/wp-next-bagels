import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    data: {
      bagelSelections: array;
      bagelChips: object;
      bagelChipData: array;
      location: string;
      time: string;
      formattedDate: string;
      formattedLocation: string;
      totalCost: number;
      brunchBagData: object;
      brunchBag: {
        bags: array;
        deliveryDate: string;
        address: {
          addressOne: string;
          addressTwo: string;
          city: string;
          state: string;
          zip: string;
        };
      };
    };
  }
}
