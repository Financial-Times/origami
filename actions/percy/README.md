# Percy for Origami Components

A GitHub action to visually test Origami Components with Percy.

## Quick start

To use the Percy snapshot GitHub action you will need to add a new step to your
actions config using the `Financial-Times/origami-percy` action. You will also need
to set your `PERCY_TOKEN` in your GitHub projects settings.

Below is a sample config:

``` yaml
name: Percy
on:
  pull_request:
    types:
      - labeled
      - opened
      - reopened
      - synchronize
    paths:
     - "package.json"
     - "package-lock.json"
     - "origami.json"
     - "main.js"
     - "main.scss"
     - "demos/**"
     - "src/**"
  push:
    branches: master
    paths:
     - "package.json"
     - "package-lock.json"
     - "origami.json"
     - "main.js"
     - "main.scss"
     - "demos/**"
     - "src/**"

jobs:
  percy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: Financial-Times/origami-percy@v1
      with:
        github-token: ${{secrets.ORIGAMI_FOX_ACCESS_TOKEN}} # To comment as the Origami Fox mascot GitHub user
      env:
        PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```
