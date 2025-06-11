import { Order } from '../types/models';

export const mockOrders: Order[] = [
  {
    id: 'ord-001-28734',
    products: [
      { id: 'p1', name: 'Wireless Headphones', quantity: 1, price: 99.99 },
      { id: 'p2', name: 'Phone Case', quantity: 2, price: 19.99 }
    ],
    customer: {
      id: 'c1',
      name: 'John Smith',
      address: '123 Main St, Anytown, CA 12345',
      email: 'john.smith@example.com'
    },
    status: 'Pending',
    createdAt: new Date('2023-06-15T10:30:00')
  },
  {
    id: 'ord-002-39485',
    products: [
      { id: 'p3', name: 'Smart Watch', quantity: 1, price: 249.99 }
    ],
    customer: {
      id: 'c2',
      name: 'Emily Johnson',
      address: '456 Oak Ave, Springfield, IL 67890',
      email: 'emily.j@example.com'
    },
    status: 'Pending',
    createdAt: new Date('2023-06-14T15:45:00')
  },
  {
    id: 'ord-003-57291',
    products: [
      { id: 'p4', name: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
      { id: 'p5', name: 'USB-C Cable', quantity: 3, price: 12.99 },
      { id: 'p6', name: 'Wireless Charger', quantity: 1, price: 34.99 }
    ],
    customer: {
      id: 'c3',
      name: 'Michael Brown',
      address: '789 Pine St, Lakeside, NY 10123',
      email: 'michael.b@example.com'
    },
    status: 'Accepted',
    createdAt: new Date('2023-06-13T09:15:00')
  },
  {
    id: 'ord-004-68123',
    products: [
      { id: 'p7', name: 'Laptop Sleeve', quantity: 1, price: 29.99 },
      { id: 'p8', name: 'Wireless Mouse', quantity: 1, price: 39.99 }
    ],
    customer: {
      id: 'c4',
      name: 'Sarah Williams',
      address: '321 Maple Dr, Rivertown, TX 45678',
      email: 'sarah.w@example.com'
    },
    status: 'Canceled',
    createdAt: new Date('2023-06-12T14:20:00')
  },
  {
    id: 'ord-005-74629',
    products: [
      { id: 'p9', name: 'External SSD 1TB', quantity: 1, price: 149.99 }
    ],
    customer: {
      id: 'c5',
      name: 'David Garcia',
      address: '567 Elm St, Mountainview, CO 98765',
      email: 'david.g@example.com'
    },
    status: 'Pending',
    createdAt: new Date('2023-06-15T08:10:00')
  }
];
