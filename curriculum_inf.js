// ============================================================================
// INFORMATIK 1 (INF1) — CURRICULUM (PROF. WAMSER • THI)
// Interaktive Prüfungsformate:
// - Quizzes (Active Recall / Multiple-Choice)
// - Parsons-Puzzles (Verfahren & Schrittabfolgen ordnen)
// - Interactive Lab (Truth Tables, Bit-Converter, KV-Maps, Schaltungsanalyse)
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
    "q": "Was ist das Hidden Bit bei IEEE 754 Gleitkommazahlen?",
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
    "lessons": [
      {
        "title": "1. Was ist Informatik & was ist ein Algorithmus? (Folie 1–50)",
        "content": `
          <p>Informatik 1 bei Prof. Wamser ist die theoretische und technische Grundlage der Computertechnik. Im Zentrum steht der Begriff des <strong>Algorithmus</strong>:</p>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>🎯 Definition</h4>
              <p>Ein Algorithmus ist eine <strong>geordnete Menge von eindeutigen, ausführbaren Schritten</strong>, welcher nach einer <strong>endlichen Anzahl von Schritten terminiert</strong>.</p>
            </div>
            <div class="concept-card">
              <h4>⚙️ Finitheit</h4>
              <p><strong>Statisch:</strong> Der Text/die Beschreibung ist endlich.<br><strong>Dynamisch:</strong> Zur Laufzeit wird nur endlich viel Speicher/Ressourcen verbraucht.</p>
            </div>
            <div class="concept-card">
              <h4>🔁 Determinismus vs. Determiniertheit</h4>
              <p><strong>Determinismus:</strong> Jeder Einzelschritt steht fest.<br><strong>Determiniertheit:</strong> Gleiche Eingaben erzeugen garantiert dasselbe Endergebnis!</p>
            </div>
          </div>
          <div class="trap-box">
            <strong>💡 Euklidischer Algorithmus (ggT):</strong> Für zwei Zahlen <code>a &ge; b</code> gilt <code>ggT(a, b) = ggT(b, a mod b)</code>. Man teilt mit Rest, bis der Rest 0 ist!
          </div>
        `
      }
    ],
    "quizzes": [
      {
        "id": "inf_w1_q1",
        "question": "Wie lautet die exakte Definition eines Algorithmus laut INF1-Vorlesung?",
        "options": [
          "Ein Programmcode, der beliebig lange im Hintergrund läuft, um Server-Daten zu verarbeiten.",
          "Eine geordnete Menge von eindeutigen, ausführbaren Schritten, welcher nach einer endlichen Anzahl von Schritten terminiert.",
          "Eine mathematische Formel zur Lösung linearer Gleichungssysteme mit Matrizen.",
          "Ein elektronischer Schaltkreis aus Transistoren zur Durchführung logischer Gatter-Operationen."
        ],
        "correct": 1,
        "explanation": "Laut Definition ist ein Algorithmus eine geordnete Menge eindeutiger, ausführbarer Schritte, die garantiert nach endlich vielen Schritten anhält (Terminierung)."
      },
      {
        "id": "inf_w1_q2",
        "question": "Was unterscheidet Determinismus von Determiniertheit bei Algorithmen?",
        "options": [
          "Beide Begriffe bedeuten in der theoretischen Informatik exakt dasselbe.",
          "Determinismus bedeutet gleiches Endergebnis; Determiniertheit legt die Einzelschritte fest.",
          "Determinismus legt die exakte Schrittabfolge fest; Determiniertheit garantiert, dass bei gleichen Eingaben stets dasselbe Ergebnis geliefert wird.",
          "Determinismus gilt nur für deterministische Automaten, Determiniertheit nur für Compiler."
        ],
        "correct": 2,
        "explanation": "Determinismus = Die Abfolge der Anweisungen ist zu jedem Zeitpunkt eindeutig festgelegt. Determiniertheit = Bei gleichen Eingabewerten liefert der Algorithmus stets dasselbe Ergebnis."
      },
      {
        "id": "inf_w1_q3",
        "question": "Was versteht man unter statischer und dynamischer Finitheit (Endlichkeit)?",
        "options": [
          "Statische Finitheit: Endlicher Quelltext/Beschreibung. Dynamische Finitheit: Beschränkter Speicher-/Ressourcenverbrauch zur Laufzeit.",
          "Statische Finitheit: Konstante Variablenanzahl. Dynamische Finitheit: Schnelle CPU-Taktfrequenz.",
          "Statische Finitheit: Keine Rekursion im Code. Dynamische Finitheit: Kein Stack Overflow.",
          "Statische Finitheit: Kompilierzeit unter 1 Sekunde. Dynamische Finitheit: Laufzeit unter 10 Sekunden."
        ],
        "correct": 0,
        "explanation": "Statische Finitheit bedeutet, dass die Beschreibung des Algorithmus endlich ist. Dynamische Finitheit bedeutet, dass während der Ausführung nur endlich viele Ressourcen (z. B. Speicher) benötigt werden."
      },
      {
        "id": "inf_w1_q4",
        "question": "Welches Ergebnis liefert der Euklidische Algorithmus für ggT(3054, 1002)?",
        "options": [
          "1 (sie sind teilerfremd)",
          "12",
          "6",
          "3"
        ],
        "correct": 2,
        "explanation": "3054 mod 1002 = 48 -> 1002 mod 48 = 42 -> 48 mod 42 = 6 -> 42 mod 6 = 0. Der letzte Teiler != 0 ist 6! (Original Vorlesungsbeispiel Folie 46)."
      }
    ],
    "parsons": {
      "title": "Euklidischer Algorithmus (ggT mit Modulo)",
      "instruction": "Bringe die Schritte des Euklidischen Algorithmus zur Berechnung des ggT(a, b) in die logisch richtige Reihenfolge:",
      "lines": [
        "Eingabe: Zwei ganze Zahlen a und b mit a >= b > 0 einlesen",
        "Berechne den Divisionsrest: r = a mod b",
        "Prüfe, ob r == 0 ist: Wenn ja, ist b der gesuchte ggT!",
        "Falls r > 0: Setze a = b und b = r",
        "Wiederhole die Berechnung r = a mod b bis r == 0 erreicht wird",
        "Ausgabe des letzten Werts von b als größter gemeinsamer Teiler"
      ]
    },
    "interactive": {
      "type": "steptrace",
      "title": "Interaktiver Ablauf: Euklidischer Algorithmus (ggT-Trace)",
      "instruction": "Führe den Euklidischen Algorithmus für a = 3054 und b = 1002 Schritt für Schritt durch, indem du die Modulo-Reste berechnest:",
      "fields": [
        { "label": "Schritt 1: 3054 mod 1002 =", "expected": "48", "placeholder": "Divisionsrest eintragen" },
        { "label": "Schritt 2: 1002 mod 48 =", "expected": "42", "placeholder": "Divisionsrest eintragen" },
        { "label": "Schritt 3: 48 mod 42 =", "expected": "6", "placeholder": "Divisionsrest eintragen" },
        { "label": "Schritt 4: 42 mod 6 =", "expected": "0", "placeholder": "Rest eintragen" },
        { "label": "Endergebnis ggT(3054, 1002) =", "expected": "6", "placeholder": "Größter gemeinsamer Teiler" }
      ],
      "explanation": "Perfekt! 3054 mod 1002 = 48 -> 1002 mod 48 = 42 -> 48 mod 42 = 6 -> 42 mod 6 = 0. Der letzte Teiler ungleich 0 ist 6."
    }
  },
  {
    "id": "inf_w2",
    "num": 2,
    "title": "Informationsdarstellung & Stellenwertsysteme",
    "badge": "Binary Master",
    "lessons": [
      {
        "title": "Zahlensysteme: Dual, Hexadezimal & Dezimal (Folie 51–80)",
        "content": `
          <p>Rechner kennen nur Bits (0 und 1). Jedes Stellenwertsystem basiert auf einer Basis <strong>B</strong>:</p>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>🔢 Dualsystem (Basis 2)</h4>
              <p>Ziffern: 0, 1. Stellenwerte: 2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128...</p>
            </div>
            <div class="concept-card">
              <h4>🔠 Hexadezimalsystem (Basis 16)</h4>
              <p>Ziffern 0–9 und A(10), B(11), C(12), D(13), E(14), F(15). <strong>Jede Hex-Ziffer entspricht exakt 4 Binär-Bits!</strong></p>
            </div>
            <div class="concept-card">
              <h4>➗ Fortlaufende Division</h4>
              <p>Dezimal zu Dual: Teile fortlaufend durch 2, schreibe den Rest (0 oder 1) auf und lies die Reste von unten nach oben!</p>
            </div>
          </div>
        `
      }
    ],
    "quizzes": [
      {
        "id": "inf_w2_q1",
        "question": "Welcher Dezimalzahl entspricht die Binärzahl 10001011_2?",
        "options": [
          "128",
          "139",
          "147",
          "135"
        ],
        "correct": 1,
        "explanation": "1*128 + 0*64 + 0*32 + 0*16 + 1*8 + 0*4 + 1*2 + 1*1 = 128 + 8 + 2 + 1 = 139_10 (Originalbeispiel Folie 68)."
      },
      {
        "id": "inf_w2_q2",
        "question": "Wie lautet das Ergebnis der Hexadezimalzahl 1AF_16 im Dezimalsystem?",
        "options": [
          "395",
          "412",
          "431",
          "480"
        ],
        "correct": 2,
        "explanation": "1*16^2 + A(10)*16^1 + F(15)*16^0 = 1*256 + 10*16 + 15 = 256 + 160 + 15 = 431_10 (Originalbeispiel Folie 74)."
      },
      {
        "id": "inf_w2_q3",
        "question": "Wie funktioniert das Horner-Schema bei der Umwandlung von Dual nach Dezimal?",
        "options": [
          "Man quadriert jede Ziffer und bildet am Ende die Quadratwurzel.",
          "Man multipliziert den bisherigen Zwischenwert mit der Basis 2 und addiert die nächste Ziffer von links nach rechts.",
          "Man teilt fortlaufend durch 16 und notiert die Reste von rechts nach links.",
          "Man vertauscht höchstwertiges und niederwertigstes Bit und zieht 1 ab."
        ],
        "correct": 1,
        "explanation": "Horner-Schema für Basis 2: Starte mit 0. Für jedes Bit von links nach rechts: Zwischenwert * 2 + aktuelles Bit. Extrem effizient ohne Potenzen!"
      },
      {
        "id": "inf_w2_q4",
        "question": "Wie viele Ziffern werden bei der Wandlung von Hexadezimal zu Binär direkt gruppiert?",
        "options": [
          "Jede Hexadezimalziffer entspricht exakt 4 Binärbits (Nibble).",
          "Jede Hexadezimalziffer entspricht genau 3 Binärbits.",
          "Jede Hexadezimalziffer entspricht genau 8 Binärbits (1 Byte).",
          "Das hängt davon ab, ob es sich um eine gerade oder ungerade Zahl handelt."
        ],
        "correct": 0,
        "explanation": "Weil 16 = 2^4 ist, lässt sich jede Hex-Ziffer (0-F) exakt und verlustfrei durch ein 4-Bit-Muster (0000 bis 1111) darstellen."
      }
    ],
    "parsons": {
      "title": "Dezimal zu Binär: Methode der fortlaufenden Division",
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
    "interactive": {
      "type": "steptrace",
      "title": "Interaktive Klausurübung: Stellenwertsysteme umrechnen",
      "instruction": "Führe die direkten Umrechnungen zwischen Dual, Hexadezimal und Dezimal durch:",
      "fields": [
        { "label": "Dezimal 139 in 8-Bit Binär:", "expected": "10001011", "placeholder": "z.B. 10001011" },
        { "label": "Hexadezimal 0x1AF in Dezimal:", "expected": "431", "placeholder": "z.B. 431" },
        { "label": "Hexadezimal 0x3C in Binär (8 Bits):", "expected": "00111100", "placeholder": "z.B. 00111100" },
        { "label": "Binär 11110100 in Hexadezimal (ohne 0x):", "expected": "F4", "placeholder": "z.B. F4" }
      ],
      "explanation": "Klasse! 139 = 128+8+2+1 = 10001011_2. 1AF_16 = 256 + 160 + 15 = 431. 3C_16 = 0011 1100. 1111 0100 = F4_16."
    }
  },
  {
    "id": "inf_w3",
    "num": 3,
    "title": "Negative Zahlen & Zweierkomplement",
    "badge": "Two Complement Pro",
    "lessons": [
      {
        "title": "Vorzeichen und Zweierkomplement (Folie 81–105)",
        "content": `
          <p>Wie speichert ein Computer Minuszahlen? Frühere Versuche mit Vorzeichenbit (Sign-Magnitude) hatten zwei Nullen (+0 und -0) und erforderten komplizierte Schaltungen.</p>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>⚡ Das Zweierkomplement</h4>
              <p>1. Positive Zahl binär auf n Bits notieren.<br>2. Alle Bits umdrehen (Einerkomplement).<br>3. <strong>Eins addieren (+1)</strong>.</p>
            </div>
            <div class="concept-card">
              <h4>🎯 Genialer Vorteil</h4>
              <p>Subtraktion ist identisch mit Addition: <code>a - b = a + (-b)</code>! Ein einziges Addierwerk in der CPU erledigt Plus und Minus.</p>
            </div>
            <div class="concept-card">
              <h4>⚠️ Arithmetischer Überlauf</h4>
              <p>8-Bit Wertebereich: <strong>-128 bis +127</strong>. Werden zwei positive Zahlen addiert und das MSB wird 1 (negativ), ist die Zahl übergelaufen!</p>
            </div>
          </div>
        `
      }
    ],
    "quizzes": [
      {
        "id": "inf_w3_q1",
        "question": "Wie lautet das 8-Bit-Zweierkomplement der Zahl -25_10?",
        "options": [
          "00011001",
          "11100110",
          "11100111",
          "10011001"
        ],
        "correct": 2,
        "explanation": "+25_10 = 00011001_2. Alle Bits invertieren -> 11100110 (Einerkomplement). 1 addieren -> 11100111_2 (Originalbeispiel Folie 93)."
      },
      {
        "id": "inf_w3_q2",
        "question": "Welcher Wertebereich lässt sich mit einem 8-Bit-Zweierkomplement darstellen?",
        "options": [
          "-128 bis +127",
          "-127 bis +128",
          "-256 bis +255",
          "-127 bis +127 (mit zwei Nullen +0 und -0)"
        ],
        "correct": 0,
        "explanation": "Bei n=8 Bits reicht der Bereich von -2^(n-1) bis +2^(n-1) - 1, also exakt von -128 bis +127. Es gibt nur eine einzige eindeutige Null (00000000)!"
      },
      {
        "id": "inf_w3_q3",
        "question": "Was ist der größte Hardware-Vorteil der Zweierkomplement-Darstellung in CPUs?",
        "options": [
          "Es verbraucht halb so viel RAM wie vorzeichenlose Ganzzahlen.",
          "Subtraktion kann als Addition mit dem Zweierkomplement berechnet werden (a - b = a + (-b)), wodurch ein einziges Addierwerk genügt.",
          "Multiplikationen können ohne Taktzyklen in 0 Nanosekunden durchgeführt werden.",
          "Es verhindert Compiler-Warnungen in GCC automatisch."
        ],
        "correct": 1,
        "explanation": "Da a - b = a + (-b) ist, braucht die ALU keine separate Subtrahier-Schaltung. Ein Addier-Rechenwerk genügt vollständig (Folie 96)."
      },
      {
        "id": "inf_w3_q4",
        "question": "Wann entsteht bei der Addition zweier Zweierkomplement-Zahlen ein arithmetischer Überlauf (Overflow)?",
        "options": [
          "Immer wenn das Ergebnis ungerade ist.",
          "Wenn das Carry-Bit des höchstwertigen Bits (MSB) 0 ist.",
          "Wenn zwei Zahlen mit gleichem Vorzeichen addiert werden und das Ergebnis das entgegengesetzte Vorzeichen erhält.",
          "Wenn eine positive und eine negative Zahl addiert werden."
        ],
        "correct": 2,
        "explanation": "Wenn zwei positive Zahlen addiert werden und das MSB plötzlich 1 (negativ) wird, oder zwei negative addiert werden und das Ergebnis 0 (positiv) wird, liegt ein Overflow vor."
      }
    ],
    "parsons": {
      "title": "Berechnung des Zweierkomplements (für negative Zahlen)",
      "instruction": "Ordne die Einzelschritte zur Bildung des 8-Bit-Zweierkomplements einer negativen Zahl (z. B. -25):",
      "lines": [
        "Nimm den Betrag der Zahl ohne Vorzeichen (z. B. +25)",
        "Wandle die positive Zahl in eine 8-Bit-Binärzahl um: 00011001",
        "Invertiere sämtliche Bits (0 wird zu 1, 1 wird zu 0) -> Einerkomplement: 11100110",
        "Addiere binär eine Eins (+ 1) zum invertierten Bitmuster",
        "Erhalte das fertige Zweierkomplement: 11100111",
        "Prüfe: Das höchstwertige Bit (MSB) ist 1, was eine negative Zahl signalisiert"
      ]
    },
    "interactive": {
      "type": "steptrace",
      "title": "Interaktives Zweierkomplement-Rechenlabor",
      "instruction": "Berechne das Zweierkomplement und die Subtraktion per Addition:",
      "fields": [
        { "label": "Schritt 1: Betrag 25 als 8-Bit Binär:", "expected": "00011001", "placeholder": "8 Bits" },
        { "label": "Schritt 2: Einerkomplement (invertiert):", "expected": "11100110", "placeholder": "8 Bits" },
        { "label": "Schritt 3: + 1 addiert (Zweierkomplement -25):", "expected": "11100111", "placeholder": "8 Bits" },
        { "label": "Schritt 4: Welcher Dezimalzahl entspricht 11111111 im 8-Bit Zweierkomplement?", "expected": "-1", "placeholder": "Vorzeichen und Zahl eintragen" }
      ],
      "explanation": "Richtig gerechnet! 11100111 entspricht -25. Und 11111111 im Zweierkomplement ist -1 (das Invertieren ergibt 00000000 + 1 = 1 mit Minus davor)."
    }
  },
  {
    "id": "inf_w4",
    "num": 4,
    "title": "Festkomma & Gleitkomma (IEEE 754)",
    "badge": "Float Architect",
    "lessons": [
      {
        "title": "Rationale Zahlen: Festkomma & Gleitkomma (Folie 106–134)",
        "content": `
          <p>Kommazahlen im Rechner existieren in zwei Formen:</p>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>🎯 Festkommazahlen</h4>
              <p>Feste Trennung zwischen Vorkomma- und Nachkommastellen. Nachkommastellen umwandeln: <strong>Fortlaufende Multiplikation mit 2</strong>. Überträge vor dem Komma (0 oder 1) notieren!</p>
            </div>
            <div class="concept-card">
              <h4>🔬 IEEE 754 HP-16</h4>
              <p><strong>16 Bit gesamt:</strong><br>• 1 Bit Vorzeichen (s)<br>• 5 Bit Exponent (Bias 15)<br>• 10 Bit Mantisse (mit <strong>Hidden Bit 1.xxx</strong>)</p>
            </div>
            <div class="concept-card">
              <h4>⚠️ Periodische Brüche</h4>
              <p>Zahlen wie 0.6 oder 0.1 sind im Dualsystem unendlich periodisch (.10011001...) und führen zu unausweichlichen Rundungsfehlern!</p>
            </div>
          </div>
        `
      }
    ],
    "quizzes": [
      {
        "id": "inf_w4_q1",
        "question": "Welcher Binärdarstellung entspricht die dezimale Festkommazahl 4.8125_10?",
        "options": [
          "100.1101",
          "100.1011",
          "100.1110",
          "101.0101"
        ],
        "correct": 0,
        "explanation": "4 = 100_2. 0.8125*2=1.625(1), 0.625*2=1.25(1), 0.25*2=0.5(0), 0.5*2=1.0(1). Ergebnis: 100.1101_2 (Originalbeispiel Folie 108)."
      },
      {
        "id": "inf_w4_q2",
        "question": "Warum lässt sich die Dezimalzahl 0.6_10 im binären Festkommasystem nicht exakt darstellen?",
        "options": [
          "Weil 0.6 größer als 0.5 ist.",
          "Weil 0.6 im Dualsystem zu einem periodischen Bruch (.10011001...) führt.",
          "Weil die Basis 2 nur ganze Zahlen darstellen kann.",
          "Weil der Exponent bei Festkommazahlen stets positiv sein muss."
        ],
        "correct": 1,
        "explanation": "0.6 * 2 = 1.2 -> 0.2*2=0.4 -> 0.4*2=0.8 -> 0.8*2=1.6 -> 0.6*2=1.2 (Periode 1001!). Im Dualsystem periodisch, daher Rundungsfehler (Folie 110)."
      },
      {
        "id": "inf_w4_q3",
        "question": "Wie ist das 16-Bit Half Precision (HP-16) Format nach IEEE 754 aufgeteilt?",
        "options": [
          "1 Bit Vorzeichen, 8 Bit Exponent, 7 Bit Mantisse",
          "1 Bit Vorzeichen, 5 Bit Exponent (Bias 15), 10 Bit Mantisse",
          "2 Bit Vorzeichen, 4 Bit Exponent, 10 Bit Mantisse",
          "1 Bit Vorzeichen, 4 Bit Exponent, 11 Bit Mantisse"
        ],
        "correct": 1,
        "explanation": "IEEE 754 HP-16: 1 Vorzeichenbit, 5 Exponentenbits mit Bias 15 (2^(5-1)-1), 10 Mantissenbits (Folie 127)."
      },
      {
        "id": "inf_w4_q4",
        "question": "Welche IEEE-754 HP-16 Darstellung ergibt die Zahl 7.5_10?",
        "options": [
          "0 10001 1110000000",
          "1 10001 1110000000",
          "0 01111 1110000000",
          "0 10010 0100000000"
        ],
        "correct": 0,
        "explanation": "7.5 = 111.1_2 = 1.111*2^2. Vorzeichen 0. Exponent = 2 + 15 = 17 = 10001_2. Mantisse (ohne Hidden Bit 1): 1110000000 (Folie 129)."
      }
    ],
    "parsons": {
      "title": "IEEE 754 Half-Precision (HP-16) Umwandlung",
      "instruction": "Bringe die 5 Schritte zur Umwandlung von -10.375 in IEEE 754 HP-16 in die richtige Reihenfolge:",
      "lines": [
        "Wandle Betrag und Nachkommastellen binär um: 10.375_10 = 1010.011_2",
        "Normalisiere die Mantisse: 1010.011_2 = 1.010011 * 2^3 (wahrer Exponent = 3)",
        "Addiere den Bias (15 bei 5 Exponent-Bits): Gespeicherter Exponent = 3 + 15 = 18_10 = 10010_2",
        "Entferne das Hidden Bit (führende 1) und fülle die Mantisse auf 10 Bits auf: 0100110000",
        "Füge alles zusammen: Vorzeichen 1 (negativ) + Exponent 10010 + Mantisse 0100110000",
        "Ergebnis: 1 10010 0100110000"
      ]
    },
    "interactive": {
      "type": "steptrace",
      "title": "Interaktiver IEEE 754 Bit-Rechner (Halbe Genauigkeit)",
      "instruction": "Bestimme die einzelnen Bitfelder für die Zahl 7.5_10 im IEEE 754 HP-16 Format:",
      "fields": [
        { "label": "Vorzeichen-Bit s (0=positiv, 1=negativ):", "expected": "0", "placeholder": "0 oder 1" },
        { "label": "Wahrer Exponent e (7.5 = 1.111 * 2^e):", "expected": "2", "placeholder": "Zahl" },
        { "label": "Gespeicherter Exponent E = e + 15 als 5-Bit Binär:", "expected": "10001", "placeholder": "5 Bits" },
        { "label": "Mantisse M (10 Bits ohne Hidden Bit 1):", "expected": "1110000000", "placeholder": "10 Bits" }
      ],
      "explanation": "Perfekt! 7.5 = 111.1_2 = 1.111 * 2^2. s = 0. E = 2 + 15 = 17 = 10001_2. Mantisse = 1110000000 (die führende 1 ist das Hidden Bit!)."
    }
  },
  {
    "id": "inf_w5",
    "num": 5,
    "title": "Digitaltechnik & Transistoren",
    "badge": "Silicon Engineer",
    "lessons": [
      {
        "title": "Halbleiter, MOS-Transistoren & CMOS (Folie 135–182)",
        "content": `
          <p>Alle Computer bestehen heute aus Milliarden winziger Schalter: den <strong>MOSFET-Transistoren</strong>.</p>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>🟢 n-MOS Transistor</h4>
              <p>Selbstsperrend. Schaltet durch (leitet Strom), wenn am Gate eine <strong>positive Spannung (High / 1)</strong> anliegt.</p>
            </div>
            <div class="concept-card">
              <h4>🔴 p-MOS Transistor</h4>
              <p>Komplementär zu n-MOS. Schaltet durch, wenn am Gate <strong>0 Volt (Low / 0)</strong> anliegt.</p>
            </div>
            <div class="concept-card">
              <h4>⚡ Der CMOS-Inverter</h4>
              <p>Kombiniert p-MOS oben (nach Vdd) und n-MOS unten (nach Masse). Da immer einer sperrt, verbraucht CMOS fast <strong>nur beim Schalten Strom</strong>!</p>
            </div>
          </div>
        `
      }
    ],
    "quizzes": [
      {
        "id": "inf_w5_q1",
        "question": "Welcher Baustein löste ab 1948 die unzuverlässigen Elektronenröhren in Computern ab?",
        "options": [
          "Der Halbleiter-Transistor",
          "Das elektromagnetische Relais",
          "Das D-Flip-Flop",
          "Der Mikroprozessor"
        ],
        "correct": 0,
        "explanation": "1948 wurde der Transistor entwickelt (Folie 135). Er ersetzte die heißen, fehleranfälligen Vakuumröhren durch Festkörper-Halbleiter."
      },
      {
        "id": "inf_w5_q2",
        "question": "Was zeichnet einen n-Kanal MOSFET (Anreicherungstyp) aus?",
        "options": [
          "Er leitet permanent und sperrt nur bei Anlegen einer negativen Spannung.",
          "Er ist selbstsperrend und leitet erst, wenn eine positive Gate-Source-Spannung U_GS > U_th anliegt.",
          "Er besteht ausschließlich aus Kupfer und Aluminium ohne Silizium.",
          "Er kann nur Wechselstrom verstärken, aber keine Gleichspannung schalten."
        ],
        "correct": 1,
        "explanation": "Der selbstsperrende n-MOSFET schaltet durch (wird leitend), sobald das Gate gegenüber Source positiv aufgeladen wird (U_GS > U_th, Folie 148)."
      },
      {
        "id": "inf_w5_q3",
        "question": "Warum nutzt moderne Digitaltechnik fast ausschließlich die CMOS-Technologie?",
        "options": [
          "Weil CMOS aus komplementären n-MOS und p-MOS Transistoren besteht und im statischen Zustand fast keinen Ruhestrom verbraucht.",
          "Weil CMOS-Schaltkreise ohne Taktleitung auskommen.",
          "Weil CMOS-Bauteile keine Wärme erzeugen.",
          "Weil CMOS ausschließlich aus optischen Glasfasern aufgebaut ist."
        ],
        "correct": 0,
        "explanation": "CMOS (Complementary MOS) kombiniert n-MOS und p-MOS. Da immer einer sperrt, fließt nur beim Umschalten kurz Strom -> extrem geringe Verlustleistung (Folie 181)."
      },
      {
        "id": "inf_w5_q4",
        "question": "Wie ist ein CMOS-Inverter (NOT-Gatter) aus Transistoren aufgebaut?",
        "options": [
          "Zwei n-MOS-Transistoren in Reihe gegen Masse geschaltet.",
          "Ein p-MOS nach oben zu Vdd und ein n-MOS nach unten zu Masse (GND) in Reihe; Gates verbunden als Eingang.",
          "Ein Relais kombiniert mit einem Vorwiderstand.",
          "Vier Dioden in einer Graetz-Gleichrichterschaltung."
        ],
        "correct": 1,
        "explanation": "Liegt am Eingang 1 (5V) an, leitet n-MOS nach GND (Ausgang 0). Liegt 0V an, leitet p-MOS nach Vdd (Ausgang 1) -> perfekte Invertierung (Folie 181)."
      }
    ],
    "parsons": {
      "title": "CMOS-Inverter Schaltvorgang (Eingang wechselt von 0 auf 1)",
      "instruction": "Bringe den physikalischen Ablauf beim Umschalten eines CMOS-Inverters von logisch 0 auf logisch 1 in die richtige Reihenfolge:",
      "lines": [
        "Eingangsspannung wechselt von 0V (Low) auf 5V (High / logisch 1)",
        "Die Gate-Source-Spannung am n-MOS überschreitet die Schwellenspannung (U_GS > U_th)",
        "Der untere n-MOS-Transistor wird leitend und schaltet den Pfad zu GND (Masse) durch",
        "Gleichzeitig sperrt der obere p-MOS-Transistor, da seine Gate-Source-Spannung 0V wird",
        "Die Ausgangskapazität wird über den leitenden n-MOS gegen Masse entladen",
        "Die Ausgangsspannung sinkt auf 0V (logisch 0) -> Invertierung vollendet"
      ]
    },
    "interactive": {
      "type": "steptrace",
      "title": "Interaktive CMOS-Gatter Schaltungsanalyse",
      "instruction": "Bestimme den Zustand der Transistoren und des Ausgangs im CMOS-Inverter:",
      "fields": [
        { "label": "Eingang = 0V: Leitet n-MOS oder p-MOS?", "expected": "p-MOS", "placeholder": "n-MOS oder p-MOS" },
        { "label": "Eingang = 0V: Welcher logische Pegel liegt am Ausgang an?", "expected": "1", "placeholder": "0 oder 1" },
        { "label": "Eingang = 5V: Leitet n-MOS oder p-MOS?", "expected": "n-MOS", "placeholder": "n-MOS oder p-MOS" },
        { "label": "Eingang = 5V: Welcher logische Pegel liegt am Ausgang an?", "expected": "0", "placeholder": "0 oder 1" }
      ],
      "explanation": "Exzellent verstanden! Bei Eingang 0 leitet der p-MOS nach Vdd (Ausgang 1). Bei Eingang 1 leitet der n-MOS nach Masse GND (Ausgang 0)."
    }
  },
  {
    "id": "inf_w6",
    "num": 6,
    "title": "Boolesche Algebra, Schaltungen & KV-Diagramme",
    "badge": "Logic Mastermind",
    "lessons": [
      {
        "title": "Schaltalgebra & Schaltungsentwurf (Folie 183–311)",
        "content": `
          <p>Das größte und wichtigste Kapitel für die Informatik-Klausur!</p>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>📜 Rechenregeln & De Morgan</h4>
              <p><code>NOT(a AND b) = NOT(a) OR NOT(b)</code><br><code>NOT(a OR b) = NOT(a) AND NOT(b)</code><br>Strich teilen und Rechenzeichen umdrehen!</p>
            </div>
            <div class="concept-card">
              <h4>🗺️ KV-Diagramme</h4>
              <p>Minimierung ohne Formel-Fehler: Eintragen nach Gray-Code, Bildung rechteckiger <strong>2er-Potenz-Blöcke (1, 2, 4, 8)</strong> über Ränder hinweg!</p>
            </div>
            <div class="concept-card">
              <h4>⚡ Halb- und Volladdierer</h4>
              <p><strong>Halbaddierer:</strong> Summe = <code>a XOR b</code>, Übertrag = <code>a AND b</code>.<br><strong>Volladdierer:</strong> Addiert 3 Bits (a, b, c_in) mit Summe und c_out.</p>
            </div>
          </div>
        `
      }
    ],
    "quizzes": [
      {
        "id": "inf_w6_q1",
        "question": "Wie lautet das De Morgansche Gesetz für NOT(a AND b)?",
        "options": [
          "NOT(a) AND NOT(b)",
          "NOT(a) OR NOT(b)",
          "a OR b",
          "NOT(a XOR b)"
        ],
        "correct": 1,
        "explanation": "De Morgan: Das Komplement einer Konjunktion ist die Disjunktion der Komplemente: NOT(a AND b) = NOT(a) OR NOT(b) (Folie 171)."
      },
      {
        "id": "inf_w6_q2",
        "question": "Welche Bedingung müssen Gruppen/Blöcke in einem Karnaugh-Veitch-Diagramm (KV-Map) erfüllen?",
        "options": [
          "Sie müssen dreieckig sein und mindestens 3 Einsen enthalten.",
          "Sie müssen rechteckig sein und ihre Kantenlängen müssen Zweierpotenzen (1, 2, 4, 8) sein.",
          "Sie dürfen niemals an den Außenrändern zusammenhängen.",
          "Jede Gruppe darf höchstens zwei Variablen umfassen."
        ],
        "correct": 1,
        "explanation": "Blöcke in KV-Maps müssen rechteckig sein mit Größen von 1, 2, 4, 8 Feldern (Zweierpotenzen), um Variablen durch a OR NOT(a) = 1 kürzen zu können (Folie 211)."
      },
      {
        "id": "inf_w6_q3",
        "question": "Welche Gatter bilden einen Halbaddierer für zwei Bits a und b?",
        "options": [
          "Ein XOR-Gatter für die Summe s und ein AND-Gatter für das Carry-Bit c",
          "Ein OR-Gatter für die Summe s und ein NAND-Gatter für das Carry-Bit c",
          "Zwei NOR-Gatter in Reihe geschaltet",
          "Ein Multiplexer und ein D-Flip-Flop"
        ],
        "correct": 0,
        "explanation": "Wahrheitstabelle Halbaddierer: Summe s = a XOR b (0+1=1, 1+0=1, 1+1=0). Carry c = a AND b (nur 1 bei 1+1) (Folie 233)."
      },
      {
        "id": "inf_w6_q4",
        "question": "Was unterscheidet die Kanonische Disjunktive Normalform (KDNF) von der KKNF?",
        "options": [
          "KDNF ist eine Oder-Verknüpfung von Und-Termen (Mintermen); KKNF ist eine Und-Verknüpfung von Oder-Termen (Maxtermen).",
          "KDNF wird nur für 2 Variablen verwendet, KKNF für beliebige Variablen.",
          "KDNF ist immer kürzer als die KKNF.",
          "KDNF enthält keine negierten Variablen."
        ],
        "correct": 0,
        "explanation": "KDNF = Summe von Produkten (Minterme für alle Zeilen mit Ergebnis 1). KKNF = Produkt von Summen (Maxterme für alle Zeilen mit Ergebnis 0) (Folie 200/201)."
      }
    ],
    "parsons": {
      "title": "Minimierung mit dem KV-Diagramm (K-Map)",
      "instruction": "Bringe die Schritte zur logischen Minimierung einer Schaltfunktion mit einem KV-Diagramm in die richtige Reihenfolge:",
      "lines": [
        "Erstelle die vollständige Wahrheitstabelle für alle Variablenkombinationen",
        "Trage alle Einsen (1) der Wahrheitstabelle in das Gray-Code codierte KV-Diagramm ein",
        "Finde möglichst große, rechteckige Blöcke von Einsen mit Zweierpotenz-Größe (1, 2, 4, 8, ...)",
        "Nutze Randverbindungen (Torus-Eigenschaft) und Überlappungen für größere Blöcke",
        "Lies für jeden Block die Variablen ab, die innerhalb des Blocks ihren Wert NICHT ändern",
        "Verknüpfe die resultierenden Terme disjunktiv (mit ODER) zur minimalen Schaltfunktion"
      ]
    },
    "interactive": {
      "type": "steptrace",
      "title": "Interaktive Logik-Prüfung: Wahrheitstabelle & Halbaddierer",
      "instruction": "Fülle die Ausgänge für Summe s (a XOR b) und Übertrag c (a AND b) des Halbaddierers aus:",
      "fields": [
        { "label": "Eingänge a=0, b=0 -> Summe s:", "expected": "0", "placeholder": "0 oder 1" },
        { "label": "Eingänge a=0, b=0 -> Übertrag c:", "expected": "0", "placeholder": "0 oder 1" },
        { "label": "Eingänge a=1, b=0 -> Summe s:", "expected": "1", "placeholder": "0 oder 1" },
        { "label": "Eingänge a=1, b=1 -> Summe s:", "expected": "0", "placeholder": "0 oder 1" },
        { "label": "Eingänge a=1, b=1 -> Übertrag c:", "expected": "1", "placeholder": "0 oder 1" }
      ],
      "explanation": "Absolut richtig! Beim Halbaddierer ist Summe = a XOR b (0, 1, 1, 0) und Übertrag = a AND b (0, 0, 0, 1)."
    }
  }
];
