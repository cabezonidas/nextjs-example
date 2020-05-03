import Layout from "../components/Layout";
import { useAppContext } from "./_app";
import { Form, Label, Input, Box } from "@cabezonidas/shop-ui";

const IndexPage = () => {
  const { text, setText } = useAppContext();
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Box p="2" maxWidth="24rem">
        <Box fontSize="4" mb="3">
          <h1>Hello Visitor 👋</h1>
        </Box>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor="text">App variable</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Box>
            Proof that I can persist state! Try to navigate away and come back
          </Box>
        </Form>
      </Box>
    </Layout>
  );
};

export default IndexPage;
