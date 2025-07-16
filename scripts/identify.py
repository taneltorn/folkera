import argparse
import subprocess
import os
import sys
import re
import json
import time
import traceback
from pathlib import Path
from typing import List, Tuple


def log(message: str):
    print(message, file=sys.stderr)


def convert_audio(query_path: Path, converted_dir: Path) -> Path:
    timestamp = int(time.time())
    output_path = converted_dir / f"{timestamp}.wav"
    command = [
        "ffmpeg", "-y",
        "-i", str(query_path),
        "-ac", "1", "-ar", "16000", "-b:a", "16k",
        str(output_path)
    ]
    log(f"Converting audio: {' '.join(command)}")
    subprocess.run(command, check=True)
    return output_path


def parse_output(output: str) -> List[Tuple[str, float]]:
    entries = []
    for line in output.splitlines():
        match = re.match(r"\|\s*(.+?)\s*\|\s*([\d.]+)\s*\|", line)
        if match:
            label = match.group(1)
            distance = float(match.group(2))
            entries.append((label, distance))
    return entries


def identify(file_path: Path, top: str, root_dir: Path) -> List[Tuple[str, float]]:
    data_dir = root_dir / "data/folkera"
    training_dir = root_dir / "training/folkera"
    venv_python = root_dir / ".venv" / "bin" / "python"

    command = [
        str(venv_python), "-m", "tools.identify",
        str(data_dir), str(training_dir),
        str(file_path), f"-top={top}"
    ]
    log(f"Running identification: {' '.join(command)}")

    result = subprocess.run(
        command,
        check=True,
        cwd=str(root_dir),
        capture_output=True,
        text=True
    )
    return parse_output(result.stdout)


def main():
    parser = argparse.ArgumentParser(description="Preprocess audio and identify using tools.identify.")
    parser.add_argument("query", help="Path to the query WAV or MP3 file")
    parser.add_argument("-top", default="10", help="Number of top results to return")
    parser.add_argument("--root", required=True, help="Path to the root directory of the project")

    args = parser.parse_args()
    root_dir = Path(args.root).resolve()
    query_path = Path(args.query).resolve()
    converted_dir = root_dir / "converted"

    converted_dir.mkdir(parents=True, exist_ok=True)
    converted_path = None

    try:
        converted_path = convert_audio(query_path, converted_dir)
        results = identify(converted_path, args.top, root_dir)
        print(json.dumps(results))  # stdout: machine-readable output only

    except subprocess.CalledProcessError as e:
        log(f"[Command failed] {e.cmd}")
        if e.stdout:
            log(f"[stdout]\n{e.stdout}")
        if e.stderr:
            log(f"[stderr]\n{e.stderr}")
        sys.exit(1)

    except Exception as e:
        log(f"[Exception] {str(e)}")
        log(traceback.format_exc())
        sys.exit(1)

    finally:
        try:
            if converted_path and converted_path.exists():
                converted_path.unlink()
                log(f"Removed temporary file: {converted_path}")
        except Exception as cleanup_err:
            log(f"Failed to remove temporary file: {converted_path}\n{cleanup_err}")


if __name__ == "__main__":
    main()
