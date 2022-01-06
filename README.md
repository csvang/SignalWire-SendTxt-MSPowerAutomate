# SignalWire Send Text with MS Power Automate

## Description

Proof of concept using [SignalWire's Relay Messaging API](https://docs.signalwire.com/topics/relay-sdk-nodejs/v2/#api-reference-relay-messaging).  To create a MS Power Automate Connector and send a txt message using SignalWire's relay messaging service.


## Project Setup

### Solution
1.  `npm i`
2.  Create environment variable file, `.env`.
    * Insert the following to the file:
        
        *Instructions getting the variable information is under the SignalWire section*
        ```
        PROJECT_ID=
        API_TOKEN=
        CONTEXT=
        MY_NUMBER=
        ```
3.  `npm start`
    - Server is on port `4124`.

### SignalWire
1. From the SignalWire setup site, on the left navigation, click on `API`.  The Project ID and API Token can be retrieved (or created) on this page.
`
![SignalWire retrieve Project ID and API Token](/screenshots/01.png)

2. On the left navigation, click on Phone Numbers and create a new phone number.

### MS Power Automate
1.  Create a custom connector by [importing from a Postman collection](https://docs.microsoft.com/en-us/connectors/custom-connectors/define-postman-collection).
    - The example Postman collection can be viewed at [MS Power Automate/SignalWire-txt-poc.postman_collection.json](https://github.com/csvang/SignalWire-SendTxt-MSPowerAutomate/blob/master/MS%20Power%20Automate/SignalWire-txt-poc.postman_collection.json)

2. Create a new Flow.

3. Add action as needed to integrate with Power Automate.

## Example Implementation

![Power Automate flow diagram](/screenshots/02.png)

## Notes
- Sign up for a trial at [SignalWire.com](https://www.signalwire.com)
- Utilized `ngrok` to serve index.js.
