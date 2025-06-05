const catalogData = [
  {
    id: 'df5465f8-9f3f-4675-9f00-bb0ed189b993',
    name: 'Vacuums & floor cleaners',
    path: '/catalog/vacuums',
  },
  {
    id: '0a1f284f-16c1-415c-89f2-0a75c88ce711',
    name: 'Air purifiers & heaters',
    path: '/catalog/heater',
  },
  {
    id: 'cb795999-c097-4871-8ca6-5f42f94ef8f9',
    name: 'Headphones',
    path: '/catalog/headphones',
  },
  {
    id: '955a1fe4-6413-4896-97ef-2eb5d2cfb9f6',
    name: 'Lighting',
    path: '/catalog/lighting',
  },
  {
    id: '3e6a4f2e-e8ca-42a4-9298-47fc7d720cb4',
    name: 'Hair beauty',
    path: '/catalog/hair-care',
  },
];

export function getNameByPath(path: string): string {
  const category = catalogData.find((item) => item.path === path);
  return category ? category.name : '';
}

export const catalogCategories = new Map(
  catalogData.map((item) => [item.id, { name: item.name, path: item.path }])
);
