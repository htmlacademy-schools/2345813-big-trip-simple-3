const OFFERS = [
  {
    type: 'train',
    offers: [
      { id: 1, title: 'New taxi booking for the train', price: 50 },
      { id: 2, title: 'Order lunch in a train compartment', price: 25 },
    ],
  },
  {
    type: 'taxi',
    offers: [
      { id: 1, title: 'Taxi service with child seat', price: 20 },
      { id: 2, title: 'Additional destination option', price: 15 },
    ],
  },
  {
    type: 'bus',
    offers: [
      { id: 1, title: 'Extra seat on the bus', price: 15 },
    ],
  },
  {
    type: 'check-in',
    offers: [
      { id: 1, title: 'Extend your stay duration', price: 25 },
      { id: 2, title: 'Assistance with luggage', price: 8 },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      { id: 1, title: 'Personal tour guide', price: 50 }
    ],
  },
  {
    type: 'ship',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      { id: 1, title: 'Premium car rental', price: 90 },
      { id: 2, title: 'Choose car color', price: 15 },
      { id: 3, title: 'Premium car model2', price: 15 }
    ],
  },
  {
    type: 'restaurant',
    offers: [
      { id: 1, title: 'Fresh seafood', price: 30 },
    ],
  },
  {
    type: 'flight',
    offers: [
      { id: 1, title: 'Two additional blankets', price: 6 },
      { id: 2, title: 'Optional in-flight meal', price: 15 },
    ],
  }
];

export const getOffers = () => OFFERS;
