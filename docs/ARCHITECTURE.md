# Technischer Aufbau

## Anwendung

`dist/index.html` lädt die Sprachdaten, UI-Übersetzungen, Abbildungslegenden, Sprachverwaltung, Suche und Assistentenlogik sowie die eigentliche Benutzeroberfläche. Es gibt keinen Servercode und kein npm-Buildsystem.

| Datei | Aufgabe |
| --- | --- |
| `book-data.js` | Vollständige deutsche Handbuchdaten und `BOOKS.de`. |
| `book-en.js`, `book-zh.js` | Englische beziehungsweise vereinfachte chinesische Handbuchdaten. |
| `ui-locales.js` | Übersetzte Oberfläche, Arbeitswege und feste Assistentenantworten. |
| `figure-labels.js` | Übersetzte Beschriftungslegenden für die deutschen Originalgrafiken. |
| `i18n.js` | Sprachwahl, Übersetzung dynamischer Oberfläche und Suchbegriff-Zuordnung. |
| `engine.js` | Volltextsuche, bekannte Fachantworten, Fundstellen und Grenzen der Antwortgrundlage. |
| `app.js` | Hash-Routen, Kapitel, Methodennavigator, Arbeitsmappe, Rechner, Dialoge und Export. |
| `styles.css` | Bestehendes responsives Erscheinungsbild. |
| `assets/image1.png` bis `image10.png` | Zehn unveränderte Originalabbildungen. |
| `handbuch.docx` | Unveränderte finale deutsche Word-Fassung. |

## Bearbeitbare Inhaltsquellen

`translations/de-book.json` enthält die aus V03 abgeleiteten deutschen Kapitel, Abschnitte, Tabellen, Quellen und Formeln. `refs.json` ordnet 1.801 Übersetzungseinheiten ihren Datenpfaden zu. `input-1.json` bis `input-5.json` sind die ursprünglichen Übersetzungsaufträge; `output-1.json` bis `output-5.json` enthalten die englischen und chinesischen Ausgaben. `fixed.json` hält die beibehaltenen Formeln und formalen Literaturangaben fest. `ui.json` enthält den UI-Katalog.

Der bestehende Compiler `translations/build.py` prüft Schlüssel, HTML-Tags und Zitationsmarker und schreibt die drei Handbuchdateien sowie `ui-locales.js`. Er erzeugt keine neue Word-Fassung. Ein Word-Original und die browserbezogenen Inhaltsdaten sind deshalb als zusammengehörige, aber unterschiedliche Artefakte zu versionieren. Die Regeln für eine bewusste Inhaltsänderung stehen in `CONTRIBUTING.md`.

## Benutzerzustand

`reliability-workbook-v1` und `reliability-language` werden lokal im Browser gespeichert. Lesen, Notizen, Häkchen und Sprachwahl werden nicht an GitHub oder einen KI-Dienst übertragen. Der Assistent arbeitet ebenfalls lokal. Ein Domain-Wechsel übernimmt diesen Speicher nicht; der JSON-Export und -Import ist der vorhandene Übertragungsweg.

## Veröffentlichung

Der vorhandene Sites-Stand und GitHub Pages sind zwei Auslieferungen derselben statischen Dateien. `.openai/hosting.json` gehört zum ursprünglichen Hosting. GitHub Pages benutzt das hochgeladene `dist/`-Artefakt und benötigt diese Konfiguration nicht. Die neue Repository-Dokumentation ist nicht Bestandteil der Benutzeroberfläche.
