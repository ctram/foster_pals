# Phase 2: User Authentication

## Rails
### Models
- User (Both Rescuer and Organiation)
- Organization


### Controllers
Session (create, destroy, new)
Api::UsersController (create, destroy, show, update)
Api::OrganizationController (create, destroy, show, update)

### Views
* Users/show.json.jbuilder
* Organizations/show.json.jbuilder

## Backbone
### Models
- User
- Organization

### Collections
* Users
* Organizations

### Views
- UserFrom (Organization shares the same form)
- ProfileShow

## Gems/Libraries
