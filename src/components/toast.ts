export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
  position?: ToastPosition;
  /** Milliseconds before dismissal. Use 0 to keep the toast open. */
  duration?: number;
}

const positions: Record<ToastPosition, string> = {
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

const icons = {
  success: '<path d="m16 9-5.5 5.5L8 12" />',
  error: '<path d="M12 8v4m0 4h.01" />',
  info: '<path d="M12 16v-4m0-4h.01" />',
};

class ToastHost extends HTMLElement {
  private dismissers = new Set<() => void>();

  connectedCallback() {
    this.innerHTML = `
      <div role="status" aria-atomic="true" class="sr-only" data-toast-announcer></div>
      <div popover="manual" class="pointer-events-none fixed inset-0 m-0 h-full w-full overflow-visible border-0 bg-transparent p-0" data-toast-overlay>
        ${Object.entries(positions)
          .map(
            ([position, classes]) =>
              `<div data-toast-position="${position}" class="fixed flex max-h-[calc(100dvh_-_2.5rem)] w-[calc(100%_-_2.5rem)] max-w-sm flex-col gap-3 overflow-y-auto overscroll-contain ${classes}"></div>`,
          )
          .join("")}
      </div>
      <template>
        <div class="toast-card group pointer-events-auto grid shrink-0 grid-cols-[auto_1fr_auto] items-start gap-3 rounded-lg border border-ink/15 bg-white p-4 text-ink shadow-lg data-[variant=error]:border-red-600 data-[variant=error]:bg-red-600 data-[variant=error]:text-white">
          <svg class="size-5 text-brand group-data-[variant=error]:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-toast-icon></svg>
          <div class="min-w-0 text-sm leading-relaxed wrap-break-word">
            <p class="font-bold" data-toast-title></p>
            <p class="mt-1 empty:hidden" data-toast-description></p>
          </div>
          <button type="button" class="-m-1 flex size-8 cursor-pointer items-center justify-center rounded hover:bg-current/10" aria-label="Zapri obvestilo" data-toast-dismiss>
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg>
          </button>
        </div>
      </template>`;
  }

  disconnectedCallback() {
    for (const dismiss of this.dismissers) dismiss();
  }

  show({
    title,
    description = "",
    variant = "info",
    position = "bottom-right",
    duration = variant === "error" ? 10_000 : 6_000,
  }: ToastOptions) {
    const overlay = this.querySelector<HTMLElement>("[data-toast-overlay]")!;
    const template = this.querySelector<HTMLTemplateElement>("template")!;
    const card = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;
    card.dataset.variant = variant;
    card.querySelector("[data-toast-icon]")!.innerHTML =
      `<circle cx="12" cy="12" r="10" />${icons[variant]}`;
    card.querySelector("[data-toast-title]")!.textContent = title;
    card.querySelector("[data-toast-description]")!.textContent = description;
    const previousFocus = document.activeElement as HTMLElement | null;

    let timer: Animation | undefined;

    const dismiss = () => {
      timer?.cancel();
      document.removeEventListener("visibilitychange", updateTimer);
      const restoreFocus = card.contains(document.activeElement);
      card.remove();
      if (restoreFocus && previousFocus?.isConnected) previousFocus.focus();
      this.dismissers.delete(dismiss);
      if (!this.dismissers.size && overlay.isConnected) overlay.hidePopover();
    };
    const updateTimer = () => {
      if (!card.isConnected) return;
      if (document.hidden || card.matches(":hover, :focus-within"))
        timer?.pause();
      else timer?.play();
    };

    document.addEventListener("visibilitychange", updateTimer);
    card.addEventListener("pointerenter", updateTimer);
    card.addEventListener("pointerleave", updateTimer);
    card.addEventListener("focusin", updateTimer);
    card.addEventListener("focusout", () => queueMicrotask(updateTimer));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        dismiss();
      }
    });
    card
      .querySelector("[data-toast-dismiss]")!
      .addEventListener("click", dismiss);

    this.dismissers.add(dismiss);
    overlay.querySelector(`[data-toast-position="${position}"]`)!.append(card);
    overlay.showPopover();
    requestAnimationFrame(() => {
      this.querySelector("[data-toast-announcer]")!.textContent = [
        title,
        description,
      ]
        .filter(Boolean)
        .join(". ");
    });
    if (duration > 0) {
      timer = card.animate([], duration);
      timer.onfinish = dismiss;
      updateTimer();
    }
  }
}

if (!customElements.get("astro-toast")) {
  customElements.define("astro-toast", ToastHost);
}

export function showToast(options: ToastOptions): void {
  let host = document.querySelector<ToastHost>("astro-toast");
  if (!host) {
    host = document.createElement("astro-toast") as ToastHost;
    document.body.append(host);
  }
  host.show(options);
}
