export default function generatePassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const crypto = window.crypto || window.Crypto;
  const randomValues = new Uint32Array(12);
  crypto.getRandomValues(randomValues);

  const randomUppercase = uppercase[randomValues[0] % uppercase.length];
  const randomNumbers = [
    numbers[randomValues[0] % uppercase.length],
    numbers[randomValues[0] % uppercase.length],
  ];
  const randomLowercase = Array(7)
    .fill(null)
    .map(() => lowercase[Math.floor(Math.random() * lowercase.length)]);

  const allChars = [randomUppercase, ...randomNumbers, ...randomLowercase];
  const shuffled = allChars.sort(() => Math.random() - 0.5);

  return shuffled.join('');
}

generatePassword();
