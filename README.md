# Foster-Pals

[Heroku link][heroku]

[heroku]: http://foster-pals.herokuapp.com

## Minimum Viable Product
FosterPals is an app inspired by AirBnb. FosterPals aims to bring together those who tirelessly rescue animals from kill shelters and those who have space in their homes to temporarily care for a rescue animal until it finds a forever home.

  Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Welcome Page
- [x] Create accounts
- [x] Create sessions (log in)
- [x] Two kinds of users: fosters and rescuers
- [x] Fosters create profiles with info on their homes
- [x] Rescue organizations create profiles with info on their org
- [x] Rescuer organizations can compile a list of rescue animals in their care.
- [ ] Rescuers can submit a Foster a request for the Foster to house an animal for a period of time.
- [ ] Fosters can choose whether or not to accept a stay request from a Rescue Organization.
- [ ] Fosters can keep track of confirmed and pending stays.
- [ ] Rescue Organizations can keep track of confirmed and pending stays.

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Welcome Page (~1 day)

This phase will include an "About" page to pique interest for the app.

[Details][phase-one]

### Phase 2: User Authentication (~1 day)


I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to sign up and sign in. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-two]

### Phase 3: Users' Profile Page w/ Basic Info (~1 day)

In this phase users, will have a profile page. They will be directed to this page upon sign-in/sign-up. There are two types of users: the Rescue Organization and the Foster. The Rescue Organization rescues animals from shelters and needs temporary homes for these animals. The Foster opens his home up to an animal in need. Each type of users' profile pages will be similar regarding basic info.

[Details][phase-three]

### Phase 4: Organization User's List of Rescue Animals (~1 day)

In this phase, the orgnization can add animals to a roster. Animals on this roster can begin the process of finding a foster home to stay at.

[Details][phase-four]

### Phase 5: Organization User's Stay Request Page (~1 day)

In this phase, the Organization User chooses a foster and submits a request for an animal to stay at the Foster's home for a given set of dates.

[Details][phase-five]

### Phase 6: Foster User's Schedule Manager Page (~2 day)

In this phase, the Foster can review a list of pending requests for rescue animals to stay at his home. The Foster can approve or deny requests.

[Details][phase-six]

### Phase 7: Search engine for finding Foster's by location (~2 day)

This phase create a search feature for Rescue Organizations to find nearby Fosters for their rescue animals. Upon entering a location, the search engine will display a list of Fosters within a certain distance.

[Details][phase-seven]


### Bonus Features (TBD)
- [ ] Use slugs instead of user id numbers in the url
- [ ] Mini google map of user's location on the user profile page
- [ ] Integration with Google maps to show locations of search results
- [ ] Image gallery on profile pages
- [ ] Ability for users to make posts on their profile pages
- [ ] Ability for users to posts comments on other users profile pages
- [ ] Ability for users to send private messages to each other.
- [ ] Password recovery by email.
- [ ] Rescuers can generate list of animals in need of a foster home.
- [ ] Fosters can submit a request to foster a specific animal from a specific org

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
