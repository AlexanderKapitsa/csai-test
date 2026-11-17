import { useState } from 'preact/hooks';

// An example component
export default function Counter() {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue((prevState) => prevState + 1);
  };

  return (
    <div className={'p-5 border'}>
      <p>Value: {value}</p>
      <button
        onClick={handleIncrement}
        className={
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        }
      >
        Increment
      </button>
    </div>
  );
}
