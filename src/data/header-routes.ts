import { IRouteConfig } from 'src/interfaces/data/route-config';

interface DepartmentFrontmatter {
  mtitle: string;
  subPath: string;
  order?: number;
  isPublished?: boolean;
}

const departmentModules = import.meta.glob<{
  frontmatter: DepartmentFrontmatter;
}>('/src/pages/departments/*/*.mdx', { eager: true });

function getDepartmentRoutes(locale: string): IRouteConfig[] {
  return Object.entries(departmentModules)
    .filter(([path]) => path.includes(`/departments/${locale}/`))
    .map(([, mod]) => mod.frontmatter)
    .filter((frontmatter) => frontmatter.isPublished)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((frontmatter) => ({
      href: `/departments/${locale}/${frontmatter.subPath}`,
      title: frontmatter.mtitle,
    }));
}

export function getHeaderRoutesConfig(
  locale: string,
  t: (key: string) => string
): IRouteConfig[] {
  // Сторінка НЕ доступна за замовчуванням. Показуємо лише якщо в .env явно вказано 'true'
  const showElectives =
    String(import.meta.env.PUBLIC_SHOW_ELECTIVE_COMPONENTS ?? '')
      .trim()
      .toLowerCase()  === 'true';

  return [
    {
      href: '#',
      title: `${t('titles.nniKNandSHI')}`,
      linkInactive: 'event.preventDefault();',
      className: 'small-dropdown',
      sublist: [
        {
          href: `/${locale}/faculty`,
          title: `${t('titles.aboutNNI')}`,
        },
        {
          href: `/faculty-council/${locale}/faculty-council`,
          title: `${t('titles.facultyCouncil')}`,
        },
        {
          href: `/${locale}/ep-public-discussion`,
          title: `${t('admissions.epPublicDiscussion')}`,
        },
        { href: `/${locale}/contacts`, title: `${t('contacts.contacts')}` },
      ],
    },
    {
      href: '#',
      title: `${t('departments.departments')}`,
      linkInactive: 'event.preventDefault();',

      sublist: getDepartmentRoutes(locale),
    },
    {
      href: `/news/${locale}/1`,
      title: `${t('news.news')}`,
    },
    {
      href: '#',
      title: `${t('admissions.student')}`,
      linkInactive: 'event.preventDefault();',
      className: 'small-dropdown student-dropdown',
      sublist: [
        {
          href: `/repository/${locale}/admission-repository`,
          title: `${t('admissionRepository.educationalPrograms')}`,
        },
        ...(showElectives
          ? [
              {
                href: `/elective-components/${locale}`,
                title: t('titles.electiveComponents'),
              },
            ]
          : []),
      ],
    },
    {
      href: '#',
      title: `${t('admissions.admissions')}`,
      linkInactive: 'event.preventDefault();',
      className: 'small-dropdown applicant-dropdown',
      sublist: [
        {
          href: `/students-cabinet/${locale}/students-cabinet`,
          title: `${t('admissions.studentsCabined')}`,
        },
        {
          href: `/admissions/${locale}/bachelor`,
          title: `${t('admissions.bachelor')}`,
        },
        {
          href: `/admissions/${locale}/master`,
          title: `${t('admissions.master')}`,
        },
        {
          href: `/admissions/${locale}/postgraduate`,
          title: `${t('admissions.postgraduate')}`,
        },
      ],
    },
  ];
}
