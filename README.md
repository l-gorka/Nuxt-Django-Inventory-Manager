# Pen Stash - inventory manager

## Table of contents

- [General info](#general-info)
- [Live demo](#live-demo)
- [Screenshots](#screenshots)   
- [Technologies](#technologies)
- [Setup & testing](#setup)  

  
<a name="general-info"></a>
# General info

An app was written as a part of the recruitment task which was to build a full-stack application that supports registration, authentication, and managing some kind of items, in this case, pens. The app consists of the backend written in Django with the REST Framework, and the frontend which was written in Vue/Nuxt.

<a name="live-demo"></a>
# Live demo: [Pen stash app.](https://inventory112.netlify.app/) 

### As a regular user, you can not create or delete items. If you need an admin account, use these credentials:

### username: stashAdmin
### password: test4321 



Because the project is deployed to the Heroku free service, the initial request may take up to 30 seconds.

<a name="screenshots"></a>
# Screenshot:
![Index screenshot](https://res.cloudinary.com/dgmcox/image/upload/v1651614334/pens/Pen-stash_xcot8g.png)

<a name="technologies"></a>
# Technologies:

- Django REST Framework using viewsets to create the REST API
- djoser to handle authentication
- Cloudinary API to manage uploading images
- PostgreSQL
- Vue 2 with Nuxt on the frontend
- Vuetify as a UI library

<a name="setup"></a>
# Setup & testing

## Setup

In order to run this project locally, you have to provide enviromental variables in the docker-compose file. After that run:
```bash
$ docker-compose up
```
The app should be accessible at localhost:3001.
