---
title: Structured Logging
description: "An introductory section on Go's log/slog package: why backend services need structured logs, how they differ from fmt and log, and how to work with loggers, attributes, levels and handlers."
---

# Structured Logging

When a service is running in production, logs are often the first clue: why a request returned `500`, where time was lost, which user flow led to an error and whether several events are related to each other. At that point, a log entry is no longer just a line of text for a human reader. It becomes data that must be searchable, filterable, groupable and useful for quickly reconstructing what happened.

[`log/slog`](https://pkg.go.dev/log/slog) is Go's standard library package for structured logging, available since Go 1.21. Instead of passing a fully formatted sentence to the logger, the application describes an event: a short message, a level and named attributes. The handler then decides whether to accept the event and how to write it: in a terminal-friendly format, as JSON for a log collection system or through a custom processing chain.

For that reason, `slog` is important not merely as another way to print text. It helps the application agree on the shape of log events: what exactly happened, which fields should remain separate data, which values are safe to record and how to avoid scattering logging configuration across the whole project.

## Why Not `fmt` or `log`

[`fmt`](https://pkg.go.dev/fmt) is well suited for formatting values and printing output in small utilities, but by itself it does not describe an application event. It has no levels, shared logger configuration, handlers, filtering or explicit field schema.

The [`log`](https://pkg.go.dev/log) package is closer to logging: it can write text records and add service information. But for `log`, an entry is still a single line. If a message is built with `log.Printf("request failed: user=%d status=%d", userID, status)`, the user identifier and status become part of the text after formatting. From there, extracting them depends on conventions, regular expressions or logic in an external system.

`slog` keeps those values as attributes before the output format is chosen. The same call can appear as `key=value` in a terminal and as JSON in centralized storage, while the application code continues to describe the event in the same way.

## What To Expect

The material moves from the basic idea of a structured event to practical `slog` usage in an application. The main goal is not to list separate methods, but to show the overall approach: how to describe log events so that they remain clear in code and useful after they reach a log collection system.

## What Is Not Covered

`log/slog` creates records and passes them to a handler, but it is not an observability platform. This section does not cover file rotation, guaranteed delivery, long-term storage, log query languages, external log collector configuration, metrics, tracing or audit trails.

These topics matter in production systems, but they are outside the scope of the package itself. The focus here stays on what a Go application controls directly: how to describe an event, which fields to pass, where to choose the output format and how to keep logging from turning into a random collection of strings.

## Go Version

The main API covered in this section is available in Go 1.21. Features added later are called out in the articles where they appear: `DiscardHandler` requires Go 1.24, `GroupAttrs` requires Go 1.25 and `MultiHandler` requires Go 1.26.
