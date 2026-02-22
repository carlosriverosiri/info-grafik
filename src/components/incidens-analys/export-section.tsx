"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

async function captureAsDataUrl(el: HTMLElement) {
  return toPng(el, {
    backgroundColor: "#ffffff",
    pixelRatio: 2,
    cacheBust: true,
  });
}

async function downloadPng(el: HTMLElement, filename: string) {
  const dataUrl = await captureAsDataUrl(el);
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function downloadPptx(el: HTMLElement, title: string, filename: string) {
  const [dataUrl, pptxMod] = await Promise.all([
    captureAsDataUrl(el),
    import("pptxgenjs"),
  ]);

  const PptxGenJS = pptxMod.default;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";

  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };

  slide.addText(title, {
    x: 0.5,
    y: 0.3,
    w: 12.33,
    h: 0.5,
    fontSize: 18,
    fontFace: "Arial",
    color: "0F172A",
    bold: true,
  });

  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });

  const imgAspect = img.naturalWidth / img.naturalHeight;
  const slideW = 12.33;
  const maxH = 6.5;
  let imgW = slideW;
  let imgH = imgW / imgAspect;
  if (imgH > maxH) {
    imgH = maxH;
    imgW = imgH * imgAspect;
  }

  slide.addImage({
    data: dataUrl,
    x: (13.33 - imgW) / 2,
    y: 0.9,
    w: imgW,
    h: imgH,
  });

  await pptx.writeFile({ fileName: `${filename}.pptx` });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ExportableSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleExport = useCallback(
    async (format: "png" | "pptx") => {
      if (!ref.current) return;
      setBusy(true);
      setOpen(false);
      const filename = slugify(title);
      try {
        if (format === "png") {
          await downloadPng(ref.current, filename);
        } else {
          await downloadPptx(ref.current, title, filename);
        }
      } catch (err) {
        console.error("Export failed:", err);
        alert(
          `Export misslyckades: ${err instanceof Error ? err.message : String(err)}`
        );
      } finally {
        setBusy(false);
      }
    },
    [title]
  );

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-3 right-3 z-20">
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            disabled={busy}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-600 disabled:opacity-50"
            aria-label="Exportera"
          >
            {busy ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </button>

          {open && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 top-10 z-30 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => handleExport("png")}
                >
                  <span className="text-xs font-medium text-slate-400">
                    PNG
                  </span>
                  Ladda ner bild
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => handleExport("pptx")}
                >
                  <span className="text-xs font-medium text-slate-400">
                    PPTX
                  </span>
                  PowerPoint-slide
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
