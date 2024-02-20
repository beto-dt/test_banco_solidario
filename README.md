# test_banco_solidario
Banco Solidario Prueba Tecnica
muy buenos dias mi estimado examinador estos son los pasos para alzar el proyecto , el proyecto esta  desarrollado con Contenedores Docker

1.-levantar el backEnd por .net 
2.- Despues que se levante nos diriguimos a Sql Server y entramos  con  las siguientes credenciasles 
serverName: localhost,8002
Authentication:SQL Server Autentication
Login: sa
Password:abcDEF123

entramos al servidor y abrimos una New Query y dentro del proyecto de .net en la carpeta Db en el archivo solidario.sql hay tenemos el script para levantar la base de datos 

luego al momento que se levanto el backend se nos abrira una ventana automaticamente donde nos muestran los apis que vamos a utilizar en este caso agaramos el puerto que esta usando  y nos dirigimos al frontEnd que esta basado en Angular y vamos a la carpeta de los enverioment y en la url colocamos el puerto para que el backEnd tenga comunicacion con el Frontend

