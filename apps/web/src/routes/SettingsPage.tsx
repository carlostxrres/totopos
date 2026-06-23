import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SettingsSection } from "@/components/SettingsSection";
import { useThemeStore } from "@/store/theme-store";

const STORE_KEYS = [
  "tot-opos:tests",
  "tot-opos:progress",
  "tot-opos:session",
  "tot-opos:history",
  "tot-opos:question-history",
  "tot-opos:curriculum-ui",
  "tot-opos:theme",
];

function exportData() {
  const data: Record<string, unknown> = {};
  for (const key of STORE_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        data[key] = JSON.parse(raw);
      } catch {
        data[key] = raw;
      }
    }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `totopos-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(json: string): { ok: boolean; error?: string } {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, error: "El archivo no es un JSON válido." };
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { ok: false, error: "Formato de backup no reconocido." };
  }
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (STORE_KEYS.includes(key)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  return { ok: true };
}

function clearAllData() {
  for (const key of STORE_KEYS) {
    localStorage.removeItem(key);
  }
}

export function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<"idle" | "ok" | "error">("idle");
  const [importError, setImportError] = useState("");
  const [clearDialog, setClearDialog] = useState(false);
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      const result = importData(json);
      if (result.ok) {
        setImportStatus("ok");
        setImportError("");
        window.location.reload();
      } else {
        setImportStatus("error");
        setImportError(result.error ?? "Error desconocido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-lg font-semibold">Ajustes</h1>
        <p className="text-sm text-muted-foreground">Gestión de datos y preferencias.</p>
      </div>

      <SettingsSection title="Tema" description="Cambia el tema de la aplicación">
        <Button variant="secondary" onClick={toggleTheme}>
          {isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        </Button>
      </SettingsSection>

      <SettingsSection
        title="Exportar datos"
        description="Descarga una copia de todo tu progreso, historial y tests guardados en formato JSON. Útil para hacer una copia de seguridad o transferir datos entre dispositivos."
      >
        <Button variant="secondary" onClick={exportData}>
          Descargar copia de seguridad
        </Button>
      </SettingsSection>

      <SettingsSection
        title="Importar datos"
        description="Restaura una copia de seguridad previamente exportada. Los datos actuales serán reemplazados por los del archivo."
      >
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          Seleccionar archivo de backup
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          className="sr-only"
          onChange={handleFileChange}
        />
        {importStatus === "error" && (
          <p className="text-sm text-destructive">{importError}</p>
        )}
      </SettingsSection>

      <SettingsSection
        title="Borrar todos los datos"
        description="Elimina permanentemente todo el historial, progreso y tests guardados. Esta acción no se puede deshacer."
        danger
      >
        <Button variant="secondary" onClick={() => setClearDialog(true)} className="text-destructive hover:text-destructive border-destructive/30">
          Borrar todos los datos
        </Button>
      </SettingsSection>

      <ConfirmDialog
        open={clearDialog}
        onOpenChange={setClearDialog}
        title="Borrar todos los datos"
        description="Se eliminará permanentemente todo tu historial, progreso y tests guardados. Esta acción no se puede deshacer."
        confirmLabel="Borrar todo"
        variant="destructive"
        onConfirm={() => {
          clearAllData();
          window.location.reload();
        }}
      />
    </div>
  );
}
