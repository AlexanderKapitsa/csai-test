import EasterEggItem from './EasterEggItem.jsx';

export default function EasterEggList({ items }) {
  return (
    <ul className={'flex flex-wrap max-md:flex-col gap-4 md:gap-8 xl:gap-8'}>
      {items.map((data, index) => (
        <li key={index} className={'md:basis-1/3'}>
          <EasterEggItem data={data} />
        </li>
      ))}
    </ul>
  );
}
