# Die vorhandene Anwendung mit GitHub Pages veröffentlichen

## Was vorbereitet ist

Die Anwendung in `dist/` ist dieselbe statische Anwendung wie im bisherigen Sites-Stand. Relative Asset-Pfade und Hash-Routen eignen sich bereits für eine GitHub-Projektseite unter einem Repository-Unterpfad. Der Workflow veröffentlicht ausschließlich `dist/`: `index.html`, die JavaScript- und CSS-Dateien, die Bilder und den bestehenden Word-Download. Eine erneute inhaltliche Erzeugung, ein Framework-Wechsel und API-Schlüssel sind dafür nicht nötig.

## Einmalige Einstellung auf GitHub

1. Öffne [die Pages-Einstellungen dieses Repositorys](https://github.com/skaruporis-netizen/reliabilty-handbook/settings/pages).
2. Wähle unter **Build and deployment → Source** die Option **GitHub Actions**.
3. Öffne [Actions](https://github.com/skaruporis-netizen/reliabilty-handbook/actions).
4. Wähle **Handbook · Verify and publish**.
5. Klicke **Run workflow**, wähle `main` und aktiviere **Publish to GitHub Pages**.
6. Starte den Lauf. Nach erfolgreichem Abschluss erscheint die tatsächlich veröffentlichte URL im Environment `github-pages` und im Laufprotokoll. Erst diese von GitHub bestätigte URL gilt als veröffentlichter Link.

Die GitHub-Einstellung ist ein eigener Administrationsschritt. Der verbundene GitHub-Connector stellt dafür keine Pages-Konfigurationsaktion bereit. Ein vorbereiteter Workflow allein bestätigt noch keine aktive Pages-Website.

## Was jeder Lauf tut

1. Geschützte Originale und archivierte Quellhistorie auf unveränderte Prüfsummen prüfen.
2. Übersetzungsausgaben im temporären Verzeichnis reproduzieren und vergleichen.
3. Die bestehenden Funktionsprüfungen in drei Sprachen ausführen.
4. Den unveränderten Inhalt von `dist/` als Pages-Artefakt hochladen.
5. Bei ausdrücklich gewählter Veröffentlichung oder aktivierter automatischer Veröffentlichung dieses Artefakt auf GitHub Pages bereitstellen.

Pull Requests prüfen nur; sie veröffentlichen keine Website. Bei einem normalen Push auf `main` werden anfangs nur Prüfungen und Artefaktablage ausgeführt. Das verhindert einen fehlgeschlagenen Veröffentlichungsversuch, solange Pages noch nicht eingerichtet ist.

## Später automatisch veröffentlichen

Wenn die erste Veröffentlichung funktioniert, kannst du unter **Settings → Secrets and variables → Actions → Variables** eine Repository-Variable mit dem Namen `PAGES_ENABLED` und dem Wert `true` anlegen. Danach veröffentlichen erfolgreiche Pushes auf `main` automatisch. Ohne diese Variable bleibt die Veröffentlichung manuell steuerbar. Es wird kein Secret benötigt.

## Dieselben Dateien nachweisen

Vor der ersten Veröffentlichung:

```sh
python3 scripts/verify-baseline.py --current
```

Das prüft, ob die importierten Arbeitsdateien noch exakt dem bisherigen Anwendungsstand entsprechen. GitHub Pages liefert sie auf einer neuen Domain aus; Hostname und Browser-Speicher ändern sich, der ausgelieferte Anwendungsinhalt bleibt derselbe.

## Eigene Notizen mitnehmen

Auf der bisherigen Website **Meine Arbeitsmappe → Sicherung exportieren** auswählen. Auf GitHub Pages **Sicherung importieren** verwenden. Browser-Speicher ist an die Domain gebunden; GitHub speichert die persönlichen Notizen nicht automatisch und stellt sie anderen Besuchern nicht bereit.

## Zurücksetzen

Eine Änderung an der Arbeitsanwendung kann mit einem neuen Revert-Commit auf `main` zurückgenommen werden. Anschließend denselben Workflow erneut veröffentlichen. Keine Branch-Historie überschreiben. Die unveränderte ursprüngliche Anwendung ist zusätzlich im Git-Bundle verfügbar; siehe `docs/BASELINE.md`.

## Offizielle Grundlagen

- [GitHub: Veröffentlichungsquelle konfigurieren](https://docs.github.com/de/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub: Eigene Workflows für Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
