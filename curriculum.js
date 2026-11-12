window.GP1_FLASHCARDS = [
  {
    "q": "Was ist der Unterschied zwischen 'Sequenziell', 'Nebenläufig' und 'Parallel'?",
    "a": "Sequenziell: Eins nach dem anderen.\nNebenläufig (Concurrent): Mehrere Aufgaben wechseln sich auf z. B. einem Kern schnell ab.\nParallel: Mehrere Aufgaben laufen zeitgleich auf mehreren CPU-Kernen.",
    "tag": "Welt 1"
  },
  {
    "q": "Welche 3 elementaren Kontrollstrukturen gibt es in jedem Algorithmus?",
    "a": "1. Sequenz (Anweisungen nacheinander)\n2. Selektion (Verzweigung: if / else / switch)\n3. Iteration (Wiederholung / Schleife: while, for, do-while)",
    "tag": "Welt 1"
  },
  {
    "q": "Welche 4 Phasen durchläuft ein C-Programm beim Übersetzen (Compile-Link-Zyklus)?",
    "a": "1. Präprozessor (#include, #define auflösen)\n2. Compiler (C-Code -> Assembler)\n3. Assembler (Assembler -> Objektcode .o/.obj)\n4. Linker (Objektcode + Bibliotheken -> ausführbare .exe)",
    "tag": "Welt 2"
  },
  {
    "q": "Warum ergibt `5 / 9` in C das Ergebnis `0`?",
    "a": "Weil `5` und `9` beides ganze Zahlen (<code>int</code>) sind! C führt dann eine Ganzzahldivision durch und schneidet die Nachkommastellen radikal ab. Lösung: `5.0 / 9.0` oder `5.0 / 9` schreiben!",
    "tag": "Welt 3"
  },
  {
    "q": "Warum braucht `scanf(\"%d\", &x)` das kaufmännische Und (`&`), `printf(\"%d\", x)` aber nicht?",
    "a": "`printf` muss den Wert von `x` nur lesen (Call-by-Value). `scanf` muss das Ergebnis in die Variable `x` hineinschreiben und braucht deshalb ihre Hausnummer im Speicher (die Adresse `&x`).",
    "tag": "Welt 4"
  },
  {
    "q": "Was passiert beim Input-Buffering, wenn man nach `scanf()` ein Zeichen einliest?",
    "a": "Wenn der Nutzer z. B. `42` tippt und Enter drückt, landet `42\\n` im Eingabepuffer. `scanf(\"%d\", &x)` liest nur `42`, das `\\n` (Newline) bleibt im Puffer liegen und wird vom nächsten Lese-Befehl sofort verschluckt!",
    "tag": "Welt 4"
  },
  {
    "q": "Was ist der Unterschied zwischen `=` und `==` in C?",
    "a": "`=` ist eine Wertzuweisung (`x = 5` speichert 5 in x).\n`==` ist ein Vergleich (`x == 5` prüft, ob x gleich 5 ist).\nKlausurfalle: `if (x = 5)` ist in C immer wahr (weil 5 != 0 ist)!",
    "tag": "Welt 5"
  },
  {
    "q": "Wie viel Speicherplatz braucht der String `\"THI\"` in einem C-char-Array?",
    "a": "4 Bytes! Für `'T'`, `'H'`, `'I'` und das unsichtbare Nullbyte `'\\0'` am Ende, das in C das Ende jedes Strings markiert.",
    "tag": "Welt 6"
  },
  {
    "q": "Was bedeutet Call-by-Value bei Funktionen in C?",
    "a": "Funktionen erhalten standardmäßig nur eine Kopie der übergebenen Werte. Ändert die Funktion ihren Parameter, bleibt das Original in `main()` unverändert – außer man übergibt einen Pointer (`int *p`)!",
    "tag": "Welt 7"
  },
  {
    "q": "Was hat sich beim Datentyp `bool` von C99/C17 auf C23 geändert?",
    "a": "In C99/C17 gab es `_Bool` und man musste `#include <stdbool.h>` einbinden. Seit C23 sind `bool`, `true` und `false` direkte Sprach-Keywords (ohne Header!).",
    "tag": "Welt 8"
  },
  {
    "q": "Was bewirkt `typedef enum ResCodes { OK, ERROR } rescodes_t;`?",
    "a": "`enum ResCodes` definiert die Aufzählung (OK=0, ERROR=1). `typedef ... rescodes_t` vergibt dafür den kurzen Typ-Spitznamen `rescodes_t`, sodass man `enum` nicht mehr jedes Mal mitschreiben muss.",
    "tag": "Welt 8"
  }
];

window.GP1_WORLDS = [
  {
    "id": "w1",
    "number": 1,
    "title": "Welt 1: Denken wie ein Programmierer & Pseudocode",
    "subtitle": "Folien 52–91 • Sequenziell vs. Parallel, Kontrollstrukturen & Pseudocode",
    "icon": "🧠",
    "color": "#6366f1",
    "badgeId": "pseudo_pro",
    "lessons": [
      {
        "title": "1. Was heißt eigentlich Programmieren? (Folie 52–60)",
        "content": "\n          <p>Willkommen bei <strong>Grundlagen der Programmierung 1 (GP1)</strong>! Bevor wir die erste Zeile C-Code tippen, klärt Prof. Wamser in den Folien 52–60 drei wichtige Grundbegriffe, die gerne in Klausuren abgefragt werden:</p>\n          <div class=\"concept-grid\">\n            <div class=\"concept-card\">\n              <h4>1️⃣ Sequenziell</h4>\n              <p>Anweisungen werden strikt <strong>nacheinander</strong> ausgeführt – wie ein Kochrezept Schritt für Schritt von oben nach unten. Erst wenn Schritt 1 fertig ist, startet Schritt 2.</p>\n            </div>\n            <div class=\"concept-card\">\n              <h4>2️⃣ Nebenläufig (Concurrent)</h4>\n              <p>Mehrere Aufgaben sind gleichzeitig „in Bearbeitung“, wechseln sich aber extrem schnell ab (z. B. ein Koch rührt die Suppe, schneidet kurz Gemüse, rührt wieder).</p>\n            </div>\n            <div class=\"concept-card\">\n              <h4>3️⃣ Parallel</h4>\n              <p>Mehrere Aufgaben laufen <strong>exakt zur selben Zeit</strong> auf verschiedenen Prozessorkernen ab (z. B. zwei Köche schneiden gleichzeitig an zwei Brettern).</p>\n            </div>\n          </div>\n          <div class=\"trap-box\">\n            <strong>🎯 Merke für GP1:</strong> Unsere C-Programme in GP1 laufen <strong>sequenziell</strong> ab – Zeile für Zeile von oben nach unten!\n          </div>\n        "
      },
      {
        "title": "2. Die 3 Bausteine jedes Programms (Folie 61–86)",
        "content": "\n          <p>Egal ob WhatsApp, ein Autopilot oder ein kleines C-Programm: <strong>Jeder Algorithmus der Welt</strong> besteht aus nur drei Kontrollstrukturen:</p>\n          <ul>\n            <li><strong>Sequenz (Abfolge):</strong> Tu erst A, dann B, dann C.</li>\n            <li><strong>Selektion (Verzweigung / Auswahl):</strong> <code>WENN (Bedingung wahr) DANN ... SONST ...</code> (in C: <code>if / else</code> und <code>switch</code>).</li>\n            <li><strong>Iteration (Schleife / Wiederholung):</strong> <code>SOLANGE (Bedingung wahr) WIEDERHOLE ...</code> (in C: <code>while</code>, <code>for</code>, <code>do-while</code>).</li>\n          </ul>\n          <p>Dazu kommen <strong>Variablen</strong> (benannte Behälter im Speicher, deren Wert sich ändern kann, z. B. <code>summe = 0</code>) und <strong>Konstanten</strong> (feste Werte wie <code>PI = 3.1415</code>).</p>\n        "
      },
      {
        "title": "3. Warum Pseudocode? (Folie 64–91)",
        "content": "\n          <p>Als Anfänger hat man oft zwei Probleme gleichzeitig: <em>„Wie löse ich das Problem logisch?“</em> und <em>„Wo muss in C ein Semikolon oder eine Klammer hin?“</em></p>\n          <p>Deshalb nutzt Prof. Wamser <strong>Pseudocode</strong>: Du schreibst die Logik erst auf Deutsch/Englisch auf, ohne dich um C-Syntaxregeln zu kümmern!</p>\n          <pre class=\"code-preview\">\n// Beispiel aus der Vorlesung (Folie 75/76): Summe & Mittelwert\nsumme = 0\nanzahl = 0\nSOLANGE noch eine Zahl x vorhanden ist:\n    summe = summe + x\n    anzahl = anzahl + 1\nmittelwert = summe / anzahl\nGIB mittelwert AUS</pre>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w1_q1",
        "question": "Ein PC hat nur 1 Prozessorkern, führt aber scheinbar gleichzeitig Musik und einen Webbrowser aus, indem er im Millisekunden-Takt zwischen beiden wechselt. Wie nennt Prof. Wamser das (Folie 55–60)?",
        "options": [
          "Echte Parallelität: Der einzelne Kern berechnet mehrere Threads physikalisch im selben Taktzyklus gleichzeitig.",
          "Nebenläufigkeit (Concurrent): Aufgaben überlappen sich zeitlich durch schnelles Hin- und Herschalten, laufen aber auf einem Kern nie im selben Nanosekundenbruchteil.",
          "Reine Serialität: Ein Programm muss erst komplett beendet und geschlossen werden, bevor ein anderes starten darf.",
          "Kompilierungs-Multiplexing: Der C-Compiler verschmilzt die Quellcodes beider Programme zu einer gemeinsamen Binärdatei."
        ],
        "correct": 1,
        "explanation": "Richtig! Nebenläufigkeit bedeutet, dass Aufgaben sich zeitlich überlappen und abwechseln. Echte Parallelität erfordert zwingend mehrere physische Ausführungseinheiten (Kerne) zur exakt selben Zeit."
      },
      {
        "id": "w1_q2",
        "question": "Welche der folgenden ist KEINE der drei klassischen Kontrollstrukturen (Folie 61/77)?",
        "options": [
          "Sequenz: Lineare Aneinanderreihung von Befehlen, die nacheinander abgearbeitet werden.",
          "Selektion: Bedingte Verzweigung zur Auswahl verschiedener Programmpfade.",
          "Kompilierung: Das automatische Übersetzen des menschenlesbaren Codes in Maschinensprache.",
          "Iteration: Wiederholtes Durchlaufen von Befehlen in Form einer Schleife."
        ],
        "correct": 2,
        "explanation": "Genau! Sequenz, Selektion und Iteration sind die drei theoretischen Kontrollstrukturen. Die Kompilierung ist der Übersetzungsvorgang durch den Compiler, aber keine logische Kontrollstruktur im Algorithmus."
      },
      {
        "id": "w1_q3",
        "question": "Was passiert bei der Wertzuweisung `a = b` in der Programmierung (Folie 72/73)?",
        "options": [
          "Die beiden Variablen `a` und `b` werden dauerhaft mathematisch aneinander gekoppelt.",
          "Es wird ein boolescher Vergleich durchgeführt, der prüft, ob die Werte in `a` und `b` identisch sind.",
          "Der aktuelle Speicherinhalt von `a` wird in die Speicherstelle von `b` übertragen.",
          "Der aktuelle Wert des rechten Ausdrucks `b` wird ausgewertet und in den Speicherbehälter der linken Variablen `a` kopiert."
        ],
        "correct": 3,
        "explanation": "Wichtiges Grundprinzip: Eine Wertzuweisung arbeitet immer von RECHTS nach LINKS! Rechts wird der Wert ermittelt und das Ergebnis überschreibt den bisherigen Inhalt im Behälter links (`a`)."
      },
      {
        "id": "w1_q4",
        "question": "Warum schreibt man vor dem C-Programmieren oft erst Pseudocode (Folie 64)?",
        "options": [
          "Um sich strukturiert auf die reine Logik des Algorithmus zu konzentrieren, ohne durch Syntaxdetails und Semikolons abgelenkt zu werden.",
          "Weil moderne C-Compiler den Pseudocode vor dem Kompilieren für eine schnellere CPU-Ausführung benötigen.",
          "Weil C als hardwarenahe Programmiersprache von Haus aus keine Schleifen oder Verzweigungen ausdrücken kann.",
          "Damit das Betriebssystem den Programmcode bereits vorab statisch im RAM reservieren und komprimieren kann."
        ],
        "correct": 0,
        "explanation": "Genau! Pseudocode trennt das logische Denken (Was soll in welcher Reihenfolge passieren?) von der sprachspezifischen Syntax (Wie tippe ich das syntaktisch korrekt in C?)."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle (Folie 75): Größte Zahl (Maximum) finden",
      "instruction": "Bringe die Schritte des Pseudocode-Algorithmus aus Prof. Wamsers Übung (Folie 75) in die richtige logische Reihenfolge, um die größte Zahl aus einer Liste zu finden!",
      "lines": [
        "Setze `max` auf die allererste Zahl der Liste",
        "SOLANGE noch weitere Zahlen in der Liste sind:",
        "    Lies die nächste Zahl `x`",
        "    WENN `x` größer als `max` ist:",
        "        Setze `max = x`",
        "GIB `max` als größte Zahl aus"
      ]
    },
    "boss": {
      "title": "Boss-Quest 1: Dein erster Schritt im echten C-Labor!",
      "description": "Zeit, zum ersten Mal den echten C-Compiler auf deinem PC anzuwerfen! Unten siehst du ein kleines C-Programm, das die Summe und den Mittelwert von drei Zahlen (10, 20 und 30) berechnet – genau wie in der Pseudocode-Übung auf Folie 76.\n\n**Deine Aufgabe:**\nÄndere die dritte Zahl `z3` von `30` auf `60`, damit die Summe `90` und der Mittelwert `30` ausgegeben wird. Klicke dann auf **„Kompilieren & Ausführen“**!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int z1 = 10;\n    int z2 = 20;\n    int z3 = 30; // <-- Ändere diesen Wert auf 60!\n\n    int summe = z1 + z2 + z3;\n    int mittelwert = summe / 3;\n\n    printf(\"Summe: %d\\n\", summe);\n    printf(\"Mittelwert: %d\\n\", mittelwert);\n    return 0;\n}",
      "stdin": "",
      "expectedOutputContains": [
        "Summe: 90",
        "Mittelwert: 30"
      ],
      "hint": "Suche die Zeile `int z3 = 30;` und ersetze die `30` durch `60`. Vergiss das Semikolon `;` am Ende der Zeile nicht!",
      "solution": "#include <stdio.h>\n\nint main(void) {\n    int z1 = 10;\n    int z2 = 20;\n    int z3 = 60;\n\n    int summe = z1 + z2 + z3;\n    int mittelwert = summe / 3;\n\n    printf(\"Summe: %d\\n\", summe);\n    printf(\"Mittelwert: %d\\n\", mittelwert);\n    return 0;\n}"
    }
  },
  {
    "id": "w2",
    "number": 2,
    "title": "Welt 2: Der Compile-Link-Zyklus & Hallo Welt",
    "subtitle": "Folien 92–102 • Vom Quellcode zur .exe, C vs. Java vs. Skriptsprache",
    "icon": "⚙️",
    "color": "#0ea5e9",
    "badgeId": "compiler_whisperer",
    "lessons": [
      {
        "title": "1. Der Weg zum fertigen C-Programm (Folie 96–102)",
        "content": "\n          <p>Dein Prozessor (CPU) versteht kein Wort C – er versteht nur Einsen und Nullen (Maschinencode). Damit aus deiner Textdatei <code>programm.c</code> ein ausführbares Programm <code>programm.exe</code> wird, durchläuft sie <strong>4 Stationen</strong>:</p>\n          <div class=\"pipeline-steps\">\n            <div class=\"pipe-step\"><strong>1. Präprozessor</strong><br><small>Verarbeitet alle Zeilen mit <code>#</code> (z. B. fügt <code>#include &lt;stdio.h&gt;</code> ein und ersetzt <code>#define</code>).</small></div>\n            <div class=\"pipe-arrow\">➔</div>\n            <div class=\"pipe-step\"><strong>2. Compiler</strong><br><small>Prüft die Syntax und übersetzt den C-Code in prozessornahen Assembler-Code.</small></div>\n            <div class=\"pipe-arrow\">➔</div>\n            <div class=\"pipe-step\"><strong>3. Assembler</strong><br><small>Macht daraus binären Objektcode (<code>programm.o</code> / <code>.obj</code>) – noch mit Lücken für Bibliotheken.</small></div>\n            <div class=\"pipe-arrow\">➔</div>\n            <div class=\"pipe-step\"><strong>4. Linker</strong><br><small>Verbindet deinen Objektcode mit der C-Standardbibliothek (z. B. dem Code für <code>printf</code>) zur fertigen <code>.exe</code>!</small></div>\n          </div>\n          <div class=\"trap-box\">\n            <strong>💡 Klausur-Vergleich (Folie 98–100):</strong><br>\n            • <strong>C:</strong> Wird direkt in nativen Maschinencode für dein Betriebssystem übersetzt (extrem schnell!).<br>\n            • <strong>Java:</strong> Wird in Bytecode (<code>.class</code>) übersetzt, der auf einer virtuellen Maschine (JVM) läuft.<br>\n            • <strong>Skriptsprachen (Python/JS):</strong> Werden zur Laufzeit Zeile für Zeile von einem Interpreter ausgeführt.\n          </div>\n        "
      },
      {
        "title": "2. Anatomie von „Hallo Welt“ (Folie 94 & 108)",
        "content": "\n          <p>Schauen wir uns jedes einzelne Wort eines minimalen C-Programms an:</p>\n          <pre class=\"code-preview\">\n#include &lt;stdio.h&gt;   // 1. Präprozessor: Lade Standard-Input/Output (für printf)\n\nint main(void) {     // 2. Startpunkt jedes C-Programms!\n    printf(\"Hallo Welt!\\n\"); // 3. Gib Text aus (\\n = Zeilenumbruch)\n    return 0;        // 4. Melde ans Betriebssystem: \"Alles fehlerfrei (0)!\"\n}</pre>\n          <ul>\n            <li><strong>Warum <code>int main(void)</code>?</strong> Jedes C-Programm startet exakt bei <code>main</code>. <code>void</code> in der Klammer heißt: „nimmt keine Startparameter entgegen“. <code>int</code> davor heißt: „gibt am Ende eine ganze Zahl ans Betriebssystem zurück“ (<code>0</code> = Erfolg).</li>\n          </ul>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w2_q1",
        "question": "Welche Komponente ist dafür zuständig, deinen übersetzten Objektcode (`main.o`) mit dem fertigen Code von `printf()` aus der Standardbibliothek zur ausführbaren Datei zusammenzubauen (Folie 97/101)?",
        "options": [
          "Der Präprozessor: Er scannt den Text vorab und ersetzt Platzhalter wie `#define` und `#include`.",
          "Der Linker: Er verbindet die einzelnen Objektdateien mit den Bibliotheksfunktionen zur fertigen ausführbaren Binärdatei.",
          "Der Debugger: Er überwacht die Laufzeit und hält das Programm bei Speicherfehlern an.",
          "Der Assembler: Er formatiert den fertigen C-Code für die Darstellung auf dem Terminal."
        ],
        "correct": 1,
        "explanation": "Genau! Der Linker ('Binder') verknüpft (linkt) deine Objektdateien mit den genutzten Bibliotheksfunktionen wie `printf` zur fertigen ausführbaren Datei."
      },
      {
        "id": "w2_q2",
        "question": "Woran erkennt man im C-Quellcode Befehle für den Präprozessor (Folie 134)?",
        "options": [
          "Sie werden durch zwei vorangestellte Schrägstriche `//` als Systemaufrufe gekennzeichnet.",
          "Sie stehen zwingend als letzte Zeilen am Ende der schließenden geschweiften Klammer von `main`.",
          "Sie beginnen immer mit einem Raute-Zeichen `#` am Zeilenanfang (wie `#include` oder `#define`).",
          "Sie enden im Gegensatz zu normalen C-Befehlen immer mit zwei aufeinanderfolgenden Semikolons `;;`."
        ],
        "correct": 2,
        "explanation": "Alle Präprozessor-Direktiven beginnen mit `#` (wie `#include <stdio.h>` oder `#define MAX 100`) und werden VOR dem eigentlichen Kompilieren per Textersetzung abgearbeitet."
      },
      {
        "id": "w2_q3",
        "question": "Was bedeutet `return 0;` am Ende der Funktion `int main(void)`?",
        "options": [
          "Das Programm weist das Betriebssystem an, den kompletten Prozess-Stack auf Byte 0 zurückzusetzen.",
          "Das Programm meldet dem Betriebssystem den Exit-Code 0, was konventionsgemäß für eine fehlerfreie, erfolgreiche Ausführung steht.",
          "Der Programmzeiger springt wieder an den Anfang von Zeile 0 und startet die Endlosschleife.",
          "Auf der Standardkonsole wird automatisch die Ziffer `0` als Statusmeldung ausgegeben."
        ],
        "correct": 1,
        "explanation": "Konvention in C und Betriebssystemen: Rückgabewert `0` von `main` bedeutet 'Erfolg (OK)', jeder Wert ungleich 0 deutet auf einen Fehler oder Sonderfall hin."
      },
      {
        "id": "w2_q4",
        "question": "Was bewirkt das Steuerzeichen `\\n` innerhalb von `printf(\"Hallo\\nWelt\");`?",
        "options": [
          "Es löscht den vorherigen Pufferinhalt und gibt nur den nachfolgenden String `Welt` aus.",
          "Es bricht die Textausgabe sofort ab und terminiert den aktuellen Funktionsaufruf.",
          "Es wiederholt das vorangegangene Zeichen zweimal im Ausgabestrom.",
          "Es fügt einen Zeilenumbruch (Line Feed / Newline) ein, sodass der Folgetext in der nächsten Terminalzeile beginnt."
        ],
        "correct": 3,
        "explanation": "Das Escape-Zeichen `\\n` steht für 'Newline' und befördert den Ausgabecursor im Terminal in die nächste Zeile."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle: Dein erstes vollständiges C-Programm",
      "instruction": "Bringe die 6 Zeilen eines sauberen C-Programms in die exakt richtige Reihenfolge!",
      "lines": [
        "#include <stdio.h>",
        "int main(void) {",
        "    printf(\"Willkommen an der THI!\\n\");",
        "    printf(\"GP1 bei Prof. Wamser\\n\");",
        "    return 0;",
        "}"
      ]
    },
    "boss": {
      "title": "Boss-Quest 2: Der fehlerhafte Code (Edit-Compile-Debug)",
      "description": "In diesem Programm hat ein Student **3 klassische Anfängerfehler** eingebaut, sodass der Compiler streikt.\n\n**Deine Aufgabe:**\n1. Klicke einmal auf **„Kompilieren & Ausführen“**, um zu sehen, wie unser **Deutsch-Fehler-Übersetzer** dir die GCC-Fehler erklärt.\n2. Behebe die 3 Fehler (Tipp: `#include`, fehlendes `;` und Textausgabe `Hallo GP1!`), sodass exakt `Hallo GP1!` ausgegeben wird!",
      "starterCode": "include <stdio.h>\n\nint main(void) {\n    printf(\"Hallo GP1!\\n\")\n    return 0;\n",
      "stdin": "",
      "expectedOutputContains": [
        "Hallo GP1!"
      ],
      "hint": "1. Vor `include` fehlt das `#` (`#include <stdio.h>`).\n2. Hinter `printf(...)` fehlt das Semikolon `;`.\n3. Ganz am Ende fehlt die schließende geschweifte Klammer `}`.",
      "solution": "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hallo GP1!\\n\");\n    return 0;\n}"
    }
  },
  {
    "id": "w3",
    "number": 3,
    "title": "Welt 3: Datentypen & die 5/9-Temperatur-Falle",
    "subtitle": "Folien 103–120 • int, float, double, char & die berühmte Ganzzahldivision",
    "icon": "🌡️",
    "color": "#f59e0b",
    "badgeId": "temp_master",
    "lessons": [
      {
        "title": "1. Primitive Datentypen in C (Folie 111–117)",
        "content": "\n          <p>In C musst du bei jeder Variable vorab genau sagen, <strong>welchen Datentyp</strong> sie hat (statische Typisierung). Die wichtigsten Grundtypen aus den Vorlesungsfolien:</p>\n          <table class=\"lesson-table\">\n            <thead>\n              <tr><th>Datentyp</th><th>Bedeutung</th><th>Typische Größe</th><th>Beispiel</th></tr>\n            </thead>\n            <tbody>\n              <tr><td><code>char</code></td><td>Ein einzelnes Zeichen (intern eine kleine Zahl / ASCII)</td><td>1 Byte (8 Bit)</td><td><code>char c = 'A';</code></td></tr>\n              <tr><td><code>short</code></td><td>Kurze ganze Zahl</td><td>2 Byte (16 Bit)</td><td><code>short s = 100;</code></td></tr>\n              <tr><td><code>int</code></td><td>Standard-Ganzzahl (positiv & negativ)</td><td>4 Byte (32 Bit)</td><td><code>int anzahl = -42;</code></td></tr>\n              <tr><td><code>unsigned int</code></td><td>Nur positive Ganzzahlen (inkl. 0), doppelter Plus-Bereich!</td><td>4 Byte (32 Bit)</td><td><code>unsigned int u = 500u;</code></td></tr>\n              <tr><td><code>float</code></td><td>Kommazahl (einfache Genauigkeit, ~7 Stellen)</td><td>4 Byte (32 Bit)</td><td><code>float preis = 1.99f;</code></td></tr>\n              <tr><td><code>double</code></td><td>Kommazahl (doppelte Genauigkeit, ~15 Stellen – Standard!)</td><td>8 Byte (64 Bit)</td><td><code>double pi = 3.14159;</code></td></tr>\n            </tbody>\n          </table>\n        "
      },
      {
        "title": "2. DIE KLAUSURFALLE NR. 1: Ganzzahldivision (Folie 118–120)",
        "content": "\n          <p>Auf Folie 118 stellt Prof. Wamser die Aufgabe, eine Temperaturtabelle von Fahrenheit (°F) in Celsius (°C) zu berechnen mit der Formel:</p>\n          <p style=\"text-align:center; font-size:1.15rem;\"><code>°C = (5 / 9) * (°F - 32)</code></p>\n          <div class=\"trap-box\">\n            <strong>🚨 ACHTUNG FALLE: Was rechnet C bei <code>5 / 9</code>?</strong><br>\n            Da <code>5</code> und <code>9</code> beides ganze Zahlen (<code>int</code>) sind, führt C eine <strong>Ganzzahldivision</strong> durch! Das mathematische Ergebnis <code>0.555...</code> wird gnadenlos abgeschnitten zu <strong><code>0</code></strong>!<br>\n            Und <code>0 * ( fahrenheit - 32 )</code> ergibt <strong>immer 0</strong>!\n          </div>\n          <p><strong>Wie löst man das in C? (2 Wege aus der Vorlesung):</strong></p>\n          <ol>\n            <li><strong>Mit Gleitkommazahlen (<code>float</code>/<code>double</code>):</strong> Mindestens eine Zahl als Kommazahl schreiben: <code>5.0 / 9.0 * (fahr - 32)</code>.</li>\n            <li><strong>Bei ganzen Zahlen (<code>int</code>):</strong> Erst multiplizieren, dann teilen! Also <code>5 * (fahr - 32) / 9</code>.</li>\n          </ol>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w3_q1",
        "question": "Welchen Wert hat die Variable `erg` nach der Ausführung von `double erg = 5 / 9;` in C (Folie 118)?",
        "options": [
          "`0.555556`: Da `erg` vom Typ double ist, wird automatisch eine exakte Gleitkommadivision berechnet.",
          "`0.0`: Da beide Operanden (5 und 9) ganzzahlig sind, wird eine Ganzzahldivision gerechnet, deren Nachkommastellen abgeschnitten werden.",
          "`1.0`: C rundet das Zwischenergebnis bei der Konvertierung in `double` kaufmännisch auf.",
          "`NaN`: Die Division ganzzahliger Literale ohne Nachkommastelle ist in C mathematisch undefiniert."
        ],
        "correct": 1,
        "explanation": "Die berüchtigte 5/9-Falle! Da 5 und 9 Integer sind, ergibt 5 / 9 in C exakt 0. Erst danach wird die 0 zu 0.0 konvertiert. Lösung: `5.0 / 9.0` schreiben!"
      },
      {
        "id": "w3_q2",
        "question": "Was bewirkt das Schlüsselwort `unsigned` vor einem Ganzzahltyp wie `int` (Folie 115)?",
        "options": [
          "Der Datentyp speichert nur nicht-negative Werte (>= 0), verdoppelt dafür aber den maximal darstellbaren positiven Zahlenbereich.",
          "Die Variable wird im schreibgeschützten ROM-Bereich abgelegt und kann nicht mehr verändert werden.",
          "Der Compiler optimiert die Variable für mathematische Gleitkommaberechnungen ohne Rundungsfehler.",
          "Der Speicherbedarf der Variable im RAM wird exakt auf die Hälfte (2 Bytes) reduziert."
        ],
        "correct": 0,
        "explanation": "Ein `unsigned int` nutzt das Bit, das sonst für das Vorzeichen (+/-) reserviert ist, für den Betrag. Dadurch kann er keine negativen Zahlen speichern, reicht aber z. B. bis ~4,29 Milliarden statt ~2,14 Milliarden."
      },
      {
        "id": "w3_q3",
        "question": "Was liefert der Operator `%` (Modulo) bei der Rechnung `17 % 5` (Folie 119)?",
        "options": [
          "`3`: Das ganzzahlige Ergebnis der Division 17 geteilt durch 5.",
          "`0.4`: Der dezimale Nachkommaanteil des mathematischen Bruchs.",
          "`2`: Den verbleibenden ganzzahligen Rest der Division (17 = 3 * 5 + 2).",
          "`85`: Das Produkt beider Operanden als Prozentwert."
        ],
        "correct": 2,
        "explanation": "Der Modulo-Operator `%` berechnet den ganzzahligen Rest einer Division: 17 geteilt durch 5 ist 3 mit Rest 2."
      },
      {
        "id": "w3_q4",
        "question": "Mit welchen Anführungszeichen wird ein einzelnes Zeichen (`char`) im C-Code angegeben (Folie 124)?",
        "options": [
          "Ausschließlich mit einfachen Hochkommas wie in `'A'` (doppelte Anführungszeichen wie `\"A\"` erzeugen ein char-Array inklusive Nullbyte).",
          "Mit doppelten Anführungszeichen wie `\"A\"`, da einfache Hochkommas für Makros reserviert sind.",
          "Beliebig entweder mit `'A'` oder `\"A\"`, da der C-Compiler beides identisch als 1-Byte-Integer interpretiert.",
          "Mit spitzen Klammern wie `<A>`, analog zu den Präprozessor-Headern."
        ],
        "correct": 0,
        "explanation": "Wichtiger Unterschied: `'A'` ist ein einzelnes Zeichen (1 Byte ASCII-Zahl). `\"A\"` ist ein String-Literal bestehend aus ZWEI Bytes: dem Zeichen `'A'` und dem unsichtbaren Endezeichen `'\\0'`!"
      }
    ],
    "parsons": {
      "title": "Code-Puzzle (Folie 118): Temperaturtabelle °F ➔ °C",
      "instruction": "Setze Prof. Wamsers Temperaturtabelle (von 0°F bis 40°F in 20er-Schritten) in der richtigen Reihenfolge zusammen!",
      "lines": [
        "#include <stdio.h>",
        "int main(void) {",
        "    int fahr = 0;",
        "    while (fahr <= 40) {",
        "        int celsius = 5 * (fahr - 32) / 9;",
        "        printf(\"%d F = %d C\\n\", fahr, celsius);",
        "        fahr = fahr + 20;",
        "    }",
        "    return 0;",
        "}"
      ]
    },
    "boss": {
      "title": "Boss-Quest 3: Repariere den 5/9-Bug in der Temperatur-Umrechnung!",
      "description": "Ein Kommilitone hat die Temperatur-Aufgabe von Folie 118 programmiert, aber sein Programm gibt für **jede** Fahrenheit-Temperatur immer `0.00 C` aus!\n\n**Deine Aufgabe:**\nRepariere die Formel in der `celsius`-Berechnung, sodass eine echte Gleitkommadivision stattfindet und für `0 F` exakt `-17.78 C` und für `100 F` exakt `37.78 C` ausgegeben wird!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    double fahr1 = 0.0;\n    double fahr2 = 100.0;\n\n    // BUG HIER: Warum kommt 0.00 heraus? Repariere die zwei Zeilen!\n    double celsius1 = (5 / 9) * (fahr1 - 32.0);\n    double celsius2 = (5 / 9) * (fahr2 - 32.0);\n\n    printf(\"0 F = %.2f C\\n\", celsius1);\n    printf(\"100 F = %.2f C\\n\", celsius2);\n    return 0;\n}",
      "stdin": "",
      "expectedOutputContains": [
        "0 F = -17.78 C",
        "100 F = 37.78 C"
      ],
      "hint": "Schreibe `5.0 / 9.0` statt `5 / 9`, damit C keine Ganzzahldivision (die 0 ergibt) durchführt!",
      "solution": "#include <stdio.h>\n\nint main(void) {\n    double fahr1 = 0.0;\n    double fahr2 = 100.0;\n\n    double celsius1 = (5.0 / 9.0) * (fahr1 - 32.0);\n    double celsius2 = (5.0 / 9.0) * (fahr2 - 32.0);\n\n    printf(\"0 F = %.2f C\\n\", celsius1);\n    printf(\"100 F = %.2f C\\n\", celsius2);\n    return 0;\n}"
    }
  },
  {
    "id": "w4",
    "number": 4,
    "title": "Welt 4: printf(), scanf() & die Puffer-Falle",
    "subtitle": "Folien 121–151 • Format-Specifier, Adressoperator & und Input/Output-Buffering",
    "icon": "🛡️",
    "color": "#10b981",
    "badgeId": "buffer_tamer",
    "lessons": [
      {
        "title": "1. Formatierte Ausgabe mit printf() (Folie 121–123)",
        "content": "\n          <p>Mit <code>printf()</code> gibst du Text und Variablen auf der Konsole aus. Für jede Variable setzt du einen <strong>Platzhalter (Format-Specifier)</strong> mit <code>%</code> in den Text:</p>\n          <table class=\"lesson-table\">\n            <thead>\n              <tr><th>Platzhalter</th><th>Datentyp</th><th>Beispiel</th></tr>\n            </thead>\n            <tbody>\n              <tr><td><code>%d</code> oder <code>%i</code></td><td><code>int</code> (ganze Zahl mit Vorzeichen)</td><td><code>printf(\"Zahl: %d\", 42);</code></td></tr>\n              <tr><td><code>%u</code></td><td><code>unsigned int</code> (vorzeichenlos)</td><td><code>printf(\"Positiv: %u\", 42u);</code></td></tr>\n              <tr><td><code>%f</code> / <code>%.2f</code></td><td><code>float</code> / <code>double</code> (<code>.2</code> = 2 Nachkommastellen)</td><td><code>printf(\"Preis: %.2f\", 9.5);</code></td></tr>\n              <tr><td><code>%c</code></td><td><code>char</code> (einzelnes Zeichen)</td><td><code>printf(\"Buchstabe: %c\", 'A');</code></td></tr>\n              <tr><td><code>%s</code></td><td>String (Zeichenkette <code>char[]</code>)</td><td><code>printf(\"Name: %s\", \"THI\");</code></td></tr>\n              <tr><td><code>%x</code> / <code>%p</code></td><td>Hexadezimalzahl / Speicheradresse (Pointer)</td><td><code>printf(\"Adresse: %p\", &x);</code></td></tr>\n            </tbody>\n          </table>\n        "
      },
      {
        "title": "2. Eingabe mit scanf() & der Adressoperator & (Folie 143–145)",
        "content": "\n          <p>Wenn der Benutzer etwas über die Tastatur eingeben soll, nutzen wir <code>scanf()</code>:</p>\n          <pre class=\"code-preview\">\nint alter;\nprintf(\"Bitte Alter eingeben: \");\nscanf(\"%d\", &alter); // <-- WICHTIG: Das & vor 'alter'!</pre>\n          <div class=\"trap-box\">\n            <strong>🚨 Warum muss bei <code>scanf</code> das <code>&</code> hin?</strong><br>\n            <code>&alter</code> bedeutet: <em>„Gib mir die Speicheradresse (Hausnummer im RAM), wo die Variable <code>alter</code> wohnt.“</em><br>\n            Nur wenn <code>scanf</code> die Hausnummer kennt, kann es die eingetippte Zahl dort im Speicher ablegen! Vergisst du das <code>&</code>, stürzt dein Programm mit einem Speicherfehler (Segmentation Fault) ab!\n          </div>\n        "
      },
      {
        "title": "3. Output- & Input-Buffering (Folie 146–151)",
        "content": "\n          <p>Prof. Wamser widmet dem Thema <strong>Pufferung (Buffering)</strong> sechs eigene Folien (146–151), weil es in den Praktika fast jeden erwischt:</p>\n          <ul>\n            <li><strong>Output Buffering:</strong> Ausgaben von <code>printf</code> werden oft erst im Ausgabepuffer gesammelt, bis ein Zeilenumbruch <code>\\n</code> kommt oder <code>fflush(stdout);</code> gerufen wird.</li>\n            <li><strong>Input Buffering (Die Enter-Tasten-Falle):</strong> Wenn du <code>42</code> tippst und <kbd>Enter</kbd> drückst, liegt im Eingabepuffer: <code>'4'</code>, <code>'2'</code>, <code>'\\n'</code>.<br>\n            <code>scanf(\"%d\", &zahl);</code> nimmt sich nur die <code>42</code>. Das <code>'\\n'</code> (die Enter-Taste) <strong>bleibt im Puffer liegen</strong>! Wenn du danach <code>getchar()</code> aufrufst, liest es sofort dieses alte <code>'\\n'</code> ein, ohne auf dich zu warten!</li>\n          </ul>\n          <pre class=\"code-preview\">\n// So leerst du den Eingabepuffer sauber (Wamsers Tipp für Übung 2):\nint c;\nwhile ((c = getchar()) != '\\n' && c != EOF) {\n    // liest und verwirft alle Restzeichen bis inkl. Enter\n}</pre>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w4_q1",
        "question": "Was gibt `printf(\"Wert: %.1f\", 3.14159);` auf der Konsole aus (Folie 125)?",
        "options": [
          "`Wert: 3`: Es wird nur der ganzzahlige Vorkommaanteil ausgegeben.",
          "`Wert: 3.141590`: Die Standard-Genauigkeit von 6 Nachkommastellen bleibt erhalten.",
          "`Wert: 3.1`: Die Zahl wird mit genau einer Nachkommastelle formatiert ausgegeben.",
          "`Wert: 3,14`: Das System wandelt den Punkt automatisch in ein deutsches Komma um."
        ],
        "correct": 2,
        "explanation": "Der Formatspezifizierer `%.1f` begrenzt die Ausgabe einer Gleitkommazahl auf exakt eine Nachkommastelle."
      },
      {
        "id": "w4_q2",
        "question": "Welcher Fehler steckt in der Zeile `int x; scanf(\"%d\", x);` (Folie 126)?",
        "options": [
          "Der Datentyp `int` darf in C niemals über die Konsole per `scanf` eingelesen werden.",
          "Bei `%d` fehlt der Adress-Operator `&`: Es muss `scanf(\"%d\", &x);` heißen, damit `scanf` die Speicheradresse der Zielvariable erhält.",
          "Am Ende der Zeile vor dem Semikolon muss zwingend ein Zeilenumbruch `\\n` übergeben werden.",
          "Der Name der Variable `x` ist zu kurz und wird vom Präprozessor reserviert."
        ],
        "correct": 1,
        "explanation": "`scanf` muss wissen, WO im Arbeitsspeicher der Wert abgelegt werden soll. Übergibt man nur `x` (den Wert statt der Adresse `&x`), stürzt das Programm meist mit einem Speicherzugriffsfehler (Segmentation Fault) ab!"
      },
      {
        "id": "w4_q3",
        "question": "Der Benutzer tippt bei `scanf(\"%d\", &zahl);` die Zahl `7` ein und drückt Enter. Was bleibt danach im Tastaturpuffer zurück (Folie 128)?",
        "options": [
          "Der Puffer ist sofort komplett leer und empfangsbereit für den nächsten Befehl.",
          "Die Zahl 7 verbleibt als Duplikat für nachfolgende Aufrufe im Eingabestrom.",
          "Das Enter-Zeichen (`'\\n'`) verbleibt im Puffer und wird oft fälschlicherweise vom nächsten `scanf(\"%c\")` oder `getchar()` geschluckt.",
          "Der Puffer wird vom Betriebssystem automatisch mit Nullbytes überschrieben."
        ],
        "correct": 2,
        "explanation": "Die klassische Puffer-Falle: `%d` liest nur die Ziffern ein. Das abschließende Enter (`'\\n'`) bleibt im Puffer liegen und führt beim nächsten Zeichen-Einlesen zu unerwartetem Überspringen."
      },
      {
        "id": "w4_q4",
        "question": "Mit welchem Befehl kann man in C erzwingen, dass der Ausgabepuffer sofort auf dem Bildschirm angezeigt wird (Folie 130)?",
        "options": [
          "`fflush(stdout);`: Leert den internen Ausgabepuffer und schreibt alle Zeichen sofort ins Terminal.",
          "`clear(stdin);`: Löscht alle noch anstehenden Eingaben des Benutzers.",
          "`buffer_reset();`: Setzt die Pufferzeiger der Standardbibliothek auf null zurück.",
          "`return 0;`: Beendet den Pufferzyklus und zwingt das Terminal zum Neuzeichnen."
        ],
        "correct": 0,
        "explanation": "`fflush(stdout)` leert den Ausgabepuffer manuell. Ohne dies (oder ohne `\\n`) sammelt C Textausgaben oft im Speicher, bevor es sie tatsächlich auf dem Monitor darstellt."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle: Zahl einlesen & Eingabepuffer sauber leeren",
      "instruction": "Bringe die Zeilen in die richtige Reihenfolge, um eine ganze Zahl per `scanf` einzulesen und danach das übrig gebliebene `'\\n'` aus dem Eingabepuffer zu entfernen!",
      "lines": [
        "int zahl;",
        "printf(\"Bitte Zahl eingeben: \");",
        "scanf(\"%d\", &zahl);",
        "while (getchar() != '\\n'); // Eingabepuffer bis Enter leeren",
        "printf(\"Eingegeben wurde: %d\\n\", zahl);"
      ]
    },
    "boss": {
      "title": "Boss-Quest 4: Taschenrechner mit Konsolen-Eingabe (stdin)",
      "description": "Jetzt testen wir `scanf()` live! Unten im Feld **„Konsolen-Eingabe (stdin)“** sind bereits die zwei Zahlen `15 27` voreingestellt.\n\n**Deine Aufgabe:**\n1. Im Starter-Code fehlt bei beiden `scanf`-Aufrufen etwas Wichtiges (der Compiler warnt dich sofort!).\n2. Gib danach das Produkt (`a * b`) in der Form `Produkt: 405` aus!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a = 0;\n    int b = 0;\n\n    // 1. Repariere die beiden scanf-Aufrufe:\n    scanf(\"%d\", a);\n    scanf(\"%d\", b);\n\n    printf(\"Summe: %d\\n\", a + b);\n    // 2. Gib hier noch \"Produkt: <wert>\\n\" aus:\n\n    return 0;\n}",
      "stdin": "15 27\n",
      "expectedOutputContains": [
        "Summe: 42",
        "Produkt: 405"
      ],
      "hint": "1. Schreibe `&a` und `&b` in `scanf`.\n2. Füge `printf(\"Produkt: %d\\n\", a * b);` hinzu.",
      "solution": "#include <stdio.h>\n\nint main(void) {\n    int a = 0;\n    int b = 0;\n\n    scanf(\"%d\", &a);\n    scanf(\"%d\", &b);\n\n    printf(\"Summe: %d\\n\", a + b);\n    printf(\"Produkt: %d\\n\", a * b);\n\n    return 0;\n}"
    }
  },
  {
    "id": "w5",
    "number": 5,
    "title": "Welt 5: Blöcke, Schleifen & Original-Übung 1",
    "subtitle": "Folien 124–142 & 180 • Vom while zum for, == vs. = und Ungerade Zahlen",
    "icon": "🔄",
    "color": "#8b5cf6",
    "badgeId": "loop_legend",
    "lessons": [
      {
        "title": "1. Vom `while` zum `for` (Folie 127–133)",
        "content": "\n          <p>Prof. Wamser zeigt auf den Folien 127–133, wie jede Zählschleife aus <strong>3 Teilen</strong> besteht und wie man eine <code>while</code>-Schleife eins zu eins in eine kompakte <code>for</code>-Schleife verwandelt:</p>\n          <div class=\"concept-grid\">\n            <div class=\"concept-card\">\n              <h4>Als <code>while</code>-Schleife</h4>\n              <pre class=\"code-preview\">\nint i = 1;          // 1. Initialisierung\nwhile (i <= 5) {    // 2. Bedingung\n    printf(\"%d \", i);\n    i = i + 1;      // 3. Schritt (Update)\n}</pre>\n            </div>\n            <div class=\"concept-card\">\n              <h4>Als <code>for</code>-Schleife</h4>\n              <pre class=\"code-preview\">\n// Alles kompakt in einer Kopfzeile:\n//  ( 1. Init ; 2. Bed. ; 3. Schritt )\nfor (int i = 1; i <= 5; i++) {\n    printf(\"%d \", i);\n}</pre>\n            </div>\n          </div>\n          <p><strong>Kurzschreibweisen in C (Folie 138):</strong> Statt <code>i = i + 1</code> schreibt man in C fast immer <code>i++</code> (oder <code>++i</code>). Statt <code>x = x + 5</code> schreibt man <code>x += 5</code>.</p>\n        "
      },
      {
        "title": "2. Logische Operatoren & die `if (x = 5)`-Falle (Folie 136–142)",
        "content": "\n          <ul>\n            <li><strong>Vergleich:</strong> <code>==</code> (gleich), <code>!=</code> (ungleich), <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code></li>\n            <li><strong>Logische Verknüpfung:</strong> <code>&amp;&amp;</code> (logisches UND), <code>||</code> (logisches ODER), <code>!</code> (logisches NICHT)</li>\n          </ul>\n          <div class=\"trap-box\">\n            <strong>🚨 Tödliche Klausurfalle: <code>if (x = 5)</code> statt <code>if (x == 5)</code></strong><br>\n            Schreibst du versehentlich nur ein <code>=</code> in die <code>if</code>-Klammer, prüft C <em>nicht</em> ob <code>x</code> gleich 5 ist, sondern <strong>setzt <code>x</code> auf 5</strong>! Und weil in C jede Zahl ungleich 0 als „wahr“ gilt, wird das <code>if</code> <strong>immer ausgeführt</strong>!\n          </div>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w5_q1",
        "question": "Was gibt folgender C-Code aus?\n`int x = 0; if (x = 3) { printf(\"Ja\"); } else { printf(\"Nein\"); }` (Folie 140)",
        "options": [
          "`Nein`: Weil die Variable `x` zuvor mit dem Wert 0 initialisiert wurde.",
          "`Compiler-Fehler`: Eine Zuweisung ist innerhalb einer `if`-Klammer in C streng verboten.",
          "`Ja`: Weil `x = 3` eine Zuweisung ist, die den Wert 3 liefert – und in C gilt jeder Wert ungleich 0 als wahr (`true`)!",
          "Nichts, das Programm bricht mit einem Laufzeitfehler ab."
        ],
        "correct": 2,
        "explanation": "Die berüchtigte Zuweisungs-Falle! Ein einzelnes `=` ist eine Wertzuweisung. Da `x` den Wert 3 erhält und 3 ungleich 0 ist, bewertet C die Bedingung als WAHR. Richtig zum Vergleichen ist `==`."
      },
      {
        "id": "w5_q2",
        "question": "Wie prüft man in C in einer `if`-Bedingung, ob eine Zahl `z` eine GERADE Zahl ist (Folie 141)?",
        "options": [
          "`if (z / 2 == 0)`: Prüft das ganzzahlige Ergebnis der Halbierung.",
          "`if (z % 2 == 0)`: Prüft, ob der Divisionsrest bei Teilung durch 2 genau null ist.",
          "`if (is_even(z))`: Ruft die eingebaute Standardfunktion für gerade Zahlen auf.",
          "`if (z && 2)`: Führt eine bitweise logische UND-Verknüpfung aus."
        ],
        "correct": 1,
        "explanation": "Eine Zahl ist gerade, wenn sie ohne Rest durch 2 teilbar ist. Das prüft man in C mit dem Modulo-Operator: `z % 2 == 0`."
      },
      {
        "id": "w5_q3",
        "question": "Was ist das Besondere an einer `do { ... } while (Bedingung);`-Schleife im Vergleich zu `while` (Folie 144)?",
        "options": [
          "Sie ist fußgesteuert: Der Schleifenkörper wird IMMER mindestens ein einziges Mal ausgeführt, bevor die Bedingung überhaupt geprüft wird.",
          "Sie läuft grundsätzlich in einem separaten Hintergrund-Thread der CPU ab.",
          "Sie bricht automatisch nach maximal 255 Durchläufen ab, um Endlosschleifen zu verhindern.",
          "Sie darf im Rumpf keine Verzweigungen mit `if` oder `switch` enthalten."
        ],
        "correct": 0,
        "explanation": "Die `do-while`-Schleife ist fußgesteuert. Da die Prüfung erst ganz unten bei `while` steht, wird der Schleifeninhalt garantiert mindestens einmal durchlaufen."
      },
      {
        "id": "w5_q4",
        "question": "Welcher Operator steht in C für das logische UND (beide Bedingungen müssen wahr sein) (Folie 143)?",
        "options": [
          "`&`: Der einfache Kaufmannsund-Operator für logische Ausdrücke.",
          "`AND`: Das englische Schlüsselwort für logische Verknüpfungen.",
          "`&&`: Der doppelte Kaufmannsund-Operator für logische UND-Bedingungen.",
          "`||`: Der doppelte senkrechte Strich für gleichzeitige Bedingungen."
        ],
        "correct": 2,
        "explanation": "In C steht `&&` für das logische UND (`||` steht für das logische ODER und `&` ist der bitweise Operator)."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle (Folie 180): Prof. Wamsers Übung 1 (Ungerade Zahlen)",
      "instruction": "Bringe die Zeilen in die richtige Reihenfolge, um alle ungeraden Zahlen zwischen `start` und `ende` auszugeben!",
      "lines": [
        "int start = 1, ende = 10;",
        "for (int i = start; i <= ende; i++) {",
        "    if (i % 2 != 0) {",
        "        printf(\"%d \", i);",
        "    }",
        "}"
      ]
    },
    "boss": {
      "title": "Boss-Quest 5: Original-Übung 1 (Folie 180) – Ungerade Zahlen im Intervall",
      "description": "Jetzt lösen wir **Original-Übung 1 aus Prof. Wamsers Folie 180**!\n\n**Aufgabenstellung aus dem Skript:**\nEs sollen zwei ganze Zahlen (`start` und `ende`) von der Konsole eingelesen werden (im Eingabefeld sind `3` und `12` voreingestellt). Gib alle **ungeraden Zahlen** in diesem Intervall (inklusive Grenzen, falls ungerade) durch Leerzeichen getrennt aus (also `3 5 7 9 11 `).",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int start, ende;\n    scanf(\"%d %d\", &start, &ende);\n\n    // Schreibe hier deine for-Schleife von start bis ende\n    // und gib alle ungeraden Zahlen mit printf(\"%d \", i); aus:\n    \n\n    printf(\"\\n\");\n    return 0;\n}",
      "stdin": "3 12\n",
      "expectedOutputContains": [
        "3 5 7 9 11"
      ],
      "hint": "Nutze `for (int i = start; i <= ende; i++) { if (i % 2 != 0) { printf(\"%d \", i); } }`",
      "solution": "#include <stdio.h>\n\nint main(void) {\n    int start, ende;\n    scanf(\"%d %d\", &start, &ende);\n\n    for (int i = start; i <= ende; i++) {\n        if (i % 2 != 0) {\n            printf(\"%d \", i);\n        }\n    }\n\n    printf(\"\\n\");\n    return 0;\n}"
    }
  },
  {
    "id": "w6",
    "number": 6,
    "title": "Welt 6: Arrays, Strings ('\\0') & das ENTE-Programm",
    "subtitle": "Folien 152–159 & 182 • Felder, Nullterminator '\\0', ASCII & Übung 2",
    "icon": "🧵",
    "color": "#ec4899",
    "badgeId": "null_hunter",
    "lessons": [
      {
        "title": "1. Felder (Arrays) in C (Folie 152–155)",
        "content": "\n          <p>Ein <strong>Array (Feld)</strong> speichert mehrere Werte desselben Datentyps direkt hintereinander im Arbeitsspeicher:</p>\n          <pre class=\"code-preview\">\nint noten[4] = { 1, 2, 1, 3 };\n// Zugriff über den Index (WICHTIG: Zählung startet IMMER bei 0!):\n// noten[0] ist 1\n// noten[3] ist 3 (das 4. Element!)</pre>\n          <div class=\"trap-box\">\n            <strong>🚨 Klausurfalle Array-Grenzen:</strong> Wenn du <code>int a[4];</code> deklarierst, gibt es nur die Indizes <code>0, 1, 2, 3</code>! Ein Zugriff auf <code>a[4]</code> greift in fremden Speicher hinter dem Array! C prüft Array-Grenzen zur Laufzeit <strong>nicht</strong> automatisch!\n          </div>\n        "
      },
      {
        "title": "2. Zeichenketten (Strings) & das Nullbyte '\\0' (Folie 156–159)",
        "content": "\n          <p>In C gibt es keinen eigenen Datentyp <code>String</code>. Ein String ist in C einfach ein <strong><code>char</code>-Array</strong>, an dessen Ende ein unsichtbares Stopp-Schild steht: das <strong>Nullbyte <code>'\\0'</code></strong> (Zahlenwert 0)!</p>\n          <p>Wenn du <code>char wort[] = \"ENTE\";</code> schreibst, legt C im Speicher <strong>5 Bytes</strong> an:</p>\n          <div class=\"memory-boxes\">\n            <div class=\"mem-cell\"><span class=\"mem-idx\">wort[0]</span><strong>'E'</strong><small>ASCII 69</small></div>\n            <div class=\"mem-cell\"><span class=\"mem-idx\">wort[1]</span><strong>'N'</strong><small>ASCII 78</small></div>\n            <div class=\"mem-cell\"><span class=\"mem-idx\">wort[2]</span><strong>'T'</strong><small>ASCII 84</small></div>\n            <div class=\"mem-cell\"><span class=\"mem-idx\">wort[3]</span><strong>'E'</strong><small>ASCII 69</small></div>\n            <div class=\"mem-cell mem-null\"><span class=\"mem-idx\">wort[4]</span><strong>'\\0'</strong><small>Byte 0 (Ende!)</small></div>\n          </div>\n          <p><strong>Genialer ASCII-Trick für Übung 2 (Folie 182):</strong> Im ASCII-Code liegen Kleinbuchstaben (<code>'a'</code> = 97 bis <code>'z'</code> = 122) genau 32 Positionen hinter den Großbuchstaben (<code>'A'</code> = 65 bis <code>'Z'</code> = 90). Du kannst also einfach rechnen: <code>c = c - 'a' + 'A';</code> (oder <code>c - 32</code>)!</p>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w6_q1",
        "question": "Du deklarierst `int werte[10];`. Wie lautet der Index des ersten und des letzten Elements (Folie 151)?",
        "options": [
          "Erstes Element: `werte[1]`, letztes Element: `werte[10]`",
          "Erstes Element: `werte[0]`, letztes Element: `werte[10]`",
          "Erstes Element: `werte[0]`, letztes Element: `werte[9]`",
          "Erstes Element: `werte[-1]`, letztes Element: `werte[9]`"
        ],
        "correct": 2,
        "explanation": "In C (und fast allen modernen Sprachen) ist die Indizierung 0-basiert! Ein Array der Größe 10 hat die Indizes 0 bis 9. `werte[10]` wäre bereits ein illegaler Speicherzugriff außerhalb des Arrays."
      },
      {
        "id": "w6_q2",
        "question": "Wie groß muss ein `char`-Array mindestens sein, um das Wort `\"ENTE\"` als echten C-String zu speichern (Folie 152–159)?",
        "options": [
          "Mindestens 5 Bytes: 4 Bytes für die Zeichen E-N-T-E plus 1 zusätzliches Byte für das unsichtbare Endezeichen `'\\0'` (Nullbyte).",
          "Exakt 4 Bytes: Da das Wort aus genau 4 Buchstaben besteht.",
          "Mindestens 8 Bytes: Wegen der standardmäßigen 64-Bit-Speicherausrichtung.",
          "Mindestens 6 Bytes: Für Start- und Endemarkierung des Strings."
        ],
        "correct": 0,
        "explanation": "Ein C-String braucht IMMER das abschließende Nullbyte `'\\0'`. 'ENTE' hat 4 sichtbare Buchstaben, belegt im Arbeitsspeicher aber zwingend 5 Bytes!"
      },
      {
        "id": "w6_q3",
        "question": "Wie findet man in C ohne `strlen()` heraus, wie lang ein String im Array `text` ist (Folie 154)?",
        "options": [
          "Man fragt die Größe mit dem Operator `sizeof(text)` ab, der stets die exakte Zeichenanzahl liefert.",
          "Man zählt in einer Schleife ab Index 0 hoch, bis man auf das Nullbyte `'\\0'` trifft.",
          "Man liest den Speicherheader an Index -1 aus, in dem C die Textlänge hinterlegt.",
          "Ohne die Hilfsfunktion `strlen()` aus `<string.h>` ist das Ermitteln der Länge in C technisch unmöglich."
        ],
        "correct": 1,
        "explanation": "Strings haben in C keine Längeninformation im Header. Man läuft zeichenweise durch das Array, bis `text[i] == '\\0'` erreicht ist."
      },
      {
        "id": "w6_q4",
        "question": "Wie wandelt man in C einen Kleinbuchstaben `c` (zwischen `'a'` und `'z'`) sauber in den passenden Großbuchstaben um (Folie 156)?",
        "options": [
          "`c = c - 'a' + 'A';`: Nutzt den festen Abstand der zusammenhängenden ASCII-Blöcke aus.",
          "`c = to_upper(c);`: Ruft den reservierten C-Sprachbefehl auf.",
          "`c = c / 2;`: Halbiert den numerischen Zeichencode in der ASCII-Tabelle.",
          "`c = c + 32;`: Addiert den magischen Versatz für Großbuchstaben."
        ],
        "correct": 0,
        "explanation": "In der ASCII-Tabelle liegen die Groß- und Kleinbuchstaben jeweils in zusammenhängenden Blöcken. Durch `- 'a' + 'A'` (oder `- 32`) wandelt man die Groß-/Kleinschreibung direkt rechnerisch um."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle (Folie 182): String-Länge ohne strlen() & Case-Switch",
      "instruction": "Setze den Code für Prof. Wamsers Übung 2 zusammen: Länge eines Strings zählen und Klein- in Großbuchstaben umwandeln!",
      "lines": [
        "char text[] = \"Thi2026\";",
        "int laenge = 0;",
        "while (text[laenge] != '\\0') {",
        "    if (text[laenge] >= 'a' && text[laenge] <= 'z') {",
        "        text[laenge] = text[laenge] - 'a' + 'A';",
        "    }",
        "    laenge++;",
        "}",
        "printf(\"Text: %s (Laenge: %d)\\n\", text, laenge);"
      ]
    },
    "boss": {
      "title": "Boss-Quest 6: Original-Übung 2 (Folie 182) – String-Case-Tausch & Länge",
      "description": "Hier ist die berühmte **Übung 2 aus Prof. Wamsers Folie 182**!\n\n**Deine Aufgabe:**\nFür den String `wort` (`\"HaLLo_c\"`):\n1. Vertausche Groß- und Kleinschreibung: Kleinbuchstaben (`'a'`–`'z'`) werden groß, Großbuchstaben (`'A'`–`'Z'`) werden klein!\n2. Zähle gleichzeitig in der Variable `laenge` die Zeichenanzahl **ohne `strlen()`**.\n3. Am Ende soll `Umgewandelt: hAllO_C` und `Laenge: 7` ausgegeben werden!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    char wort[] = \"HaLLo_c\";\n    int laenge = 0;\n\n    while (wort[laenge] != '\\0') {\n        if (wort[laenge] >= 'a' && wort[laenge] <= 'z') {\n            wort[laenge] = wort[laenge] - 'a' + 'A';\n        } else if (wort[laenge] >= 'A' && wort[laenge] <= 'Z') {\n            // Wandle hier Großbuchstaben in Kleinbuchstaben um:\n            \n        }\n        // Erhöhe hier den Längenzähler:\n        \n    }\n\n    printf(\"Umgewandelt: %s\\n\", wort);\n    printf(\"Laenge: %d\\n\", laenge);\n    return 0;\n}",
      "stdin": "",
      "expectedOutputContains": [
        "Umgewandelt: hAllO_C",
        "Laenge: 7"
      ],
      "hint": "Im `else if`-Block schreibst du: `wort[laenge] = wort[laenge] - 'A' + 'a';` und darunter `laenge++;`.",
      "solution": "#include <stdio.h>\n\nint main(void) {\n    char wort[] = \"HaLLo_c\";\n    int laenge = 0;\n\n    while (wort[laenge] != '\\0') {\n        if (wort[laenge] >= 'a' && wort[laenge] <= 'z') {\n            wort[laenge] = wort[laenge] - 'a' + 'A';\n        } else if (wort[laenge] >= 'A' && wort[laenge] <= 'Z') {\n            wort[laenge] = wort[laenge] - 'A' + 'a';\n        }\n        laenge++;\n    }\n\n    printf(\"Umgewandelt: %s\\n\", wort);\n    printf(\"Laenge: %d\\n\", laenge);\n    return 0;\n}"
    }
  },
  {
    "id": "w7",
    "number": 7,
    "title": "Welt 7: Funktionen, Pointer & main-Argumente",
    "subtitle": "Folien 160–181 • Call-by-Value vs. Pointer (int*) & argc/argv",
    "icon": "🎯",
    "color": "#ef4444",
    "badgeId": "pointer_wizard",
    "lessons": [
      {
        "title": "1. Funktionen & Call-by-Value (Folie 160–175)",
        "content": "\n          <p>Funktionen strukturieren dein Programm in wiederverwendbare Bausteine. Wichtig in C: Wenn eine Funktion <em>unterhalb</em> von <code>main</code> steht, braucht der Compiler oben einen <strong>Funktions-Prototyp (Deklaration)</strong>!</p>\n          <div class=\"trap-box\">\n            <strong>🚨 Call-by-Value verstehen:</strong><br>\n            In C werden Parameter <strong>immer als Kopie (Call-by-Value)</strong> übergeben! Wenn du <code>erhoehe(x)</code> aufrufst, bekommt die Funktion nur eine Fotokopie von <code>x</code>. Ändert die Funktion ihre Kopie, bleibt das Original <code>x</code> in <code>main</code> unverändert!\n          </div>\n        "
      },
      {
        "title": "2. Pointer (Zeiger): Originale über die Adresse ändern (Folie 176–179)",
        "content": "\n          <p>Wie kann eine Funktion (wie <code>readInteger(\"Wochentag =\", &amp;wd)</code> aus Prof. Wamsers Folie 190) trotzdem eine Variable aus <code>main</code> verändern? Mit einem <strong>Pointer (Zeiger)</strong>!</p>\n          <pre class=\"code-preview\">\nvoid setzeAufZehn(int *p) { // p ist ein Zeiger auf eine int-Adresse\n    *p = 10;                // *p = Dereferenzierung: \"Schreibe 10 an die Zieladresse!\"\n}\n\nint main(void) {\n    int zahl = 0;\n    setzeAufZehn(&zahl);    // &zahl = Übergib die Adresse von 'zahl'\n    // Jetzt ist 'zahl' tatsächlich 10!\n}</pre>\n          <ul>\n            <li><strong><code>&amp;x</code> (Adressoperator):</strong> „Wo wohnt <code>x</code>?“ (liefert die Speicheradresse).</li>\n            <li><strong><code>*p</code> (Dereferenzierungsoperator):</strong> „Geh zur Adresse, auf die <code>p</code> zeigt, und greif auf den Wert dort zu!“</li>\n            <li><strong>Arrays &amp; Pointer (Folie 176):</strong> Der Name eines Arrays <code>arr</code> ist in C bereits ein Zeiger auf das erste Element (<code>&amp;arr[0]</code>)!</li>\n          </ul>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w7_q1",
        "question": "Was gibt folgender Code aus?\n`void test(int a) { a = 99; }\nint main(void) { int x = 10; test(x); printf(\"%d\", x); }` (Folie 173)",
        "options": [
          "`99`: Weil die Funktion den Wert der übergebenen Variablen `x` global überschreibt.",
          "`0`: Weil die lokale Variable in der Funktion nach dem Verlassen auf null gesetzt wird.",
          "`10`: Weil C Call-by-Value nutzt – die Funktion erhält nur eine lokale Kopie des Werts, das Original `x` bleibt unverändert.",
          "`Compiler-Fehler`: Man darf eine Variable nicht an eine Funktion übergeben, die einen anderen Parameternamen nutzt."
        ],
        "correct": 2,
        "explanation": "C arbeitet standardmäßig IMMER mit 'Call by Value'. Parameter sind lokale Kopien. Um das Original in `main` zu verändern, müsste man einen Zeiger (`int *a`) und die Adresse `&x` übergeben!"
      },
      {
        "id": "w7_q2",
        "question": "Was bedeutet der Stern `*` in der Anweisung `*ptr = 42;` innerhalb des Funktionskörpers (Folie 175)?",
        "options": [
          "Multiplikation: Der aktuelle Inhalt des Zeigers `ptr` wird mit 42 multipliziert.",
          "Dereferenzierung: Schreibe den Wert 42 an diejenige Speicheradresse, auf die `ptr` aktuell zeigt.",
          "Deklaration: Es wird an Ort und Stelle ein neuer Zeiger mit dem Wert 42 erzeugt.",
          "Freigabe: Der Speicherbereich an der Adresse 42 wird für das Betriebssystem gelöscht."
        ],
        "correct": 1,
        "explanation": "Bei einem bestehenden Pointer bedeutet `*ptr = 42` 'Dereferenzierung': Greife auf die Zielzelle im Speicher zu, auf die `ptr` zeigt, und speichere dort 42 ab."
      },
      {
        "id": "w7_q3",
        "question": "Welchem Ausdruck entspricht der bloße Name eines Arrays `feld` in C (Folie 176)?",
        "options": [
          "Der Adresse des allerersten Elements im Speicher: `&feld[0]`",
          "Dem aktuellen Wert des letzten Elements im Array.",
          "Der vom Betriebssystem dynamisch verwalteten Elementanzahl.",
          "Einem schreibgeschützten Pointer auf das Nullbyte `'\\0'`."
        ],
        "correct": 0,
        "explanation": "In C zerfällt der Array-Name in fast allen Kontexten automatisch zu einem Zeiger auf das erste Element (`&feld[0]`). Deshalb übergibt man bei `scanf(\"%s\", text)` auch kein `&`!"
      },
      {
        "id": "w7_q4",
        "question": "Was steht bei `int main(int argc, char *argv[])` in der Variable `argc` (Folie 178)?",
        "options": [
          "Der Exit-Statuscode des übergeordneten Betriebssystems.",
          "Der erste Buchstabe des übergebenen Programmnamens als ASCII-Wert.",
          "Die Größe des für das Programm reservierten Arbeitsspeichers in Kilobytes.",
          "Die Anzahl der übergebenen Kommandozeilen-Argumente (inklusive Programmname, daher mindestens 1)."
        ],
        "correct": 3,
        "explanation": "`argc` (Argument Count) zählt, wie viele Argumente beim Programmstart übergeben wurden. `argv[0]` ist dabei immer der Programmname selbst, daher ist `argc` mindestens 1."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle: Zwei Variablen mit Pointern tauschen (swap)",
      "instruction": "Bringe die Zeilen in die richtige Reihenfolge, um den Wert zweier Variablen über Pointer zu tauschen!",
      "lines": [
        "void tausche(int *a, int *b) {",
        "    int temp = *a;",
        "    *a = *b;",
        "    *b = temp;",
        "}"
      ]
    },
    "boss": {
      "title": "Boss-Quest 7: Pointer-Mission – Verändere das Original!",
      "description": "Im Code unten soll die Funktion `malZehn` den Wert der Variable `punkte` in `main` verzehnfachen (von `15` auf `150`). Aktuell nutzt sie aber Call-by-Value, sodass `punkte` bei `15` bleibt!\n\n**Deine Aufgabe:**\nBaue `malZehn` auf einen Pointer-Parameter `int *z` um und übergebe in `main` die Adresse `&punkte`, sodass am Ende `Punkte: 150` ausgegeben wird!",
      "starterCode": "#include <stdio.h>\n\n// 1. Ändere den Parameter auf einen Pointer (int *z) und dereferenziere ihn:\nvoid malZehn(int z) {\n    z = z * 10;\n}\n\nint main(void) {\n    int punkte = 15;\n\n    // 2. Übergib hier die Adresse von 'punkte':\n    malZehn(punkte);\n\n    printf(\"Punkte: %d\\n\", punkte);\n    return 0;\n}",
      "stdin": "",
      "expectedOutputContains": [
        "Punkte: 150"
      ],
      "hint": "Schreibe oben `void malZehn(int *z) { *z = *z * 10; }` und rufe in `main` `malZehn(&punkte);` auf!",
      "solution": "#include <stdio.h>\n\nvoid malZehn(int *z) {\n    *z = *z * 10;\n}\n\nint main(void) {\n    int punkte = 15;\n\n    malZehn(&punkte);\n\n    printf(\"Punkte: %d\\n\", punkte);\n    return 0;\n}"
    }
  },
  {
    "id": "w8",
    "number": 8,
    "title": "Welt 8: Vertiefung – switch, bool, enum & typedef",
    "subtitle": "Skript gdp1-3 (Folien 186–197) • C17 vs. C23, Fall-through & Wochentags-Projekt",
    "icon": "👑",
    "color": "#14b8a6",
    "badgeId": "c23_modernist",
    "lessons": [
      {
        "title": "1. `switch / case` & die Fall-through-Falle (Folie 188–190)",
        "content": "\n          <p>Mit <code>switch (ausdruck)</code> kannst du eine Ganzzahl-Variable elegant auf viele feste Konstanten prüfen – als übersichtliche Alternative zu langen <code>if - else if</code>-Ketten:</p>\n          <pre class=\"code-preview\">\nswitch (wd) {\n    case MO ... FR: // GCC-Intervall (Folie 190): Von MO bis FR!\n        printf(\"Werktag\\n\");\n        break;      // <-- WICHTIG: Springt aus dem switch heraus!\n    case SA:\n    case SO:\n        printf(\"Wochenende\\n\");\n        break;\n    default:\n        printf(\"Ungueltiger Tag\\n\");\n}</pre>\n          <div class=\"trap-box\">\n            <strong>🚨 Klausur-Klassiker (Folie 188/189):</strong><br>\n            1. <strong>Fall-through:</strong> Vergisst du das <code>break;</code> am Ende eines <code>case</code>, führt C einfach <strong>alle nachfolgenden cases darunter auch noch aus</strong>, bis endlich ein <code>break</code> oder das Ende kommt!<br>\n            2. <strong>Nur konstante Ganzzahlen (§6.8.4.2):</strong> In <code>case</code> dürfen nur konstante Ganzzahlwerte (<code>int</code>, <code>char</code>, <code>enum</code>) stehen – keine <code>float</code>/<code>double</code> und keine Variablen!\n          </div>\n        "
      },
      {
        "title": "2. Wahrheitswerte `bool`: Klassisch vs. C99 vs. C23 (Folie 191–193)",
        "content": "\n          <p>Prof. Wamser legt auf den Folien 191–193 besonderen Wert auf die Geschichte von <code>bool</code> in C:</p>\n          <ul>\n            <li><strong>Klassisches C (C89):</strong> Es gab gar keinen <code>bool</code>-Typ! <code>0</code> bedeutet <em>falsch</em>, jeder Wert ungleich 0 bedeutet <em>wahr</em>.</li>\n            <li><strong>C99 / C17:</strong> Der ganzzahlige Typ <code>_Bool</code> wurde eingeführt, zusammen mit dem Header <code>#include &lt;stdbool.h&gt;</code>, der <code>bool</code>, <code>true</code> (1) und <code>false</code> (0) als Makros definiert.</li>\n            <li><strong>Neu in C23 (Folie 192 „Happy Birthday C23!“):</strong> <code>bool</code>, <code>true</code> und <code>false</code> sind jetzt <strong>echte Sprach-Keywords</strong>! Man braucht in C23 kein <code>&lt;stdbool.h&gt;</code> mehr!</li>\n          </ul>\n        "
      },
      {
        "title": "3. `enum` & `typedef` (Folie 194–197)",
        "content": "\n          <p>Statt viele einzelne <code>#define MO 1</code> zu schreiben, bündelt ein <strong>Enumerationstyp (<code>enum</code>)</strong> zusammengehörige Konstanten zu einem echten eigenen Typ (der Compiler kann dann sogar prüfen, ob du im <code>switch</code> einen Fall vergessen hast!):</p>\n          <pre class=\"code-preview\">\n// 1. enum definieren (MO bekommt 1, DI automatisch 2, MI 3, usw.):\nenum WeekDay { MO = 1, DI, MI, DO, FR, SA, SO };\n\n// 2. Mit typedef einen kompakten Typ-Spitznamen vergeben (Folie 196/197):\ntypedef enum ResCodes { OK, ERROR } rescodes_t;\n\n// Jetzt kann man kurz schreiben:\nrescodes_t status = OK;</pre>\n        "
      }
    ],
    "quizzes": [
      {
        "id": "w8_q1",
        "question": "Was passiert in einem `switch`-Block, wenn man am Ende eines `case`-Zweigs das `break;` vergisst (Folie 188)?",
        "options": [
          "Der C-Compiler bricht die Übersetzung mit einem Syntaxfehler sofort ab.",
          "Fall-through: Das Programm läuft nahtlos in den Code des nächsten `case`-Zweigs weiter, bis ein `break;` oder das Ende des Blocks erreicht wird.",
          "Das Programm terminiert die aktuelle Funktion und gibt standardmäßig den Exit-Code 1 zurück.",
          "Die Steuerung springt automatisch zum `default:`-Zweig und führt nur diesen aus."
        ],
        "correct": 1,
        "explanation": "Das ist das berühmte 'Fall-through'-Verhalten in C: `case`-Labels sind reine Einsprungmarken. Ohne `break;` fällt die Ausführung automatisch in den nächsten Zweig!"
      },
      {
        "id": "w8_q2",
        "question": "Welche Datentypen sind laut C-Standard (§6.8.4.2, Folie 189) als `case`-Label in einem `switch` erlaubt?",
        "options": [
          "Beliebige Gleitkommazahlen wie `case 3.14:` und `case 0.5:`.",
          "Ganze Zeichenketten (Strings) wie `case \"Montag\":`.",
          "Nur ganzzahlige konstante Ausdrücke (wie `int`, `char`, `short`, `long` oder `enum`).",
          "Variablen, deren Inhalt sich zur Laufzeit dynamisch berechnet."
        ],
        "correct": 2,
        "explanation": "Ein `case`-Label in C MUSS eine zur Compilezeit bekannte ganzzahlige Konstante ('integer constant expression') sein. Weder `float`/`double` noch Strings sind erlaubt."
      },
      {
        "id": "w8_q3",
        "question": "Was hat sich beim Standard C23 im Vergleich zu C99/C17 bezüglich `bool` geändert (Folie 192)?",
        "options": [
          "`bool` wurde in C23 komplett abgeschafft und durch bitweise Integer-Flags ersetzt.",
          "`bool`, `true` und `false` sind in C23 echte, feste Schlüsselwörter der Sprache; `#include <stdbool.h>` ist nicht mehr zwingend nötig.",
          "`true` hat in C23 den Integer-Wert -1 statt wie bisher 1.",
          "Man muss in C23 zwingend das hässliche historische Keyword `_Bool` ausschreiben."
        ],
        "correct": 1,
        "explanation": "Auf Folie 192 ausdrücklich hervorgehoben: Seit C23 sind `bool`, `true` und `false` echte Sprach-Keywords – man benötigt nicht mehr zwingend `<stdbool.h>`!"
      },
      {
        "id": "w8_q4",
        "question": "Welchen Zahlenwert hat `MI` in `enum WeekDay { MO = 1, DI, MI, DO, FR, SA, SO };` (Folie 195)?",
        "options": [
          "`0`: Da Enums in C grundsätzlich immer bei 0 beginnen.",
          "`2`: Da `MO` den Wert 1 hat und `MI` direkt darauf folgt.",
          "`3`: Weil `MO` bei 1 startet und C die Folgewerte automatisch um jeweils 1 erhöht (DI=2, MI=3).",
          "`1`: Alle Elemente eines Enums teilen sich denselben Startwert."
        ],
        "correct": 2,
        "explanation": "Wenn für nachfolgende Enum-Konstanten kein expliziter Wert angegeben wird, zählt C ab dem Vorgänger automatisch um +1 weiter: MO=1, DI=2, MI=3!"
      },
      {
        "id": "w8_q5",
        "question": "Wozu dient das Schlüsselwort `typedef` in `typedef unsigned long long key_t;` (Folie 196)?",
        "options": [
          "Es deklariert eine globale Konstante mit dem Namen `key_t` und weist ihr den Wert 0 zu.",
          "Es führt `key_t` als lesbaren Typ-Alias (Synonym) für den langen Datentyp `unsigned long long` ein.",
          "Es reserviert einen dynamischen Heap-Speicherbereich für kryptografische Schlüssel.",
          "Es zwingt den Compiler, alle Berechnungen mit `key_t` in 128-Bit-Präzision auszuführen."
        ],
        "correct": 1,
        "explanation": "`typedef <Originaltyp> <NeuerName>;` führt einen sprechenden Aliasnamen für einen bestehenden Typ ein, was den Code lesbarer und wartungsfreundlicher macht."
      }
    ],
    "parsons": {
      "title": "Code-Puzzle (Folie 195/197): Wochentage mit typedef enum & switch",
      "instruction": "Bringe Prof. Wamsers `dayofweek`-Beispiel mit `typedef enum` und `switch` in die richtige Reihenfolge!",
      "lines": [
        "typedef enum WeekDay { MO=1, DI, MI, DO, FR, SA, SO } weekday_t;",
        "weekday_t wd = MI;",
        "switch (wd) {",
        "    case MO ... FR:",
        "        printf(\"Werktag gewaehlt\\n\");",
        "        break;",
        "    case SA:",
        "    case SO:",
        "        printf(\"Wochenende gewaehlt\\n\");",
        "        break;",
        "}"
      ]
    },
    "boss": {
      "title": "Boss-Quest 8: Das große Finale – dayofweek_withBoolEnumTypedef.c (Folie 190–197)",
      "description": "Im Code unten ist Prof. Wamsers Beispiel aus dem Skript `gdp1-3` (Folie 190–197) fast fertig aufgebaut. Aber Achtung: Im `switch`-Block wurden die `break;`-Befehle vergessen (**Fall-through-Bug!**), sodass für Tag `3` (Mittwoch) plötzlich Werktag, Samstag, Sonntag UND der Default-Fehler gleichzeitig ausgegeben werden!\n\n**Deine Aufgabe:**\nSetze die fehlenden `break;`-Anweisungen an die richtigen Stellen im `switch`, sodass für `wd = MI` wirklich nur `Werktag gewaehlt` und `Status: OK` ausgegeben wird!",
      "starterCode": "#include <stdio.h>\n#include <stdbool.h>\n\ntypedef enum ResCodes { OK, ERROR } rescodes_t;\ntypedef enum WeekDay { MO = 1, DI, MI, DO, FR, SA, SO } weekday_t;\n\nint main(void) {\n    weekday_t wd = MI;\n    rescodes_t status = OK;\n\n    // Behebe den Fall-through-Bug in diesem switch:\n    switch (wd) {\n        case MO ... FR:\n            printf(\"Werktag gewaehlt\\n\");\n        case SA:\n            printf(\"Samstag gewaehlt\\n\");\n        case SO:\n            printf(\"Sonntag gewaehlt\\n\");\n        default:\n            printf(\"Den Wochentag gibt es nicht\\n\");\n            status = ERROR;\n    }\n\n    if (status == OK) {\n        printf(\"Status: OK\\n\");\n    }\n    return 0;\n}",
      "stdin": "",
      "expectedOutputContains": [
        "Werktag gewaehlt",
        "Status: OK"
      ],
      "hint": "Füge nach `printf(\"Werktag gewaehlt\\n\");`, nach `printf(\"Samstag gewaehlt\\n\");` und nach `printf(\"Sonntag gewaehlt\\n\");` jeweils ein `break;` ein!",
      "solution": "#include <stdio.h>\n#include <stdbool.h>\n\ntypedef enum ResCodes { OK, ERROR } rescodes_t;\ntypedef enum WeekDay { MO = 1, DI, MI, DO, FR, SA, SO } weekday_t;\n\nint main(void) {\n    weekday_t wd = MI;\n    rescodes_t status = OK;\n\n    switch (wd) {\n        case MO ... FR:\n            printf(\"Werktag gewaehlt\\n\");\n            break;\n        case SA:\n            printf(\"Samstag gewaehlt\\n\");\n            break;\n        case SO:\n            printf(\"Sonntag gewaehlt\\n\");\n            break;\n        default:\n            printf(\"Den Wochentag gibt es nicht\\n\");\n            status = ERROR;\n            break;\n    }\n\n    if (status == OK) {\n        printf(\"Status: OK\\n\");\n    }\n    return 0;\n}"
    }
  }
];
