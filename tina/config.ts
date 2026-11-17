import { defineConfig, Form, TinaCMS } from 'tinacms';
import { format } from 'date-fns';
import { tinaSettings } from '../app.config';
import ConditionalField from '../src/components/CustomFieldsView/ConditionalField';
import CustomSelect from '../src/components/CustomFieldsView/CustomSelect';
import ToggleInput from '../src/components/CustomFieldsView/ToggleInput';
import slugify from 'slugify';
import CustomDatepicker from '../src/components/CustomFieldsView/CustomDatepicker';
import {
  TelegramUrlValidator,
  InstagramUrlValidator,
  YouTubeUrlValidator,
  TwitterUrlValidator,
} from '../src/utils/url-validators';
import CustomTable from '../src/components/CustomFieldsView/CustomTable/CustomTable';

const TINA_CLIENT_ID = tinaSettings.clientId;
const TINA_TOKEN = tinaSettings.token;

const slug = (message) =>
  slugify(message, {
    lower: true,
    strict: true,
  });

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

// In the future, it should be placed everywhere, so we can reduce boilerplate
const basicMetadata = [
  {
    type: 'string',
    name: 'updatedAt',
    label: 'Last Updated At',
    required: true,
    ui: {
      component: (props) => {
        return null;
      },
    },
  },
  {
    type: 'datetime',
    name: 'createdAt',
    label: 'Date',
    required: true,
    ui: {
      component: (props) => {
        return null;
      },
    },
  },
  {
    type: 'string',
    name: 'layout',
    label: 'Layout',
    ui: {
      component: (props) => {
        return null;
      },
    },
  },
];

const singleDocumentCollection = {
  allowedActions: {
    create: false,
    delete: false,
  },
};

const filenameUIProps = {
  filename: {
    readonly: true,
    slugify: ({ title }) => {
      if (title) {
        const fileName = `${title.slice(0, 30)}-${format(new Date(), 'dd.MM.yyyy')}`;

        return slug(fileName);
      }
    },
  },
};

const tableComponent = {
  name: 'Table',
  label: 'Таблиця',
  ui: {
    itemProps: (item) => {
      return {
        label: !item?.subtitle
          ? 'Таблиця: Не налаштовано'
          : `Таблиця: ${item?.subtitle}`,
      };
    },
  },
  fields: [
    {
      label: 'Назва таблиці',
      type: 'string',
      name: 'subtitle',
      required: true,
    },
    {
      type: 'string',
      name: 'data',
      label: 'Таблиця',
      description: 'Обовʼязково має бути хоча би один рядок',
      ui: {
        validate: (value) => {
          if (typeof value === 'undefined') {
            return 'Required';
          }

          const parsedData = JSON.parse(value);

          const table = parsedData.table;

          if (table.length === 0) {
            return 'Required';
          }
        },
      },
      component: CustomTable,
    },
  ],
};

const NODE_TYPES = [
  { label: 'Папка', value: 'FOLDER' },
  { label: 'Папка (Рік)', value: 'YEAR_FOLDER' },
  { label: 'Файл / Посилання', value: 'LINK' },
];

const createRepositoryNodeFields = (depth = 0, maxDepth = 6) => [
  {
    name: 'title',
    label: 'Назва',
    type: 'string',
    required: true,
  },
  {
    name: 'nodeType',
    label: 'Тип вузла',
    type: 'string',
    options: NODE_TYPES,
    required: true,
  },
  {
    name: 'link',
    label: 'Посилання',
    type: 'string',
    hidden: (item) => item?.nodeType !== 'LINK',
  },
  {
    name: 'hidden',
    label: 'Прихований',
    type: 'boolean',
  },
  ...(depth < maxDepth
    ? [
        {
          name: 'children',
          label: 'Вміст',
          type: 'object',
          list: true,
          hidden: (item) => item?.nodeType !== 'FOLDER',
          ui: {
            itemProps: (item) => ({
              label: item?.title ?? 'Без назви',
            }),
          },
          fields: createRepositoryNodeFields(depth + 1, maxDepth),
        },
      ]
    : []),
];

const getText = (node: any): string => {
  if (typeof node === 'string') return node;
  if (typeof node?.text === 'string') return node.text;
  return (
    node?.children?.map(getText).join(node?.type === 'root' ? ' ' : '') ?? ''
  );
};

export default defineConfig({
  branch,
  clientId: TINA_CLIENT_ID ?? '', // Get this from tina.io
  token: TINA_TOKEN ?? '', // Get this from tina.io
  // Get this from tina.io
  // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  // token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '/src/assets',
      publicFolder: './',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'departments',
        label: 'Кафедри',
        path: 'src/pages/departments',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'string',
            name: 'updatedAt',
            label: 'Last Updated At',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Date',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'string',
            isTitle: true,
            name: 'title',
            label: 'Назва кафедри',
            description:
              'Приклад: "Кібербезпека інформаційних систем, мереж і технологій"',
            required: true,
          },
          {
            type: 'string',
            name: 'mtitle',
            label: 'Коротка назва кафедри',
            description:
              'Приклад: "Кібербезпека" (таку назву буде показано на мобільній версії, а також у назві вкладки сайту)',
            required: true,
          },
          {
            type: 'string',
            name: 'subPath',
            label: 'URL-шлях кафедри',
            description:
              'Латиницею, у форматі "computer-science". Визначає адресу сторінки та назву файлу. Має бути ОДНАКОВИМ у версіях цієї кафедри для всіх мов',
            required: true,
            ui: {
              validate: (value) => {
                if (!value) {
                  return 'Required';
                }

                if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) {
                  return 'Дозволені лише латинські малі літери, цифри та дефіси (приклад: computer-science)';
                }
              },
            },
          },
          {
            type: 'number',
            name: 'order',
            label: 'Порядок відображення в меню',
            description: 'Менше число — вище в списку кафедр',
            required: true,
          },
          {
            type: 'boolean',
            name: 'isPublished',
            label: 'Опубліковано',
            description:
              'Якщо вимкнено, кафедра зникає з меню та списку напрямків, але сторінка залишається доступною за прямим посиланням',
          },
          {
            type: 'boolean',
            name: 'isShownInAreas',
            label: 'Показувати у блоці "Напрямки" на головній',
            description:
              'Вмикайте лише для кафедр, що мають зʼявитися у блоці напрямків на головній сторінці',
          },
          {
            name: 'about',
            label: 'Опис',
            description:
              'Рекомендується до трьох речень. Якщо буде дуже багато тексту, він обріжеться візуально',
            type: 'string',
          },
          {
            name: 'longAbout',
            label: 'Довгий опис',
            description:
              'Буде відображено в окремому блоці на сторінці кафедри.',
            type: 'rich-text',
          },
          {
            name: 'keyAreas',
            label: 'Ключові напрямки',
            description: 'Ключові слова, напрямки або тези',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'title',
                label: 'Ключовий напрямок',
                description:
                  'Наприклад: "Штучний інтелект та машинне навчання"',
                type: 'rich-text',
                required: true,
              },
            ],
            ui: {
              defaultItem: { title: '' },
              itemProps: (item) => {
                const title = getText(item?.title)
                  .replace(/\s+/g, ' ')
                  .trim()
                  .slice(0, 150);

                return {
                  label: title || 'Не налаштовано',
                };
              },
            },
          },
          {
            name: 'picture',
            label: 'Картинка',
            description: 'Це картинка, що буде на банері сторінки',
            type: 'image',
            required: true,
          },
          {
            type: 'string',
            name: 'presentationLink',
            label: 'Посилання на презентацію кафедри',
            description:
              'Посилання на google диск презентації (буклета) кафедри',
          },
          {
            name: 'deanName',
            label: 'Імʼя завідувача кафедри',
            type: 'string',
            required: true,
          },
          {
            name: 'gallery',
            label: 'Співробітники кафедри',
            type: 'object',
            list: true,
            fields: [
              {
                type: 'reference',
                name: 'teacher',
                label: 'Викладач',
                collections: ['teachers'],
                required: true,
                ui: {
                  optionComponent: (props: any) => props?.name || props?.title,
                },
              },
              {
                name: 'frontPicture',
                label: 'Кастомне фото для кафедри (необовʼязково)',
                description:
                  'Якщо порожньо — фото візьметься зі сторінки викладача',
                type: 'image',
                required: false,
              },
              {
                type: 'boolean',
                name: 'isPublished',
                label: 'Опубліковано на сторінці кафедри',
              },
            ],
            ui: {
              defaultItem: {
                teacher: '',
                frontPicture: '',
                isPublished: true,
              },
              itemProps: (item) => {
                const teacherSlug = item?.teacher
                  ? item.teacher.split('/').pop()?.replace('.mdx', '')
                  : 'не обрано';
                return {
                  label: `Викладач: ${teacherSlug}`,
                };
              },
            },
          },
          {
            name: 'cooperations',
            label: 'Співпраця кафедри',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'logo',
                label: 'Картинка',
                description: 'Лого компанії',
                type: 'image',
                required: true,
              },
              {
                name: 'description',
                label: 'Опис',
                type: 'string',
                required: true,
              },
            ],
            ui: {
              defaultItem: { logo: '', description: '' },
              itemProps: (item) => {
                return {
                  label: !item?.description
                    ? 'Не налаштовано'
                    : `${item?.description}`,
                };
              },
            },
          },
          {
            name: 'usefulLinks',
            label: 'Корисні посилання',
            type: 'object',
            list: true,
            required: false,
            fields: [
              {
                name: 'title',
                label: 'Назва посилання',
                type: 'string',
                required: true,
              },
              {
                name: 'url',
                label: 'Посилання',
                type: 'string',
                required: true,
              },
            ],
            ui: {
              defaultItem: { title: '', url: '' },
              itemProps: (item) => {
                return {
                  label: !item?.title
                    ? 'Не налаштовано'
                    : `${item?.title}, ${item?.url}`,
                };
              },
            },
          },
          {
            name: 'infrastructure',
            label: 'Дослідницька інфраструктура',
            description:
              'Це може бути список лабораторій, доступів до хмарних платформ або інших інфраструктурних елементів кафедри. Наприклад, "Лабораторія кібербезпеки" або "Високопродуктивні обчислювальні сервери".',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'description',
                label: 'Опис інфраструктури',
                type: 'string',
                required: true,
              },
            ],
            ui: {
              defaultItem: { description: '' },
              itemProps: (item) => {
                return {
                  label: !item?.description
                    ? 'Не налаштовано'
                    : `${item?.description}`,
                };
              },
            },
          },
          {
            name: 'notableAchievements',
            label: 'Визначні досягнення кафедри',
            description:
              'Список досягнень кафедри. Наприклад, "Перемога у міжнародному конкурсі з кібербезпеки" або "Система контролю доступу на базі штучного інтелекту"',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'description',
                label: 'Опис досягнення',
                type: 'string',
                required: true,
              },
              {
                name: 'icon',
                label: 'Іконка',
                type: 'string',
                required: true,
                options: [
                  { label: 'Ноутбук', value: 'laptop' },
                  { label: 'Щит з галочкою', value: 'shield-check' },
                  { label: 'Паросток', value: 'sprout' },
                  { label: 'Завод', value: 'factory' },
                  { label: 'Мозок', value: 'brain' },
                  { label: 'Дроти', value: 'cable' },
                  { label: 'Графік', value: 'chart-column-big' },
                ],
                ui: {
                  component: 'select',
                },
              },
            ],
            ui: {
              defaultItem: { description: '', icon: '' },
              itemProps: (item) => {
                return {
                  label: !item?.description
                    ? 'Не налаштовано'
                    : `${item?.description}`,
                };
              },
            },
          },
          {
            name: 'educationalIniciatives',
            label: 'Освітні ініціативи кафедри',
            description:
              'Це може бути список освітніх ініціатив кафедри, таких як курси, тренінги або інші освітні програми. Наприклад, "Курс з основ кібербезпеки" або "Студентські лабораторії та стартапи".',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'title',
                label: 'Опис освітньої ініціативи',
                type: 'string',
                required: true,
              },
            ],
            ui: {
              defaultItem: { title: '' },
              itemProps: (item) => {
                return {
                  label: !item?.title ? 'Не налаштовано' : `${item?.title}`,
                };
              },
            },
          },
          {
            name: 'goals',
            label: 'Цілі та/або завдання кафедри',
            description:
              'Це може бути список цілей або завдань кафедри. Наприклад, "Підготовка висококваліфікованих спеціалістів у галузі кібербезпеки".',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'description',
                label: 'Опис цілі або завдання',
                type: 'string',
                required: true,
              },
            ],
            ui: {
              defaultItem: { description: '' },
              itemProps: (item) => {
                const title = item?.description?.slice(0, 150);

                return {
                  label: title || 'Не налаштовано',
                };
              },
            },
          },
          {
            name: 'contactInfo',
            label: 'Контактна інформація',
            description:
              "Ця інформація буде відображена на сторінці кафедри у вигляді таблиці. Будь ласка, вкажіть електронну пошту, телефон або адресу кафедри. Поля не є обов'язковими, але рекомендується заповнити хоча б одне з них.",
            type: 'object',
            fields: [
              {
                name: 'departmentEmail',
                label: 'Електронна пошта кафедри',
                type: 'string',
              },
              {
                name: 'departmentPhone',
                label: 'Телефон кафедри',
                type: 'string',
              },
              {
                name: 'departmentAddress',
                label: 'Адреса кафедри',
                type: 'string',
              },
              {
                name: 'departmentSite',
                label: 'Сайт кафедри',
                type: 'string',
              },
              {
                name: 'headEmail',
                label: 'Електронна пошта завідувача кафедри',
                type: 'string',
              },
              {
                name: 'headPhone',
                label: 'Телефон завідувача кафедри',
                type: 'string',
              },
            ],
          },
        ],
        ui: {
          filename: {
            readonly: true,
            slugify: ({ subPath }) => (subPath ? slug(subPath) : undefined),
          },
          allowedActions: {
            create: true,
            delete: true,
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              layout: '../../../layouts/DepartmentLayout.astro',
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'admissions',
        label: 'Усе про вступ',
        path: 'src/pages/admissions',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'string',
            name: 'updatedAt',
            label: 'Last Updated At',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Date',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'string',
            isTitle: true,
            name: 'level',
            label: 'Рівень',
            description: 'Приклад: "Бакалаврат" або "Магістратура"',
            required: true,
          },
          {
            name: 'description',
            label: 'Опис',
            description:
              'Рекомендується до трьох речень. Якщо буде дуже багато тексту, він обріжеться візуально',
            type: 'string',
            ui: {
              component: 'textarea',
            },
          },
          // {
          //   type: 'object',
          //   name: 'areas',
          //   label: 'Напрямки',
          //   list: true,
          //   ui: {
          //     itemProps: (item) => {
          //       return {
          //         label: !item?.areaTitle
          //           ? 'Не налаштовано'
          //           : `${item?.areaTitle}`,
          //       };
          //     },
          //   },
          //   fields: [
          //     {
          //       type: 'string',
          //       name: 'areaTitle',
          //       label: 'Заголовок напрямку',
          //     },
          //     {
          //       type: 'string',
          //       name: 'studyFormatText',
          //       label: 'Формати навчання. Писати багаторядковим текстом',
          //       ui: {
          //         component: 'textarea',
          //       },
          //     },
          //   ],
          // },
          {
            label: 'Вступна інформація',
            name: 'entryInfo',
            type: 'object',
            list: true,
            templates: [
              {
                name: 'Subtitle',
                label: 'Підзаголовок секції',
                ui: {
                  itemProps: (item) => {
                    return {
                      label: !item?.text
                        ? 'Підзаголовок секції: Не налаштовано'
                        : `Підзаголовок секції: ${item?.text}`,
                    };
                  },
                },
                fields: [
                  {
                    label: 'Підзаголовок секції',
                    description:
                      'Вважається, що достатньо додати один заголовок на секцію',
                    name: 'text',
                    type: 'string',
                    required: true,
                  },
                ],
              },
              tableComponent,
            ],
          },
          {
            name: 'documentLink',
            label: 'Посилання на документи',
            description:
              'Тут планується посилання на Google Диск або щось інше, де будуть всі документи в одному місці',
            type: 'string',
          },
          {
            label: 'Кроки до вступу',
            name: 'steps',
            type: 'object',
            list: true,
            description: 'Саме у такому порядку буде відображення на сайті',
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                const descriptionText =
                  item?.description?.children[0]?.children[0]?.text;

                return {
                  label:
                    !item?.deadline && !descriptionText
                      ? 'Не налаштовано'
                      : `${item?.deadline}: ${descriptionText}`,
                };
              },
            },
            fields: [
              {
                name: 'deadline',
                label: 'Кінцева дата етапу',
                description: 'Приклад: "до 01.01.2022"',
                type: 'string',
                required: true,
              },
              {
                label: 'Опис етапу',
                name: 'description',
                description:
                  'Важливо: тут працює лише звичайний текст, посилання та списки',
                type: 'rich-text',
                required: true,
              },
            ],
          },
          {
            name: 'frontPicture',
            label: 'Картинка',
            description:
              'Це картинка, що буде вписана у коло на банері сторінки',
            type: 'image',
            required: true,
          },
        ],
        ui: {
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            console.log(values);

            return {
              ...values,
              layout: '../../../layouts/AdmissionsLayout.astro',
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'faculty',
        label: 'Про ННІ',
        path: 'src/pages/faculty',
        format: 'mdx',
        fields: [
          ...basicMetadata,
          {
            label: 'Головний опис',
            name: 'resInst',
            type: 'object',
            fields: [
              {
                label: 'Назва',
                name: 'title',
                type: 'string',
                required: true,
              },
              {
                name: 'description',
                label: 'Текст опису',
                description: 'Достатньо 4-6 речень',
                type: 'string',
                required: true,
                ui: {
                  component: 'textarea',
                },
              },
              {
                label: 'Допоміжні фотографії',
                description: 'Ці фотографії впишуться у коло',
                name: 'pictures',
                type: 'object',
                list: true,
                ui: {
                  min: 3,
                  max: 3,
                  itemProps: (item) => {
                    return {
                      label: `Допоміжна фотографія`,
                    };
                  },
                },
                fields: [
                  {
                    name: 'picture',
                    label: 'Допоміжна фотографія',
                    description: 'Це фото впишеться у коло',
                    type: 'image',
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            name: 'people',
            label: 'Склад деканату',
            type: 'object',
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return {
                  label:
                    !item?.title && !item?.name
                      ? 'Не налаштовано'
                      : `${item?.title}: ${item?.name}. Опис: ${item.description?.length > 0 ? item.description : 'нема'}`,
                };
              },
            },
            fields: [
              {
                name: 'title',
                label: 'Посада',
                description: 'Приклад: "декан". На сайті буде "ДЕКАН"',
                type: 'string',
                required: true,
              },
              {
                name: 'name',
                label: 'ПІБ',
                description: 'Приклад: "Шевченко А.І."',
                type: 'string',
                required: true,
              },
              {
                name: 'picture',
                label: 'Фотографія',
                description:
                  'Оберіть таку фотографію, де людина розташована у центрі',
                type: 'image',
                required: true,
              },
              {
                name: 'description',
                label: 'Опис',
                description:
                  'Будь ласка, не пишіть тут контакти. Тут можна написати все що завгодно в один рядок (не обовʼязково)',
                type: 'string',
              },
            ],
          },
          {
            name: 'cooperation',
            label: 'Список компаній на співпрацю',
            type: 'object',
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return {
                  label: item?.name
                    ? `Назва: ${item?.name}`
                    : `Назва: не налаштовано`,
                };
              },
            },
            fields: [
              {
                label: 'Назва компанії',
                description:
                  'Це поле лише для інформативності, його не видно на сайті',
                name: 'name',
                type: 'string',
                required: true,
              },
              {
                type: 'string',
                name: 'backgroundColor',
                label: 'Допоміжний колір фону',
                description:
                  'Колір фону додається для додаткової заливки поза логотипом',
                required: true,
                ui: {
                  component: 'color',
                  colorFormat: 'hex',
                },
              },
              {
                label: 'Логотип компанії',
                name: 'image',
                type: 'image',
                required: true,
              },
            ],
          },
        ],
        ui: {
          ...singleDocumentCollection,
        },
      },
      {
        name: 'speech',
        label: 'Звернення декана',
        path: 'src/pages/speech',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'updatedAt',
            label: 'Last Updated At',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Date',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            name: 'picture',
            label: 'Фотографія',
            description:
              'Людина має бути у центрі. Буде добре, якщо картинка буде у найкращій якості',
            type: 'image',
            required: true,
          },
          {
            name: 'body',
            label: 'Текст звернення',
            description: 'Достатньо 4-6 речень',
            type: 'string',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            name: 'deanName',
            label: 'Імʼя декану',
            description: 'Приклад: Артем Мельник',
            type: 'string',
            required: true,
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'footer',
        label: 'Футер',
        path: 'src/pages/footer',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'updatedAt',
            label: 'Last Updated At',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Date',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            name: 'emails',
            label: 'Пошти',
            description:
              'Чим коротші, тим більше шансів, що вмістяться на телефоні',
            type: 'object',
            required: true,
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return {
                  label:
                    !item?.name && !item?.link
                      ? 'Не налаштовано'
                      : `${item?.name}: ${item?.link}`,
                };
              },
            },
            fields: [
              {
                name: 'name',
                label: 'Заголовок',
                description: 'Приклад: Пошта Студентської ради: ',
                type: 'string',
                required: true,
              },
              {
                name: 'link',
                label: 'Посилання',
                description: 'Приклад: https://example.com',
                type: 'string',
                required: true,
              },
            ],
          },
          {
            label: 'Посилання на соціальні мережі',
            name: 'socialLinks',
            type: 'object',
            list: true,
            description: 'Саме у такому порядку буде відображення на сайті',
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return {
                  label:
                    !item?.category && !item?.link
                      ? 'Не налаштовано'
                      : `${item?.category}: ${item?.link}`,
                };
              },
            },
            fields: [
              {
                name: 'link',
                label: 'Пошта',
                description: 'Приклад: unversity@example.com',
                type: 'string',
                required: true,
              },
              {
                label: 'Категорія',
                description:
                  'Наприклад, Facebook або Telegram. Якщо потрібна інша мережа, що нема у списку, зверніться до розробників',
                name: 'category',
                type: 'string',
                options: [
                  {
                    value: 'Telegram',
                    label: 'Telegram',
                  },
                  {
                    value: 'Instagram',
                    label: 'Instagram',
                  },
                  {
                    value: 'Facebook',
                    label: 'Facebook',
                  },
                ],
                required: true,
              },
            ],
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'contacts',
        label: 'Контакти',
        path: 'src/pages/contacts',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'string',
            name: 'updatedAt',
            label: 'Last Updated At',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Date',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            label: 'Контакти приймальної комісії',
            name: 'committee',
            type: 'object',
            fields: [
              {
                name: 'emails',
                label: 'Пошти',
                description:
                  'Будь ласка, пишіть валідну пошту. Приклад: user@example.com',
                type: 'string',
                required: true,
                list: true,
              },
              {
                name: 'phones',
                label: 'Телефони',
                description:
                  'Будь ласка, пишіть валідний телефон. Формат може бути будь-яким. Приклад: +380 123 45 67',
                type: 'string',
                required: true,
                list: true,
              },
              {
                name: 'telegrams',
                label: 'Телеграм',
                description:
                  'Будь ласка, пишіть валідний телеграм. Формат: https://t.me/username.',
                type: 'string',
                required: false,
                list: true,
              },
            ],
          },
          {
            label: 'Контакти деканату',
            name: 'others',
            type: 'object',
            list: true,
            required: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return {
                  label:
                    !item?.title && !item?.email && !item?.phone
                      ? 'Не налаштовано'
                      : `${item?.title}: ${item?.email}, ${item?.phone}`,
                };
              },
            },
            fields: [
              {
                name: 'title',
                label: 'Назва',
                description:
                  'Імʼя та по батькові або інша назва. Приклад: Артем Шевченко',
                type: 'string',
                required: true,
              },
              {
                name: 'email',
                label: 'Пошта',
                type: 'string',
                description:
                  'Будь ласка, пишіть валідну пошту. Приклад: user@example.com',
                required: true,
              },
              {
                name: 'phone',
                label: 'Телефон',
                type: 'string',
                description:
                  'Будь ласка, пишіть валідний телефон. Формат може бути будь-яким. Приклад: +380 123 45 67',

                required: true,
              },
            ],
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'news',
        label: 'Новини',
        path: 'src/pages/news',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'updatedAt',
            label: 'Last Updated At',
            required: true,
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Дата новини',
            description: 'Можна поставити свою',
            required: true,
            ui: {
              component: CustomDatepicker,
            },
          },
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            ui: {
              component: (props) => {
                return null;
              },
            },
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            name: 'src',
            label: 'Головне фото',
            description:
              'Картинка тут може пропасти візуально з CMS. Не переймайтеся, її все одно буде видно на сайті',
            type: 'image',
          },
          {
            name: 'alt',
            label: 'Опис до головного фото (одне речення)',
            required: true,
            description:
              'Тут потрібно вказати те, що написано на картинці. Також тут можна вказати авторство фотографії',
            type: 'string',
          },
          {
            type: 'string',
            name: 'category',
            component: CustomSelect,
            label: 'Категорія',
            required: true,
            ui: {
              validate: (value) => {
                if (!value) {
                  return 'Required';
                }
              },
            },
          },
          {
            type: 'string',
            name: 'department',
            label: 'Кафедра',
            component: ConditionalField,
            ui: {
              validate: (value, allValues) => {
                const selectedCategory = allValues.category;
                const isWantedCategorySelected =
                  selectedCategory === 'achievements';

                if (!isWantedCategorySelected) {
                  return;
                }

                const isDepartmentNotSelected =
                  !value || value.trim().length === 0;

                if (isDepartmentNotSelected) {
                  return 'Required';
                }

                // Якщо значення пусте, встановлюємо його як null
                if (!value) {
                  return null;
                }
              },
            },
          },
          {
            type: 'boolean',
            name: 'event',
            label: 'Тут потрібно вказати чи є вказана новина "Івентом"',
            component: ToggleInput,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'NewsPicture',
                label: 'Картинка',
                fields: [
                  {
                    name: 'src',
                    label: 'Фото',
                    description:
                      'Картинка тут може пропасти візуально з CMS. Не переймайтеся, її все одно буде видно на сайті',
                    type: 'image',
                    required: true,
                  },
                  {
                    name: 'alt',
                    label: 'Опис',
                    description:
                      'Тут потрібно вказати те, що написано на картинці. Також тут можна вказати авторство фотографії',
                    type: 'string',
                    required: true,
                  },
                ],
              },
              tableComponent,
              {
                name: 'NewsTelegram',
                label: 'Telegram-пост',
                fields: [
                  {
                    name: 'id',
                    label: 'Повне посилання на пост',
                    description:
                      'Приклад: https://t.me/my_channel/123. Заборонені: URL-параметри (приклад: "?utm_medium=abcdef&utm_source=abcdef" тощо), пробіли у посиланні',
                    type: 'string',
                    required: true,
                    ui: {
                      validate: (url) => {
                        const isNotTouched = typeof url === 'undefined';
                        const isEmptyString =
                          typeof url === 'string' && url.trim().length === 0;
                        if (isNotTouched || isEmptyString) {
                          return 'Required';
                        }

                        if (TelegramUrlValidator.validate(url) === true) {
                          return;
                        }

                        return 'Має бути коректний рядок';
                      },
                    },
                  },
                  {
                    name: 'description',
                    label: 'Опис посту',
                    description:
                      'Писати з маленької букви. Потрібно для підпису на сайті',
                    type: 'string',
                    required: true,
                  },
                ],
              },
              {
                name: 'NewsInstagram',
                label: 'Instagram-пост',
                fields: [
                  {
                    name: 'id',
                    label: 'Повне посилання на пост',
                    description:
                      'Приклад: https://www.instagram.com/instagram/reel/C95Ex6yp7vl/. Заборонені: URL-параметри (приклад: "?utm_medium=abcdef&utm_source=abcdef" тощо), пробіли у посиланні',
                    type: 'string',
                    required: true,
                    ui: {
                      validate: (url) => {
                        const isNotTouched = typeof url === 'undefined';
                        const isEmptyString =
                          typeof url === 'string' && url.trim().length === 0;
                        if (isNotTouched || isEmptyString) {
                          return 'Required';
                        }

                        if (InstagramUrlValidator.validate(url) === true) {
                          return;
                        }

                        return 'Має бути коректний рядок';
                      },
                    },
                  },
                  {
                    name: 'description',
                    label: 'Опис посту',
                    description:
                      'Писати з маленької букви. Потрібно для підпису на сайті',
                    type: 'string',
                    required: true,
                  },
                ],
              },
              {
                name: 'NewsYouTube',
                label: 'YouTube-відео',
                fields: [
                  {
                    name: 'id',
                    label: 'Повне посилання на відео',
                    description: 'Приклад: https://youtu.be/ABCDEFHGI',
                    type: 'string',
                    required: true,
                    ui: {
                      validate: (url) => {
                        const isNotTouched = typeof url === 'undefined';
                        const isEmptyString =
                          typeof url === 'string' && url.trim().length === 0;
                        if (isNotTouched || isEmptyString) {
                          return 'Required';
                        }

                        if (YouTubeUrlValidator.validate(url) === true) {
                          return;
                        }

                        return 'Має бути коректний рядок';
                      },
                    },
                  },
                  {
                    name: 'title',
                    label: 'Назва відео',
                    description:
                      'Потрібна для попереднього перегляду назви відео без його завантаження. З назвою краще. Пробіли заборонені',
                    type: 'string',
                    required: true,
                  },
                ],
              },
              {
                name: 'NewsTweet',
                label: 'X-пост',
                fields: [
                  {
                    name: 'id',
                    label: 'Повне посилання на пост',
                    description:
                      'Приклад: https://x.com/someuser/status/1234567890987654321. Заборонені: URL-параметри (приклад: "?utm_medium=abcdef&utm_source=abcdef" тощо), пробіли у посиланні',
                    type: 'string',
                    required: true,
                    ui: {
                      validate: (url) => {
                        const isNotTouched = typeof url === 'undefined';
                        const isEmptyString =
                          typeof url === 'string' && url.trim().length === 0;
                        if (isNotTouched || isEmptyString) {
                          return 'Required';
                        }

                        if (TwitterUrlValidator.validate(url) === true) {
                          return;
                        }

                        return 'Має бути коректний рядок';
                      },
                    },
                  },
                  {
                    name: 'description',
                    label: 'Опис посту',
                    description:
                      'Писати з маленької букви. Потрібно для підпису на сайті',
                    type: 'string',
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          ...filenameUIProps,
          // Example of beforeSubmit
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            // Fix path to the picture
            // It works only locally
            // const cardIndex: number =
            //   values.body.children.findIndex(({name}: {name: string}) => name === "TeacherCard");
            //
            // const originalPictureSrc: string = values.body.children[cardIndex].props.pictureSrc;
            // const modifiedPictureSrc = originalPictureSrc.replace("/", "/src/assets/");
            //
            // values.body.children[cardIndex].props.pictureSrc = modifiedPictureSrc;

            return {
              ...values,
              layout: '../../../layouts/NewsLayout.astro',
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'facultyCouncil',
        label: 'Вчена рада',
        path: 'src/pages/faculty-council',
        format: 'mdx',
        match: {
          include: '**/*',
        },
        fields: [
          {
            name: 'title',
            label: 'Заголовок',
            type: 'string',
            required: true,
          },
          {
            name: 'mtitle',
            label: 'Короткий заголовок',
            type: 'string',
            required: true,
          },
          {
            name: 'longAbout',
            label: 'Опис',
            type: 'string',
            ui: {
              component: 'textarea',
            },
          },
          {
            name: 'gallery',
            label: 'Склад вченої ради',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'frontPicture',
                label: 'Фото',
                type: 'image',
              },
              {
                name: 'position',
                label: 'Посада',
                type: 'string',
                required: true,
              },
              {
                name: 'name',
                label: "Ім'я та прізвище",
                type: 'string',
                required: true,
              },
            ],
          },
          {
            name: 'usefulLinksTitle',
            label: 'Заголовок блоку документів',
            type: 'string',
          },
          {
            name: 'usefulLinks',
            label: 'Документи',
            type: 'object',
            list: true,
            fields: [
              {
                name: 'title',
                label: 'Назва документа',
                type: 'string',
                required: true,
              },
              {
                name: 'url',
                label: 'Посилання',
                type: 'string',
                required: true,
              },
            ],
          },
          {
            name: 'showIcon',
            label: 'Показувати іконку',
            type: 'boolean',
          },
        ],
        ui: {
          beforeSubmit: async ({ values }) => {
            return {
              ...values,
              layout: '../../../layouts/FacultyCouncilLayout.astro',
              updatedAt: new Date().toISOString(),
              createdAt: values.createdAt
                ? values.createdAt
                : new Date().toISOString(),
            };
          },
        },
      },
      {
        name: 'repository',
        label: 'Репозиторій',
        path: 'src/pages/repository',
        format: 'mdx',
        match: { include: '**/*' },
        fields: [
          {
            name: 'title',
            label: 'Заголовок',
            type: 'string',
            required: true,
          },
          {
            name: 'introText',
            label: 'Опис',
            type: 'string',
            ui: {
              component: 'textarea',
            },
          },
          {
            name: 'repositoryTree',
            label: 'Структура репозиторію',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title
                  ? `Рівень 1: ${item.title}`
                  : 'Рівень 1: Без назви',
              }),
            },
            fields: createRepositoryNodeFields(),
          },
        ],
        ui: {
          beforeSubmit: async ({ values }) => ({
            ...values,
            layout: '../../../layouts/RepositoryLayout.astro',
            updatedAt: new Date().toISOString(),
            createdAt: values.createdAt ?? new Date().toISOString(),
          }),
        },
      },
      {
        name: 'studentsCabinet',
        label: 'Кабінет вступника',
        path: 'src/pages/students-cabinet',
        format: 'mdx',
        match: { include: '**/*' },
        fields: [
          { name: 'title', label: 'Заголовок', type: 'string', required: true },
          {
            name: 'pageHeader',
            label: 'Заголовок',
            type: 'string',
            required: true,
          },
          {
            name: 'aboutStudentsCabinet',
            label: 'Опис',
            type: 'string',
            ui: { component: 'textarea' },
          },

          {
            name: 'navigation',
            label: 'Навігаційні блоки',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label
                  ? `Навігація: ${item.label}`
                  : 'Навігація: Без назви',
              }),
            },
            fields: [
              {
                name: 'href',
                label: 'Посилання на секцію',
                type: 'string',
                required: true,
              },
              {
                name: 'label',
                label: 'Текст рядка',
                type: 'string',
                required: true,
              },
            ],
          },

          {
            name: 'videoSections',
            label: 'Секції з відео',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title
                  ? `Секція: ${item.title}`
                  : 'Секція: Без назви',
              }),
            },
            fields: [
              {
                name: 'id',
                label: 'ID секції',
                type: 'string',
                required: true,
              },
              {
                name: 'title',
                label: 'Назва секції',
                type: 'string',
                required: true,
              },
              {
                name: 'richContent',
                label: 'Текстовий контент',
                type: 'rich-text',
                required: true,
              },
              {
                name: 'iframe',
                label: 'Вбудоване відео',
                type: 'object',
                fields: [
                  {
                    name: 'src',
                    label: 'Посилання на відео',
                    type: 'string',
                    required: true,
                  },
                  { name: 'title', label: 'Заголовок iframe', type: 'string' },
                ],
              },
              {
                name: 'button',
                label: 'Кнопка секції',
                type: 'object',
                fields: [
                  { name: 'href', label: 'Посилання кнопки', type: 'string' },
                  { name: 'label', label: 'Текст кнопки', type: 'string' },
                ],
              },
            ],
          },

          {
            name: 'admissionTOTTitle',
            label: 'Заголовок блоку ТОТ',
            type: 'string',
            required: true,
          },
          {
            name: 'admissionTOTText',
            label: 'Текст блоку ТОТ',
            type: 'string',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            name: 'admissionTOTButton',
            label: 'Кнопка блоку ТОТ',
            type: 'object',
            fields: [
              {
                name: 'label',
                label: 'Текст кнопки',
                type: 'string',
                required: true,
              },
              {
                name: 'href',
                label: 'Посилання кнопки',
                type: 'string',
                required: true,
              },
            ],
          },

          {
            name: 'importantDocuments',
            label: 'Важливі документи',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label
                  ? `Документ: ${item.label}`
                  : 'Документ: Без назви',
              }),
            },
            fields: [
              {
                name: 'label',
                label: 'Назва документа',
                type: 'string',
                required: true,
              },
              {
                name: 'href',
                label: 'Посилання на документ',
                type: 'string',
                required: true,
              },
            ],
          },
        ],

        ui: {
          beforeSubmit: async ({ values }) => ({
            ...values,
            layout: '../../../layouts/StudentsCabinetLayout.astro',
            updatedAt: new Date().toISOString(),
            createdAt: values.createdAt ?? new Date().toISOString(),
          }),
        },
      },
      {
        name: 'electiveComponents',
        label: 'Вибіркові компоненти',
        path: 'src/pages/elective-components',
        format: 'mdx',
        match: { include: '**/*' },
        fields: [
          {
            name: 'title',
            label: 'Заголовок сторінки',
            type: 'string',
            required: true,
          },
          {
            name: 'components',
            label: 'Список вибіркових компонентів',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name
                  ? `Компонент: ${item.name}`
                  : 'Компонент: Без назви',
              }),
            },
            fields: [
              {
                name: 'name',
                label: 'Назва вибіркового компонента',
                type: 'string',
                required: true,
              },
              {
                name: 'teacher',
                label: 'Викладач',
                type: 'string',
                required: true,
              },
              {
                type: 'reference',
                name: 'department',
                label: 'Кафедра',
                collections: ['departments'],
                required: true,
                ui: {
                  optionComponent: (props: any) => {
                    return props?.title;
                  },
                },
              },
              {
                name: 'semester',
                label: 'Семестр',
                type: 'number',
                required: true,
              },
              {
                name: 'credits',
                label: 'Кредити',
                type: 'number',
                required: true,
              },
              {
                name: 'annotations',
                label: 'Анотації (Файли)',
                type: 'object',
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.fileName
                      ? `Файл: ${item.fileName}`
                      : 'Файл: Без назви',
                  }),
                },
                fields: [
                  {
                    name: 'fileName',
                    label: 'Назва файлу',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'fileLink',
                    label: 'Посилання на файл',
                    type: 'string',
                    required: true,
                  },
                ],
              },
            ],
          },
        ],

        ui: {
          beforeSubmit: async ({ values }) => ({
            ...values,
            layout: '../../../layouts/ElectiveComponentsLayout.astro',
            updatedAt: new Date().toISOString(),
            createdAt: values.createdAt ?? new Date().toISOString(),
          }),
        },
      },
      {
        name: 'teachers',
        label: 'Викладачі',
        path: 'src/pages/teachers',
        format: 'mdx',
        match: { include: '**/*' },
        fields: [
          {
            name: 'isPublished',
            label: 'Опубліковано',
            type: 'boolean',
          },
          {
            name: 'name',
            label: 'ПІБ викладача',
            type: 'string',
            required: true,
          },
          {
            name: 'position',
            label: 'Посада та науковий ступінь',
            type: 'string',
          },
          {
            type: 'reference',
            name: 'department',
            label: 'Кафедра',
            collections: ['departments'],
            ui: {
              optionComponent: (props: any) => props?.title,
            },
          },
          {
            name: 'photo',
            label: 'Фотографія',
            type: 'image',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'string',
          },
          {
            name: 'cvFile',
            label: 'Посилання на файл CV / Резюме',
            type: 'string',
          },
          {
            name: 'socialLinks',
            label: 'Наукові профілі та соцмережі',
            type: 'object',
            fields: [
              {
                name: 'orcid',
                label: 'Посилання на ORCID',
                type: 'string',
              },
              {
                name: 'googleScholar',
                label: 'Посилання на Google Scholar',
                type: 'string',
              },
              {
                name: 'researchGate',
                label: 'Посилання на ResearchGate',
                type: 'string',
              },
              {
                name: 'linkedIn',
                label: 'Посилання на LinkedIn',
                type: 'string',
              },
            ],
          },
          {
            name: 'researchAreas',
            label: 'Основні наукові інтереси',
            type: 'string',
            list: true,
          },
          {
            name: 'projects',
            label: 'Проєкти',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item: any) => ({
                label: item?.title
                  ? `Проєкт: ${item.title}`
                  : 'Проєкт: Без назви',
              }),
            },
            fields: [
              {
                name: 'title',
                label: 'Назва проєкту',
                type: 'string',
                required: true,
              },
              {
                name: 'url',
                label: 'Посилання (URL)',
                type: 'string',
                required: true,
              },
            ],
          },
        ],

        ui: {
          beforeSubmit: async ({ values }: { values: any }) => ({
            ...values,
            layout: '../../../layouts/TeacherLayout.astro',
            updatedAt: new Date().toISOString(),
            createdAt: values.createdAt ?? new Date().toISOString(),
          }),
        },
      },
    ],
  },
});
