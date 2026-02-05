# Jules Activity Monitor Script
# Ejecutar en background para monitorear actividad de Jules en el repositorio

$repoPath = "c:\Users\USUARIO\.gemini\antigravity\playground\crimson-cassini\GahenaxWebpage"
$monitorFile = "$repoPath\JULES-MONITOR.md"
$lastCommitFile = "$repoPath\.last-commit-hash"
$checkInterval = 300  # 5 minutos en segundos

Write-Host "=== JULES MONITOR ACTIVO ===" -ForegroundColor Cyan
Write-Host "Repositorio: $repoPath"
Write-Host "Intervalo: $checkInterval segundos"
Write-Host "Presiona Ctrl+C para detener`n"

# Guardar commit inicial
Set-Location $repoPath
$initialCommit = git rev-parse HEAD
$initialCommit | Out-File $lastCommitFile -Encoding utf8

$iteration = 0

while ($true) {
    $iteration++
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Fetch latest changes
    git fetch origin --quiet 2>$null
    
    # Get current HEAD
    $currentCommit = git rev-parse origin/main
    $lastKnownCommit = Get-Content $lastCommitFile -Raw
    
    if ($currentCommit -ne $lastKnownCommit.Trim()) {
        # NEW ACTIVITY DETECTED!
        Write-Host "`n[$timestamp] 🚨 NUEVA ACTIVIDAD DETECTADA!" -ForegroundColor Green
        
        # Get commit details
        $commitInfo = git log $lastKnownCommit.Trim()..origin/main --oneline
        $commitCount = ($commitInfo | Measure-Object -Line).Lines
        
        Write-Host "Nuevos commits: $commitCount" -ForegroundColor Yellow
        Write-Host $commitInfo
        
        # Update monitor file
        $updateLog = @"

### [$timestamp] 🎉 Actividad Detectada
**Commits nuevos:** $commitCount
``````
$commitInfo
``````

"@
        Add-Content $monitorFile $updateLog
        
        # Update last known commit
        $currentCommit | Out-File $lastCommitFile -Encoding utf8
        
        # Pull changes
        git pull origin main --quiet
        
        Write-Host "`n✓ Cambios sincronizados localmente" -ForegroundColor Green
        
        # Check JULES-ASSIGNMENT.md for completed tasks
        $assignmentContent = Get-Content "$repoPath\JULES-ASSIGNMENT.md" -Raw
        $completedTasks = ([regex]::Matches($assignmentContent, '\[x\]')).Count
        $totalTasks = ([regex]::Matches($assignmentContent, '\[\s?\]|\[x\]')).Count
        
        Write-Host "Progreso: $completedTasks/$totalTasks tareas completadas" -ForegroundColor Cyan
    }
    else {
        # No changes
        Write-Host "[$timestamp] Check #$iteration - Sin cambios" -ForegroundColor Gray
    }
    
    # Wait
    Start-Sleep -Seconds $checkInterval
}
