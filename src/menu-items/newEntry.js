import { IconDatabaseOff, IconForms } from '@tabler/icons';

// constant

const newEntry = {
  id: 'newEntry',
  title: 'New Entry',
  type: 'group',
  children: [
    {
      id: 'newEntry',
      title: 'New Entry',
      type: 'item',
      url: '/newEntry',
      icon: IconForms,
      breadcrumbs: false
    }
  ]
};

export default newEntry;
