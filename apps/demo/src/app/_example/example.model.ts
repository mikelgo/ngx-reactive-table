export interface Person {
  id: number | string;
  firstName: string;
  lastName: string;
  jobDesc: string;
  // random: { street: string; zipCode: number };
  random: string;
}

const EXAMPLE_DATA: Person[] = [
  {
    id: 1,
    firstName: 'Fin',
    lastName: 'Freear',
    jobDesc: 'Business Development',
    random: 'Trippledex'
  },
  {
    id: 2,
    firstName: 'Devi',
    lastName: 'Quarton',
    jobDesc: 'Sales',
    random: 'Stronghold'
  },
  {
    id: 3,
    firstName: 'Denys',
    lastName: 'Reek',
    jobDesc: 'Support',
    random: 'Ronstring'
  },
  {
    id: 4,
    firstName: 'Bart',
    lastName: 'Walkington',
    jobDesc: 'Sales',
    random: 'Overhold'
  },
  {
    id: 5,
    firstName: 'Yance',
    lastName: 'Heffron',
    jobDesc: 'Training',
    random: 'Sub-Ex'
  },
  {
    id: 6,
    firstName: 'Margareta',
    lastName: 'Eede',
    jobDesc: 'Business Development',
    random: 'Holdlamis'
  },
  {
    id: 7,
    firstName: 'Jessalyn',
    lastName: 'Eddowes',
    jobDesc: 'Legal',
    random: 'Wrapsafe'
  },
  {
    id: 8,
    firstName: 'Arlena',
    lastName: 'Shinton',
    jobDesc: 'Legal',
    random: 'Ronstring'
  },
  {
    id: 9,
    firstName: 'Dodie',
    lastName: 'Keyzman',
    jobDesc: 'Support',
    random: 'Kanlam'
  },
  {
    id: 10,
    firstName: 'Currie',
    lastName: 'Milward',
    jobDesc: 'Legal',
    random: 'Otcom'
  },
  {
    id: 11,
    firstName: 'Robinson',
    lastName: 'MacKaig',
    jobDesc: 'Business Development',
    random: 'Cardguard'
  },
  {
    id: 12,
    firstName: 'Salome',
    lastName: 'Barents',
    jobDesc: 'Engineering',
    random: 'Voyatouch'
  },
  {
    id: 13,
    firstName: 'Darci',
    lastName: 'Farriar',
    jobDesc: 'Engineering',
    random: 'Sonair'
  },
  {
    id: 14,
    firstName: 'Mallory',
    lastName: 'Iffe',
    jobDesc: 'Accounting',
    random: 'Sonair'
  },
  {
    id: 15,
    firstName: 'Neddy',
    lastName: 'Solomon',
    jobDesc: 'Services',
    random: 'Tres-Zap'
  },
  {
    id: 16,
    firstName: 'Clyve',
    lastName: 'Buttle',
    jobDesc: 'Research and Development',
    random: 'Sonair'
  },
  {
    id: 17,
    firstName: 'Tiffani',
    lastName: 'Ikin',
    jobDesc: 'Training',
    random: 'Lotstring'
  },
  {
    id: 18,
    firstName: 'Zahara',
    lastName: 'Gerty',
    jobDesc: 'Support',
    random: 'Hatity'
  },
  {
    id: 19,
    firstName: 'Roderich',
    lastName: 'Ezzell',
    jobDesc: 'Sales',
    random: 'Bigtax'
  },
  {
    id: 20,
    firstName: 'Parker',
    lastName: 'Pretor',
    jobDesc: 'Sales',
    random: 'Quo Lux'
  },
  {
    id: 21,
    firstName: 'Winny',
    lastName: 'Bellord',
    jobDesc: 'Accounting',
    random: 'Tres-Zap'
  },
  {
    id: 22,
    firstName: 'Odey',
    lastName: 'Mariotte',
    jobDesc: 'Training',
    random: 'Transcof'
  },
  {
    id: 23,
    firstName: 'North',
    lastName: 'Baybutt',
    jobDesc: 'Legal',
    random: 'Namfix'
  },
  {
    id: 24,
    firstName: 'Rebecca',
    lastName: 'Rihosek',
    jobDesc: 'Legal',
    random: 'Temp'
  },
  {
    id: 25,
    firstName: 'Sheelah',
    lastName: 'Firebrace',
    jobDesc: 'Sales',
    random: 'Regrant'
  },
  {
    id: 26,
    firstName: 'Vladimir',
    lastName: 'Zanardii',
    jobDesc: 'Accounting',
    random: 'Matsoft'
  },
  {
    id: 27,
    firstName: 'Breena',
    lastName: 'De Francesco',
    jobDesc: 'Human Resources',
    random: 'Tres-Zap'
  },
  {
    id: 28,
    firstName: 'Cory',
    lastName: 'Blackden',
    jobDesc: 'Training',
    random: 'Tempsoft'
  },
  {
    id: 29,
    firstName: 'Elisabet',
    lastName: 'Threadgill',
    jobDesc: 'Support',
    random: 'Cookley'
  },
  {
    id: 30,
    firstName: 'Towney',
    lastName: 'Olcot',
    jobDesc: 'Legal',
    random: 'Ronstring'
  },
  {
    id: 31,
    firstName: 'Eveleen',
    lastName: 'Glowacz',
    jobDesc: 'Research and Development',
    random: 'Temp'
  },
  {
    id: 32,
    firstName: 'Giustina',
    lastName: 'Chritchlow',
    jobDesc: 'Legal',
    random: 'Alphazap'
  },
  {
    id: 33,
    firstName: 'Aubrey',
    lastName: 'Apfler',
    jobDesc: 'Legal',
    random: 'Domainer'
  },
  {
    id: 34,
    firstName: 'Parker',
    lastName: 'Kingcote',
    jobDesc: 'Training',
    random: 'Veribet'
  },
  {
    id: 35,
    firstName: 'Cordy',
    lastName: 'Skipworth',
    jobDesc: 'Research and Development',
    random: 'Voltsillam'
  },
  {
    id: 36,
    firstName: 'Marcos',
    lastName: 'Tupling',
    jobDesc: 'Training',
    random: 'Otcom'
  },
  {
    id: 37,
    firstName: 'Pamela',
    lastName: 'Carabet',
    jobDesc: 'Engineering',
    random: 'Quo Lux'
  },
  {
    id: 38,
    firstName: 'Jen',
    lastName: 'Bartrop',
    jobDesc: 'Accounting',
    random: 'Job'
  },
  {
    id: 39,
    firstName: 'Whittaker',
    lastName: 'Yearn',
    jobDesc: 'Engineering',
    random: 'Fix San'
  },
  {
    id: 40,
    firstName: 'Cammie',
    lastName: 'Heugel',
    jobDesc: 'Engineering',
    random: 'Voyatouch'
  },
  {
    id: 41,
    firstName: 'Melli',
    lastName: 'Pollastrino',
    jobDesc: 'Business Development',
    random: 'Tresom'
  },
  {
    id: 42,
    firstName: 'Mersey',
    lastName: 'Fearne',
    jobDesc: 'Accounting',
    random: 'Zaam-Dox'
  },
  {
    id: 43,
    firstName: 'Edi',
    lastName: 'Costerd',
    jobDesc: 'Research and Development',
    random: 'Zaam-Dox'
  },
  {
    id: 44,
    firstName: 'Omar',
    lastName: 'Yakov',
    jobDesc: 'Research and Development',
    random: 'Sonair'
  },
  {
    id: 45,
    firstName: 'Dolf',
    lastName: 'McConville',
    jobDesc: 'Services',
    random: 'Y-Solowarm'
  },
  {
    id: 46,
    firstName: 'Doroteya',
    lastName: 'Sidaway',
    jobDesc: 'Business Development',
    random: 'Otcom'
  },
  {
    id: 47,
    firstName: 'Loren',
    lastName: 'McPhaden',
    jobDesc: 'Support',
    random: 'Fintone'
  },
  {
    id: 48,
    firstName: 'Dotty',
    lastName: 'Copperwaite',
    jobDesc: 'Product Management',
    random: 'Rank'
  },
  {
    id: 49,
    firstName: 'Stefanie',
    lastName: 'Pember',
    jobDesc: 'Sales',
    random: 'Mat Lam Tam'
  },
  {
    id: 50,
    firstName: 'Rowney',
    lastName: 'Crookshank',
    jobDesc: 'Services',
    random: 'Hatity'
  }
];

export function getTestdata(amount: number = 10): Person[] {
  return EXAMPLE_DATA.slice(0, amount);
}
