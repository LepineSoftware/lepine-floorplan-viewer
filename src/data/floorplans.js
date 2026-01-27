export const MAP_CONFIG = {
  width: 2273,
  height: 1146,
  url: "/assets/floorplan.svg", // Move your SVG to the /public/assets/ folder
};

export const floorplans = [
  {
    id: 1,
    y: 710,
    x: 298,
    polygon: [
      [843, 181],
      [843, 405],
      [575, 405],
      [575, 181],
    ],
    title: "Unit 201",
    type: "Corner Suite",
    available: true,
    sqft: 1136,
    beds: 3,
    baths: 2,
    description:
      "Enjoy breathtaking sunset views in this spacious corner unit featuring modern finishes.",
    img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 2,
    y: 414,
    x: 1475,
    polygon: [
      [548, 1366],
      [548, 1593],
      [300, 1593],
      [300, 1366],
    ],
    title: "Unit 202",
    type: "Standard Suite",
    available: false,
    sqft: 1136,
    beds: 2,
    baths: 1,
    description:
      "A cozy and efficient layout perfect for professionals, located near the main elevator.",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 3,
    y: 422,
    x: 770,
    title: "Unit 206",
    type: "Studio",
    available: false,
    sqft: 1088,
    beds: 2,
    baths: 1,
    description:
      "Open concept studio living with high ceilings and industrial chic design elements.",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 4,
    y: 720,
    x: 1125,
    title: "Unit 209",
    type: "Compact Suite",
    available: true,
    sqft: 1050,
    beds: 1,
    baths: 1,
    description:
      "Smartly designed compact suite maximizing every inch of space for urban living.",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1530731141654-5993c3016c77?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 5,
    y: 828,
    x: 1960,
    title: "Unit 211",
    type: "Executive Suite",
    available: true,
    sqft: 1225,
    beds: 3,
    baths: 2,
    description:
      "Premium executive suite offering expansive living areas and top-tier appliances.",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=1200&q=90",
    ],
  },
];
