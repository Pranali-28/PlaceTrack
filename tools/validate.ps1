# Validates that the PlaceTrack project is complete before tests and build run
$failed = $false
$required = @("index.html","package.json","README.md","css/style.css","js/store.js","js/ui.js","js/stats.js","js/filters.js","js/data.js","js/timer.js")
foreach ($f in $required) {
    if (Test-Path $f) {
        if ((Get-Item $f).Length -gt 0) { Write-Host "OK: $f" } else { Write-Host "ERROR: $f is empty"; $failed = $true }
    } else { Write-Host "ERROR: $f is missing"; $failed = $true }
}
$html = Get-Content "index.html" -Raw
foreach ($ref in @("css/style.css","js/store.js","js/ui.js","js/stats.js","js/filters.js","js/data.js","js/timer.js")) {
    if ($html.Contains($ref)) { Write-Host "OK: index.html references $ref" } else { Write-Host "ERROR: index.html does not reference $ref"; $failed = $true }
}
if ($failed) { Write-Host "Validation FAILED"; exit 1 }
Write-Host "Validation PASSED"
