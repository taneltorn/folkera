import argparse
import subprocess
import os
import sys
import re
import json
import time
from pathlib import Path

root_directory = "/home/torntan1/DevZone/CoverHunterMPS/"


def convert_audio(query_path: str):
    """Convert input audio to 16kHz mono using ffmpeg."""
    
    current_epoch = int(time.time())
    converted_query_path = os.path.join(root_directory, "converted", f"{current_epoch}.wav")
    
    command = [
        "ffmpeg",
        "-y",
        "-i", query_path,
        "-ac", "1",
        "-ar", "16000",
        "-b:a", "16k",
        converted_query_path
    ]
    print(f"Converting audio: {' '.join(command)}", file=sys.stderr)
    subprocess.run(command, check=True)
    
    return converted_query_path


def parse_output(output: str):
    """Extract label and distance pairs from the identify output."""
    entries = []
    for line in output.splitlines():
        match = re.match(r"\|\s*(.+?)\s*\|\s*([\d.]+)\s*\|", line)
        if match:
            label = match.group(1)
            distance = float(match.group(2))
            entries.append((label, distance))
    return entries


def identify(file_path, top: str = "10"):
    """Run tools.identify using the virtualenv Python, capturing and parsing output."""

    sys.stderr.write("Some log message\n")

    venv_python = os.path.join(root_directory, ".venv", "bin", "python")

    command = [
        venv_python, "-m", "tools.identify",
        os.path.join(root_directory, "data/folkera"),
        os.path.join(root_directory, "training/folktest"),
        file_path,
        f"-top={top}"
    ]
    print(f"Running identification: {' '.join(command)}", file=sys.stderr)
    result = subprocess.run(
        command,
        check=True,
        cwd=root_directory,
        capture_output=True,
        text=True
    )

    return parse_output(result.stdout)


def main():
    parser = argparse.ArgumentParser(description="Preprocess audio and identify using tools.identify.")
    parser.add_argument("query", help="Path to the query WAV file")
    parser.add_argument("-top", default="10", help="Number of top results to return")

    args = parser.parse_args()

    try:
        file_path = convert_audio(args.query)
        results = identify(file_path, args.top)
        print(json.dumps(results))

    except subprocess.CalledProcessError as e:
        print(f"Error during execution: {e}", file=sys.stderr)  
        sys.exit(1)
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Removed temporary file: {file_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
