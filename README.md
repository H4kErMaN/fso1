# Full Stack Open

Tehtäväpalautukset [Full Stack open](https://fullstackopen.com/) -kurssille.

## Rakenne

| Osa | Sovellus | Kuvaus |
|-----|----------|--------|
| osa1 | [kurssitiedot](./osa1/kurssitiedot) | Kurssin tietojen näyttäminen komponenteilla |
| osa1 | [unicafe](./osa1/unicafe) | Palautteen kerääminen ja tilastot |
| osa1 | [anekdootit](./osa1/anekdootit) | Anekdoottien äänestäminen |
| osa2 | [puhelinluettelo](./osa2/puhelinluettelo) | Yhteystiedot json-serverillä |
| osa2 | [maiden_tiedot](./osa2/maiden_tiedot) | Maiden tiedot REST-rajapinnasta |
| osa3 | [osa3](./osa3) | Puhelinluettelon backend (Node/Express/Mongo) |
| osa4 | [osa4](./osa4) | Blogilista ja yksikkötestit |

## Sovelluksen käynnistäminen (osa1 & osa2)

```bash
cd osa1/kurssitiedot   # tai mikä tahansa sovelluskansio
npm install
npm run dev
```

Puhelinluettelo tarvitsee lisäksi json-serverin toisessa terminaalissa:

```bash
cd osa2/puhelinluettelo
npm run server   # käynnistää json-serverin porttiin 3001
```

Maiden_tiedot käyttää säätietoja varten OpenWeather-API-avainta. Kopioi
`.env.local.example` nimelle `.env.local` ja lisää oma avaimesi.
