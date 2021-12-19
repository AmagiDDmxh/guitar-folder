import {MetaFunction, useCatch} from 'remix'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import {Box, ChakraProvider, Heading, Text} from '@chakra-ui/react'

export const meta: MetaFunction = () => {
  return {title: 'New Remix App'}
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: React.PropsWithChildren<{title?: string}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

function Layout({children}: React.PropsWithChildren<{}>) {
  return <ChakraProvider>{children}</ChakraProvider>
}

export function ErrorBoundary({error}: {error: Error}) {
  return (
    <Document title="Error!">
      <Layout>
        <Box>
          <Heading as="h1">There was an error</Heading>
          <Text>{error.message}</Text>
        </Box>
      </Layout>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Box>
          <Heading as="h1">
            {caught.status} {caught.statusText}
          </Heading>
          <Text>{message}</Text>
        </Box>
      </Layout>
    </Document>
  )
}
