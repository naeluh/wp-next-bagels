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
    };
  }
}
