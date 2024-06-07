## Project Blurb
For busy people who have a bunch of different obligations and people to keep track of, the Busy Bee Contacts App is a contacts list that includes tags for levels of priority. Unlike Apple Contacts, our product has priorities via color with number priority, a reminder system, custom notes, and tags with a filter system.

## UI Prototype
- Initial Version: https://www.figma.com/design/UDJoQ78kQBiuHNMeqAvmIx/Busy-Bee-Contacts?node-id=0-1&t=SRvSbAYNhrk6wesv-1
- Clickable Version: https://www.figma.com/design/0JQiL49RRl7VOMvTlAguvs/Clickable-Figma?node-id=0-1&t=zSdAJbdYDP30tp0m-1

## Development Environment Set Up
Have two different tabs open to run Mongoose, Express backend and React frontend in that order.
1. Run ``npm run dev`` in the packages\express-backend folder
2. Run ``npm run dev`` in the packages\react-frontend folder

# Potential Bugs with Deploying Development:
- Mongosh installation: Mongosh may not be installed. Run ``mongosh`` in the packages\express-backend folder. You may need to run ``npm install mongosh``.
- Installing packages: If ``npm run dev`` doesn't work in the frontend, you may need to ``npm install react-x`; x being the packages the terminal reports you do not have.
- .env: Make sure there is a .env in packages. Copy-paste the configuration below.

## MongoDB Configurations and Contributing
MONGODB_URI=mongodb+srv://adminuser:adminuser123@busybeecontacts.yckncwj.mongodb.net/?retryWrites=true&w=majority&appName=BusyBeeContacts
Remember that .env is a REMOTE REPOSITORY and everyone should make their own

# Data Model
![AA7B648E-CFDF-4068-901C-916273D50344_1_201_a](https://github.com/matteoterrien/Busy-Bee-Contacts/assets/102430146/a3ca8668-2d0b-4cf8-bbe5-6be50f62f664)


