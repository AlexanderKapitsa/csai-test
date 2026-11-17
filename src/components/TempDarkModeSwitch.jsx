import { useEffect } from 'preact/hooks';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import {
  RiComputerFill,
  RiMoonFill,
  RiSunFill,
  RiComputerLine,
  RiMoonLine,
  RiSunLine,
} from 'react-icons/ri';

const LS_KEY = 'theme';
const DARK_CLASS = 'dark';
const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

const Variants = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
};

const themeData = [
  {
    name: Variants.LIGHT,
    ActiveIcon: RiSunFill,
    Icon: RiSunLine,
    style: '!fill-secondary-300-light',
  },
  {
    name: Variants.SYSTEM,
    ActiveIcon: RiComputerFill,
    Icon: RiComputerLine,
    style: '!fill-secondary-300-light dark:!fill-primary-dark',
  },
  {
    name: Variants.DARK,
    ActiveIcon: RiMoonFill,
    Icon: RiMoonLine,
    style: '!fill-primary-dark',
  },
];
const buttonThemeStyle =
  'dark:fill-background-light fill-secondary-400-dark size-7 ';

export default function TempDarkModeSwitch() {
  const [theme, setTheme] = useLocalStorage(LS_KEY, Variants.SYSTEM);
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  // Operate with theme according to LS
  useEffect(() => {
    document.body.classList.add('transition-colors');
    document.body.classList.add('duration-150');

    switch (theme) {
      case Variants.SYSTEM:
        if (isDarkOS) {
          document.body.classList.add(DARK_CLASS);
          return;
        }

        return document.body.classList.remove(DARK_CLASS);
      case Variants.DARK:
        return document.body.classList.add(DARK_CLASS);
      case Variants.LIGHT:
        return document.body.classList.remove(DARK_CLASS);
    }

    document.body.classList.remove('transition-colors');
    document.body.classList.remove('duration-150');
  }, [theme, isDarkOS]);

  const toggleMobileTheme = () => {
    switch (theme) {
      case Variants.DARK:
        return setTheme(Variants.LIGHT);
      case Variants.LIGHT:
        return setTheme(Variants.SYSTEM);
      case Variants.SYSTEM:
        return setTheme(Variants.DARK);
    }
  };
  const toggleTheme = (variant) => {
    setTheme(variant);
  };

  const Icon =
    theme === Variants.SYSTEM
      ? RiComputerFill
      : theme === Variants.DARK
        ? RiMoonFill
        : RiSunFill;

  return (
    <>
      {/* <div
        className="hidden lg:flex items-center gap-3 dark:border-primary-dark border-secondary-400-dark border-[4px] rounded-full py-2 px-4">
        {themeData.map((variant) => (
          <button key={variant.name} onClick={() => toggleTheme(variant.name)}>
            {theme === variant.name ? (<variant.ActiveIcon
                className={buttonThemeStyle + variant.style}
              />) : (<variant.Icon className={buttonThemeStyle} />)}
          </button>))}
      </div> */}
      <div className="flex items-center gap-3 dark:border-primary-dark py-2 lg:px-3 px-2">
        <button
          id="bulb-toggle-theme"
          className="flex size-8 lg:flex"
          onClick={toggleMobileTheme}
        >
          <Icon className="inline-block fill-secondary-300-light dark:fill-primary-dark -mr-3 size-8 " />
        </button>
      </div>
    </>
  );
}
