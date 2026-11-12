import os
import sys
import json
import time
import shutil
import tempfile
import subprocess
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

APP_DIR = os.path.dirname(os.path.abspath(__file__))
USERS_FILE = os.path.join(APP_DIR, "users_progress.json")
GCC_PATHS = [
    r"C:\msys64\mingw64\bin\gcc.exe",
    r"C:\msys64\ucrt64\bin\gcc.exe",
    r"C:\MinGW\bin\gcc.exe",
    "gcc"
]

def find_gcc():
    for path in GCC_PATHS:
        if os.path.isfile(path):
            return path
        resolved = shutil.which(path)
        if resolved:
            return resolved
    return None

GCC_BIN = find_gcc()

def translate_gcc_errors(stderr_text):
    """Übersetzt typische GCC-Fehlermeldungen für C-Anfänger ins Deutsche."""
    hints = []
    lower = stderr_text.lower()

    if "expected ';'" in lower or "expected ',' or ';'" in lower:
        hints.append({
            "title": "Fehlendes Semikolon (;)",
            "desc": "In C muss fast jede Anweisung mit einem Strichpunkt `;` abgeschlossen werden. Schau dir die genannte Zeile und vor allem die Zeile direkt darüber genau an!"
        })
    if "undeclared (first use in this function)" in lower or "was not declared" in lower:
        hints.append({
            "title": "Unbekannte Variable oder Bezeichner",
            "desc": "Du verwendest einen Namen, den C noch nicht kennt. Hast du dich vertippt (Groß-/Kleinschreibung beachten!) oder vergessen, die Variable vorher mit ihrem Datentyp (z. B. `int x;`) zu deklarieren?"
        })
    if "implicit declaration of function" in lower:
        hints.append({
            "title": "Funktion nicht bekannt (Header vergessen?)",
            "desc": "Du rufst eine Funktion auf, die vorher nicht deklariert wurde. Für `printf`/`scanf` brauchst du oben `#include <stdio.h>`, oder du hast dich beim Funktionsnamen vertippt."
        })
    if "format '%d' expects argument of type 'int *'" in lower or ("expects argument of type" in lower and "scanf" in lower):
        hints.append({
            "title": "Adressoperator & bei scanf() vergessen!",
            "desc": "Klassische GP1-Klausurfalle! `scanf()` braucht die Speicheradresse der Variable, um den Wert dort hineinzuschreiben. Schreibe `&variable` statt nur `variable`."
        })
    if "format '%d' expects argument of type 'int', but argument" in lower and "double" in lower:
        hints.append({
            "title": "Falscher Format-Specifier in printf()",
            "desc": "Du nutzt `%d` (für ganze Zahlen `int`), übergibst aber eine Kommazahl (`float`/`double`). Nutze `%f` oder `%.2f` für Kommazahlen!"
        })
    if "expected ')'" in lower or "expected '}'" in lower or "expected '{'" in lower:
        hints.append({
            "title": "Klammer-Fehler ( ( ) oder { } )",
            "desc": "Eine geöffnete Klammer wurde nicht richtig geschlossen. Prüfe, ob jede `(` eine passende `)` und jeder Block `{` eine schließende `}` hat."
        })
    if ("assignment" in lower and "condition" in lower) or "suggest parentheses around assignment" in lower:
        hints.append({
            "title": "Vorsicht: Zuweisung (=) statt Vergleich (==)!",
            "desc": "In einer `if`- oder `while`-Bedingung steht ein einzelnes `=`. Für einen Vergleich auf Gleichheit brauchst du zwei Gleichheitszeichen: `==`."
        })
    return hints

def make_default_user(name, avatar, color):
    return {
        "name": name,
        "avatar": avatar,
        "color": color,
        "xp": 0,
        "streak": 1,
        "lastActiveDate": time.strftime("%Y-%m-%d"),
        "completedQuizzes": {},
        "completedParsons": {},
        "completedBosses": {},
        "mistakeQueue": [],
        "unlockedBadges": ["starter"],
        "lastChapterIdx": 0,
        "lastStepIdx": 0
    }

DEFAULT_STORE = {
    "users": {
        "player1": make_default_user("Du (Spieler 1)", "👨‍💻", "#0071e3"),
        "player2": make_default_user("Kollege (Spieler 2)", "🚀", "#5856d6")
    }
}

def load_store():
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                if "users" in data:
                    return data
        except Exception:
            pass
    return json.loads(json.dumps(DEFAULT_STORE))

def save_store(store):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(store, f, indent=2, ensure_ascii=False)

class TrainerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_DIR, **kwargs)

    def log_message(self, format, *args):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def _send_json(self, status_code, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in ("/api/progress", "/api/users"):
            store = load_store()
            self._send_json(200, {
                "ok": True,
                "store": store,
                "gccAvailable": GCC_BIN is not None,
                "gccPath": GCC_BIN
            })
            return
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        content_len = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
        try:
            data = json.loads(raw_body)
        except Exception:
            data = {}

        if parsed.path in ("/api/progress", "/api/users"):
            store = load_store()
            user_id = data.get("userId")
            user_data = data.get("userData")
            if user_id and user_data:
                if user_id not in store["users"]:
                    store["users"][user_id] = make_default_user(user_data.get("name", user_id), user_data.get("avatar", "🎓"), "#0071e3")
                store["users"][user_id].update(user_data)
                save_store(store)
            elif "users" in data:
                store["users"].update(data["users"])
                save_store(store)
            self._send_json(200, {"ok": True, "store": store})
            return

        if parsed.path == "/api/compile":
            code = data.get("code", "")
            stdin_input = data.get("stdin", "")
            std_version = data.get("std", "gnu17")
            cli_args = data.get("args", [])

            if not GCC_BIN:
                self._send_json(500, {"ok": False, "error": "Kein GCC-Compiler gefunden.", "hints": []})
                return

            with tempfile.TemporaryDirectory() as tmpdir:
                c_file = os.path.join(tmpdir, "main.c")
                exe_file = os.path.join(tmpdir, "main.exe")
                with open(c_file, "w", encoding="utf-8") as f:
                    f.write(code)

                std_flag = f"-std={std_version}" if std_version in ("c99", "c11", "c17", "c23", "gnu17", "gnu23") else "-std=gnu17"
                compile_cmd = [GCC_BIN, std_flag, "-Wall", "-Wextra", c_file, "-o", exe_file]

                env = os.environ.copy()
                gcc_dir = os.path.dirname(GCC_BIN)
                if gcc_dir:
                    env["PATH"] = gcc_dir + os.pathsep + env.get("PATH", "")

                try:
                    comp_proc = subprocess.run(
                        compile_cmd,
                        capture_output=True,
                        text=True,
                        encoding="utf-8",
                        errors="replace",
                        timeout=8,
                        env=env
                    )
                except subprocess.TimeoutExpired:
                    self._send_json(200, {"ok": False, "stage": "compile", "stderr": "Zeitüberschreitung beim Kompilieren.", "hints": []})
                    return

                compiler_output = (comp_proc.stdout + "\n" + comp_proc.stderr).strip()
                hints = translate_gcc_errors(compiler_output)

                if comp_proc.returncode != 0 or not os.path.exists(exe_file):
                    self._send_json(200, {"ok": False, "stage": "compile", "stderr": compiler_output, "hints": hints})
                    return

                run_cmd = [exe_file] + [str(a) for a in cli_args if str(a).strip()]
                t0 = time.time()
                try:
                    run_proc = subprocess.run(
                        run_cmd,
                        input=stdin_input,
                        capture_output=True,
                        text=True,
                        encoding="utf-8",
                        errors="replace",
                        timeout=3.5,
                        cwd=tmpdir,
                        env=env
                    )
                    elapsed_ms = int((time.time() - t0) * 1000)
                    self._send_json(200, {
                        "ok": True,
                        "stage": "run",
                        "stdout": run_proc.stdout,
                        "stderr": run_proc.stderr,
                        "compilerWarnings": compiler_output,
                        "hints": hints,
                        "exitCode": run_proc.returncode,
                        "elapsedMs": elapsed_ms
                    })
                except subprocess.TimeoutExpired as e:
                    out_part = e.stdout.decode("utf-8", errors="replace") if isinstance(e.stdout, bytes) else (e.stdout or "")
                    self._send_json(200, {
                        "ok": False,
                        "stage": "timeout",
                        "stdout": out_part,
                        "stderr": "Programm abgebrochen: Zeitüberschreitung (3.5s)!",
                        "hints": [{
                            "title": "Endlosschleife oder fehlende Eingabe erkannt!",
                            "desc": "Prüfe deine `while`/`for`-Abbruchbedingung oder ob `scanf`/`getchar` auf weitere Konsoleneingaben wartet."
                        }]
                    })
            return

        self._send_json(404, {"ok": False, "error": "Unbekannter Endpunkt"})

def main():
    port = 8765
    server = HTTPServer(("127.0.0.1", port), TrainerHandler)
    url = f"http://127.0.0.1:{port}"
    print("=" * 60)
    print("  GP1 C-TRAINER (MULTI-USER & CLOUD EDITION)")
    print(f"  Server läuft auf: {url}")
    print("=" * 60)
    if "--no-browser" not in sys.argv:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer beendet.")

if __name__ == "__main__":
    main()
