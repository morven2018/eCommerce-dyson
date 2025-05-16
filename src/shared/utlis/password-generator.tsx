export default function generatePassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const crypto = window.crypto || window.Crypto;
  const randomValues = new Uint32Array(12);
  crypto.getRandomValues(randomValues);

  const randomUppercase = uppercase[randomValues[0] % uppercase.length];
  const randomNumbers = [
    numbers[Number(randomValues[1] % numbers.length)],
    numbers[Number(randomValues[2] % numbers.length)],
  ];
  const randomLowercase = Array(7)
    .fill(null)
    .map((_, index) => lowercase[randomValues[index + 3] % lowercase.length]);

  const allChars = [...randomLowercase, ...randomNumbers, ...randomUppercase];
  const shuffled = secureShuffleArray(allChars);

  return shuffled.join('');
}

const secureShuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  const crypto = window.crypto || window.Crypto;

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    const j = randomValues[0] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
