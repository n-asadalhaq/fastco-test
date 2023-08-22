import { q1 } from './questions/question-1';
import { q2 } from './questions/question-2';
import { q3 } from './questions/question-3';

function main() {
  const operation = process.argv.slice(2)[0];

  switch (operation) {
    case 'q-1':
      q1();
      break;
    case 'q-2':
      q2();
      break;
    case 'q-3':
      q3();
      break;
    default:
      console.error(`unrecognized operation ${operation}`);
      process.exit(1);
  }
}

main();
