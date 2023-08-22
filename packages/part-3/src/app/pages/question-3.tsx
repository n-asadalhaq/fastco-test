import {
  Button,
  Center,
  Container,
  Input,
  SimpleGrid,
  Textarea,
  Title,
} from '@mantine/core';

export const Question3 = () => {
  return (
    <Container size="sm">
      <Center>
        <Title>Contact Us</Title>
      </Center>
      <form>
        <SimpleGrid cols={1} spacing="md">
          <Input.Wrapper label="name">
            <Input name="name" placeholder="John Doe" />
          </Input.Wrapper>
          <Input.Wrapper label="email">
            <Input name="email" type="email" placeholder="john@doe.example" />
          </Input.Wrapper>
          <Input.Wrapper label="phone">
            <Input name="phone" placeholder="+1234567890" />
          </Input.Wrapper>
          <Textarea label="Your question or feedback" placeholder=""></Textarea>
          <Center>
            <Button
              variant="gradient"
              gradient={{ from: '#6C00FF', to: '#00FF95' }}
              fullWidth
            >
              Submit
            </Button>
          </Center>
        </SimpleGrid>
      </form>
    </Container>
  );
};
