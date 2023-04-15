# Patient Management System

This is a Node.js application for managing patients in a hospital or healthcare setting. It uses MongoDB/Mongoose as the database for storing patient information.

## Features

There are two types of users in the system: Doctors and Patients.

#### Doctors

    -   Doctors can log in to the system.
    -   Each time a patient visits, the doctor will follow two steps:

        -   Register the patient in the app using the patient's phone number. If the patient already exists, the API will return the patient's information.
        -   After the checkup, the doctor can create a patient report with the following fields:
            -   Created by doctor
            -   Status: Can be either of the following: 0 (Negative), 1 (Travelled-Quarantine), 2 (Symptoms-Quarantine), 3 (Positive-Admit)
            -   Date

#### Patients

    -   Patients can be registered by doctors and have patient reports associated with them.

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

## Prerequisites

-   Node.js and npm installed on your machine
-   MongoDB installed and running

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/patient-management-system.git
```

2. Change to the project directory:

```bash
cd patient-management-system
```

3. Install the dependencies:

```bash
npm install
```

4. Start the application:

```bash
node app.js
```

5. Open a web browser and go to http://localhost:8000 to access the patient management system.

## API Endpoints

-   POST /doctors/register - Create a new doctors registration
-   POST /doctors/login - Login to the doctors
-   POST /patients/register - Register the patients
-   POST /patients/:id/create-report - Create a new Patient Report by Patient ID
-   GET /patients/:id/all_reports - give the patients a list of all reports by Patient ID
-   GET /patients/:status - give the list of reports by status

#### Status

    0: 'Negative',
    1: 'Travelled-Quarantine',
    2: 'Symptoms-Quarantine',
    3: 'Positive-Admit',

## Screensorts Example of API 

-   POST /doctors/register - Create a new doctors registration

![](/images/doctors-register.png)

-   POST /doctors/login - Login to the doctors

![](/images/doctors-login.png)

-   POST /patient/register - Register the patients

![](/images/patient-register.png)

-   POST /patients/:id/create-report - Create a new Patient Report by Patient ID

![](/images/patient-id-create-report.png)

-   GET /patients/:id/all_reports - give the patients a list of all reports by Patient ID

![](/images/patient-id-all-reports.png)

-   GET /patients/:status - give the list of reports by status

![](/images/reports-status.png)
