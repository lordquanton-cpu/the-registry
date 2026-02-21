# The Registry — Deploy generated assets to package folders
# Run from THE_REGISTRY root. Set $env:CURSOR_ASSETS to Cursor assets path, or use ./generated-assets/

$registryRoot = Split-Path $PSScriptRoot -Parent
$packagesRoot = Join-Path $registryRoot "packages"
$sourceRoot = if ($env:CURSOR_ASSETS) { $env:CURSOR_ASSETS } else { Join-Path $registryRoot "generated-assets" }

$heroMap = @{
  "karma-machine-hero.png"      = "NULL_AXIS"
  "veil-hero.png"               = "BLIND_SPOT"
  "ghost-protocol-hero.png"     = "ZERO_SIGNATURE"
  "blanket-hero.png"            = "QUIET_FLOOR"
  "reflection-hero.png"         = "DARK_MIRROR"
  "burn-protocol-hero.png"      = "DEAD_LETTER"
  "ghost-wipe-hero.png"         = "PHANTOM_NET"
  "nest-hero.png"               = "VOID_SHELL"
  "resurrection-hero.png"       = "CLEAN_SLATE"
  "evacuation-hero.png"         = "RED_ACT"
  "lever-hero.png"              = "GRAY_AREA"
  "tap-hero.png"                = "WHISPER_CHAIN"
  "recovery-hero.png"           = "BLACK_BOX"
  "escort-hero.png"             = "SILENT_HAND"
  "channel-hero.png"            = "NIGHT_RUN"
  "freeze-hero.png"             = "COLD_TRAIL"
  "sever-hero.png"              = "BURNED_BRIDGE"
  "pull-hero.png"               = "HARD_COPY"
  "seal-hero.png"               = "IRON_MOUTH"
  "mask-hero.png"               = "SHADOW_LEDGER"
  "key-hero.png"                = "OPEN_WINDOW"
  "bait-hero.png"               = "FALSE_DOOR"
  "war-chest-hero.png"          = "DEEP_POCKET"
  "shift-hero.png"              = "PARALLAX"
}

if (-not (Test-Path $sourceRoot)) {
  Write-Error "Source assets not found at $sourceRoot"
  exit 1
}

foreach ($file in $heroMap.Keys) {
  $src = Join-Path $sourceRoot $file
  if (Test-Path $src) {
    $pkg = $heroMap[$file]
    $dstDir = Join-Path $packagesRoot "$pkg\assets"
    if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
    Copy-Item $src -Destination (Join-Path $dstDir $file) -Force
    Write-Host "Copied $file -> $pkg/assets/"
  } else {
    Write-Warning "Missing: $file"
  }
}

# inquiry-protocol.png -> all packages
$inquiry = Join-Path $sourceRoot "inquiry-protocol.png"
if (Test-Path $inquiry) {
  Get-ChildItem $packagesRoot -Directory | ForEach-Object {
    $dstDir = Join-Path $_.FullName "assets"
    if (Test-Path $dstDir) {
      Copy-Item $inquiry -Destination (Join-Path $dstDir "inquiry-protocol.png") -Force
    }
  }
  Write-Host "Copied inquiry-protocol.png -> all packages"
}

Write-Host "Done."
