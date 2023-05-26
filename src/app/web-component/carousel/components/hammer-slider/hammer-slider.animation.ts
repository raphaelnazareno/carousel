import { trigger, animate, transition, style } from '@angular/animations';

export const sliding = trigger('sliding', [
  transition('* => *', [
    animate(
      '1s cubic-bezier(.86,.01,.27,1)',
      style({ transform: 'translateX(0%)' })
    ),
  ]),
]);
