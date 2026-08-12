# Puhelinluettelo — osa 3

Backend puhelinluettelolle. Sisältää sekä Express-palvelimen että frontendin tuotantobuildin `dist/`-hakemistossa.

## Julkaistu versio

https://sinun-sovelluksesi.onrender.com

## Ajaminen paikallisesti

1. Asenna riippuvuudet:

```bash
npm install
```

2. Luo `.env`-tiedosto projektin juureen ja aseta muuttujat:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/phonebookApp?retryWrites=true&w=majority
PORT=3001
```

3. Käynnistä palvelin:

```bash
npm run dev
```

4. Avaa selaimessa `http://localhost:3001`.

## REST API

| Menetelmä | Osoite               | Toiminto                       |
| --------- | -------------------- | ------------------------------ |
| GET       | `/api/persons`       | Kaikki henkilöt                |
| GET       | `/api/persons/:id`   | Yksittäinen henkilö            |
| GET       | `/info`              | Sovelluksen tiedot             |
| POST      | `/api/persons`       | Lisää uusi henkilö             |
| PUT       | `/api/persons/:id`   | Päivitä henkilön numero        |
| DELETE    | `/api/persons/:id`   | Poista henkilö                 |
