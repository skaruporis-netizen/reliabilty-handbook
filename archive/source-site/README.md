# Reliability · Handbuch & Werkstatt

Statische Webanwendung in Deutsch, Englisch und vereinfachtem Chinesisch auf Basis von **ChatGPT XYZ3 Final, V03 vom 9. Oktober 2026**.

## Enthalten

- Die vollständigen 20 Kapitel, fünf Anhänge und die Literatur mit Quellenlinks
- Zehn Originalabbildungen mit englischen und chinesischen Beschriftungslegenden, Tabellen und native MathML-Formeln
- Umschalter DE / EN / 中文 für Kapitel, Navigation, Arbeitswege, Suche, Assistent und Markdown-Export; Sprachwahl bleibt im Browser gespeichert
- Volltextsuche in der gewählten Sprache, einschließlich chinesischer Begriffe
- Handbuch-Assistent mit fachlich formulierten Antworten, Kapitelverweisen und Textauszügen; kein generatives KI-Modell und keine externe API
- Sechs Arbeitswege mit Checklisten und Notizen
- Lokaler Lesefortschritt und lokale Arbeitsmappe; Export als Markdown und JSON, Import validierter JSON-Sicherungen
- Binomialer Nullausfall-Stichprobenrechner

## Ausführung

`dist/index.html` wird statisch ausgeliefert. Keine Installation und kein Build sind nötig. Alle Assets werden vom selben Ursprung geladen. Kapitel- und Abschnittslinks verwenden Hash-Routen.

`dist/book-data.js` enthält die aus der finalen Word-Fassung extrahierten Kapitel, Abschnitte, Quellen und Abbildungszuordnungen. Die deutsche Word-Fassung ist unter `dist/handbuch.docx` verfügbar.

## Daten und Grenzen

Fragen werden im Arbeitsspeicher dieses Browsers verarbeitet und nicht an einen KI-Anbieter übertragen. Der Assistent verwendet feste Fachantworten und Fundstellen aus V03 und benennt fehlende Grundlage. Er trifft keine Produktfreigaben und ersetzt keinen vollständigen projektspezifischen Nachweis. Arbeitsnotizen werden in `localStorage` gespeichert. Andere Besucher sehen sie nicht. Ein JSON-Import ersetzt den lokalen Arbeitsstand und akzeptiert nur das eigene Sicherungsformat.

Der öffentliche Zugriff wird über die Sites-Zugriffseinstellung gesteuert. Notizen und Fragen sind kein gemeinsamer Serverdatensatz. Es gibt keine Geheimnisse oder API-Schlüssel im Client.

## Prüfung

`node tests/check.mjs` prüft die Inhaltsübernahme, Links, Such- und Antwortlogik, Navigation, Lesefortschritt, Arbeitsmappe, Chat, Abbildungsvergrößerung und Rechner in einer DOM-Testumgebung. Eine echte Browserprüfung steht in dieser Umgebung nicht zur Verfügung.

## Übersetzungen

`translations/build.py` prüft und kompiliert die Übersetzungskataloge. Kapitel- und Abschnittsstruktur, Formeln, HTML-Verweise und Zitationsschlüssel bleiben erhalten. Formale Literaturtitel und der Word-Download bleiben in ihrer Originalsprache. Die gerasterten deutschen Originalabbildungen werden durch übersetzte Beschriftungslegenden im Kapitel, der Galerie und im vergrößerten Dialog ergänzt. Direkte Links mit `?lang=en` oder `?lang=zh` wählen die Sprache vor dem ersten Rendern. Der Sprachwechsel erhält Kapitelroute, Checklisten, Notizen und Lesefortschritt; ein laufender Chat wird neu gestartet.
