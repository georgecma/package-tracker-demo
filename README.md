Package Tracker Demo

Package tracker demo to showcase BigTable node.js connectivity. 
Frontend built with React (based on create-react-app), Backend built with express/Node.js.

Setup Process:
Frontend:
```
cd package-tracker-frontend
npm install
npm start
```
Backend: 
```
cd package-tracker-frontend
touch .env 
# populate .env file with BT_INSTANCE and BT_TABLE for your BigTable instance,
# e.g. if you have an instance called InstanceA and there's a table called TableB in it,
# you should write the following in the .env file:
# BT_INSTANCE='InstanceA'
# BT_TABLE='TableB'
node server.js
```
Now you can navigate to localhost:3000 to see the demo. 
You can add/remove/edit package records.

Insert test data:
```
cd package-tracker-backend
python3 test_populate_db.py
```