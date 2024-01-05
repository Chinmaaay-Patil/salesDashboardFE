import { IconUserPlus, IconUsers } from '@tabler/icons';

// constant

const masterSetup = {
  id: 'masterSetup',
  title: 'Master Setup',
  type: 'group',
  children: [
    {
      id: 'salesPerson',
      title: 'Sales Person',
      type: 'item',
      url: '/masterSetup/salesPerson',
      icon: IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'sourcePerson',
      title: 'Source Person',
      type: 'item',
      url: '/masterSetup/sourcePerson',
      icon: IconUsers,
      breadcrumbs: false
    }
  ]
};

export default masterSetup;
