# Python (FastApi) + Supabase + Nextjs + Vercel

## General

Setup the `.env`-variables

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
SUPABASE_URL=[YOUR_URL]
SUPABASE_KEY=[YOUR_KEY]
NEXT_PUBLIC_SUPABASE_URL=[YOUR_URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_KEY]
```

## Backend

### Setup Python Backend

For setting up the virtual environment I recommend this guide: [handle versions and virtual environments on Mac](https://medium.com/marvelous-mlops/the-rightway-to-install-python-on-a-mac-f3146d9d9a32).

Additionally in VSCode it is important to configure the Interpreter ( search for *Select Interpreter* in the pallette)

Innstall dependencies via

``` console
pip install -r requirements.txt
```

The python backend can then be started via

``` console
python dev.py
```

Current python version: 3.13

## Model generating

Models (typescript interfaces) can be generated from pydantic models via the `generate-types.sh`-script.
The script will look for models in `/api/models.py` and will generate the typescript-interfaces in `src/api/index.ts`.

Make sure to make the script executable (`chmod u+x generate-types.sh`).

## UI

## Versions

