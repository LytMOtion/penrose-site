# PENROSE

A static pre-launch website for PENROSE.

## Pages

- **Homepage** — `index.html`
- **Collection** — `collection.html`
- **Philosophy** — `philosophy.html`
- **Private Access signup** — an in-page form on the homepage that submits directly to Klaviyo

## Technology

- HTML
- CSS
- Vanilla JavaScript (no frameworks, no build step)
- Klaviyo client subscription API
- Vercel deployment

## Local preview

From the repository root, run:

```
python3 -m http.server 5173
```

Then open:

```
http://localhost:5173
```

## Klaviyo

The Private Access form on the homepage posts to Klaviyo's public
`client/subscriptions` endpoint. Two Klaviyo identifiers are baked into the
client code — both are **public identifiers** intended to be exposed in the
browser:

- **Public Site ID:** `UkaUiB`
- **List ID:** `JWkk3U`

No private Klaviyo API key exists anywhere in this repository, and none is
required. The list uses double opt-in, so a new subscriber is not on the list
until they click the confirmation email Klaviyo sends them.
