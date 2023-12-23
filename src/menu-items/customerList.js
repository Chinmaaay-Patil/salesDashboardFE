import { IconListDetails } from '@tabler/icons';

// constant

const customerList = {
  id: 'customerList',
  title: 'Customer List',
  type: 'group',
  children: [
    {
      id: 'customerList',
      title: 'Customer List',
      type: 'item',
      url: '/customerList',
      icon: IconListDetails,
      breadcrumbs: false
    }
  ]
};

export default customerList;
