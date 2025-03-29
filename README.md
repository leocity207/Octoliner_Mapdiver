Octoliner Maptiva
=================

Octoliner is a software that enable easy visualisation of a public transport network for the user and easy intereaction when the user want information about the network

Main functionality are:
  * displaying a network map and navigate scroll acrosse the map
  * get iformation about the network line
  * get information about the satation


compilation
===========

you can compile the server side using visual studio 2022 with the cmake module
compilation should create a local build file that can be used with your host

Configuration of server
-----------------------
path to the ressource are staticaly allocated for now and hard written (name/)

Configuration of the ressource
------------------------------
the server is thought to be easy to modify to your own need 
all personalized element should be found inside resources/resources-config
documentation explain more.



Documentation
=============
documentation can be found inside ressources/doc/
documenation can be generated using sphinx and graphviz. you also need to use install read the doc theme via pip.