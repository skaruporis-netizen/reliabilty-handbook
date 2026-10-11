# Reliability Handbook

Arbeitsrepository für das Lehrhandbuch **Zuverlässigkeit von Röntgensystemen** und die zugehörige interaktive Anwendung in Deutsch, Englisch und vereinfachtem Chinesisch.

Diese Baseline übernimmt den bestehenden Stand vom 11. Oktober 2026. Die importierten Originaldateien und die Anwendung wurden inhaltlich und bytegenau erhalten. Neue Anleitungen und Prüfungen stehen separat. Die finale fachliche Fassung ist **ChatGPT XYZ3 Final, V03 vom 9. Oktober 2026**; ältere Fassungen und Reviews bleiben als historische Quellen erhalten.

## Direkt einsteigen

- [Finales Handbuch als Word-Datei](documents/current/ChatGPT_XYZ3_Final.docx)
- [Vorhandene veröffentlichte Anwendung](https://reliability-handbuch.skaruporis.chatgpt.site)
- [GitHub Pages aktivieren und veröffentlichen](docs/GITHUB_PAGES.md)
- [Lokal arbeiten und Änderungen prüfen](CONTRIBUTING.md)
- [Herkunft, Umfang und Grenzen der Baseline](docs/BASELINE.md)
- [Technischer Aufbau und Datenfluss](docs/ARCHITECTURE.md)
- [Dateiverzeichnis mit Herkunftsnachweisen](baseline/inventory.json)
- [Unveränderte Nutzeranforderungen aus dem verfügbaren Verlauf](requirements/user-requests.md)

## Struktur

| Pfad | Inhalt und Rolle |
| --- | --- |
| `dist/` | Vollständige bestehende Webanwendung, unverändert; genau dieses Verzeichnis wird als Pages-Artefakt veröffentlicht. |
| `translations/` | Ursprüngliche deutsche Inhaltsdaten, Übersetzungseingaben und -ausgaben, UI-Katalog und Compiler; unverändert übernommen. |
| `tests/check.mjs` | Bereits vorhandene Funktionsprüfungen für alle drei Sprachen; unverändert übernommen. |
| `documents/current/` | Finale Word-Fassung XYZ3; identisch mit dem Download in `dist/`. |
| `documents/history/` | Strukturkonzept, Lehrhandbuch V01, XYZ2 und die drei früheren Originaldiagramme. |
| `documents/reviews/` | Beide Claude-Reviews als DOCX-Export der Google Docs. |
| `archive/source-history.bundle` | Vollständige bisherige Git-Historie der Anwendung mit beiden Entwicklungsständen. |
| `archive/source-site/README.md` | Unveränderte bisherige Anwendungsdokumentation. |
| `archive/github-initial-README.md` | Unveränderte anfängliche README dieses GitHub-Repositorys; der ursprüngliche Commit bleibt zusätzlich in der Branch-Historie. |
| `baseline/` | Prüfsummen, Herkunft, Inhaltszahlen und Versionszuordnung. |
| `docs/` | Neue Arbeitsanleitungen, Veröffentlichung, Architektur und bekannte Grenzen. |
| `requirements/` | Verfügbare ursprüngliche Nutzeranforderungen im Wortlaut. |
| `scripts/` | Neue Prüfungen für Baseline und reproduzierbare Übersetzungsausgaben. |
| `.github/workflows/` | Prüfen, das unveränderte `dist/` als Artefakt ablegen und nach Aktivierung GitHub Pages veröffentlichen. |
| `.openai/hosting.json` | Unverändert übernommene Konfiguration der bisherigen Sites-Veröffentlichung. Für GitHub Pages wird sie nicht benötigt. |

## Umfang der Anwendung

20 Kapitel, fünf Anhänge, ein Quellenkapitel, 235 Abschnitte, zehn Originalabbildungen und 19 MathML-Formeln pro Sprache. Dazu kommen sechs Arbeitswege mit Checklisten, Volltextsuche, ein handbuchgebundener Assistent, ein Nullausfall-Stichprobenrechner sowie lokale Notizen und Lesefortschritt mit Export und Import.

Der Assistent verwendet feste Fachantworten und Fundstellen. Er benötigt keinen API-Schlüssel und ist kein generatives KI-Modell. Die deutschen Originalgrafiken haben englische und chinesische Beschriftungslegenden; der Word-Download bleibt deutsch. Diese Eigenschaften wurden bei der Migration beibehalten.

## Prüfen

Voraussetzungen: Git, Node.js 24 und Python 3. Es werden keine npm-Abhängigkeiten benötigt.

```sh
python3 scripts/verify-baseline.py --current
python3 scripts/check-generated.py
node tests/check.mjs
```

`--current` vergleicht zusätzlich die Arbeitsdateien mit dem importierten Stand. Nach bewussten Weiterentwicklungen können diese Unterschiede erwartet sein; die archivierte Baseline bleibt separat überprüfbar mit `python3 scripts/verify-baseline.py`.

## Veröffentlichung

Der Workflow **Handbook · Verify and publish** prüft Änderungen an `main` und Pull Requests und legt `dist/` als GitHub-Pages-Artefakt ab. Die eigentliche Pages-Veröffentlichung ist zunächst ein ausdrücklich gewählter manueller Lauf. Nach der einmaligen Aktivierung unter **Settings → Pages → Source: GitHub Actions** kann die Anwendung veröffentlicht werden. Siehe [Schritt-für-Schritt-Anleitung](docs/GITHUB_PAGES.md).

Die Migration ändert die bestehende Sites-Veröffentlichung nicht. Eine neue GitHub-Pages-Domain hat einen anderen Browser-Speicher: vorhandene Notizen zuerst als JSON exportieren und auf der neuen Domain importieren.
