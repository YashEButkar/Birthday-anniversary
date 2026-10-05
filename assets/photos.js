window.MEMORY_GROUPS=[
{id:'first-date',title:'Our First Date',tag:'23 OCT 2024',desc:'Seawoods Mall — the day we finally went on our first date.',photos:['01.jpg']},
{id:'dance',title:'The Dance',tag:'FIRST DATE',desc:'On our first date, I made you dance in the mall. One of those little moments I will never forget.',photos:['02.jpg']},
{id:'chinese-temple',title:'Chinese Temple',tag:'ANOTHER DAY',desc:'A completely separate day and another place we got to experience together.',photos:['03.jpg']},
{id:'long-drives',title:'Our Long Drives',tag:'OUR ROADS',desc:'So many different days spent driving, talking, laughing, listening to music and simply being together.',photos:['04.jpg']},
{id:'marine-drive',title:'Marine Drive Sunset',tag:'SUNSET',desc:'A different day at Marine Drive, watching the sunset with you beside me.',photos:['05.jpg']},
{id:'ekvira',title:'Ekvira Temple, Lonavala',tag:'LONAVALA',desc:'A separate Lonavala adventure at Ekvira Temple.',photos:['06.jpg']},
{id:'maple',title:'Maple',tag:'ON THE WAY BACK',desc:'On the way back from Lonavala — free chocolates, snacks and random happiness.',photos:['07.jpg']},
{id:'byculla',title:'Byculla Zoo',tag:'ANOTHER DAY',desc:'A completely different day out together, now preserved as another little chapter of our story.',photos:['08.jpg']},
{id:'ambernath',title:'Ambernath Shiv Temple',tag:'AMBERNATH',desc:'The day we drew each other’s faces on tiny pieces of paper. Funny drawings, priceless memory.',photos:['09.jpg']},
{id:'kala-ghoda',title:'Kala Ghoda Festival',tag:'CST',desc:'A different day at the Kala Ghoda Festival — walking, exploring and enjoying the day together.',photos:['10.jpg']},
{id:'haldi',title:'Your Sister’s Haldi',tag:'FAMILY',desc:'I came to your sister’s Haldi ceremony in her village, and we enjoyed every bit of it.',photos:['11.jpg']},
{id:'gudi-padwa',title:'Gudi Padwa',tag:'GUDI PADWA',desc:'A separate Gudi Padwa memory — dressed traditionally and visiting temples together.',photos:['12.jpg']}
];
window.MEMORIES=[];
window.MEMORY_GROUPS.forEach(g=>g.photos.forEach(file=>window.MEMORIES.push([file,g.title,g.desc,g.tag,g.id])));
