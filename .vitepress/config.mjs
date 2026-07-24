import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { existsSync } from "node:fs";

const siteUrl = "https://kirinyoku.github.io/go-for-backend/";
const siteTitle = "Go for Backend Development";
const siteDescription =
  "Structured material on using Go in backend development, with a focus on the standard library.";

const ruDatabaseSqlSections = [
  {
    text: "1. Введение",
    items: [
      ["1.1 Как устроена работа с SQL-базами", "1. Introduction/1.1 Architecture.md", "intro/architecture"],
      ["1.2 Подключение к базе данных", "1. Introduction/1.2 Connection.md", "intro/connection"],
    ],
  },
  {
    text: "2. Запросы и транзакции",
    items: [
      ["2.1 Выбор метода выполнения запроса", "2. Queries and Transactions/2.1 Exec Query QueryRow.md", "queries/exec-query-queryrow"],
      ["2.2 Чтение результатов запроса", "2. Queries and Transactions/2.2 Reading Rows.md", "queries/reading-rows"],
      ["2.3 Параметризация SQL-запросов", "2. Queries and Transactions/2.3 Query Parameters.md", "queries/query-parameters"],
      ["2.4 Преобразование SQL-значений в Go-типы", "2. Queries and Transactions/2.4 Scanning Types.md", "queries/scanning-types"],
      ["2.5 Собственные типы данных", "2. Queries and Transactions/2.5 Custom Data Types.md", "queries/custom-data-types"],
      ["2.6 Подготовленные запросы", "2. Queries and Transactions/2.6 Prepared Statements.md", "queries/prepared-statements"],
      ["2.7 Управление транзакциями", "2. Queries and Transactions/2.7 Transactions.md", "queries/transactions"],
    ],
  },
  {
    text: "3. Соединения",
    items: [
      ["3.1 Пул соединений", "3. Connections/3.1 Connection Pool.md", "connections/connection-pool"],
      ["3.2 Выделенное соединение", "3. Connections/3.2 Dedicated Connection.md", "connections/dedicated-connection"],
    ],
  },
];

const ruDatabaseSqlArticles = ruDatabaseSqlSections
  .flatMap((section) => section.items)
  .map(([text, source, route]) => ({
    text,
    source: `ru/database-sql/${source}`,
    route: `ru/database-sql/${route}`,
  }));

const ruDatabaseSqlRewrites = Object.fromEntries(
  ruDatabaseSqlArticles.map(({ source, route }) => [source, `${route}.md`]),
);

const ruDatabaseSqlSidebar = [
  {
    text: "Обзор",
    collapsed: false,
    items: [{ text: "О разделе", link: "/ru/database-sql/" }],
  },
  ...ruDatabaseSqlSections.map((section) => ({
    text: section.text,
    collapsed: false,
    items: section.items.map(([text, , route]) => ({
      text,
      link: `/ru/database-sql/${route}`,
    })),
  })),
];

function validateRuDatabaseSqlManifest() {
  const sources = new Set();
  const routes = new Set();

  for (const { source, route } of ruDatabaseSqlArticles) {
    if (sources.has(source) || routes.has(route)) {
      throw new Error(`Duplicate database/sql manifest entry: ${source} -> ${route}`);
    }
    if (!existsSync(new URL(`../${source}`, import.meta.url))) {
      throw new Error(`Missing database/sql source file: ${source}`);
    }

    sources.add(source);
    routes.add(route);
  }

  if (!existsSync(new URL("../en/database-sql/index.md", import.meta.url))) {
    throw new Error("Missing English database/sql locale landing page");
  }
}

validateRuDatabaseSqlManifest();

function pageUrl(relativePath) {
  const route = relativePath
    .replace(/(^|\/)index\.md$/, "$1")
    .replace(/\.md$/, "");

  return new URL(route, siteUrl).href;
}

export default withMermaid(
  defineConfig({
    title: siteTitle,
    base: "/go-for-backend/",
    description: siteDescription,
    srcExclude: [
      "archive/**/*.md",
      "README.md",
      "STYLEGUID.md",
      "STYLEGUIDE.md",
      "todo.md",
      "DATABASE_SQL_STRUCTURE.md",
      "DEPLOY_TODO.md",
      "GITHUB_SEO_TODO.md",
    ],

    cleanUrls: true,

    sitemap: {
      hostname: siteUrl,
    },

    vite: {
      build: {
        chunkSizeWarningLimit: 1600,
      },
    },

    head: [
      ["meta", { name: "theme-color", content: "#3eaf7c" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: siteTitle }],
      ["meta", { name: "twitter:card", content: "summary" }],
    ],

    transformHead({ pageData, title, description }) {
      if (pageData.isNotFound || !pageData.relativePath) {
        return;
      }

      const url = pageUrl(pageData.relativePath);
      const pageTitle = title || pageData.title || siteTitle;
      const pageDescription = description || pageData.description || siteDescription;

      return [
        ["link", { rel: "canonical", href: url }],
        ["meta", { property: "og:url", content: url }],
        ["meta", { property: "og:title", content: pageTitle }],
        ["meta", { property: "og:description", content: pageDescription }],
        ["meta", { name: "twitter:title", content: pageTitle }],
        ["meta", { name: "twitter:description", content: pageDescription }],
      ];
    },

    themeConfig: {
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/kirinyoku",
        },
      ],
      search: {
        provider: "local",
        options: {
          locales: {
            ru: {
              translations: {
                button: {
                  buttonText: "Поиск",
                  buttonAriaLabel: "Поиск",
                },
                modal: {
                  noResultsText: "Нет результатов по запросу",
                  resetButtonTitle: "Сбросить поиск",
                  footer: {
                    selectText: "выбрать",
                    navigateText: "навигация",
                    closeText: "закрыть",
                  },
                },
              },
            },
          },
        },
      },
    },

    rewrites: {
      "en/database-sql/1. Introduction/1.1 Architecture.md":
        "en/database-sql/intro/architecture.md",
      "en/database-sql/1. Introduction/1.2 Connection.md":
        "en/database-sql/intro/connection.md",
      "en/database-sql/2. Queries and Transactions/2.1 Exec Query QueryRow.md":
        "en/database-sql/queries/exec-query-queryrow.md",
      "en/database-sql/2. Queries and Transactions/2.2 Reading Rows.md":
        "en/database-sql/queries/reading-rows.md",
      "en/database-sql/2. Queries and Transactions/2.3 Query Parameters.md":
        "en/database-sql/queries/query-parameters.md",
      "en/database-sql/2. Queries and Transactions/2.4 Scanning Types.md":
        "en/database-sql/queries/scanning-types.md",
      "en/database-sql/2. Queries and Transactions/2.5 Custom Data Types.md":
        "en/database-sql/queries/custom-data-types.md",
      "en/database-sql/2. Queries and Transactions/2.6 Prepared Statements.md":
        "en/database-sql/queries/prepared-statements.md",
      "en/database-sql/2. Queries and Transactions/2.7 Transactions.md":
        "en/database-sql/queries/transactions.md",
      "en/database-sql/3. Connections/3.1 Connection Pool.md":
        "en/database-sql/connections/connection-pool.md",
      "en/database-sql/3. Connections/3.2 Dedicated Connection.md":
        "en/database-sql/connections/dedicated-connection.md",

      "en/net-http/1. Introduction/1.1 Connection Lifecycle.md":
        "en/net-http/intro/connection-lifecycle.md",
      "en/net-http/1. Introduction/1.2 Handler.md": "en/net-http/intro/handler.md",
      "en/net-http/1. Introduction/1.3 HandlerFunc.md":
        "en/net-http/intro/handlerfunc.md",
      "en/net-http/1. Introduction/1.4 Request.md": "en/net-http/intro/request.md",
      "en/net-http/1. Introduction/1.5 ResponseWriter.md":
        "en/net-http/intro/responsewriter.md",
      "en/net-http/1. Introduction/1.6 Response.md": "en/net-http/intro/response.md",
      "en/net-http/1. Introduction/1.7 Built-in Handlers.md":
        "en/net-http/intro/built-in-handlers.md",
      "en/net-http/2. HTTP Server/2.1 Base Server.md":
        "en/net-http/server/base-server.md",
      "en/net-http/2. HTTP Server/2.2 Routing.md": "en/net-http/server/routing.md",
      "en/net-http/2. HTTP Server/2.3 Working with Data.md":
        "en/net-http/server/working-with-data.md",
      "en/net-http/2. HTTP Server/2.4 Flow Control.md":
        "en/net-http/server/flow-control.md",
      "en/net-http/2. HTTP Server/2.5 Middleware.md":
        "en/net-http/server/middleware.md",
      "en/net-http/2. HTTP Server/2.6 Resource Limits.md":
        "en/net-http/server/resource-limits.md",
      "en/net-http/2. HTTP Server/2.7 ResponseController.md":
        "en/net-http/server/responsecontroller.md",
      "en/net-http/2. HTTP Server/2.8 Graceful Shutdown.md":
        "en/net-http/server/graceful-shutdown.md",
      "en/net-http/2. HTTP Server/2.9 CORS.md": "en/net-http/server/cors.md",
      "en/net-http/2. HTTP Server/2.10 TLS and HTTPS.md":
        "en/net-http/server/tls-and-https.md",
      "en/net-http/3. HTTP Client/3.1 Client Initialization.md":
        "en/net-http/client/initialization.md",
      "en/net-http/3. HTTP Client/3.2 Making Requests.md":
        "en/net-http/client/making-requests.md",
      "en/net-http/3. HTTP Client/3.3 Response Handling.md":
        "en/net-http/client/response-handling.md",
      "en/net-http/3. HTTP Client/3.4 Timeouts and Context.md":
        "en/net-http/client/timeouts-and-context.md",
      "en/net-http/3. HTTP Client/3.5 Transport Layer Configuration.md":
        "en/net-http/client/transport-layer-configuration.md",
      "en/net-http/3. HTTP Client/3.6 Connection Pooling.md":
        "en/net-http/client/connection-pooling.md",
      "en/net-http/3. HTTP Client/3.7 Cookies.md":
        "en/net-http/client/cookies.md",
      "en/net-http/3. HTTP Client/3.8 Redirects.md":
        "en/net-http/client/redirects.md",
      "en/net-http/4. Testing/4.1 Testing Handlers.md":
        "en/net-http/testing/testing-handlers.md",
      "en/net-http/4. Testing/4.2 Testing with Servers.md":
        "en/net-http/testing/testing-with-servers.md",
      "en/net-http/4. Testing/4.3 Mocking External APIs.md":
        "en/net-http/testing/mocking-external-apis.md",

      "en/log-slog/1. Fundamentals/1.1 From Text to Structured Event.md":
        "en/log-slog/intro/from-text-to-structured-event.md",
      "en/log-slog/1. Fundamentals/1.2 Logger Configuration.md":
        "en/log-slog/intro/logger-configuration.md",
      "en/log-slog/1. Fundamentals/1.3 Attributes and Event Schema.md":
        "en/log-slog/intro/attributes-and-event-schema.md",
      "en/log-slog/1. Fundamentals/1.4 Levels and Filtering.md":
        "en/log-slog/intro/levels-and-filtering.md",
      "en/log-slog/1. Fundamentals/1.5 Logging Flow.md":
        "en/log-slog/intro/logging-flow.md",
      "en/log-slog/2. Attributes and Values/2.1 Common Fields and Derived Loggers.md":
        "en/log-slog/events/common-fields-and-derived-loggers.md",
      "en/log-slog/2. Attributes and Values/2.2 Groups and Namespaces.md":
        "en/log-slog/events/groups-and-namespaces.md",
      "en/log-slog/2. Attributes and Values/2.3 Custom Values.md":
        "en/log-slog/events/custom-values.md",
      "en/log-slog/3. Handlers and Performance/3.1 Built-in Handler Configuration.md":
        "en/log-slog/advanced/handler-configuration.md",
      "en/log-slog/3. Handlers and Performance/3.2 Wrappers and Composition.md":
        "en/log-slog/advanced/wrappers-and-composition.md",
      "en/log-slog/3. Handlers and Performance/3.3 Custom Handler.md":
        "en/log-slog/advanced/custom-handler.md",

      "ru/http/index.md": "ru/net-http/index.md",
      "ru/http/1. Introduction/1.1 Connection Lifecycle.md":
        "ru/net-http/intro/connection-lifecycle.md",
      "ru/http/1. Introduction/1.2 Handler.md": "ru/net-http/intro/handler.md",
      "ru/http/1. Introduction/1.3 HandlerFunc.md":
        "ru/net-http/intro/handlerfunc.md",
      "ru/http/1. Introduction/1.4 Request.md": "ru/net-http/intro/request.md",
      "ru/http/1. Introduction/1.5 ResponseWriter.md":
        "ru/net-http/intro/responsewriter.md",
      "ru/http/1. Introduction/1.6 Response.md": "ru/net-http/intro/response.md",
      "ru/http/1. Introduction/1.7 Built-in Handlers.md":
        "ru/net-http/intro/built-in-handlers.md",
      "ru/http/2. HTTP Server/2.1 Base Server.md":
        "ru/net-http/server/base-server.md",
      "ru/http/2. HTTP Server/2.2 Routing.md": "ru/net-http/server/routing.md",
      "ru/http/2. HTTP Server/2.3 Working with Data.md":
        "ru/net-http/server/working-with-data.md",
      "ru/http/2. HTTP Server/2.4 Flow Control.md":
        "ru/net-http/server/flow-control.md",
      "ru/http/2. HTTP Server/2.5 Middleware.md":
        "ru/net-http/server/middleware.md",
      "ru/http/2. HTTP Server/2.6 Resource Limits.md":
        "ru/net-http/server/resource-limits.md",
      "ru/http/2. HTTP Server/2.7 ResponseController.md":
        "ru/net-http/server/responsecontroller.md",
      "ru/http/2. HTTP Server/2.8 Graceful Shutdown.md":
        "ru/net-http/server/graceful-shutdown.md",
      "ru/http/2. HTTP Server/2.9 CORS.md": "ru/net-http/server/cors.md",
      "ru/http/2. HTTP Server/2.10 TLS and HTTPS.md":
        "ru/net-http/server/tls-and-https.md",

      "ru/http/3. HTTP Client/3.1 Client Initialization.md":
        "ru/net-http/client/initialization.md",
      "ru/http/3. HTTP Client/3.2 Making Requests.md":
        "ru/net-http/client/making-requests.md",
      "ru/http/3. HTTP Client/3.3 Response Handling.md":
        "ru/net-http/client/response-handling.md",
      "ru/http/3. HTTP Client/3.4 Timeouts and Context.md":
        "ru/net-http/client/timeouts-and-context.md",
      "ru/http/3. HTTP Client/3.5 Transport Layer Configuration.md":
        "ru/net-http/client/transport-layer-configuration.md",
      "ru/http/3. HTTP Client/3.6 Connection Pooling.md":
        "ru/net-http/client/connection-pooling.md",
      "ru/http/3. HTTP Client/3.7 Cookies.md": "ru/net-http/client/cookies.md",
      "ru/http/3. HTTP Client/3.8 Redirects.md":
        "ru/net-http/client/redirects.md",

      "ru/http/4. Testing/4.1 Testing Handlers.md":
        "ru/net-http/testing/testing-handlers.md",
      "ru/http/4. Testing/4.2 Testing with Servers.md":
        "ru/net-http/testing/testing-with-servers.md",
      "ru/http/4. Testing/4.3 Mocking External APIs.md":
        "ru/net-http/testing/mocking-external-apis.md",

      "ru/log-slog/1. Fundamentals/1.1 From Text to Structured Event.md":
        "ru/log-slog/intro/from-text-to-structured-event.md",
      "ru/log-slog/1. Fundamentals/1.2 Logger Configuration.md":
        "ru/log-slog/intro/logger-configuration.md",
      "ru/log-slog/1. Fundamentals/1.3 Attributes and Event Schema.md":
        "ru/log-slog/intro/attributes-and-event-schema.md",
      "ru/log-slog/1. Fundamentals/1.4 Levels and Filtering.md":
        "ru/log-slog/intro/levels-and-filtering.md",
      "ru/log-slog/1. Fundamentals/1.5 Logging Flow.md":
        "ru/log-slog/intro/logging-flow.md",
      "ru/log-slog/2. Attributes and Values/2.1 Common Fields and Derived Loggers.md":
        "ru/log-slog/events/common-fields-and-derived-loggers.md",
      "ru/log-slog/2. Attributes and Values/2.2 Groups and Namespaces.md":
        "ru/log-slog/events/groups-and-namespaces.md",
      "ru/log-slog/2. Attributes and Values/2.3 Custom Values.md":
        "ru/log-slog/events/custom-values.md",
      "ru/log-slog/3. Handlers and Performance/3.1 Built-in Handler Configuration.md":
        "ru/log-slog/advanced/handler-configuration.md",
      "ru/log-slog/3. Handlers and Performance/3.2 Wrappers and Composition.md":
        "ru/log-slog/advanced/wrappers-and-composition.md",
      "ru/log-slog/3. Handlers and Performance/3.3 Custom Handler.md":
        "ru/log-slog/advanced/custom-handler.md",

      ...ruDatabaseSqlRewrites,
    },

    locales: {
      en: {
        label: "English",
        lang: "en",
        link: "/en/",
        title: "Go for Backend",
        themeConfig: {
          sidebar: {
            "/en/database-sql/": [
              {
                text: "Overview",
                collapsed: false,
                items: [
                  { text: "About This Section", link: "/en/database-sql/" },
                ],
              },
              {
                text: "1. Introduction",
                collapsed: false,
                items: [
                  {
                    text: "1.1 How SQL Database Access Works",
                    link: "/en/database-sql/intro/architecture",
                  },
                  {
                    text: "1.2 Connecting to a Database",
                    link: "/en/database-sql/intro/connection",
                  },
                ],
              },
              {
                text: "2. Queries and Transactions",
                collapsed: false,
                items: [
                  {
                    text: "2.1 Choosing a Query Execution Method",
                    link: "/en/database-sql/queries/exec-query-queryrow",
                  },
                  {
                    text: "2.2 Reading Query Results",
                    link: "/en/database-sql/queries/reading-rows",
                  },
                  {
                    text: "2.3 Parameterizing SQL Queries",
                    link: "/en/database-sql/queries/query-parameters",
                  },
                  {
                    text: "2.4 Scanning SQL Values into Go Types",
                    link: "/en/database-sql/queries/scanning-types",
                  },
                  {
                    text: "2.5 Custom Data Types",
                    link: "/en/database-sql/queries/custom-data-types",
                  },
                  {
                    text: "2.6 Prepared Statements",
                    link: "/en/database-sql/queries/prepared-statements",
                  },
                  {
                    text: "2.7 Managing Transactions",
                    link: "/en/database-sql/queries/transactions",
                  },
                ],
              },
              {
                text: "3. Connections",
                collapsed: false,
                items: [
                  {
                    text: "3.1 Connection Pool",
                    link: "/en/database-sql/connections/connection-pool",
                  },
                  {
                    text: "3.2 Dedicated Connection",
                    link: "/en/database-sql/connections/dedicated-connection",
                  },
                ],
              },
            ],
            "/en/net-http/": [
              {
                text: "Overview",
                collapsed: false,
                items: [{ text: "About This Section", link: "/en/net-http/" }],
              },
              {
                text: "1. Introduction",
                collapsed: false,
                items: [
                  {
                    text: "1.1 Connection Lifecycle",
                    link: "/en/net-http/intro/connection-lifecycle",
                  },
                  {
                    text: "1.2 The http.Handler Interface",
                    link: "/en/net-http/intro/handler",
                  },
                  {
                    text: "1.3 The http.HandlerFunc Type",
                    link: "/en/net-http/intro/handlerfunc",
                  },
                  {
                    text: "1.4 The http.Request Struct",
                    link: "/en/net-http/intro/request",
                  },
                  {
                    text: "1.5 The http.ResponseWriter Interface",
                    link: "/en/net-http/intro/responsewriter",
                  },
                  {
                    text: "1.6 The http.Response Struct",
                    link: "/en/net-http/intro/response",
                  },
                  {
                    text: "1.7 Built-in Handlers",
                    link: "/en/net-http/intro/built-in-handlers",
                  },
                ],
              },
              {
                text: "2. HTTP Server",
                collapsed: false,
                items: [
                  {
                    text: "2.1 Starting a Basic Server",
                    link: "/en/net-http/server/base-server",
                  },
                  {
                    text: "2.2 Routing",
                    link: "/en/net-http/server/routing",
                  },
                  {
                    text: "2.3 Reading and Writing Data",
                    link: "/en/net-http/server/working-with-data",
                  },
                  {
                    text: "2.4 Handler Flow Control",
                    link: "/en/net-http/server/flow-control",
                  },
                  {
                    text: "2.5 Middleware",
                    link: "/en/net-http/server/middleware",
                  },
                  {
                    text: "2.6 Resource Limits",
                    link: "/en/net-http/server/resource-limits",
                  },
                  {
                    text: "2.7 Streaming Responses and ResponseController",
                    link: "/en/net-http/server/responsecontroller",
                  },
                  {
                    text: "2.8 Graceful Shutdown",
                    link: "/en/net-http/server/graceful-shutdown",
                  },
                  {
                    text: "2.9 CORS as Middleware",
                    link: "/en/net-http/server/cors",
                  },
                  {
                    text: "2.10 HTTPS",
                    link: "/en/net-http/server/tls-and-https",
                  },
                ],
              },
              {
                text: "3. HTTP Client",
                collapsed: false,
                items: [
                  {
                    text: "3.1 Client Initialization",
                    link: "/en/net-http/client/initialization",
                  },
                  {
                    text: "3.2 Creating and Sending Requests",
                    link: "/en/net-http/client/making-requests",
                  },
                  {
                    text: "3.3 Reading and Handling Responses",
                    link: "/en/net-http/client/response-handling",
                  },
                  {
                    text: "3.4 Timeouts and Context",
                    link: "/en/net-http/client/timeouts-and-context",
                  },
                  {
                    text: "3.5 Transport Layer Configuration",
                    link: "/en/net-http/client/transport-layer-configuration",
                  },
                  {
                    text: "3.6 Connection Pooling",
                    link: "/en/net-http/client/connection-pooling",
                  },
                  {
                    text: "3.7 Cookies in HTTP Clients",
                    link: "/en/net-http/client/cookies",
                  },
                  {
                    text: "3.8 Redirects in HTTP Clients",
                    link: "/en/net-http/client/redirects",
                  },
                ],
              },
              {
                text: "4. Testing",
                collapsed: false,
                items: [
                  {
                    text: "4.1 Testing Handlers",
                    link: "/en/net-http/testing/testing-handlers",
                  },
                  {
                    text: "4.2 Testing with Servers",
                    link: "/en/net-http/testing/testing-with-servers",
                  },
                  {
                    text: "4.3 Mocking External APIs",
                    link: "/en/net-http/testing/mocking-external-apis",
                  },
                ],
              },
            ],
            "/en/": [
              {
                text: "Sections",
                collapsed: false,
                items: [
                  { text: "net/http", link: "/en/net-http/" },
                  { text: "database/sql", link: "/en/database-sql/" },
                  { text: "log/slog", link: "/en/log-slog/" },
                ],
              },
            ],
            "/en/log-slog/": [
              {
                text: "Overview",
                collapsed: false,
                items: [
                  {
                    text: "Structured Logging",
                    link: "/en/log-slog/",
                  },
                ],
              },
              {
                text: "1. Fundamentals",
                collapsed: false,
                items: [
                  {
                    text: "1.1 From Text to Structured Event",
                    link: "/en/log-slog/intro/from-text-to-structured-event",
                  },
                  {
                    text: "1.2 Logger Configuration",
                    link: "/en/log-slog/intro/logger-configuration",
                  },
                  {
                    text: "1.3 Attributes and Event Schema",
                    link: "/en/log-slog/intro/attributes-and-event-schema",
                  },
                  {
                    text: "1.4 Levels and Filtering",
                    link: "/en/log-slog/intro/levels-and-filtering",
                  },
                  {
                    text: "1.5 Logging Flow",
                    link: "/en/log-slog/intro/logging-flow",
                  },
                ],
              },
              {
                text: "2. Attributes and Values",
                collapsed: false,
                items: [
                  {
                    text: "2.1 Common Fields and Derived Loggers",
                    link: "/en/log-slog/events/common-fields-and-derived-loggers",
                  },
                  {
                    text: "2.2 Groups and Namespaces",
                    link: "/en/log-slog/events/groups-and-namespaces",
                  },
                  {
                    text: "2.3 Custom Values",
                    link: "/en/log-slog/events/custom-values",
                  },
                ],
              },
              {
                text: "3. Handlers and Performance",
                collapsed: false,
                items: [
                  {
                    text: "3.1 Built-in Handler Configuration",
                    link: "/en/log-slog/advanced/handler-configuration",
                  },
                  {
                    text: "3.2 Wrappers and Composition",
                    link: "/en/log-slog/advanced/wrappers-and-composition",
                  },
                  {
                    text: "3.3 Custom Handler",
                    link: "/en/log-slog/advanced/custom-handler",
                  },
                ],
              },
            ],
          },
          outline: {
            label: "On this page",
            level: "deep",
          },
        },
      },
      ru: {
        label: "Русский",
        lang: "ru",
        link: "/ru/",
        title: "Go для Backend",
        description:
          "Структурированный материал о применении Go в разработке серверных приложений с акцентом на стандартную библиотеку.",
        themeConfig: {
          sidebar: {
            "/ru/": [
              {
                text: "Разделы",
                collapsed: false,
                items: [
                  { text: "net/http", link: "/ru/net-http/" },
                  { text: "database/sql", link: "/ru/database-sql/" },
                  {
                    text: "log/slog",
                    link: "/ru/log-slog/",
                  },
                ],
              },
            ],
            "/ru/net-http/": [
              {
                text: "Обзор",
                collapsed: false,
                items: [{ text: "О разделе", link: "/ru/net-http/" }],
              },
              {
                text: "1. Введение",
                collapsed: false,
                items: [
                  {
                    text: "1.1 Жизненный цикл соединения",
                    link: "/ru/net-http/intro/connection-lifecycle",
                  },
                  {
                    text: "1.2 Интерфейс http.Handler",
                    link: "/ru/net-http/intro/handler",
                  },
                  {
                    text: "1.3 Тип http.HandlerFunc",
                    link: "/ru/net-http/intro/handlerfunc",
                  },
                  {
                    text: "1.4 Структура http.Request",
                    link: "/ru/net-http/intro/request",
                  },
                  {
                    text: "1.5 Интерфейс http.ResponseWriter",
                    link: "/ru/net-http/intro/responsewriter",
                  },
                  {
                    text: "1.6 Структура http.Response",
                    link: "/ru/net-http/intro/response",
                  },
                  {
                    text: "1.7 Встроенные обработчики",
                    link: "/ru/net-http/intro/built-in-handlers",
                  },
                ],
              },
              {
                text: "2. HTTP-сервер",
                collapsed: false,
                items: [
                  {
                    text: "2.1 Запуск базового сервера",
                    link: "/ru/net-http/server/base-server",
                  },
                  {
                    text: "2.2 Маршрутизация",
                    link: "/ru/net-http/server/routing",
                  },
                  {
                    text: "2.3 Чтение и запись данных",
                    link: "/ru/net-http/server/working-with-data",
                  },
                  {
                    text: "2.4 Управление выполнением обработчика",
                    link: "/ru/net-http/server/flow-control",
                  },
                  {
                    text: "2.5 Middleware",
                    link: "/ru/net-http/server/middleware",
                  },
                  {
                    text: "2.6 Ограничение ресурсов",
                    link: "/ru/net-http/server/resource-limits",
                  },
                  {
                    text: "2.7 Потоковые ответы и ResponseController",
                    link: "/ru/net-http/server/responsecontroller",
                  },
                  {
                    text: "2.8 Graceful Shutdown",
                    link: "/ru/net-http/server/graceful-shutdown",
                  },
                  {
                    text: "2.9 CORS как middleware",
                    link: "/ru/net-http/server/cors",
                  },
                  {
                    text: "2.10 HTTPS",
                    link: "/ru/net-http/server/tls-and-https",
                  },
                ],
              },
              {
                text: "3. HTTP-клиент",
                collapsed: false,
                items: [
                  {
                    text: "3.1 Инициализация клиента",
                    link: "/ru/net-http/client/initialization",
                  },
                  {
                    text: "3.2 Формирование и отправка запросов",
                    link: "/ru/net-http/client/making-requests",
                  },
                  {
                    text: "3.3 Чтение и обработка ответов",
                    link: "/ru/net-http/client/response-handling",
                  },
                  {
                    text: "3.4 Таймауты и контекст",
                    link: "/ru/net-http/client/timeouts-and-context",
                  },
                  {
                    text: "3.5 Настройка транспортного уровня",
                    link: "/ru/net-http/client/transport-layer-configuration",
                  },
                  {
                    text: "3.6 Пул соединений",
                    link: "/ru/net-http/client/connection-pooling",
                  },
                  {
                    text: "3.7 Cookie в HTTP-клиенте",
                    link: "/ru/net-http/client/cookies",
                  },
                  {
                    text: "3.8 Redirect в HTTP-клиенте",
                    link: "/ru/net-http/client/redirects",
                  },
                ],
              },
              {
                text: "4. Тестирование",
                collapsed: false,
                items: [
                  {
                    text: "4.1 Тестирование обработчиков",
                    link: "/ru/net-http/testing/testing-handlers",
                  },
                  {
                    text: "4.2 Тестирование с использованием серверов",
                    link: "/ru/net-http/testing/testing-with-servers",
                  },
                  {
                    text: "4.3 Мокирование внешних API",
                    link: "/ru/net-http/testing/mocking-external-apis",
                  },
                ],
              },
            ],
            "/ru/log-slog/": [
              {
                text: "Обзор",
                collapsed: false,
                items: [
                  {
                    text: "Структурированное логирование",
                    link: "/ru/log-slog/",
                  },
                ],
              },
              {
                text: "1. Основы",
                collapsed: false,
                items: [
                  {
                    text: "1.1 От строки к структурированному событию",
                    link: "/ru/log-slog/intro/from-text-to-structured-event",
                  },
                  {
                    text: "1.2 Создание и настройка логгера",
                    link: "/ru/log-slog/intro/logger-configuration",
                  },
                  {
                    text: "1.3 Атрибуты и схема событий",
                    link: "/ru/log-slog/intro/attributes-and-event-schema",
                  },
                  {
                    text: "1.4 Уровни и фильтрация",
                    link: "/ru/log-slog/intro/levels-and-filtering",
                  },
                  {
                    text: "1.5 Как проходит запись",
                    link: "/ru/log-slog/intro/logging-flow",
                  },
                ],
              },
              {
                text: "2. Атрибуты и значения",
                collapsed: false,
                items: [
                  {
                    text: "2.1 Общие поля и производные логгеры",
                    link: "/ru/log-slog/events/common-fields-and-derived-loggers",
                  },
                  {
                    text: "2.2 Группы и пространства имён",
                    link: "/ru/log-slog/events/groups-and-namespaces",
                  },
                  {
                    text: "2.3 Пользовательские значения",
                    link: "/ru/log-slog/events/custom-values",
                  },
                ],
              },
              {
                text: "3. Обработчики",
                collapsed: false,
                items: [
                  {
                    text: "3.1 Настройка встроенных обработчиков",
                    link: "/ru/log-slog/advanced/handler-configuration",
                  },
                  {
                    text: "3.2 Обёртки и композиция обработчиков",
                    link: "/ru/log-slog/advanced/wrappers-and-composition",
                  },
                  {
                    text: "3.3 Собственный обработчик",
                    link: "/ru/log-slog/advanced/custom-handler",
                  },
                ],
              },
            ],
            "/ru/database-sql/": ruDatabaseSqlSidebar,
          },
          outline: {
            label: "На этой странице",
            level: "deep",
          },
          docFooter: {
            prev: "Предыдущая страница",
            next: "Следующая страница",
          },
          returnToTopLabel: "Наверх",
          sidebarMenuLabel: "Меню",
          darkModeSwitchLabel: "Тема",
        },
      },
    },
  }),
);
