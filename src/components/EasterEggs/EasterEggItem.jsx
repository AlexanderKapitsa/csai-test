import { MdOutlineDone } from 'react-icons/md';

export default function EasterEggItem({ data }) {
  return (
    <div className={'flex gap-4 items-center text-background-dark'}>
      {/* Icon with a tick */}
      <div
        className={
          'flex justify-center items-center size-8 rounded-full border-2 border-background-dark dark:border-primary-dark'
        }
      >
        {data.completed && (
          <MdOutlineDone
            size={24}
            className={'text-primary-light dark:text-primary-dark'}
          />
        )}
      </div>

      {/* Text description */}
      <div className={'text-primary-light dark:text-primary-dark'}>
        <h3>{data.name}</h3>
        <p className={'lg:text-[18px]'}>Бали: {data.points}</p>
      </div>
    </div>
  );
}
