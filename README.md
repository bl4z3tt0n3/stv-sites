# STV Sites

Ricostruzione statica del sito della **Società Trasporti Vanali S.R.L.** a partire dalla versione storica disponibile su Internet Archive.

## Origine verificata

- Dominio associato all'azienda: `www.vanalistv.it`.
- Ultima attività del dominio rilevata nella Wayback Machine: 16 settembre 2019.
- Ultima homepage completa e utilizzabile verificata: cattura del 9 gennaio 2019, con contenuti, contatti e galleria.

La cattura più recente del dominio contiene soprattutto risorse tecniche; la homepage replayata del 2019 presenta uno slider non ricostruito e una grande area nera. Questa versione conserva i contenuti identificabili dell'archivio, ma li presenta in una pagina statica autonoma e responsive. Sono stati rimossi i collegamenti a WordPress, Google Maps e Contact Form 7 perché nel replay non erano affidabili; il form locale prepara la richiesta senza inviare dati a servizi esterni.

## Avvio locale

Il progetto non richiede una build:

```bash
python -m http.server 8080
```

Poi aprire <http://localhost:8080>.

Le immagini storiche sono referenziate dalla cattura Internet Archive verificata e dispongono di un fallback SVG nel caso una risorsa non sia disponibile.

## Fonti

- [Scheda aziendale con il dominio vanalistv.it](https://www.cercami.org/impresa-112634-societa-trasporti-vanali-c.-snc/)
- [Homepage archiviata del 9 gennaio 2019](https://web.archive.org/web/20190109081519/http://www.vanalistv.it/)
- [Cronologia del dominio vanalistv.it](https://web.archive.org/web/*/vanalistv.it)
