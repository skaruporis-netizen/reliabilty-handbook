# Experten-Review – Anwendung 1.1.0

## Für Leser

Ein Kapitel öffnen und „Hinweis geben“ neben dem Kapitel oder einem Abschnitt anklicken. Optional vorher einen Satz markieren. Ein kurzer fachlicher Hinweis reicht. „Auf GitHub speichern“ öffnet einen vorausgefüllten Vorgang. Erst „Submit new issue“ auf GitHub speichert ihn zentral und ordnet ihn dem angemeldeten GitHub-Nutzer zu. Ohne diesen letzten Schritt existiert kein gespeicherter Kommentar. Die Vorgänge sind öffentlich. Kein API-Schlüssel wird im Browser benötigt. Die Seite speichert keine lokalen Review-Entwürfe.

Die Eingabe enthält Anwendungsversion, Inhaltsversion, genauen Quellcommit, Sprache, stabile Abschnittskennung und optional ein Zitat. Der Link zur Live-Seite dient der Navigation; der verlinkte Quellcommit bewahrt die alte Fassung. Die deutsche Word-Datei bleibt die originale XYZ3-Fassung und wird durch diese Funktionserweiterung nicht redaktionell geändert.

„Experten-Review · v1.1“ öffnet die zentrale Übersicht. Sie liest die neuesten 100 Issues aus der öffentlichen GitHub-API und zeigt Review-Vorgänge. Für ältere Vorgänge und bei API-Limits gibt es einen direkten GitHub-Link. „Geschlossen“ ist kein Umsetzungsnachweis.

## Für Verantwortliche

1. Originalkommentar unverändert lassen. Interpretationen und Ergänzungen als Antworten anfügen.
2. Fachlich prüfen und Entscheidung (angenommen, teilweise angenommen, zurückgestellt oder abgelehnt), Verantwortlichen, Datum und Begründung als Antwort dokumentieren. Checklistenschritte im Issue nachführen.
3. Bei Annahme den Vorgang auf GitHub Copilot zuweisen, sofern der Cloud Agent im Konto/Repository verfügbar ist. Alternativ „Redaktionsauftrag kopieren“ nutzen und den Auftrag mit dem Issue-Link in einem autorisierten KI-Werkzeug bearbeiten.
4. Copilot erstellt einen Änderungsvorschlag als Pull Request nach .github/copilot-instructions.md. KI läuft nicht im Browser und startet durch Absenden eines Kommentars nicht automatisch.
5. Fachlicher Verantwortlicher prüft Inhalt und Übersetzungen. Freigabe erfolgt ausdrücklich auf dem Pull Request.
6. Erst nach Übernahme und erfolgreicher Pages-Veröffentlichung den Commit und die neue Version im ursprünglichen Issue verlinken. Dann als umgesetzt schließen. Ablehnung mit Begründung schließen; Zurückstellung offen lassen.

## Historie und Datenmodell

GitHub speichert Kommentarverläufe, Antworten und verknüpfte Pull Requests; Git speichert Inhaltsänderungen. Dies ist eine nachvollziehbare Arbeitsgeschichte, kein unveränderliches Audit-Archiv: berechtigte Nutzer können Kommentare ändern oder löschen.

Die Ausgangskennung jedes Abschnitts steht in dist/review-anchors.js. Die Nummern sind permanente IDs, keine laufenden Kapitelnummern. Die Zuordnung folgt aktuell den Arrays der Kapitel. Bei einer Einfügung/Verschiebung muss die Zuordnung mitverschoben werden; für neue Abschnitte neue IDs vergeben, vorhandene IDs nie neu verwenden. baselineHash beschreibt den Abschnitt beim erstmaligen Anlegen und wird nicht überschrieben.

Alle drei Sprachen nutzen dieselben Kennungen. Fachliche Änderungen werden zuerst in der Ausgangssprache freigegeben; übersetzte Fassungen anschließend abgleichen. Sprachliche Hinweise können separat korrigiert werden.

version.json wird beim Pages-Build mit dem exakten GITHUB_SHA gestempelt. Der Commit ist die eindeutige Fassung, auch wenn die semantische Versionsnummer noch unverändert ist.

## Veröffentlichung

Da Pages bereits erfolgreich aktiviert wurde, veröffentlicht der Workflow nun geprüfte Pushes auf main automatisch. Pull Requests werden nur geprüft. Der manuelle Workflow bleibt verfügbar. Keine Fachinhalte wurden für Version 1.1.0 geändert.
