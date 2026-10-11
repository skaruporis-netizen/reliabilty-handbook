# Gemeinsam weiterarbeiten

## Lokal beginnen

```sh
git clone https://github.com/skaruporis-netizen/reliabilty-handbook.git
cd reliabilty-handbook
git switch -c topic/meine-aenderung
python3 scripts/verify-baseline.py
python3 scripts/check-generated.py
node tests/check.mjs
python3 -m http.server 8080 --directory dist
```

Die Anwendung ist dann lokal unter `http://localhost:8080` erreichbar. Für diese Schritte reichen Git, Node.js 24 und Python 3; keine npm-Installation ist nötig.

## Änderungen am Handbuch

1. Fachliche Frage, betroffene Kapitel, Ausführung und Quellen im Issue oder Pull Request festhalten.
2. Originale unter `documents/`, die ursprüngliche README und `archive/source-history.bundle` nicht überschreiben. Eine neue Word-Ausgabe als eigene versionierte Datei anlegen.
3. Für vorhandene Inhaltsfelder die deutsche Quelle `translations/de-book.json` und den betreffenden Übersetzungseintrag aktualisieren. Die unveränderten `input-*.json` dokumentieren den ursprünglichen Übersetzungsauftrag; für einen neuen Auftrag eine neue versionierte Eingabe anlegen.
4. Bei neuen oder entfernten Datenfeldern die Pfadzuordnung in `refs.json` und die Übersetzungsschlüssel konsistent ergänzen. Struktur- und Zitationsprüfungen des Compilers müssen bestehen.
5. Für Oberflächentexte `translations/ui.json` pflegen. Abbildungslegenden stehen in `dist/figure-labels.js`; weitere dynamische Sprachzuordnungen in `dist/i18n.js`.
6. `python3 translations/build.py` ausführen und die erzeugten Änderungen in `dist/` mitversionieren.
7. Reproduzierbarkeit und Funktionsprüfungen ausführen. Fachliche Änderungen und ihre Grenzen prüfen lassen; ein grüner Softwaretest ist keine fachliche Freigabe.
8. Pull Request mit Problem, Änderung, Quellen, Auswirkungen auf die anderen Sprachen und Prüfung öffnen.

## Änderungen an der Anwendung

HTML, JavaScript und CSS liegen unmittelbar in `dist/`. Die bestehenden Tests laufen gegen diese tatsächlichen Dateien. Der feste Assistentenkatalog steht in `engine.js`; die Übersetzungen seiner Antworten stehen im UI-Katalog. Deutsche Antworttexte und die passenden Übersetzungsschlüssel müssen gemeinsam angepasst werden.

Die bisherige Anwendung wird in dieser Migration bewusst ohne Änderungen übernommen. Bekannte Grenzen sind in `docs/BASELINE.md` und der ursprünglichen README dokumentiert. Verbesserungen erhalten eigene nachvollziehbare Commits.

## Baseline und Veröffentlichungen

`python3 scripts/verify-baseline.py` prüft die geschützten Originale. `--current` prüft zusätzlich, ob die Arbeitsanwendung noch dem ursprünglichen Import entspricht. Nach beabsichtigter Weiterentwicklung ist eine Abweichung der Arbeitsdateien möglich; die historischen Originale bleiben unverändert. Für eine neue Baseline einen neuen benannten Prüfstand anlegen, statt alte Prüfsummen stillschweigend zu ersetzen.

Die erste Pages-Veröffentlichung wird manuell ausgelöst; danach kann automatische Veröffentlichung aktiviert werden. Details unter `docs/GITHUB_PAGES.md`.
