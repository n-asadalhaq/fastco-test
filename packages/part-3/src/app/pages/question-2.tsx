import { Flex, Input } from '@mantine/core';
import { useState } from 'react';

const getRandomNumber = () => Math.floor(Math.random() * 100);

export const Question2 = () => {
  const [num, setNum] = useState<number | null>(0);

  return (
    <Flex direction="column">
      <Input
        value={num ? String(num) : ''}
        type="number"
        onChange={(e) => {
          const { value } = e.target;
          if (value.length === 0) {
            setNum(null);
          }

          if (
            typeof Number(value) !== 'number' ||
            Number.isNaN(Number(value))
          ) {
            return;
          }

          setNum(Number(value));
        }}
      />
      <ul>
        {num
          ? Array.from(Array(num).keys()).map((n) => {
              return <li key={n}>{getRandomNumber()}</li>;
            })
          : null}
      </ul>
    </Flex>
  );
};
