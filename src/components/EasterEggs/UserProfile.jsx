import { useEffect, useState } from 'preact/hooks';
import { EasterEggOperator } from '@utils/easter-egg-operator.js';
import EasterEggList from './EasterEggList.jsx';

export default function UserProfile() {
  const [easterEggOp, setEasterEggOp] = useState(() => EasterEggOperator);

  const callToActionText = easterEggOp.hasFoundAll
    ? 'Вітаю! Виконано всі досягнення!'
    : 'Чи зможеш отримати їх всі?';

  // It is a temporary solution, as React is not reactive with plain JS objects
  useEffect(() => {
    setTimeout(() => {
      // Update every 1 second
      setInterval(() => {
        setEasterEggOp({ ...EasterEggOperator });
      }, 1000);
    }, 3000);
  }, []);

  return (
    <div className={'flex flex-col gap-4 lap:gap-6 xl:gap-8'}>
      <h3>
        Отримані бали:&nbsp;
        <span className={'text-secondary-400-dark dark:text-primary-dark'}>
          {easterEggOp.currentPoints}/{easterEggOp.maxPoints}
        </span>
      </h3>
      <h3>
        Виконано досягнень:&nbsp;
        <span className={'text-secondary-400-dark dark:text-primary-dark'}>
          {easterEggOp.completedCount}/{easterEggOp.listOperator.list.length}
        </span>
      </h3>
      <EasterEggList items={easterEggOp.listOperator.list} />
      <p>{callToActionText}</p>
    </div>
  );
}
