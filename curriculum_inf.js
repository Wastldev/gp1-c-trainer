// ============================================================================
// INFORMATIK 1 (INF1) — CURRICULUM (PROF. WAMSER • THI)
// 6 KERN-KAPITEL: ALGORITHMEN, STELLENWERTSYSTEME, ZWEIERKOMPLEMENT,
// FEST-/GLEITKOMMA (IEEE 754), DIGITALTECHNIK & TRANSISTOREN, SCHALTUNGEN & KV-MAPS
// ============================================================================

window.INF_FLASHCARDS = [
  {
    "q": "Wie lautet die exakte Definition eines Algorithmus laut Vorlesung?",
    "a": "Ein Algorithmus ist eine geordnete Menge von eindeutigen, ausführbaren Schritten, welcher nach einer endlichen Anzahl von Schritten terminiert.",
    "tag": "Kapitel 1"
  },
  {
    "q": "Welche 6 zentralen Eigenschaften muss jeder Algorithmus erfüllen?",
    "a": "1. Allgemeinheit (löst ganze Problemklasse)\n2. Eindeutigkeit (keine Widersprüche)\n3. Finitheit (statisch: Text endlich; dynamisch: Speicher endlich)\n4. Ausführbarkeit\n5. Determinismus & Determiniertheit\n6. Terminierung & Korrektheit",
    "tag": "Kapitel 1"
  },
  {
    "q": "Was ist der Unterschied zwischen Determinismus und Determiniertheit?",
    "a": "Determinismus: Die Schrittabfolge ist zu jedem Zeitpunkt eindeutig festgelegt.\nDeterminiertheit: Gleiche Eingabewerte liefern immer dasselbe Endergebnis (auch wenn Zwischenschritte variieren).",
    "tag": "Kapitel 1"
  },
  {
    "q": "Wie funktioniert der Euklidische Algorithmus (ggT) mit Modulo?",
    "a": "Für a >= b gilt: ggT(a, b) = ggT(b, a mod b). Man ersetzt wiederholt (a, b) durch (b, a mod b), bis der Rest 0 ist. Das letzte b != 0 ist der größte gemeinsame Teiler.",
    "tag": "Kapitel 1"
  },
  {
    "q": "Wie wandelt man eine positive Dezimalzahl in Binär/Dual um?",
    "a": "Methode der fortlaufenden Division: Teile die Zahl fortlaufend durch 2. Die Reste (0 oder 1) ergeben die Ziffern von rechts nach links (LSB / d0 zuerst), bis das Ergebnis 0 ist.",
    "tag": "Kapitel 2"
  },
  {
    "q": "Wie berechnet man das Zweierkomplement einer negativen Zahl?",
    "a": "1. Betrag der Zahl als binäre positive Zahl auf n Bits darstellen.\n2. Alle Bits invertieren (0 -> 1, 1 -> 0 = Einerkomplement).\n3. Eins addieren (+ 1).",
    "tag": "Kapitel 3"
  },
  {
    "q": "Was ist der große Hardware-Vorteil des Zweierkomplements?",
    "a": "Subtraktion kann direkt durch Addition mit dem Zweierkomplement ersetzt werden: a - b = a + (-b). Dadurch genügt ein einziges Addier-Rechenwerk für Plus und Minus!",
    "tag": "Kapitel 3"
  },
  {
    "q": "Wie rechnet man Nachkommastellen einer Festkommazahl von Dezimal in Dual um?",
    "a": "Durch fortlaufende Multiplikation mit der Basis 2! Der ganzzahlige Übertrag vor dem Komma (0 oder 1) ergibt die Nachkomma-Bits von links nach rechts, bis der Rest 0 ist oder periodisch wird.",
    "tag": "Kapitel 4"
  },
  {
    "q": "Was ist das 'Hidden Bit' bei IEEE 754 Gleitkommazahlen?",
    "a": "Da bei normalisierten Binärzahlen vor dem Komma immer eine 1 steht (1.xxx), muss diese 1 nicht extra gespeichert werden. Dadurch gewinnt die Mantisse 1 volles Bit an Präzision!",
    "tag": "Kapitel 4"
  },
  {
    "q": "Wie lautet der Aufbau des IEEE 754 Half-Precision (HP-16) Formats?",
    "a": "16 Bits gesamt:\n- 1 Bit Vorzeichen (0 = positiv, 1 = negativ)\n- 5 Bit Exponent (mit Bias 15 = 2^(5-1) - 1)\n- 10 Bit Mantisse (nur Nachkommastellen des normalisierten Werts)",
    "tag": "Kapitel 4"
  },
  {
    "q": "Wie unterscheiden sich n-MOS- und p-MOS-Transistoren im CMOS-Inverter?",
    "a": "n-MOS leitet (schaltet durch) bei hoher Gate-Spannung (logisch 1 / Vdd) und sperrt bei 0V.\np-MOS leitet bei niedriger Gate-Spannung (logisch 0 / Masse) und sperrt bei Vdd.",
    "tag": "Kapitel 5"
  },
  {
    "q": "Wie lauten die De Morganschen Gesetze der Schaltalgebra?",
    "a": "1. NOT(a AND b) = NOT(a) OR NOT(b)\n2. NOT(a OR b) = NOT(a) AND NOT(b)\nMerksatz: Negationsstrich durchtrennen und Operator umdrehen (AND <-> OR)!",
    "tag": "Kapitel 6"
  },
  {
    "q": "Welche Eigenschaft müssen Gruppen in einem KV-Diagramm (Karnaugh-Map) haben?",
    "a": "1. Rechteckige Blöcke aus 1-Einträgen.\n2. Blockgröße muss eine Zweierpotenz sein (1, 2, 4, 8, 16 Felder).\n3. Blöcke dürfen über die Ränder hinweg verbunden werden (Torus-Eigenschaft) und sich überlappen.",
    "tag": "Kapitel 6"
  },
  {
    "q": "Was unterscheidet einen Halbaddierer von einem Volladdierer?",
    "a": "Halbaddierer: Addiert 2 Bits a und b -> Summe s (XOR) und Übertrag c (AND). Kann keinen vorherigen Übertrag verarbeiten!\nVolladdierer: Addiert 3 Bits (a, b und Übertrag c_in) -> Summe s und Übertrag c_out.",
    "tag": "Kapitel 6"
  }
];

window.INF_WORLDS = [
  {
    "id": "inf_w1",
    "num": 1,
    "title": "Algorithmen & Informatikbegriff",
    "badge": "Turing Starter",
    "quizzes": [
      {
        "id": "inf_w1_q1",
        "q": "Wie lautet die exakte Definition eines Algorithmus laut INF1-Vorlesung?",
        "options": [
          "Ein Programmcode, der beliebig lange im Hintergrund l�uft, um Server-Daten zu verarbeiten.",
          "Eine geordnete Menge von eindeutigen, ausf�hrbaren Schritten, welcher nach einer endlichen Anzahl von Schritten terminiert.",
          "Eine mathematische Formel zur L�sung linearer Gleichungssysteme mit Matrizen.",
          "Ein elektronischer Schaltkreis aus Transistoren zur Durchf�hrung logischer Gatter-Operationen."
        ],
        "correct": 1,
        "why": "Laut Definition ist ein Algorithmus eine geordnete Menge eindeutiger, ausf�hrbarer Schritte, die garantiert nach endlich vielen Schritten anh�lt (Terminierung)."
      },
      {
        "id": "inf_w1_q2",
        "q": "Was unterscheidet Determinismus von Determiniertheit bei Algorithmen?",
        "options": [
          "Beide Begriffe bedeuten in der theoretischen Informatik exakt dasselbe.",
          "Determinismus bedeutet gleiches Endergebnis; Determiniertheit legt die Einzelschritte fest.",
          "Determinismus legt die exakte Schrittabfolge fest; Determiniertheit garantiert, dass bei gleichen Eingaben stets dasselbe Ergebnis geliefert wird.",
          "Determinismus gilt nur f�r deterministische Automaten, Determiniertheit nur f�r Compiler."
        ],
        "correct": 2,
        "why": "Determinismus = Die Abfolge der Anweisungen ist zu jedem Zeitpunkt eindeutig festgelegt. Determiniertheit = Bei gleichen Eingabewerten liefert der Algorithmus stets dasselbe Ergebnis."
      },
      {
        "id": "inf_w1_q3",
        "q": "Was versteht man unter statischer und dynamischer Finitheit (Endlichkeit)?",
        "options": [
          "Statische Finitheit: Endlicher Quelltext/Beschreibung. Dynamische Finitheit: Beschr�nkter Speicher-/Ressourcenverbrauch zur Laufzeit.",
          "Statische Finitheit: Konstante Variablenanzahl. Dynamische Finitheit: Schnelle CPU-Taktfrequenz.",
          "Statische Finitheit: Keine Rekursion im Code. Dynamische Finitheit: Kein Stack Overflow.",
          "Statische Finitheit: Kompilierzeit unter 1 Sekunde. Dynamische Finitheit: Laufzeit unter 10 Sekunden."
        ],
        "correct": 0,
        "why": "Statische Finitheit bedeutet, dass die Beschreibung des Algorithmus endlich ist. Dynamische Finitheit bedeutet, dass w�hrend der Ausf�hrung nur endlich viele Ressourcen (z. B. Speicher) ben�tigt werden."
      },
      {
        "id": "inf_w1_q4",
        "q": "Welches Ergebnis liefert der Euklidische Algorithmus f�r ggT(3054, 1002)?",
        "options": [
          "1 (sie sind teilerfremd)",
          "12",
          "6",
          "3"
        ],
        "correct": 2,
        "why": "3054 mod 1002 = 48 -> 1002 mod 48 = 42 -> 48 mod 42 = 6 -> 42 mod 6 = 0. Der letzte Teiler != 0 ist 6! (Original Vorlesungsbeispiel Folie 46)."
      }
    ],
    "parsons": {
      "title": "Euklidischer Algorithmus (ggT mit Modulo)",
      "instruction": "Bringe die Schritte des Euklidischen Algorithmus zur Berechnung des ggT(a, b) in die logisch richtige Reihenfolge:",
      "lines": [
        "Eingabe: Zwei ganze Zahlen a und b mit a >= b > 0 einlesen",
        "Berechne den Divisionsrest: r = a mod b",
        "Pr�fe, ob r == 0 ist: Wenn ja, ist b der gesuchte ggT!",
        "Falls r > 0: Setze a = b und b = r",
        "Wiederhole die Berechnung r = a mod b bis r == 0 erreicht wird",
        "Ausgabe des letzten Werts von b als gr��ter gemeinsamer Teiler"
      ]
    },
    "boss": {
      "title": "Praxis-Pr�fung: Euklidischer Algorithmus (ggT)",
      "task": "Implementiere den Euklidischen Algorithmus in C f�r zwei gegebene Zahlen a und b aus stdin. Berechne ihren ggT und gib das Ergebnis aus!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) != 2) return 1;\n\n    while (b != 0) {\n        int r = a % b;\n        a = b;\n        b = r;\n    }\n\n    printf(\"%d\\n\", a);\n    return 0;\n}",
      "stdin": "3054 1002",
      "expectedOutput": "6"
    }
  },
  {
    "id": "inf_w2",
    "num": 2,
    "title": "Informationsdarstellung & Stellenwertsysteme",
    "badge": "Binary Master",
    "quizzes": [
      {
        "id": "inf_w2_q1",
        "q": "Welcher Dezimalzahl entspricht die Bin�rzahl 10001011_2?",
        "options": [
          "128",
          "139",
          "147",
          "135"
        ],
        "correct": 1,
        "why": "1*128 + 0*64 + 0*32 + 0*16 + 1*8 + 0*4 + 1*2 + 1*1 = 128 + 8 + 2 + 1 = 139_10 (Originalbeispiel Folie 68)."
      },
      {
        "id": "inf_w2_q2",
        "q": "Wie lautet das Ergebnis der Hexadezimalzahl 1AF_16 im Dezimalsystem?",
        "options": [
          "395",
          "412",
          "431",
          "480"
        ],
        "correct": 2,
        "why": "1*16^2 + A(10)*16^1 + F(15)*16^0 = 1*256 + 10*16 + 15 = 256 + 160 + 15 = 431_10 (Originalbeispiel Folie 74)."
      },
      {
        "id": "inf_w2_q3",
        "q": "Wie funktioniert das Horner-Schema bei der Umwandlung von Dual nach Dezimal?",
        "options": [
          "Man quadriert jede Ziffer und bildet am Ende die Quadratwurzel.",
          "Man multipliziert den bisherigen Zwischenwert mit der Basis 2 und addiert die n�chste Ziffer von links nach rechts.",
          "Man teilt fortlaufend durch 16 und notiert die Reste von rechts nach links.",
          "Man vertauscht h�chstwertiges und niederwertigstes Bit und zieht 1 ab."
        ],
        "correct": 1,
        "why": "Horner-Schema f�r Basis 2: Starte mit 0. F�r jedes Bit von links nach rechts: Zwischenwert * 2 + aktuelles Bit. Extrem effizient ohne Potenzen!"
      },
      {
        "id": "inf_w2_q4",
        "q": "Wie viele Ziffern werden bei der Wandlung von Hexadezimal zu Bin�r direkt gruppiert?",
        "options": [
          "Jede Hexadezimalziffer entspricht exakt 4 Bin�rbits (Nibble).",
          "Jede Hexadezimalziffer entspricht genau 3 Bin�rbits.",
          "Jede Hexadezimalziffer entspricht genau 8 Bin�rbits (1 Byte).",
          "Das h�ngt davon ab, ob es sich um eine gerade oder ungerade Zahl handelt."
        ],
        "correct": 0,
        "why": "Weil 16 = 2^4 ist, l�sst sich jede Hex-Ziffer (0-F) exakt und verlustfrei durch ein 4-Bit-Muster (0000 bis 1111) darstellen."
      }
    ],
    "parsons": {
      "title": "Dezimal zu Bin�r: Methode der fortlaufenden Division",
      "instruction": "Bringe die Schritte zur Umwandlung einer Dezimalzahl (z. B. 139) in das Dualsystem in die richtige Reihenfolge:",
      "lines": [
        "Teile die Dezimalzahl ganzzahlig durch die Basis 2 (z. B. 139 / 2 = 69 Rest 1)",
        "Notiere den Divisionsrest (0 oder 1) als niederwertigstes Bit (d0)",
        "Nimm das ganzzahlige Ergebnis (69) und teile erneut durch 2 (Rest 1 -> d1)",
        "Wiederhole die Division durch 2 fortlaufend mit den Zwischenergebnissen",
        "Stoppe die Division genau dann, sobald das ganzzahlige Ergebnis 0 erreicht hat",
        "Lies alle notierten Reste von unten nach oben (vom letzten Rest zum ersten Rest)"
      ]
    },
    "boss": {
      "title": "Praxis-Pr�fung: Dezimal zu Bin�r Umrechner",
      "task": "Schreibe ein C-Programm, das eine positive Dezimalzahl aus stdin einliest und als 8-Bit-Bin�rzahl ausgibt!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 1;\n\n    for (int i = 7; i >= 0; i--) {\n        int bit = (n >> i) & 1;\n        printf(\"%d\", bit);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "stdin": "139",
      "expectedOutput": "10001011"
    }
  },
  {
    "id": "inf_w3",
    "num": 3,
    "title": "Negative Zahlen & Zweierkomplement",
    "badge": "Two Complement Pro",
    "quizzes": [
      {
        "id": "inf_w3_q1",
        "q": "Wie lautet das 8-Bit-Zweierkomplement der Zahl -25_10?",
        "options": [
          "00011001",
          "11100110",
          "11100111",
          "10011001"
        ],
        "correct": 2,
        "why": "+25_10 = 00011001_2. Alle Bits invertieren -> 11100110 (Einerkomplement). 1 addieren -> 11100111_2 (Originalbeispiel Folie 93)."
      },
      {
        "id": "inf_w3_q2",
        "q": "Welcher Wertebereich l�sst sich mit einem 8-Bit-Zweierkomplement darstellen?",
        "options": [
          "-128 bis +127",
          "-127 bis +128",
          "-256 bis +255",
          "-127 bis +127 (mit zwei Nullen +0 und -0)"
        ],
        "correct": 0,
        "why": "Bei n=8 Bits reicht der Bereich von -2^(n-1) bis +2^(n-1) - 1, also exakt von -128 bis +127. Es gibt nur eine einzige eindeutige Null (00000000)!"
      },
      {
        "id": "inf_w3_q3",
        "q": "Was ist der gr��te Hardware-Vorteil der Zweierkomplement-Darstellung in CPUs?",
        "options": [
          "Es verbraucht halb so viel RAM wie vorzeichenlose Ganzzahlen.",
          "Subtraktion kann als Addition mit dem Zweierkomplement berechnet werden (a - b = a + (-b)), wodurch ein einziges Addierwerk gen�gt.",
          "Multiplikationen k�nnen ohne Taktzyklen in 0 Nanosekunden durchgef�hrt werden.",
          "Es verhindert Compiler-Warnungen in GCC automatisch."
        ],
        "correct": 1,
        "why": "Da a - b = a + (-b) ist, braucht die ALU keine separate Subtrahier-Schaltung. Ein Addier-Rechenwerk gen�gt vollst�ndig (Folie 96)."
      },
      {
        "id": "inf_w3_q4",
        "q": "Wann entsteht bei der Addition zweier Zweierkomplement-Zahlen ein arithmetischer �berlauf (Overflow)?",
        "options": [
          "Immer wenn das Ergebnis ungerade ist.",
          "Wenn das Carry-Bit des h�chstwertigen Bits (MSB) 0 ist.",
          "Wenn zwei Zahlen mit gleichem Vorzeichen addiert werden und das Ergebnis das entgegengesetzte Vorzeichen erh�lt.",
          "Wenn eine positive und eine negative Zahl addiert werden."
        ],
        "correct": 2,
        "why": "Wenn zwei positive Zahlen addiert werden und das MSB pl�tzlich 1 (negativ) wird, oder zwei negative addiert werden und das Ergebnis 0 (positiv) wird, liegt ein Overflow vor."
      }
    ],
    "parsons": {
      "title": "Berechnung des Zweierkomplements (f�r negative Zahlen)",
      "instruction": "Ordne die Einzelschritte zur Bildung des 8-Bit-Zweierkomplements einer negativen Zahl (z. B. -25):",
      "lines": [
        "Nimm den Betrag der Zahl ohne Vorzeichen (z. B. +25)",
        "Wandle die positive Zahl in eine 8-Bit-Bin�rzahl um: 00011001",
        "Invertiere s�mtliche Bits (0 wird zu 1, 1 wird zu 0) -> Einerkomplement: 11100110",
        "Addiere bin�r eine Eins (+ 1) zum invertierten Bitmuster",
        "Erhalte das fertige Zweierkomplement: 11100111",
        "Pr�fe: Das h�chstwertige Bit (MSB) ist 1, was eine negative Zahl signalisiert"
      ]
    },
    "boss": {
      "title": "Praxis-Pr�fung: Zweierkomplement-Rechner",
      "task": "Schreibe ein C-Programm, das eine negative Zahl n aus stdin einliest und ihr 8-Bit-Zweierkomplement als Bin�rstring ausgibt!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 1;\n\n    unsigned char byte = (unsigned char)n;\n    for (int i = 7; i >= 0; i--) {\n        printf(\"%d\", (byte >> i) & 1);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "stdin": "-25",
      "expectedOutput": "11100111"
    }
  },
  {
    "id": "inf_w4",
    "num": 4,
    "title": "Festkomma & Gleitkomma (IEEE 754)",
    "badge": "Float Architect",
    "quizzes": [
      {
        "id": "inf_w4_q1",
        "q": "Welcher Bin�rdarstellung entspricht die dezimale Festkommazahl 4.8125_10?",
        "options": [
          "100.1101",
          "100.1011",
          "100.1110",
          "101.0101"
        ],
        "correct": 0,
        "why": "4 = 100_2. 0.8125*2=1.625(1), 0.625*2=1.25(1), 0.25*2=0.5(0), 0.5*2=1.0(1). Ergebnis: 100.1101_2 (Originalbeispiel Folie 108)."
      },
      {
        "id": "inf_w4_q2",
        "q": "Warum l�sst sich die Dezimalzahl 0.6_10 im bin�ren Festkommasystem nicht exakt darstellen?",
        "options": [
          "Weil 0.6 gr��er als 0.5 ist.",
          "Weil 0.6 im Dualsystem zu einem periodischen Bruch (.10011001...) f�hrt.",
          "Weil die Basis 2 nur ganze Zahlen darstellen kann.",
          "Weil der Exponent bei Festkommazahlen stets positiv sein muss."
        ],
        "correct": 1,
        "why": "0.6 * 2 = 1.2 -> 0.2*2=0.4 -> 0.4*2=0.8 -> 0.8*2=1.6 -> 0.6*2=1.2 (Periode 1001!). Im Dualsystem periodisch, daher Rundungsfehler (Folie 110)."
      },
      {
        "id": "inf_w4_q3",
        "q": "Wie ist das 16-Bit Half Precision (HP-16) Format nach IEEE 754 aufgeteilt?",
        "options": [
          "1 Bit Vorzeichen, 8 Bit Exponent, 7 Bit Mantisse",
          "1 Bit Vorzeichen, 5 Bit Exponent (Bias 15), 10 Bit Mantisse",
          "2 Bit Vorzeichen, 4 Bit Exponent, 10 Bit Mantisse",
          "1 Bit Vorzeichen, 4 Bit Exponent, 11 Bit Mantisse"
        ],
        "correct": 1,
        "why": "IEEE 754 HP-16: 1 Vorzeichenbit, 5 Exponentenbits mit Bias 15 (2^(5-1)-1), 10 Mantissenbits (Folie 127)."
      },
      {
        "id": "inf_w4_q4",
        "q": "Welche IEEE-754 HP-16 Darstellung ergibt die Zahl 7.5_10?",
        "options": [
          "0 10001 1110000000",
          "1 10001 1110000000",
          "0 01111 1110000000",
          "0 10010 0100000000"
        ],
        "correct": 0,
        "why": "7.5 = 111.1_2 = 1.111*2^2. Vorzeichen 0. Exponent = 2 + 15 = 17 = 10001_2. Mantisse (ohne Hidden Bit 1): 1110000000 (Folie 129)."
      }
    ],
    "parsons": {
      "title": "IEEE 754 Half-Precision (HP-16) Umwandlung",
      "instruction": "Bringe die 5 Schritte zur Umwandlung von -10.375 in IEEE 754 HP-16 in die richtige Reihenfolge:",
      "lines": [
        "Wandle Betrag und Nachkommastellen bin�r um: 10.375_10 = 1010.011_2",
        "Normalisiere die Mantisse: 1010.011_2 = 1.010011 * 2^3 (wahrer Exponent = 3)",
        "Addiere den Bias (15 bei 5 Exponent-Bits): Gespeicherter Exponent = 3 + 15 = 18_10 = 10010_2",
        "Entferne das Hidden Bit (f�hrende 1) und f�lle die Mantisse auf 10 Bits auf: 0100110000",
        "F�ge alles zusammen: Vorzeichen 1 (negativ) + Exponent 10010 + Mantisse 0100110000",
        "Ergebnis: 1 10010 0100110000"
      ]
    },
    "boss": {
      "title": "Praxis-Pr�fung: Festkomma-Multiplikation",
      "task": "Schreibe ein C-Programm, das f�r eine eingegebene Dezimalzahl zwischen 0 und 1 (z. B. 0.8125) die ersten 4 Bin�r-Nachkommastellen berechnet und ausgibt!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    double val;\n    if (scanf(\"%lf\", &val) != 1) return 1;\n\n    for (int i = 0; i < 4; i++) {\n        val *= 2.0;\n        int bit = (int)val;\n        printf(\"%d\", bit);\n        if (val >= 1.0) val -= 1.0;\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "stdin": "0.8125",
      "expectedOutput": "1101"
    }
  },
  {
    "id": "inf_w5",
    "num": 5,
    "title": "Digitaltechnik & Transistoren",
    "badge": "Silicon Engineer",
    "quizzes": [
      {
        "id": "inf_w5_q1",
        "q": "Welcher Baustein l�ste ab 1948 die unzuverl�ssigen Elektronenr�hren in Computern ab?",
        "options": [
          "Der Halbleiter-Transistor",
          "Das elektromagnetische Relais",
          "Das D-Flip-Flop",
          "Der Mikroprozessor"
        ],
        "correct": 0,
        "why": "1948 wurde der Transistor entwickelt (Folie 135). Er ersetzte die hei�en, fehleranf�lligen Vakuumr�hren durch Festk�rper-Halbleiter."
      },
      {
        "id": "inf_w5_q2",
        "q": "Was zeichnet einen n-Kanal MOSFET (Anreicherungstyp) aus?",
        "options": [
          "Er leitet permanent und sperrt nur bei Anlegen einer negativen Spannung.",
          "Er ist selbstsperrend und leitet erst, wenn eine positive Gate-Source-Spannung U_GS > U_th anliegt.",
          "Er besteht ausschlie�lich aus Kupfer und Aluminium ohne Silizium.",
          "Er kann nur Wechselstrom verst�rken, aber keine Gleichspannung schalten."
        ],
        "correct": 1,
        "why": "Der selbstsperrende n-MOSFET schaltet durch (wird leitend), sobald das Gate gegen�ber Source positiv aufgeladen wird (U_GS > U_th, Folie 148)."
      },
      {
        "id": "inf_w5_q3",
        "q": "Warum nutzt moderne Digitaltechnik fast ausschlie�lich die CMOS-Technologie?",
        "options": [
          "Weil CMOS aus komplement�ren n-MOS und p-MOS Transistoren besteht und im statischen Zustand fast keinen Ruhestrom verbraucht.",
          "Weil CMOS-Schaltkreise ohne Taktleitung auskommen.",
          "Weil CMOS-Bauteile keine W�rme erzeugen.",
          "Weil CMOS ausschlie�lich aus optischen Glasfasern aufgebaut ist."
        ],
        "correct": 0,
        "why": "CMOS (Complementary MOS) kombiniert n-MOS und p-MOS. Da immer einer sperrt, flie�t nur beim Umschalten kurz Strom -> extrem geringe Verlustleistung (Folie 181)."
      },
      {
        "id": "inf_w5_q4",
        "q": "Wie ist ein CMOS-Inverter (NOT-Gatter) aus Transistoren aufgebaut?",
        "options": [
          "Zwei n-MOS-Transistoren in Reihe gegen Masse geschaltet.",
          "Ein p-MOS nach oben zu Vdd und ein n-MOS nach unten zu Masse (GND) in Reihe; Gates verbunden als Eingang.",
          "Ein Relais kombiniert mit einem Vorwiderstand.",
          "Vier Dioden in einer Graetz-Gleichrichterschaltung."
        ],
        "correct": 1,
        "why": "Liegt am Eingang 1 (5V) an, leitet n-MOS nach GND (Ausgang 0). Liegt 0V an, leitet p-MOS nach Vdd (Ausgang 1) -> perfekte Invertierung (Folie 181)."
      }
    ],
    "parsons": {
      "title": "CMOS-Inverter Schaltvorgang (Eingang wechselt von 0 auf 1)",
      "instruction": "Bringe den physikalischen Ablauf beim Umschalten eines CMOS-Inverters von logisch 0 auf logisch 1 in die richtige Reihenfolge:",
      "lines": [
        "Eingangsspannung wechselt von 0V (Low) auf 5V (High / logisch 1)",
        "Die Gate-Source-Spannung am n-MOS �berschreitet die Schwellenspannung (U_GS > U_th)",
        "Der untere n-MOS-Transistor wird leitend und schaltet den Pfad zu GND (Masse) durch",
        "Gleichzeitig sperrt der obere p-MOS-Transistor, da seine Gate-Source-Spannung 0V wird",
        "Die Ausgangskapazit�t wird �ber den leitenden n-MOS gegen Masse entladen",
        "Die Ausgangsspannung sinkt auf 0V (logisch 0) -> Invertierung vollendet"
      ]
    },
    "boss": {
      "title": "Praxis-Pr�fung: CMOS-Inverter Simulator in C",
      "task": "Implementiere eine C-Funktion, die das Verhalten eines CMOS-Inverters simuliert: Bei Eingabe 1 soll 0 ausgegeben werden, bei 0 soll 1 ausgegeben werden!",
      "starterCode": "#include <stdio.h>\n\nint cmos_inverter(int in) {\n    return in ? 0 : 1;\n}\n\nint main(void) {\n    int input;\n    if (scanf(\"%d\", &input) != 1) return 1;\n    printf(\"%d\\n\", cmos_inverter(input));\n    return 0;\n}",
      "stdin": "1",
      "expectedOutput": "0"
    }
  },
  {
    "id": "inf_w6",
    "num": 6,
    "title": "Boolesche Algebra, Schaltungen & KV-Diagramme",
    "badge": "Logic Mastermind",
    "quizzes": [
      {
        "id": "inf_w6_q1",
        "q": "Wie lautet das De Morgansche Gesetz f�r NOT(a AND b)?",
        "options": [
          "NOT(a) AND NOT(b)",
          "NOT(a) OR NOT(b)",
          "a OR b",
          "NOT(a XOR b)"
        ],
        "correct": 1,
        "why": "De Morgan: Das Komplement einer Konjunktion ist die Disjunktion der Komplemente: NOT(a AND b) = NOT(a) OR NOT(b) (Folie 171)."
      },
      {
        "id": "inf_w6_q2",
        "q": "Welche Bedingung m�ssen Gruppen/Bl�cke in einem Karnaugh-Veitch-Diagramm (KV-Map) erf�llen?",
        "options": [
          "Sie m�ssen dreieckig sein und mindestens 3 Einsen enthalten.",
          "Sie m�ssen rechteckig sein und ihre Kantenl�ngen m�ssen Zweierpotenzen (1, 2, 4, 8) sein.",
          "Sie d�rfen niemals an den Au�enr�ndern zusammenh�ngen.",
          "Jede Gruppe darf h�chstens zwei Variablen umfassen."
        ],
        "correct": 1,
        "why": "Bl�cke in KV-Maps m�ssen rechteckig sein mit Gr��en von 1, 2, 4, 8 Feldern (Zweierpotenzen), um Variablen durch a OR NOT(a) = 1 k�rzen zu k�nnen (Folie 211)."
      },
      {
        "id": "inf_w6_q3",
        "q": "Welche Gatter bilden einen Halbaddierer f�r zwei Bits a und b?",
        "options": [
          "Ein XOR-Gatter f�r die Summe s und ein AND-Gatter f�r das Carry-Bit c",
          "Ein OR-Gatter f�r die Summe s und ein NAND-Gatter f�r das Carry-Bit c",
          "Zwei NOR-Gatter in Reihe geschaltet",
          "Ein Multiplexer und ein D-Flip-Flop"
        ],
        "correct": 0,
        "why": "Wahrheitstabelle Halbaddierer: Summe s = a XOR b (0+1=1, 1+0=1, 1+1=0). Carry c = a AND b (nur 1 bei 1+1) (Folie 233)."
      },
      {
        "id": "inf_w6_q4",
        "q": "Was unterscheidet die Kanonische Disjunktive Normalform (KDNF) von der KKNF?",
        "options": [
          "KDNF ist eine Oder-Verkn�pfung von Und-Termen (Mintermen); KKNF ist eine Und-Verkn�pfung von Oder-Termen (Maxtermen).",
          "KDNF wird nur f�r 2 Variablen verwendet, KKNF f�r beliebige Variablen.",
          "KDNF ist immer k�rzer als die KKNF.",
          "KDNF enth�lt keine negierten Variablen."
        ],
        "correct": 0,
        "why": "KDNF = Summe von Produkten (Minterme f�r alle Zeilen mit Ergebnis 1). KKNF = Produkt von Summen (Maxterme f�r alle Zeilen mit Ergebnis 0) (Folie 200/201)."
      }
    ],
    "parsons": {
      "title": "Minimierung mit dem KV-Diagramm (K-Map)",
      "instruction": "Bringe die Schritte zur logischen Minimierung einer Schaltfunktion mit einem KV-Diagramm in die richtige Reihenfolge:",
      "lines": [
        "Erstelle die vollst�ndige Wahrheitstabelle f�r alle Variablenkombinationen",
        "Trage alle Einsen (1) der Wahrheitstabelle in das Gray-Code codierte KV-Diagramm ein",
        "Finde m�glichst gro�e, rechteckige Bl�cke von Einsen mit Zweierpotenz-Gr��e (1, 2, 4, 8, ...)",
        "Nutze Randverbindungen (Torus-Eigenschaft) und �berlappungen f�r gr��ere Bl�cke",
        "Lies f�r jeden Block die Variablen ab, die innerhalb des Blocks ihren Wert NICHT �ndern",
        "Verkn�pfe die resultierenden Terme disjunktiv (mit ODER) zur minimalen Schaltfunktion"
      ]
    },
    "boss": {
      "title": "Praxis-Pr�fung: Volladdierer Logik in C",
      "task": "Implementiere die Logik eines Volladdierers (Full Adder) in C: Drei Bits a, b und c_in einlesen, Summe s und Carry c_out berechnen und ausgeben!",
      "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b, cin;\n    if (scanf(\"%d %d %d\", &a, &b, &cin) != 3) return 1;\n\n    int sum = a ^ b ^ cin;\n    int cout = (a & b) | (cin & (a ^ b));\n\n    printf(\"%d %d\\n\", sum, cout);\n    return 0;\n}",
      "stdin": "1 1 1",
      "expectedOutput": "1 1"
    }
  }
];
