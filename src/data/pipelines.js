/** @typedef {import('./types.js').Pipeline} Pipeline */
/** @type {Pipeline[]} */
export const pipelines = [
  {
    "id": "acid-to-heap",
    "streamId": "acid",
    "from": "acid-pump",
    "to": "irrigation",
    "flow": 24,
    "points": [
      [
        -18,
        1,
        0.5
      ],
      [
        -15,
        1.2,
        0.5
      ],
      [
        -15,
        2.7,
        -7
      ],
      [
        -11,
        2.8,
        -7
      ]
    ]
  },
  {
    "id": "water-to-heap",
    "streamId": "process-water",
    "from": "water",
    "to": "irrigation",
    "flow": 52,
    "points": [
      [
        -6.5,
        1.2,
        5.5
      ],
      [
        -8.7,
        1.2,
        3
      ],
      [
        -10.2,
        2.7,
        -7
      ]
    ]
  },
  {
    "id": "heap-to-drain",
    "streamId": "pls",
    "from": "heap-leach",
    "to": "drainage",
    "flow": 255,
    "points": [
      [
        -11,
        0.55,
        -5.1
      ],
      [
        -11,
        0.55,
        -3.4
      ],
      [
        -11,
        0.55,
        -2.7
      ]
    ]
  },
  {
    "id": "drain-to-pond1",
    "streamId": "pls",
    "from": "drainage",
    "to": "pls-pond-1",
    "flow": 255,
    "points": [
      [
        -8,
        0.55,
        -2.7
      ],
      [
        -6,
        0.55,
        -4.4
      ],
      [
        -3.1,
        0.55,
        -5.6
      ]
    ]
  },
  {
    "id": "pond1-to-pond2",
    "streamId": "pls",
    "from": "pls-pond-1",
    "to": "pls-pond-2",
    "flow": 246,
    "points": [
      [
        -3,
        0.62,
        -4
      ],
      [
        -3,
        0.62,
        -3.4
      ],
      [
        -3,
        0.62,
        -2.9
      ]
    ]
  },
  {
    "id": "pond2-to-pls-pump",
    "streamId": "pls",
    "from": "pls-pond-2",
    "to": "pls-pump",
    "flow": 240,
    "points": [
      [
        -0.6,
        0.75,
        -1.4
      ],
      [
        0.4,
        0.85,
        -2.4
      ],
      [
        1.6,
        0.85,
        -3.4
      ]
    ]
  },
  {
    "id": "pls-pump-to-sx",
    "streamId": "pls",
    "from": "pls-pump",
    "to": "sx-extraction",
    "flow": 240,
    "points": [
      [
        2.7,
        0.95,
        -3.4
      ],
      [
        4.6,
        0.95,
        -5.8
      ],
      [
        7,
        0.95,
        -5.8
      ]
    ]
  },
  {
    "id": "organic-reagent-to-sx",
    "streamId": "organic",
    "from": "reagents",
    "to": "sx-extraction",
    "flow": 250,
    "points": [
      [
        1.9,
        1.2,
        5.5
      ],
      [
        3.8,
        1.2,
        0.6
      ],
      [
        4.5,
        1.2,
        -6
      ],
      [
        7,
        1.2,
        -6
      ]
    ]
  },
  {
    "id": "loaded-organic-to-scrub",
    "streamId": "organic",
    "from": "sx-extraction",
    "to": "scrubbing",
    "flow": 250,
    "points": [
      [
        7,
        1.25,
        -4.5
      ],
      [
        7,
        1.25,
        -3.2
      ],
      [
        7,
        1.25,
        -1.8
      ]
    ]
  },
  {
    "id": "scrub-water",
    "streamId": "process-water",
    "from": "water",
    "to": "scrubbing",
    "flow": 18,
    "points": [
      [
        -5.2,
        1.2,
        5.5
      ],
      [
        3.9,
        1.2,
        4.2
      ],
      [
        5.2,
        1.2,
        -1.8
      ],
      [
        7,
        1.2,
        -1.8
      ]
    ]
  },
  {
    "id": "scrubbed-organic-to-strip",
    "streamId": "organic",
    "from": "scrubbing",
    "to": "stripping",
    "flow": 250,
    "points": [
      [
        7,
        1.25,
        -0.5
      ],
      [
        7,
        1.25,
        0.7
      ],
      [
        7,
        1.25,
        2.1
      ]
    ]
  },
  {
    "id": "strip-to-rich-tank",
    "streamId": "rich-electrolyte",
    "from": "stripping",
    "to": "rich-tank",
    "flow": 118,
    "points": [
      [
        9.6,
        1.05,
        2.1
      ],
      [
        11.4,
        1.05,
        2.1
      ],
      [
        13.5,
        1.05,
        2.1
      ]
    ]
  },
  {
    "id": "rich-tank-to-ew",
    "streamId": "rich-electrolyte",
    "from": "rich-tank",
    "to": "ew-cellhouse",
    "flow": 118,
    "points": [
      [
        14.8,
        1.15,
        2.1
      ],
      [
        16.6,
        1.15,
        2.1
      ],
      [
        16.6,
        1.15,
        0
      ],
      [
        20,
        1.15,
        0
      ]
    ]
  },
  {
    "id": "ew-spent-to-strip",
    "streamId": "spent-electrolyte",
    "from": "ew-cellhouse",
    "to": "stripping",
    "flow": 112,
    "points": [
      [
        20,
        0.75,
        -2.6
      ],
      [
        14.6,
        0.75,
        -2.6
      ],
      [
        11.1,
        0.75,
        2.9
      ],
      [
        7,
        0.75,
        2.9
      ]
    ]
  },
  {
    "id": "organic-return",
    "streamId": "organic",
    "from": "stripping",
    "to": "sx-extraction",
    "flow": 248,
    "points": [
      [
        6.1,
        0.85,
        3.4
      ],
      [
        3.8,
        0.85,
        3.4
      ],
      [
        3.8,
        0.85,
        -6.8
      ],
      [
        6.1,
        0.85,
        -6.8
      ]
    ]
  },
  {
    "id": "raffinate-to-tank",
    "streamId": "raffinate",
    "from": "sx-extraction",
    "to": "raffinate-tank",
    "flow": 228,
    "points": [
      [
        6.2,
        0.85,
        -7.2
      ],
      [
        4.2,
        0.85,
        -9.7
      ],
      [
        1.5,
        0.85,
        -10
      ]
    ]
  },
  {
    "id": "raffinate-to-heap",
    "streamId": "raffinate",
    "from": "raffinate-tank",
    "to": "irrigation",
    "flow": 220,
    "points": [
      [
        0.3,
        1.1,
        -10
      ],
      [
        -5.5,
        1.1,
        -10.5
      ],
      [
        -10,
        2.65,
        -9.5
      ],
      [
        -11,
        2.65,
        -7
      ]
    ]
  },
  {
    "id": "sx-waste-to-wwtp",
    "streamId": "waste-water",
    "from": "scrubbing",
    "to": "wwtp",
    "flow": 8,
    "points": [
      [
        9.2,
        0.7,
        -1.8
      ],
      [
        11.5,
        0.7,
        -3.7
      ],
      [
        13.5,
        0.7,
        -5.2
      ]
    ]
  },
  {
    "id": "heap-waste-to-wwtp",
    "streamId": "waste-water",
    "from": "heap-leach",
    "to": "wwtp",
    "flow": 5,
    "points": [
      [
        -8.2,
        0.55,
        -7.6
      ],
      [
        2.7,
        0.55,
        -12.5
      ],
      [
        13.5,
        0.55,
        -5.2
      ]
    ]
  },
  {
    "id": "cathode-transfer",
    "streamId": "rich-electrolyte",
    "from": "ew-cellhouse",
    "to": "cathode-yard",
    "flow": 36,
    "points": [
      [
        23.7,
        0.9,
        0.6
      ],
      [
        25.7,
        0.9,
        0.6
      ],
      [
        28,
        0.9,
        1.2
      ]
    ],
    "product": true
  }
];
