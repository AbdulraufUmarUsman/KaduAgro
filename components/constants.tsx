
import { Product, Market } from '../types';
import beansImg from '../images/beans.jpg';
import cassavaImg from '../images/cassava.jpg';
import garriImg from '../images/garri.jpg';
import riceImg from '../images/rice.jpg';
import tomatoImg from '../images/tomato.jpg';
import yamImg from '../images/yam.jpg';
import maizeImg from '../images/corn.jpg';
import pepperImg from '../images/pepper.jpg';
import sorghumImg from '../images/sorghum.jpg';
import sweetPotatoImg from '../images/sweetpotato.jpg';
import gingerImg from '../images/ginger.jpg';
import lettuceImg from '../images/lettuce.jpg';
import milletImg from '../images/millet.jpg';
import kadunaCentralImg from '../images/Kaduna-Central-Market.jpg';
import kawoImg from '../images/kawo.jpg';
import saboImg from '../images/sabotasha.jpg';
import mandoImg from '../images/mando.jpg';
import kbacciImg from '../images/kbacci.jpg';
import zariaCentralImg from '../images/zaria central market.jpg';
import saminakaImg from '../images/saminka.jpg';
import kachiaImg from '../images/kacia.jpg';
import giwaImg from '../images/giwa.jpg';
import makarfiImg from '../images/makarfi.jpg';

/**
 * MARKETS IN KADUNA STATE
 * Key trading hubs for agricultural products.
 */
export const MARKETS: Market[] = [
  { 
    id: 'm1', 
    name: 'Sheikh Gumi Central Market', 
    location: 'Kaduna South', 
    coordinates: { lat: 10.5105, lng: 7.4165 },
    image: kadunaCentralImg,
    description: 'The largest central market in Kaduna, offering a massive variety of grains, tubers, and fresh produce.'
  },
  { 
    id: 'm2', 
    name: 'Kawo Market', 
    location: 'Kaduna North', 
    coordinates: { lat: 10.5905, lng: 7.4465 },
    image: kawoImg,
    description: 'A major hub in Kaduna North, famous for fresh vegetables, fruits, and daily farm harvests.'
  },
  { 
    id: 'm3', 
    name: 'Sabon Tasha Market', 
    location: 'Chikun LGA', 
    coordinates: { lat: 10.4358, lng: 7.4161 },
    image: saboImg,
    description: 'A vibrant market serving the Chikun area, known for affordable tubers and spices.'
  },
  { 
    id: 'm4', 
    name: 'Mando Market', 
    location: 'Igabi LGA', 
    coordinates: { lat: 10.5847, lng: 7.3772 },
    image: mandoImg,
    description: 'Strategically located near the motor park, excellent for bulk purchases of grains and livestock.'
  },
  { 
    id: 'm5', 
    name: 'Kasuwan Bacci', 
    location: 'Tudun Wada', 
    coordinates: { lat: 10.5255, lng: 7.4265 },
    image: kbacciImg,
    description: 'A popular and historic market in Tudun Wada, offering diverse agricultural and retail goods.'
  },
  { 
    id: 'm6', 
    name: 'Zaria Central Market', 
    location: 'Zaria City', 
    coordinates: { lat: 11.0855, lng: 7.7063 },
    image: zariaCentralImg,
    description: 'The commercial heart of Zaria, featuring extensive grain silos and wholesale farm produce.'
  },
  {
    id: 'm7',
    name: 'Saminaka Market',
    location: 'Lere LGA',
    coordinates: { lat: 10.4167, lng: 8.6833 },
    image: saminakaImg,
    description: 'A major agricultural hub in Lere LGA, famous for maize, sorghum, and beans.'
  },
  {
    id: 'm8',
    name: 'Kachia Market',
    location: 'Kachia LGA',
    coordinates: { lat: 9.8667, lng: 7.9500 },
    image: kachiaImg,
    description: 'Known for its ginger production and trade, as well as yams and other tubers.'
  },
  {
    id: 'm9',
    name: 'Giwa Market',
    location: 'Giwa LGA',
    coordinates: { lat: 11.2833, lng: 7.4333 },
    image: giwaImg,
    description: 'A prominent market for grains, tomatoes, and livestock in the northern part of the state.'
  },
  {
    id: 'm10',
    name: 'Makarfi Market',
    location: 'Makarfi LGA',
    coordinates: { lat: 11.3667, lng: 7.8667 },
    image: makarfiImg,
    description: 'Renowned for sugarcane, tomatoes, and other fresh vegetables.'
  }
];

/**
 * PRODUCTS LIST
 * Expanded variety across all categories with reliable external imagery.
 */
export const PRODUCTS: Product[] = [
  // --- GRAINS ---
  { 
    id: 'p1', 
    name: 'Brown Beans', 
    category: 'Grains', 
    basePrice: 1200, 
    unit: 'Mudu', 
    image: beansImg,
    packageOptions: [
      { label: 'Mudu', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 40 },
      { label: 'Full Bag (100kg)', multiplier: 80 }
    ]
  },
  { 
    id: 'p4', 
    name: 'Maize (Yellow)', 
    category: 'Grains', 
    basePrice: 850, 
    unit: 'Mudu', 
    image: maizeImg,
    packageOptions: [
      { label: 'Mudu', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 40 },
      { label: 'Full Bag (100kg)', multiplier: 80 }
    ]
  },
  { 
    id: 'p5', 
    name: 'Local Rice', 
    category: 'Grains', 
    basePrice: 1800, 
    unit: 'Mudu', 
    image: riceImg,
    packageOptions: [
      { label: 'Mudu', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 40 },
      { label: 'Full Bag (100kg)', multiplier: 80 }
    ]
  },
  { 
    id: 'p9', 
    name: 'Millet', 
    category: 'Grains', 
    basePrice: 950, 
    unit: 'Mudu', 
    image: milletImg,
    packageOptions: [
      { label: 'Mudu', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 40 },
      { label: 'Full Bag (100kg)', multiplier: 80 }
    ]
  },
  { 
    id: 'p10', 
    name: 'Sorghum', 
    category: 'Grains', 
    basePrice: 1050, 
    unit: 'Mudu', 
    image: sorghumImg,
    packageOptions: [
      { label: 'Mudu', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 40 },
      { label: 'Full Bag (100kg)', multiplier: 80 }
    ]
  },

  // --- TUBERS ---
  { 
    id: 'p2', 
    name: 'White Yam', 
    category: 'Tubers', 
    basePrice: 4500, 
    unit: '5 Tubers', 
    image: yamImg,
    packageOptions: [
      { label: '5 Tubers', multiplier: 1 },
      { label: 'Dozen (12 Tubers)', multiplier: 2.4 },
      { label: '100 Tubers', multiplier: 20 }
    ]
  },
  { 
    id: 'p7', 
    name: 'Fresh Cassava', 
    category: 'Tubers', 
    basePrice: 2000, 
    unit: 'Large Bundle', 
    image: cassavaImg,
    packageOptions: [
      { label: 'Large Bundle', multiplier: 1 },
      { label: 'Pick-up Truck Load', multiplier: 25 }
    ]
  },
  { 
    id: 'p11', 
    name: 'Sweet Potato', 
    category: 'Tubers', 
    basePrice: 1500, 
    unit: 'Large Basket', 
    image: sweetPotatoImg,
    packageOptions: [
      { label: 'Large Basket', multiplier: 1 },
      { label: 'Sack', multiplier: 4 }
    ]
  },

  // --- VEGETABLES ---
  { 
    id: 'p6', 
    name: 'Roma Tomatoes', 
    category: 'Vegetables', 
    basePrice: 15000, 
    unit: 'Large Basket', 
    image: tomatoImg,
    packageOptions: [
      { label: 'Large Basket', multiplier: 1 },
      { label: 'Small Basket', multiplier: 0.3 },
      { label: 'Sack', multiplier: 3 }
    ]
  },
  { 
    id: 'p8', 
    name: 'Onions', 
    category: 'Vegetables', 
    basePrice: 45000, 
    unit: '100kg Bag', 
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800',
    packageOptions: [
      { label: '100kg Bag', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 0.5 },
      { label: 'Small Basket', multiplier: 0.1 }
    ]
  },
  { 
    id: 'p12', 
    name: 'Carrots', 
    category: 'Vegetables', 
    basePrice: 1200, 
    unit: 'Bundle', 
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800',
    packageOptions: [
      { label: 'Bundle', multiplier: 1 },
      { label: 'Sack', multiplier: 15 }
    ]
  },
  { 
    id: 'p13', 
    name: 'Lettuce', 
    category: 'Vegetables', 
    basePrice: 800, 
    unit: 'Head', 
    image: lettuceImg,
    packageOptions: [
      { label: 'Head', multiplier: 1 },
      { label: 'Dozen (12 Heads)', multiplier: 10 }
    ]
  },
  { 
    id: 'p14', 
    name: 'Bell Peppers', 
    category: 'Vegetables', 
    basePrice: 2500, 
    unit: 'Basket', 
    image: pepperImg,
    packageOptions: [
      { label: 'Basket', multiplier: 1 },
      { label: 'Sack', multiplier: 5 }
    ]
  },

  // --- FRUITS ---
  { 
    id: 'p15', 
    name: 'Mangoes', 
    category: 'Fruits', 
    basePrice: 3000, 
    unit: 'Basket', 
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800',
    packageOptions: [
      { label: 'Basket', multiplier: 1 },
      { label: 'Sack', multiplier: 4 }
    ]
  },
  { 
    id: 'p16', 
    name: 'Sweet Oranges', 
    category: 'Fruits', 
    basePrice: 2500, 
    unit: 'Bag', 
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=800',
    packageOptions: [
      { label: 'Bag', multiplier: 1 },
      { label: 'Dozen', multiplier: 0.2 }
    ]
  },
  { 
    id: 'p17', 
    name: 'Bananas', 
    category: 'Fruits', 
    basePrice: 1500, 
    unit: 'Bunch', 
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=800',
    packageOptions: [
      { label: 'Bunch', multiplier: 1 },
      { label: 'Large Basket', multiplier: 10 }
    ]
  },

  // --- SPICES / OTHERS ---
  { 
    id: 'p18', 
    name: 'Fresh Ginger', 
    category: 'Spices', 
    basePrice: 4500, 
    unit: 'Small Basket', 
    image: gingerImg,
    packageOptions: [
      { label: 'Small Basket', multiplier: 1 },
      { label: 'Sack', multiplier: 6 }
    ]
  },
  { 
    id: 'p19', 
    name: 'Garlic', 
    category: 'Spices', 
    basePrice: 3500, 
    unit: 'Large Bowl', 
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=800',
    packageOptions: [
      { label: 'Large Bowl', multiplier: 1 },
      { label: 'Sack', multiplier: 8 }
    ]
  },
  { 
    id: 'p3', 
    name: 'Garri (White)', 
    category: 'Others', 
    basePrice: 900, 
    unit: 'Mudu', 
    image: garriImg,
    packageOptions: [
      { label: 'Mudu', multiplier: 1 },
      { label: 'Half Bag (50kg)', multiplier: 40 },
      { label: 'Full Bag (100kg)', multiplier: 80 }
    ]
  },
];

export const CURRENCY_SYMBOL = '₦';
