# Baseline 2026-10-11

## Was unverändert übernommen wurde

Die 39 versionierten Dateien der bestehenden Anwendung wurden aus dem Quellstand `eebbfd990d4002a7ca2c791984e869774a7005d3` übernommen. Die ursprüngliche Anwendungs-README liegt jetzt unter `archive/source-site/README.md`; alle übrigen Pfade bleiben erhalten. Der erste deutschsprachige Anwendungsstand `bae0322687f9a77e8b586568aa086caf8c74c31d` und der mehrsprachige Stand sind vollständig im Git-Bundle archiviert.

Alle bestehenden HTML-, JavaScript-, CSS-, JSON-, Python-, Test-, Bild- und Word-Dateien wurden ohne inhaltliche Überarbeitung kopiert. Die Prüfsummen in `baseline/manifest.json` erlauben den Vergleich. Neue Repository-Dokumentation und neue CI-Prüfungen sind eigene Dateien und keine Änderung des Handbuchs.

Die finale Word-Datei aus ChatGPT und die Word-Datei der bestehenden Anwendung haben denselben SHA-256:

```text
6e7be6ebd941b5beb4f5281cb57eaed4e83508cf163b83e5255c670674035969
```

## Fachliche Versionsfolge

| Reihenfolge | Artefakt | Rolle |
| --- | --- | --- |
| 1 | `Zuverlaessigkeit_Roentgensysteme_Strukturkonzept_V01.docx` | Ursprüngliches Strukturkonzept einschließlich recherchierter Quellen und Schaubilder. |
| 2 | `Lehrhandbuch_Zuverlaessigkeit_Roentgensysteme_V01.docx` | Erste ausgearbeitete Lehrhandbuchfassung. |
| 3 | `Claudexyz.docx` | Erster Gegenentwurf und Review; Original bleibt historisch erhalten. |
| 4 | `ChatGPT_XYZ2.docx` | Überarbeitete zweite Fassung. |
| 5 | `Claudexyz_V02.docx` | Review von XYZ2 und Arbeitsauftrag für V03. |
| 6 | `ChatGPT_XYZ3_Final.docx` | Finale fachliche Fassung für die bestehende Anwendung. |
| 7 | Anwendungsstand `bae0322…` | Deutsche interaktive Anwendung. |
| 8 | Anwendungsstand `eebbfd9…` | Sprachumschaltung DE / EN / 简体中文 samt Übersetzungen. |

Ältere Fassungen werden nicht mit V03 vermischt. Aussagen in einem historischen Review sind Vorschläge beziehungsweise Befunde zum damaligen Stand; aus ihrer Archivierung folgt keine zusätzliche fachliche Freigabe.

## Nachweis der Übernahme

- `baseline/manifest.json` enthält SHA-256, Größe und Herkunft für die geschützten Originale sowie Prüfsummen aller übernommenen Anwendungsdateien.
- `baseline/inventory.json` ordnet die gefundenen Dokumente ihren Originalnamen und Fundorten zu.
- `baseline/site-provenance.json` hält den bisher veröffentlichten Stand, seine Versionen und seine URL fest.
- `baseline/content-counts.json` hält Strukturzahlen je Sprache fest.
- `scripts/verify-baseline.py --current` prüft die exakte Übereinstimmung der Arbeitskopie mit dem importierten Stand.
- `scripts/check-generated.py` führt den vorhandenen Übersetzungscompiler in einem temporären Verzeichnis aus und vergleicht seine Ausgaben bytegenau mit `dist/`.
- `tests/check.mjs` prüft das tatsächliche Anwendungs-JavaScript einschließlich der Sprachumschaltung.

## Grenzen des Archivs

Die Google Docs der beiden Claude-Reviews wurden vom Anbieter als DOCX exportiert; ein Google Doc hat keine unveränderte ursprüngliche DOCX-Bytefolge. Die gelieferten Exporte sind deshalb als Exporte bezeichnet und wurden danach unverändert gespeichert. Die zugehörigen Drive-Kommentarabfragen lieferten am Migrationstag für alle vier Dateien im Projektordner keine Kommentar-Threads.

Die verfügbaren Nutzertexte sind im Wortlaut archiviert. Es liegt kein vollständiger Chat-Export mit sämtlichen früheren Assistentenantworten und Suchläufen vor. Das Anforderungsarchiv wird deshalb ausdrücklich nicht als vollständiges Gesprächsprotokoll ausgegeben. Nicht gefundene ursprüngliche Arbeitsdateien oder Skripte zur Erstellung des Word-Handbuchs wurden nicht rekonstruiert oder als Originale dargestellt. Die vorhandenen Word-Dateien, ihre eingebetteten Inhalte, die Quellenverzeichnisse und alle versionierten Anwendungsdateien bleiben vollständig erhalten.

Die Baseline bestätigt Vollständigkeit gegenüber den inventarisierten Artefakten. Sie ist keine neue unabhängige fachliche, regulatorische oder Übersetzungsfreigabe. Die vorhandene programmatische Prüfung ersetzt keine Browserprüfung; eine Browserdarstellung wurde in dieser Umgebung nicht erneut direkt geprüft.

## Weiterentwicklung

Die Originale und das Git-Bundle behalten ihre historischen Prüfsummen. Änderungen erfolgen an den Arbeitsdateien über einen neuen Branch und einen nachvollziehbaren Commit. Eine neue fachliche Ausgabe erhält einen neuen Dateinamen und eine eigene Versionszuordnung. Für eine neue Baseline wird eine neue Manifestdatei erzeugt; das Manifest dieser Migration bleibt erhalten.
