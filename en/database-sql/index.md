---
title: The database/sql Package
description: "Practical guidance on Go's database/sql package: database drivers, query execution, transactions and connection pool management."
---

# The database/sql Package

[`database/sql`](https://pkg.go.dev/database/sql) is the standard library package for working with relational databases in Go. Most backend applications need to persist data, so reliable database access is critical to the service as a whole. Understanding this package is therefore a core skill for Go developers.

This knowledge remains useful even when a project hides data access behind a third-party library or ORM. Understanding how `database/sql` works helps you choose higher-level abstractions deliberately, recognize their limitations and troubleshoot problems without treating database access as a black box.

The goal of this section is to provide a practical foundation for writing, reviewing and maintaining database access code. Rather than memorizing the entire API, the focus is on understanding the application's responsibilities and the decisions that determine whether this code remains correct and robust.

## What To Expect

The material progresses from a conceptual overview to practical code. You will learn how to find a driver compatible with `database/sql`, register it, initialize and verify a connection pool, execute statements and read query results, use transactions and manage connections under load.

The examples use a consistent stack throughout: PostgreSQL with [`pgx/v5/stdlib` v5.10.0](https://pkg.go.dev/github.com/jackc/pgx/v5@v5.10.0/stdlib). This keeps the examples consistent, while the underlying principles apply to other relational database systems and drivers as well.

## What Is Not Covered

This section is not an introduction to SQL. It assumes that you are already familiar with basic SQL statements, filtering conditions, simple `JOIN` operations, constraints and the general purpose of transactions.

It is also not a complete API reference and does not cover every uncommon or low-level use case. Such cases are mentioned only when they help explain the core concepts.

Database administration, schema design, migrations, backups and in-depth query optimization are outside the scope of this section. Questions such as how to organize service and data access layers, or whether to use an ORM, query builder or code generator, belong to the broader topic of application architecture and are not discussed here.

Testing database access code is not treated as a separate topic either. Unlike `net/http`, `database/sql` provides no dedicated testing tools comparable to `httptest`. SQL correctness is usually verified by running queries against an isolated instance of the same database system and comparing the actual results with the expected ones. Mock drivers can verify calls and arguments, but they do not execute the SQL itself. Provisioning a test database, applying migrations, loading fixtures, cleaning up data and configuring CI are test infrastructure concerns rather than part of the package API.

## Go and Driver Versions

The standard library examples rely on APIs available in Go 1.22 and later, most notably `sql.Null[T]`. Go 1.22 is therefore the minimum version for the `database/sql` features covered here, but it does not guarantee compatibility with the latest releases of third-party drivers.

The `go.mod` file for `pgx/v5` version `v5.10.0` requires Go 1.25 or newer. As a result, Go 1.25 is the minimum version required to run the examples as written. Environments using Go 1.22–1.24 must either upgrade the Go toolchain or pin the driver to an older release.
