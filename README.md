# IReporter

# Problem Statement
Corruption is a huge bane to Africa’s development. African countries must develop novel and localized solutions that will curb this menace, hence the birth of iReporter. iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention 

## Team
Full Stack - React(Frontend) & Python Flask(Backend)

### MVP Features 
1. Users can create an account and log in. 
2. Users can create a red-flag record (An incident linked to corruption). 
3. Users can create intervention records (a call for a government agency to intervene e.g repair bad road sections, collapsed bridges, flooding e.t.c). 
4. Users can edit their red-flag or intervention records. 
5. Users can delete their red-flag or intervention records. 
6. Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention records. 
7. Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or intervention records. 
8. Admin can change the status of a record to either under investigation, rejected (in the event of a false claim) or resolved (in the event that the claim has been investigated and resolved). 
9. Users can add images to their red-flag or intervention records, to support their claims. 
10. Users can add videos to their red-flag or intervention records, to support their claims. 
11. The user gets real-time email notification when Admin changes the status of their record. 


### Optional Features 

1. The application should display a Google Map with Marker showing the red-flag or  intervention location. 
2. The user gets real-time SMS notification when Admin changes the status of their record. 

#### NB: 
1. The user can only change the geolocation (Lat Long Coordinates) of a red flag/    intervention record when the record’s status is yet to be marked as either under investigation, rejected, or resolved. 
2. The user can only edit or delete a red-flag/ intervention record when the record’s status is yet to be marked as either under investigation, rejected, or resolved. 
3. Only the user who created the red-flag or incident record can delete the record. 

## Technical expectations
1. Backend: Python Flask
2. Database: PostgreSQL
3. Wireframes: Figma (Should be mobile friendly)
4. Frontend: ReactJs & Redux Toolkit(state management)
