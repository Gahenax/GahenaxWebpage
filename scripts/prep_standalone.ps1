$standaloneDir = ".next/standalone"
$staticDir = ".next/static"
$publicDir = "public"
$zipPath = "gahenax_v4_standalone_LIVE.zip"

if (Test-Path $standaloneDir) {
    Write-Host "Iniciando preparación de paquete Standalone..." -ForegroundColor Cyan
    
    # Copy static/public if they exist
    if (Test-Path $staticDir) {
        $destStatic = Join-Path $standaloneDir ".next/static"
        New-Item -ItemType Directory -Force -Path $destStatic
        Copy-Item -Path "$staticDir/*" -Destination $destStatic -Recurse -Force
        Write-Host "Copiados archivos estáticos."
    }
    
    if (Test-Path $publicDir) {
        $destPublic = Join-Path $standaloneDir "public"
        New-Item -ItemType Directory -Force -Path $destPublic
        Copy-Item -Path "$publicDir/*" -Destination $destPublic -Recurse -Force
        Write-Host "Copiados archivos públicos."
    }

    # Create the zip from the standalone folder
    if (Test-Path $zipPath) { Remove-Item $zipPath }
    Compress-Archive -Path "$standaloneDir/*" -DestinationPath $zipPath -Force
    
    Write-Host "ÉXITO: Paquete '$zipPath' generado." -ForegroundColor Green
    Write-Host "Sube este archivo al Administrador de Archivos de Hostinger." -ForegroundColor Yellow
} else {
    Write-Error "No se encontró .next/standalone. Ejecuta 'npm run build' primero."
}
