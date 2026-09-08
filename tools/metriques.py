#!/usr/bin/env python3
"""Recuento de la produccion de Francisca Julian Querol repartida por los seis proyectos.

Lee los repositorios hermanos clonados al lado de este (por defecto, la carpeta que contiene este
repositorio) y escribe
content/metriques.json, que SI se versiona: construir el sitio no necesita los clones ni la red.

Ademas, compara el recuento nuevo con el anterior y ANOTA LAS NOVEDADES en content/novetats.json:
un proyecto que no estaba es una entrada «nou»; un proyecto cuyas cifras han crecido (textos,
fotografias, piezas... o al menos LLINDAR_PARAULES palabras), una entrada «creix» con la diferencia.
El fichero solo crece; se puede editar a mano (borrar una entrada, anadir una «nota» con texto en
los dos idiomas). El sitio lo lee para la banda de novedades de la portada y la pagina /novedades/.

    python3 tools/metriques.py              # recuenta y escribe content/metriques.json
    python3 tools/metriques.py --comprova   # no escribe: falla si el fichero no coincide (CI)
    python3 tools/metriques.py --arrel DIR  # otra carpeta con los clones

Solo biblioteca estandar. Las definiciones de cada cifra estan en NOTES.md; si se cambian aqui,
hay que cambiarlas alli.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

AQUEST = Path(__file__).resolve().parent.parent
ARREL_PER_DEFECTE = AQUEST.parent  # los hermanos, clonados al lado de este repositorio
DESTI = AQUEST / "content" / "metriques.json"
NOVETATS = AQUEST / "content" / "novetats.json"

FOTOS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
IL_LUSTRACIONS = {".svg"}

# --------------------------------------------------------------------------- texto


def cos(md: str) -> str:
    """El texto de un master, sin frontmatter, sin imagenes y sin HTML.

    Se quita el frontmatter YAML (donde viven resumenes, pies y comentarios, que no son
    obra de la autora en este recuento), la sintaxis de imagen con su pie, las etiquetas
    HTML sueltas y las marcas de Markdown que no se leen en voz alta.
    """
    if md.startswith("---"):
        parts = md.split("\n---", 2)
        md = parts[2] if len(parts) >= 3 else md
    md = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", md)          # ![alt](ruta "pie")
    md = re.sub(r"<!--.*?-->", " ", md, flags=re.S)         # comentarios
    md = re.sub(r"<[^>]+>", " ", md)                        # anclas de pagina, <br>, etc.
    md = re.sub(r"^\s{0,3}#{1,6}\s+", "", md, flags=re.M)   # marcas de titulo
    md = re.sub(r"[*_`>|]", " ", md)
    return md


def paraules(fitxers: list[Path]) -> int:
    total = 0
    for f in fitxers:
        total += len(re.findall(r"[^\s]+", cos(f.read_text(encoding="utf-8"))))
    return total


def imatges(dir: Path, extensions: set[str], exclou: set[str] = frozenset()) -> list[Path]:
    if not dir.is_dir():
        return []
    return sorted(
        f
        for f in dir.rglob("*")
        if f.is_file() and f.suffix.lower() in extensions and not (set(f.parts) & exclou)
    )


def md(dir: Path) -> list[Path]:
    return sorted(f for f in dir.glob("*.md") if f.is_file()) if dir.is_dir() else []


def mida(f: Path) -> tuple[int, int] | None:
    """Ancho y alto de un PNG, GIF o JPEG leyendo solo la cabecera; None si no se reconoce."""
    with f.open("rb") as fh:
        cap = fh.read(26)
        if cap[:8] == b"\x89PNG\r\n\x1a\n":
            return int.from_bytes(cap[16:20], "big"), int.from_bytes(cap[20:24], "big")
        if cap[:6] in (b"GIF87a", b"GIF89a"):
            return int.from_bytes(cap[6:8], "little"), int.from_bytes(cap[8:10], "little")
        if cap[:2] == b"\xff\xd8":
            fh.seek(2)
            while True:
                marcador = fh.read(2)
                if len(marcador) < 2 or marcador[0] != 0xFF:
                    return None
                if marcador[1] in (0xD8, 0x01) or 0xD0 <= marcador[1] <= 0xD7:
                    continue
                llarg = int.from_bytes(fh.read(2), "big")
                if 0xC0 <= marcador[1] <= 0xCF and marcador[1] not in (0xC4, 0xC8, 0xCC):
                    dades = fh.read(5)
                    return int.from_bytes(dades[3:5], "big"), int.from_bytes(dades[1:3], "big")
                fh.seek(llarg - 2, 1)
    return None


# ----------------------------------------------------------------- un proyecto cada uno


def masosdemorella(repo: Path) -> dict:
    capitols = md(repo / "content")
    return {
        "textos": len(capitols),
        "unitat": "capitols",
        "paraules": paraules(capitols),
        "fotografies": len(imatges(repo / "assets", FOTOS)),
        "illustracions": len(imatges(repo / "assets", IL_LUSTRACIONS)),
    }


def ramblacelumbres(repo: Path) -> dict:
    base = repo / "src" / "content" / "articulos"
    original = md(base / "es")
    traduides = sum(len(md(base / l)) for l in ("ca", "en", "zh"))
    return {
        "textos": len(original),
        "unitat": "guies",
        # Solo el castellano, que es la lengua en que la autora las escribio; ca/en/zh son
        # traducciones de esta edicion y contarlas cuadruplicaria la misma obra.
        "paraules": paraules(original),
        "traduccions": traduides,
        "idiomes": 4,
        "fotografies": len(imatges(repo / "src" / "assets", FOTOS)),
        "illustracions": len(imatges(repo / "src" / "assets", IL_LUSTRACIONS)),
    }


def santjoans(repo: Path) -> dict:
    public = repo / "santjoans-web" / "public" / "piezes"
    posicions = len(json.loads((public / "piezes.json").read_text(encoding="utf-8")))
    return {
        "textos": 0,
        "unitat": "peces",
        "paraules": 0,
        # Las piezas NO se suman a `fotografies`: cada una se guarda en tres tamanos (60, 360 y
        # 550 px) y contar los ficheros triplicaria el recuento. `peces` es su cifra propia.
        "peces": len(imatges(public / "550", FOTOS)),
        "posicions": posicions,
        "resolucions": 3,
        "fitxers_imatge": len(imatges(public, FOTOS)),
    }


def santjoanslibro(repo: Path) -> dict:
    """El texto del estudio de Santjoans, reconstruido desde el PDF como masosdemorella."""
    capitols = md(repo / "content")
    fitxes = len(re.findall(r"^- id:", (repo / "content" / "cataleg.yaml").read_text(encoding="utf-8"), flags=re.M))
    return {
        "textos": len(capitols),
        "unitat": "capitols",
        "paraules": paraules(capitols),
        # `fitxes` es su cifra propia: las fichas del catalogo del libro. NO se suman a `peces`, que
        # ya cuenta las rajoles digitalizadas del visor (santjoans), ni a `textos`: el catalogo es
        # datos (cataleg.yaml), no prosa.
        "fitxes": fitxes,
        # Solo las imagenes del texto (assets/images). Las fotos del acto de presentacion de 2012
        # (assets/presentacio) retratan a la autora, no son obra suya: se quedan fuera, como las de perfil
        # del blog.
        "fotografies": len(imatges(repo / "assets" / "images", FOTOS)),
    }


def lesmeuescoses(repo: Path) -> dict:
    entrades = md(repo / "content" / "entrades")
    fotos = imatges(repo / "blogger-export" / "images", FOTOS, exclou={"perfil"})
    comentaris = sum(
        len(re.findall(r"^  - autor:", f.read_text(encoding="utf-8"), flags=re.M)) for f in entrades
    )
    return {
        "textos": len(entrades),
        "unitat": "entrades",
        "paraules": paraules(entrades),
        "fotografies": len(fotos),
        "comentaris": comentaris,
    }


def franciscaineditos(repo: Path) -> dict:
    """Los escritos que no habian salido del ordenador: md/<obra>/<documento>/index.md."""
    escrits = sorted(repo.glob("md/*/*/index.md"))
    obres = sorted(repo.glob("md/*/_carpeta.md"))
    # Las imagenes van en md/<obra>/<documento>/img/. Se dejan fuera los iconos y restos de web
    # (menos de 100 px de lado) que pandoc extrajo de los docx junto con las fotos.
    fotos = [
        f
        for f in imatges(repo / "md", FOTOS)
        if "img" in f.parts and (m := mida(f)) is not None and min(m) >= 100
    ]
    return {
        "textos": len(escrits),
        "unitat": "escrits",
        "obres": len(obres),
        "paraules": paraules(escrits),
        "fotografies": len(fotos),
    }


PROJECTES = [
    ("masosdemorella", masosdemorella),
    ("santjoans", santjoans),
    ("santjoanslibro", santjoanslibro),
    ("ramblacelumbres", ramblacelumbres),
    ("lesmeuescoses", lesmeuescoses),
    ("franciscaineditos", franciscaineditos),
]


# ------------------------------------------------------------------------------ recuento


def recompta(arrel: Path) -> dict:
    falten = [nom for nom, _ in PROJECTES if not (arrel / nom).is_dir()]
    if falten:
        sys.exit(
            f"No estan clonados en {arrel}: {', '.join(falten)}.\n"
            "Clonarlos (git clone git@github.com:jtpadilla/<nom>.git) o indicar --arrel."
        )

    projectes = {nom: fn(arrel / nom) for nom, fn in PROJECTES}
    suma = lambda camp: sum(p.get(camp, 0) for p in projectes.values())  # noqa: E731

    return {
        "generat": date.today().isoformat(),
        "arrel": str(arrel).replace(str(Path.home()), "~"),
        "projectes": projectes,
        "totals": {
            "projectes": len(projectes),
            "textos": suma("textos"),
            "paraules": suma("paraules"),
            "fotografies": suma("fotografies"),
            "illustracions": suma("illustracions"),
            "peces": suma("peces"),
            "traduccions": suma("traduccions"),
            "comentaris": suma("comentaris"),
            "obres": suma("obres"),
        },
    }


# ------------------------------------------------------------------------------ novedades

# Cifras cuyo crecimiento cuenta como novedad, en el orden en que se enseñan.
COMPTABLES = ("textos", "obres", "paraules", "fotografies", "illustracions", "peces", "fitxes", "comentaris")
# Las palabras solas (correcciones, erratas) no son novedad si no llegan a esta cifra.
LLINDAR_PARAULES = 100


def novetats(vell: dict | None, nou: dict, avui: str) -> list[dict]:
    """Las entradas de novedades que salen de comparar el recuento anterior con el nuevo."""
    entrades: list[dict] = []
    abans = (vell or {}).get("projectes", {})
    for slug, m in nou["projectes"].items():
        if slug not in abans:
            entrades.append({"data": avui, "tipus": "nou", "projecte": slug})
            continue
        canvis = {c: m.get(c, 0) - abans[slug].get(c, 0) for c in COMPTABLES}
        canvis = {c: d for c, d in canvis.items() if d > 0}
        if not canvis or set(canvis) == {"paraules"} and canvis["paraules"] < LLINDAR_PARAULES:
            continue
        entrades.append({"data": avui, "tipus": "creix", "projecte": slug, "canvis": canvis})
    return entrades


def anota_novetats(noves: list[dict]) -> list[dict]:
    """Anade las entradas a content/novetats.json. Si el mismo dia ya hay una del mismo proyecto,
    se funden (el guion se puede ejecutar varias veces en una sesion). Devuelve lo anadido."""
    fitxer = json.loads(NOVETATS.read_text(encoding="utf-8")) if NOVETATS.exists() else {"novetats": []}
    llista: list[dict] = fitxer["novetats"]
    afegides = []
    for e in noves:
        mateixa = next(
            (x for x in llista if x["data"] == e["data"] and x.get("projecte") == e["projecte"]), None
        )
        if mateixa is None:
            llista.append(e)
            afegides.append(e)
        elif mateixa["tipus"] == "creix" and e["tipus"] == "creix":
            for c, d in e["canvis"].items():
                mateixa["canvis"][c] = mateixa["canvis"].get(c, 0) + d
            afegides.append(e)
        # una entrada «nou» del mismo dia ya lo dice todo: no se anade nada
    llista.sort(key=lambda x: x["data"])
    NOVETATS.write_text(json.dumps(fitxer, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return afegides


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--arrel", type=Path, default=ARREL_PER_DEFECTE, help="carpeta con los clones hermanos")
    ap.add_argument("--comprova", action="store_true", help="no escribe; falla si metriques.json no coincide")
    args = ap.parse_args()

    nou = recompta(args.arrel.expanduser().resolve())
    text = json.dumps(nou, ensure_ascii=False, indent=2) + "\n"

    if args.comprova:
        if not DESTI.exists():
            sys.exit(f"Falta {DESTI.relative_to(DESTI.parent.parent)}: ejecutar tools/metriques.py")
        vell = json.loads(DESTI.read_text(encoding="utf-8"))
        # La fecha de generacion y la ruta de los clones cambian de maquina a maquina.
        if {k: v for k, v in vell.items() if k not in ("generat", "arrel")} != {
            k: v for k, v in nou.items() if k not in ("generat", "arrel")
        }:
            sys.exit("Las cifras han cambiado: ejecutar `python3 tools/metriques.py` y commitear.")
        print("metriques.json al dia")
        return

    vell = json.loads(DESTI.read_text(encoding="utf-8")) if DESTI.exists() else None
    DESTI.write_text(text, encoding="utf-8")
    t = nou["totals"]
    print(f"Escrito {DESTI}")
    print(
        f"  {t['projectes']} proyectos · {t['textos']} textos · {t['paraules']:,} palabras · "
        f"{t['fotografies']} fotografías · {t['peces']} piezas".replace(",", ".")
    )

    # Novedades: solo si habia un recuento anterior con el que comparar.
    if vell is not None:
        afegides = anota_novetats(novetats(vell, nou, nou["generat"]))
        for e in afegides:
            que = "nuevo" if e["tipus"] == "nou" else " ".join(f"+{d} {c}" for c, d in e["canvis"].items())
            print(f"  novedad: {e['projecte']} · {que}")
        if afegides:
            print(f"Anotado en {NOVETATS}: commitear los dos ficheros.")


if __name__ == "__main__":
    main()
