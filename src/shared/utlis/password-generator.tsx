export default function generatePassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomUppercase =
    uppercase[Math.floor(Math.random() * uppercase.length)];
  const randomNumbers = [
    numbers[Math.floor(Math.random() * numbers.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
  ];
  const randomLowercase = Array(7)
    .fill(null)
    .map(() => lowercase[Math.floor(Math.random() * lowercase.length)]);

  const allChars = [randomUppercase, ...randomNumbers, ...randomLowercase];
  const shuffled = allChars.sort(() => Math.random() - 0.5);

  return shuffled.join('');
}

generatePassword();
