export enum VisitStatusesEnum {
  Scheduled = 1,
  Canceled = 2,
  Ended = 4,
}

export const VisitStatusesMapping: Record<VisitStatusesEnum, string> = {
  [VisitStatusesEnum.Scheduled]: 'Umówiona',
  [VisitStatusesEnum.Canceled]: 'Odwołana',
  [VisitStatusesEnum.Ended]: 'Zakończona',
};
