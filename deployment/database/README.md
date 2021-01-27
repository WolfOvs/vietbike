# telediagnostica database versioning model

The purpose of this folder is to collect al database changes done during Sprints for this microservice. This should be done using **.sql files** and following a defined versioning model. [Flyway](https://flywaydb.org) is the selected tool to manage the datamodel versioning for all microservices databases using a SQL delta approach. 

With Flyway all changes to the database are called **migrations**. Migrations can be either *versioned* or *repeatable*.

**Versioned** migrations have a *version*, a *description* and a *checksum*. The version must be unique. The description is purely informative for you to be able to remember what each migration does. The checksum is there to detect accidental changes. Versioned migrations are the most common type of migration. They are applied in order exactly once.

**Repeatable** migrations have a description and a checksum, but no version. Instead of being run just once, they are (re-)applied every time their checksum changes.

Within a single migration run, repeatable migrations are always applied last, after all pending versioned migrations have been executed. Repeatable migrations are applied in the order of their description.

By default both versioned and repeatable migrations can be written in SQL and can consist of multiple statements.

Flyway automatically discovers migrations on the repository folder */deployment/database*.

To keep track of which migrations have already been applied when and by whom, Flyway adds a *schema history table* to your schema.

## Versioned Migrations

The most common type of migration is a **versioned migration**. Each versioned migration has a *version*, a *description* and a *checksum*. The version must be unique. The description is purely informative for you to be able to remember what each migration does. The checksum is there to detect accidental changes. Versioned migrations are applied in order exactly once.

Versioned migrations are typically used for:

* Creating/altering/dropping tables/indexes/foreign keys/enums/UDTs/…
* Reference data updates
* Data corrections (not for application data)

Here is a small example:

```
CREATE TABLE car (
    id INT NOT NULL PRIMARY KEY,
    license_plate VARCHAR NOT NULL,
    color VARCHAR NOT NULL
);

ALTER TABLE owner ADD driver_license_id VARCHAR;

INSERT INTO brand (name) VALUES ('DeLorean');
```

Each versioned migration must be assigned a **unique version**. Any version is valid as long as it conforms to the usual dotted notation. For most cases a simple increasing integer should be all you need. 

The following versioned notation have to be applied:


  **X.Y**

where ‘**X**’ is the number of the Sprint where the sql delta file has been developed. ‘**Y**’ is not mandatory to be used. ‘**Y**’ is an incremental number starting by ‘1’ and can be used if multiple consecutive sql delta files want to be used for the same sprint
Versioned migrations are applied in the order of their versions. Versions are sorted numerically as you would normally expect.

## Repeatable Migrations

**Repeatable migrations** have a description and a checksum, but no version. Instead of being run just once, they are (re-)applied every time their checksum changes.

This is very useful for managing database objects whose definition can then simply be maintained in a single file in version control. They are typically used for

* (Re-)creating views/procedures/functions/packages/…
* Bulk reference data reinserts (i.e. test data)

Within a single migration run, repeatable migrations are always applied last, after all pending versioned migrations have been executed. Repeatable migrations are applied in the order of their description.
It is your responsibility to ensure the same repeatable migration can be applied multiple times. This usually involves making use of CREATE OR REPLACE clauses in your DDL statements or conditional checks in your DML statemens.


## SQL-based migrations

Migrations are most commonly written in **SQL**. This makes it easy to get started and leverage any existing scripts, tools and skills. It gives you access to the full set of capabilities of your database and eliminates the need to understand any intermediate translation layer.

SQL-based migrations are typically used for

* DDL changes (CREATE/ALTER/DROP statements for TABLES,VIEWS,TRIGGERS,SEQUENCES,…)
* Simple reference data changes (CRUD in reference data tables)
* Simple bulk data changes (CRUD in regular data tables)

### Naming

In order to be picked up by Flyway, SQL migrations must comply with the following naming pattern:

**Versioned Migrations**

```
Prefix Separator      Suffix
   |  |              |      
   V2__Alter_table.sql
    |       |   
 Version    Description

```

**Repeatable Migrations**

```
Prefix Separator       Suffix
    |  |               |
    R__Add_test_user.sql
            |    
            Description
```
			
The file name consists of the following parts:

* **Prefix**: **V** for versioned , and **R** for repeatable migrations
* **Version**: Version with dots or underscores separate as many parts as you like (Not for repeatable migrations). This number should follow the pattern X.Y where X is the number of the Sprint where the sql delta is developed and Y is an incremental number delta file starting by “1”.
* **Separator**: __ (two underscores)
* **Description**: Underscores or spaces separate the words.
* **Suffix**: .sql

### Discovery

Flyway discovers SQL-based migrations on the repository. Migrations reside in one directory. 

```
<bitbucket-repository>
   sources
   test
	 component
   deployment
	 infrastructure
	 template
	 database				-- filesystem:/deployment/database
	   V1__initial_db_version.sql		-- Sprint1 sql delta – initial version of db with CREATE approach
	   V1.1__alter_some_tables.sql		-- Sprint1 sql delta – some other changes on tables with ALTER approach (delta from V1)
	   V2__added_some_more_tables.sql	-- Sprint2 sql delta - adding some other tables (delta from V1.1)
```

### Syntax

Flyway supports all regular SQL syntax elements including:

* Single- or multi-line statements
* Single- (–) or Multi-line (/* */) comments spanning complete lines
* Database-specific SQL syntax extensions (PL/SQL, T-SQL, …) typically used to define stored procedures, packages, …

## Transactions

By default, Flyway always wraps the execution of an entire migration within a single transaction.
If Flyway detects that a specific statement cannot be run within a transaction due to technical limitations of your database, it won’t run that migration within a transaction. Instead it will be marked as *non-transactional*.

## Schema history table

To keep track of which migrations have already been applied when and by whom, Flyway adds a special **schema history table** to your schema. You can think of this table as a complete audit trail of all changes performed against the schema. It also tracks migration checksums and whether or not the migrations were successful.

## Migrations

Migrations are either *resolved* or *applied*. *Resolved* migrations have been detected by Flyway’s filesystem. Initially they are **pending**. Once they are executed against the database, they become *applied*.
When the migration succeeds it is marked as **success** in Flyway’s *schema history table*.
When the migration *fails* and the database supports *DDL transactions*, the migration is rolled back and nothing is recorded in the schema history table.
When the migration *fails* and the database doesn’t supports *DDL transactions*, the migration is marked as **failed** in the schema history table, indicating manual database cleanup may be required.
Repeatable migrations whose checksum has changed since they are last applied are marked as **outdated** until they are executed again.
When Flyway discovers an applied versioned migration with a version that is higher than the highest known version (this happens typically when a newer version of the software has migrated that schema), that migration is marked as **future**.
