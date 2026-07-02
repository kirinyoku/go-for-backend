import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "Go for Backend Development",
    base: "/go-for-backend/",
    description:
      "Structured material on applying Go to server-side development with a focus on the standard library.",

    cleanUrls: true,

    sitemap: {
      hostname: "https://kirinyoku.github.io/go-for-backend/",
    },

    vite: {
      build: {
        chunkSizeWarningLimit: 1600,
      },
    },

    head: [
      ["meta", { name: "theme-color", content: "#3eaf7c" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: "Go for Backend Development" }],
      [
        "meta",
        {
          property: "og:description",
          content:
            "Structured material on applying Go to server-side development with a focus on the standard library.",
        },
      ],
    ],

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

      "ru/http/1. Introduction/1.1 Connection Lifecycle.md":
        "ru/http/intro/connection-lifecycle.md",
      "ru/http/1. Introduction/1.2 Handler.md": "ru/http/intro/handler.md",
      "ru/http/1. Introduction/1.3 HandlerFunc.md":
        "ru/http/intro/handlerfunc.md",
      "ru/http/1. Introduction/1.4 Request.md": "ru/http/intro/request.md",
      "ru/http/1. Introduction/1.5 ResponseWriter.md":
        "ru/http/intro/responsewriter.md",
      "ru/http/1. Introduction/1.6 Response.md": "ru/http/intro/response.md",
      "ru/http/1. Introduction/1.7 Built-in Handlers.md":
        "ru/http/intro/built-in-handlers.md",
      "ru/http/2. HTTP Server/2.1 Base Server.md":
        "ru/http/server/base-server.md",
      "ru/http/2. HTTP Server/2.2 Routing.md": "ru/http/server/routing.md",
      "ru/http/2. HTTP Server/2.3 Working with Data.md":
        "ru/http/server/working-with-data.md",
      "ru/http/2. HTTP Server/2.4 Flow Control.md":
        "ru/http/server/flow-control.md",
      "ru/http/2. HTTP Server/2.5 Middleware.md":
        "ru/http/server/middleware.md",
      "ru/http/2. HTTP Server/2.6 Resource Limits.md":
        "ru/http/server/resource-limits.md",
      "ru/http/2. HTTP Server/2.7 ResponseController.md":
        "ru/http/server/responsecontroller.md",
      "ru/http/2. HTTP Server/2.8 Graceful Shutdown.md":
        "ru/http/server/graceful-shutdown.md",
      "ru/http/2. HTTP Server/2.9 CORS.md": "ru/http/server/cors.md",
      "ru/http/2. HTTP Server/2.10 TLS and HTTPS.md":
        "ru/http/server/tls-and-https.md",

      "ru/http/3. HTTP Client/3.1 Client Initialization.md":
        "ru/http/client/initialization.md",
      "ru/http/3. HTTP Client/3.2 Making Requests.md":
        "ru/http/client/making-requests.md",
      "ru/http/3. HTTP Client/3.3 Response Handling.md":
        "ru/http/client/response-handling.md",
      "ru/http/3. HTTP Client/3.4 Timeouts and Context.md":
        "ru/http/client/timeouts-and-context.md",
      "ru/http/3. HTTP Client/3.5 Transport Layer Configuration.md":
        "ru/http/client/transport-layer-configuration.md",
      "ru/http/3. HTTP Client/3.6 Connection Pooling.md":
        "ru/http/client/connection-pooling.md",
      "ru/http/3. HTTP Client/3.7 Cookies.md": "ru/http/client/cookies.md",
      "ru/http/3. HTTP Client/3.8 Redirects.md":
        "ru/http/client/redirects.md",

      "ru/http/4. Testing/4.1 Testing Handlers.md":
        "ru/http/testing/testing-handlers.md",
      "ru/http/4. Testing/4.2 Testing with Servers.md":
        "ru/http/testing/testing-with-servers.md",
      "ru/http/4. Testing/4.3 Mocking External APIs.md":
        "ru/http/testing/mocking-external-apis.md",
    },

    locales: {
      en: {
        label: "English",
        lang: "en",
        link: "/en/",
        title: "Go for Backend",
        themeConfig: {
          sidebar: {
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
                items: [{ text: "net/http", link: "/en/net-http/" }],
              },
              {
                text: "In progress",
                collapsed: false,
                items: [{ text: "database/sql", link: "/en/database-sql/" }],
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
                items: [{ text: "net/http", link: "/ru/http/" }],
              },
              {
                text: "В разработке",
                collapsed: false,
                items: [
                  { text: "database/sql", link: "/ru/database-sql/" },
                ],
              },
            ],
            "/ru/http/": [
              {
                text: "Обзор",
                collapsed: false,
                items: [{ text: "О разделе", link: "/ru/http/" }],
              },
              {
                text: "1. Введение",
                collapsed: false,
                items: [
                  {
                    text: "1.1 Жизненный цикл соединения",
                    link: "/ru/http/intro/connection-lifecycle",
                  },
                  {
                    text: "1.2 Интерфейс http.Handler",
                    link: "/ru/http/intro/handler",
                  },
                  {
                    text: "1.3 Тип http.HandlerFunc",
                    link: "/ru/http/intro/handlerfunc",
                  },
                  {
                    text: "1.4 Структура http.Request",
                    link: "/ru/http/intro/request",
                  },
                  {
                    text: "1.5 Интерфейс http.ResponseWriter",
                    link: "/ru/http/intro/responsewriter",
                  },
                  {
                    text: "1.6 Структура http.Response",
                    link: "/ru/http/intro/response",
                  },
                  {
                    text: "1.7 Встроенные обработчики",
                    link: "/ru/http/intro/built-in-handlers",
                  },
                ],
              },
              {
                text: "2. HTTP-сервер",
                collapsed: false,
                items: [
                  {
                    text: "2.1 Запуск базового сервера",
                    link: "/ru/http/server/base-server",
                  },
                  {
                    text: "2.2 Маршрутизация",
                    link: "/ru/http/server/routing",
                  },
                  {
                    text: "2.3 Чтение и запись данных",
                    link: "/ru/http/server/working-with-data",
                  },
                  {
                    text: "2.4 Управление выполнением обработчика",
                    link: "/ru/http/server/flow-control",
                  },
                  {
                    text: "2.5 Middleware",
                    link: "/ru/http/server/middleware",
                  },
                  {
                    text: "2.6 Ограничение ресурсов",
                    link: "/ru/http/server/resource-limits",
                  },
                  {
                    text: "2.7 Потоковые ответы и ResponseController",
                    link: "/ru/http/server/responsecontroller",
                  },
                  {
                    text: "2.8 Graceful Shutdown",
                    link: "/ru/http/server/graceful-shutdown",
                  },
                  {
                    text: "2.9 CORS как middleware",
                    link: "/ru/http/server/cors",
                  },
                  {
                    text: "2.10 HTTPS",
                    link: "/ru/http/server/tls-and-https",
                  },
                ],
              },
              {
                text: "3. HTTP-клиент",
                collapsed: false,
                items: [
                  {
                    text: "3.1 Инициализация клиента",
                    link: "/ru/http/client/initialization",
                  },
                  {
                    text: "3.2 Формирование и отправка запросов",
                    link: "/ru/http/client/making-requests",
                  },
                  {
                    text: "3.3 Чтение и обработка ответов",
                    link: "/ru/http/client/response-handling",
                  },
                  {
                    text: "3.4 Таймауты и контекст",
                    link: "/ru/http/client/timeouts-and-context",
                  },
                  {
                    text: "3.5 Настройка транспортного уровня",
                    link: "/ru/http/client/transport-layer-configuration",
                  },
                  {
                    text: "3.6 Пул соединений",
                    link: "/ru/http/client/connection-pooling",
                  },
                  {
                    text: "3.7 Cookie в HTTP-клиенте",
                    link: "/ru/http/client/cookies",
                  },
                  {
                    text: "3.8 Redirect в HTTP-клиенте",
                    link: "/ru/http/client/redirects",
                  },
                ],
              },
              {
                text: "4. Тестирование",
                collapsed: false,
                items: [
                  {
                    text: "4.1 Тестирование обработчиков",
                    link: "/ru/http/testing/testing-handlers",
                  },
                  {
                    text: "4.2 Тестирование с использованием серверов",
                    link: "/ru/http/testing/testing-with-servers",
                  },
                  {
                    text: "4.3 Мокирование внешних API",
                    link: "/ru/http/testing/mocking-external-apis",
                  },
                ],
              },
            ],
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
