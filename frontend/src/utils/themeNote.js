export const COLORS = [
    { name: 'Blue', class: 'bg-blue-300 hover:bg-blue-400', text: 'text-blue-900' },
    { name: 'Purple', class: 'bg-purple-300 hover:bg-purple-400', text: 'text-purple-900' },
    { name: 'Gray', class: 'bg-gray-300 hover:bg-gray-400', text: 'text-gray-900' },
    { name: 'Yellow', class: 'bg-yellow-300 hover:bg-yellow-400', text: 'text-yellow-900' },
    { name: 'Green', class: 'bg-green-300 hover:bg-green-400', text: 'text-green-900' },
    { name: 'Pink', class: 'bg-pink-300 hover:bg-pink-400', text: 'text-pink-900' }
];

export const colorsByCategorie = (categorie) => { 
      categorie === 'personnel' && COLORS[0] || // bleu
      categorie === 'travail' && COLORS[1] ||  // purple
      categorie === 'reunion' && COLORS[3] || // jaune
      categorie === 'urgent' && COLORS[4] ||  //  vert
      COLORS[5]   // pink ou rose
}