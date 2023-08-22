function countWords(str: string): number {
  return str.split(/\s|_/).length;
}

const sampleWords = [
  'The starlit night sky mesmerized astronomers worldwide.',
  'Walking_through_the_lush_forest, I felt a sense of tranquility.',
  "The ocean's waves crashed against the rocky shore.",
  'Energetic children played games in the park, their laughter echoing.',
  'The recipe called for a delicate balance of spices and herbs.',
  'The detective followed the twisting trail of clues to solve the mystery.',
  'The ancient castle stood tall against the backdrop of the mountains.',
  'The fiery sunset painted the sky in shades of orange and red.',
  'After a long hike, we enjoyed a well-deserved rest by the campfire.',
  'The rain-soaked streets glistened under the city lights.',
];

export function q3() {
  let words = process.argv[4];

  if (!words) {
    console.info('`words` parameter is empty, setting it tot a random sentence');
    const randomInt = Math.floor(Math.random() * (sampleWords.length - 1));
    words = sampleWords[randomInt];
  }

  const totalWords = countWords(words);

  console.info(`total words: ${totalWords}`);
  console.info(`"${words}" has ${totalWords} words in total`);
}
