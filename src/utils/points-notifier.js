import Notiflix from 'notiflix';
import UserProfileOperator from './modal-operators/user-modal-operator.js';

Notiflix.Notify.init({
  timeout: 7000,
  useIcon: false,
  clickToClose: true,
  cssAnimationDuration: 0,
  position: 'left-bottom',
  width: '340px',
  className: 'notiflix-success',
});

export const notifyPointsGained = (amount) => Notiflix.Notify.success(`Знайдено секрет. +${amount} балів`,
  () => UserProfileOperator.show(),
);
