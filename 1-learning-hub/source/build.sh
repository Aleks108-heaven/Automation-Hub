#!/usr/bin/env sh
# Rebuild automation-hub.html from the sources (run from this folder).
{ echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  sed -n '1,/<\/style>/p' part1.html; echo '</head><body>'; sed '1,/<\/style>/d' part1.html
  echo '<script>'; cat data.js data2.js data3.js data4.js data5.js i18n.js i18n/*.js app.js; echo '</script></body></html>'; } > ../automation-hub.html
echo "Built ../automation-hub.html"
