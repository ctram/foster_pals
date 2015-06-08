# Phase 4: Orgnization Users' List of Rescue Animals

## Rails
### Models
- Animal
- Organization

### Controllers
Api::OrgnizationsController (show)
Api::AnimalsController (create, update, destroy) (?)

### Views
Organizations/show.json.jbuilder
Animals/show.json.jbuilder

## Backbone
### Models
- Organization
- Animal

### Collections
- Animals

### Views
- OrganizationShowView (composite of AnimalIndexView)
- AnimalIndexView (composite of AnimalItem views)
- AnimalShowView

## Gems/Libraries
