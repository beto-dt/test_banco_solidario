CREATE DATABASE solidario
GO

use solidario
GO

CREATE table users(
 [id_user] bigint identity(1,1) NOT NULL,
 [card_id] nvarchar(max) NULL,
 [name] nvarchar(max) NULL,
 [lastname] nvarchar(max) NULL,
 [email] nvarchar(max)NULL,
 [password] nvarchar(max) NULL,
 [created]  datetime NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY ([id_user])
)
GO

CREATE table rateTypes(
 [id_rateType] bigint identity(1,1) NOT NULL,
 [name] nvarchar(max) NULL,
 [description] nvarchar(max) NULL,
 [created]  datetime NOT NULL,
 CONSTRAINT [PK_RateTypes] PRIMARY KEY ([id_rateType]),
)
GO

CREATE table accounts(
 [id_account] bigint identity(1,1) NOT NULL,
 [id_user] bigint NOT NULL,
 [total] MONEY NULL,
 [description] nvarchar(max) NULL,
 [id_rateType] bigint NOT NULL,
 [created]  datetime NOT NULL,
 CONSTRAINT [PK_Accounts] PRIMARY KEY ([id_account]),
 FOREIGN KEY ([id_user]) REFERENCES users([id_user]),
 FOREIGN KEY ([id_rateType]) REFERENCES rateTypes([id_rateType])
)
GO

CREATE table transactions(
 [id_transaction] bigint identity(1,1) NOT NULL,
 [id_account] bigint NOT NULL,
 [type] nvarchar(max) NULL,
 [total] MONEY NULL,
 [created]  datetime NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY ([id_transaction]),
 FOREIGN KEY ([id_account]) REFERENCES accounts([id_account])
)
GO


INSERT INTO users values ('1600689424','luis alberto','De La Torre','luis.atorred24@gmail.com','123456','2024-02-18 00:00:00.000')
GO


INSERT INTO rateTypes values ('3%','Interes Anual del 3%','2024-02-18 00:00:00.000')
GO

INSERT INTO accounts values (1,30.00,'Cuenta de Ahorros',1,'2024-02-18 00:00:00.000')
GO

INSERT INTO transactions values (1,'DEPOSITO',30.00,'2024-02-18 00:00:00.000')
GO