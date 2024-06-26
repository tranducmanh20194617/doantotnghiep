// @ts-nocheck
import { useQuery } from '@apollo/client';
import {useEffect} from "react";

import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import {GET_ID_FUNCTION} from "~/graphql/query";
import {authenticate} from "~/shopify.server";
import {json} from "@remix-run/node";
import {useActionData} from "@remix-run/react";
export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query {
  shopifyFunctions(first: 25) {
    nodes {
      app {
        title
      }
      apiType
      title
      id
    }
  }
}`
  );

  const responseJson = await response.json();

  return json({
    product: responseJson,
  });
}
export default function AdditionalPage() {
  const actionData = useActionData();
  useEffect(() => {
    console.log(actionData)
  }, [actionData]);

  return (
    <Page>
      <ui-title-bar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List gap="extraTight">
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="100"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
