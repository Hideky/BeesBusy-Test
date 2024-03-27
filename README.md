# BeesBusy Test Back
 
Test app in Django/React for managing users.
## Stack

### Back
- Django (5.0.3)
- Django REST framework (3.15.1)
- django-filter (4.3.1)
- django-rest-knox (4.2.0)

### Front

- React (18.2.0)
- Next.js (14.1.4)
- Redux (18.0)
- Redux/toolkit (2.2.2)
- Redux-Persist (6.0) 
- Formik (2.4.5)
- Tailwind (3.3.0)

## Installation

### Prerequisites

- Docker
- Docker-compose

### Clone the repository

```bash
git clone https://github.com/hideky/beesbusy-test.git
```

### Build & Run


```bash
docker-compose up --force-recreate
```

## Usage

You can access the dashboard using the address `http://localhost:3000`, the rest will be quite intuitive.
A superuser is created by default at the same time as a dataset.
Username: `beesbusy`
Password: `admin`
