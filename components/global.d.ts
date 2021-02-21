import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    data: {
      bagelSelections: array;
      bagelChips: object;
      bagelChipData: array;
      location: string;
      time: string;
      totalCost: number;
    };
  }
}
