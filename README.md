# Dance School Management System

### Informacje:

Projekt zespołowy wykonany w ramach kursu CodersCamp 2020

- Uczestnicy projektu:
- Marlena - Tech Lead
- Radek - Development Manager
- Joanna - Product Owner
- Maciej
- Dariusz
- Adam

### Cel projektu:

Celem projektu było napisanie aplikacji wykorzystującej dotychczas nabytą wiedzę z nodejs oraz baz danych.

### Zasady wykonywania projektu:

- REST API
- zakładanie konta użytkownika
- autoryzacja i autentykacja użytkownika, różne uprawnienia. Wykorzystanie Json Web Token.
- wykorzystanie bazy danych (NoSQL lub SQL)
- integracja z jakimś zewnętrznym systemem (np. wysyłanie e-maili)
- pisanie testów

### Opis projektu:

Aplikacja zaprojektowana do zarządzania szkołą tańca. Aplikacja backendowa połączona z bazą danych. Jest to pierwsza część projektu końcowego w ramach kursu CodersCamp, która w połączeniu z Reactem, będzie stanowić całą aplikację webową.

### Wykorzystane technologie:

- Node.js / NestJS
- MongoDB / Mongoose
- TypeScript

### Uruchomienie projektu

1. Zainstaluj _MongoDB_
1. Baza danych jest dostępna pod adresem `localhost:27017/`
1. Stwórz bazę o nazwie dance_school
1. Zainstaluj zależności: `npm install`
1. Uruchom serwer developerski: `npm run start:dev`
1. Aplikacja jest dostępna pod adresem `localhost:3000/`
1. Swagger jest dostępny pod adresem `localhost:3000/api/`
1. Uruchomienie testów: `npm run test:e2e`

### Demo:

https://dance-school-management-system.herokuapp.com/api/
